-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own attempts" ON public.exam_attempts;
DROP POLICY IF EXISTS "Users can view their own attempts" ON public.exam_attempts;

-- Recreate as PERMISSIVE policies (default, correct behavior)
CREATE POLICY "Users can insert their own attempts"
ON public.exam_attempts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own attempts"
ON public.exam_attempts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Explicitly ensure no UPDATE or DELETE access
-- (No policies = no access when RLS is enabled)