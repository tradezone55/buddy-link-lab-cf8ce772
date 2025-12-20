-- Create app_role enum for role-based access
CREATE TYPE public.app_role AS ENUM ('admin', 'faculty', 'student');

-- Create user_roles table for managing roles
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy: users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS policy: admins can manage all roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Drop existing RLS policies on exam_attempts
DROP POLICY IF EXISTS "Users can insert their own attempts" ON public.exam_attempts;
DROP POLICY IF EXISTS "Users can view their own attempts" ON public.exam_attempts;

-- Add new columns to exam_attempts (keep existing for backwards compatibility)
ALTER TABLE public.exam_attempts 
ADD COLUMN IF NOT EXISTS correct_answers integer,
ADD COLUMN IF NOT EXISTS time_taken_seconds integer,
ADD COLUMN IF NOT EXISTS answers jsonb,
ADD COLUMN IF NOT EXISTS domain_breakdown jsonb,
ADD COLUMN IF NOT EXISTS completed_at timestamp with time zone;

-- Make user_id NOT NULL (update any null values first)
UPDATE public.exam_attempts SET user_id = gen_random_uuid() WHERE user_id IS NULL;
ALTER TABLE public.exam_attempts ALTER COLUMN user_id SET NOT NULL;

-- Create new RLS policies for exam_attempts

-- Students can insert their own attempts
CREATE POLICY "Students can insert own attempts"
ON public.exam_attempts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Students can view their own attempts
CREATE POLICY "Students can view own attempts"
ON public.exam_attempts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Faculty can view all attempts
CREATE POLICY "Faculty can view all attempts"
ON public.exam_attempts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'faculty'));

-- Admins can view all attempts
CREATE POLICY "Admins can view all attempts"
ON public.exam_attempts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));