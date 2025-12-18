import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Flag, CheckCircle, Clock, AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { examQuestions, domains } from '@/data/examQuestions';
import { supabase } from '@/integrations/supabase/client';

interface UserAnswer {
  questionId: number;
  selectedAnswer: number | null;
  markedForReview: boolean;
}

const Exam = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(
    examQuestions.map(q => ({ questionId: q.id, selectedAnswer: null, markedForReview: false }))
  );
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = examQuestions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestionIndex];

  const answeredCount = userAnswers.filter(a => a.selectedAnswer !== null).length;
  const markedCount = userAnswers.filter(a => a.markedForReview).length;
  const progress = (answeredCount / examQuestions.length) * 100;

  const handleSelectAnswer = (answerIndex: number) => {
    setUserAnswers(prev => prev.map((a, i) => 
      i === currentQuestionIndex ? { ...a, selectedAnswer: answerIndex } : a
    ));
  };

  const handleToggleReview = () => {
    setUserAnswers(prev => prev.map((a, i) => 
      i === currentQuestionIndex ? { ...a, markedForReview: !a.markedForReview } : a
    ));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleNavigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const calculateResults = useCallback(() => {
    let correctCount = 0;
    const domainScores: Record<string, { correct: number; total: number }> = {};
    const missedQuestions: Array<{
      question_id: number;
      question_text: string;
      user_answer: string;
      correct_answer: string;
      domain: string;
    }> = [];

    // Initialize domain scores
    domains.forEach(domain => {
      domainScores[domain] = { correct: 0, total: 0 };
    });

    examQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer.selectedAnswer === question.correctAnswer;
      
      domainScores[question.domain].total++;
      
      if (isCorrect) {
        correctCount++;
        domainScores[question.domain].correct++;
      } else {
        missedQuestions.push({
          question_id: question.id,
          question_text: question.question,
          user_answer: userAnswer.selectedAnswer !== null ? question.options[userAnswer.selectedAnswer] : 'Not answered',
          correct_answer: question.options[question.correctAnswer],
          domain: question.domain
        });
      }
    });

    const score = Math.round((correctCount / examQuestions.length) * 100);
    const durationMinutes = Math.round(elapsedTime / 60);

    return {
      score,
      correctCount,
      totalQuestions: examQuestions.length,
      durationMinutes,
      domainScores,
      missedQuestions
    };
  }, [userAnswers, elapsedTime]);

  const handleSubmit = async () => {
    const unanswered = userAnswers.filter(a => a.selectedAnswer === null).length;
    
    if (unanswered > 0) {
      const confirmed = window.confirm(`You have ${unanswered} unanswered question(s). Are you sure you want to submit?`);
      if (!confirmed) return;
    }

    setIsSubmitting(true);

    try {
      const results = calculateResults();
      
      if (supabase && user) {
        // Save to database
        const { error } = await supabase.from('exam_attempts').insert({
          student_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Unknown',
          student_email: user.email || '',
          exam_name: 'Network+ Practice Exam',
          score: results.score,
          questions_missed: results.totalQuestions - results.correctCount,
          total_questions: results.totalQuestions,
          duration_minutes: results.durationMinutes,
          attempt_date: new Date().toISOString(),
          domains: results.domainScores,
          missed_questions: results.missedQuestions
        });

        if (error) {
          console.error('Failed to save exam attempt:', error);
          toast({
            title: 'Warning',
            description: 'Exam completed but results could not be saved to the database.',
            variant: 'destructive'
          });
        }
      }

      // Navigate to results with state
      navigate('/results', { 
        state: { 
          results,
          userAnswers,
          questions: examQuestions
        } 
      });
    } catch (error) {
      console.error('Error submitting exam:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit exam. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with timer and progress */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-primary font-mono">
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4" />
                <span>{answeredCount}/{examQuestions.length} answered</span>
              </div>
              {markedCount > 0 && (
                <div className="hidden sm:flex items-center gap-2 text-sm text-warning">
                  <Flag className="w-4 h-4" />
                  <span>{markedCount} marked</span>
                </div>
              )}
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Exam'}
            </Button>
          </div>
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Main Question Area */}
          <div className="space-y-6">
            {/* Question Card */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-sm text-primary font-medium">Question {currentQuestionIndex + 1} of {examQuestions.length}</span>
                  <span className="ml-3 px-2 py-1 text-xs bg-secondary rounded-full text-muted-foreground">
                    {currentQuestion.domain}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleReview}
                  className={currentAnswer.markedForReview ? 'text-warning' : 'text-muted-foreground'}
                >
                  <Flag className="w-4 h-4 mr-1" />
                  {currentAnswer.markedForReview ? 'Marked' : 'Mark for Review'}
                </Button>
              </div>

              <h2 className="text-lg font-medium text-foreground mb-6">
                {currentQuestion.question}
              </h2>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      currentAnswer.selectedAnswer === index
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentAnswer.selectedAnswer === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentQuestionIndex === examQuestions.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 h-fit lg:sticky lg:top-24">
            <h3 className="text-sm font-medium text-foreground mb-4">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {examQuestions.map((_, index) => {
                const answer = userAnswers[index];
                const isCurrent = index === currentQuestionIndex;
                const isAnswered = answer.selectedAnswer !== null;
                const isMarked = answer.markedForReview;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleNavigateToQuestion(index)}
                    className={`relative w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : isAnswered
                        ? 'bg-success/20 text-success border border-success/30'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {index + 1}
                    {isMarked && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-success/20 border border-success/30" />
                <span className="text-muted-foreground">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-secondary" />
                <span className="text-muted-foreground">Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative w-4 h-4 rounded bg-secondary">
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-warning rounded-full" />
                </span>
                <span className="text-muted-foreground">Marked for review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
