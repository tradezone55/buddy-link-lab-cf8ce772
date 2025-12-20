-- Drop the existing RESTRICTIVE insert policy
DROP POLICY IF EXISTS "Students can insert own attempts" ON public.exam_attempts;

-- Create a PERMISSIVE policy for students to insert their own attempts
CREATE POLICY "Students can insert own attempts" 
ON public.exam_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add a permissive SELECT policy for authenticated users (required base)
CREATE POLICY "Authenticated users base access" 
ON public.exam_attempts 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Make the existing SELECT policies work with the base policy
DROP POLICY IF EXISTS "Students can view own attempts" ON public.exam_attempts;
DROP POLICY IF EXISTS "Faculty can view all attempts" ON public.exam_attempts;
DROP POLICY IF EXISTS "Admins can view all attempts" ON public.exam_attempts;

CREATE POLICY "Students can view own attempts" 
ON public.exam_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Faculty can view all attempts" 
ON public.exam_attempts 
FOR SELECT 
USING (has_role(auth.uid(), 'faculty'::app_role));

CREATE POLICY "Admins can view all attempts" 
ON public.exam_attempts 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));