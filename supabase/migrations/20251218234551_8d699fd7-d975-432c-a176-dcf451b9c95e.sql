-- Create exam_attempts table to store student exam results
CREATE TABLE public.exam_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  exam_name TEXT NOT NULL,
  score NUMERIC NOT NULL,
  questions_missed INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  attempt_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  domains JSONB,
  missed_questions JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own exam attempts
CREATE POLICY "Users can view their own attempts"
ON public.exam_attempts
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own exam attempts
CREATE POLICY "Users can insert their own attempts"
ON public.exam_attempts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_exam_attempts_user_id ON public.exam_attempts(user_id);
CREATE INDEX idx_exam_attempts_attempt_date ON public.exam_attempts(attempt_date DESC);