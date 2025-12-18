import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, XCircle, Clock, BarChart3, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { NetworkNode } from '@/components/NetworkNode';
import { domains } from '@/data/examQuestions';

interface DomainScore {
  correct: number;
  total: number;
}

interface ResultsState {
  results: {
    score: number;
    correctCount: number;
    totalQuestions: number;
    durationMinutes: number;
    domainScores: Record<string, DomainScore>;
    missedQuestions: Array<{
      question_id: number;
      question_text: string;
      user_answer: string;
      correct_answer: string;
      domain: string;
    }>;
  };
  userAnswers: Array<{
    questionId: number;
    selectedAnswer: number | null;
    markedForReview: boolean;
  }>;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    domain: string;
    explanation: string;
  }>;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState | null;

  if (!state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No exam results found.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const { results, userAnswers, questions } = state;
  const passed = results.score >= 72;

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background network-grid relative overflow-hidden">
      {/* Background glow effects */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 ${passed ? 'bg-success/10' : 'bg-destructive/10'} rounded-full blur-3xl animate-pulse-glow`} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      <NetworkNode className="top-20 left-[10%]" delay={0} />
      <NetworkNode className="top-40 right-[15%]" delay={0.5} />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Result Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
            passed ? 'bg-success/20' : 'bg-destructive/20'
          } mb-6`}>
            {passed ? (
              <Trophy className="w-10 h-10 text-success" />
            ) : (
              <XCircle className="w-10 h-10 text-destructive" />
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {passed ? (
              <span className="text-success">Congratulations!</span>
            ) : (
              <span className="text-destructive">Keep Practicing</span>
            )}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {passed 
              ? "You've passed the Network+ Practice Exam!" 
              : "You didn't pass this time, but don't give up!"}
          </p>
        </div>

        {/* Score Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className={`text-5xl font-bold ${passed ? 'text-success' : 'text-destructive'}`}>
                  {results.score}%
                </div>
                <p className="text-muted-foreground mt-2">Your Score</p>
                <p className="text-sm text-muted-foreground">Passing: 72%</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-foreground">
                  {results.correctCount}/{results.totalQuestions}
                </div>
                <p className="text-muted-foreground mt-2">Correct Answers</p>
                <p className="text-sm text-muted-foreground">
                  {results.totalQuestions - results.correctCount} missed
                </p>
              </div>
              <div>
                <div className="text-5xl font-bold text-foreground flex items-center justify-center gap-2">
                  <Clock className="w-10 h-10 text-primary" />
                  {formatTime(results.durationMinutes)}
                </div>
                <p className="text-muted-foreground mt-2">Time Taken</p>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Breakdown */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Domain Breakdown
          </h2>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <div className="space-y-6">
              {domains.map(domain => {
                const score = results.domainScores[domain];
                const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
                const isPassing = percentage >= 72;
                
                return (
                  <div key={domain}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{domain}</span>
                      <span className={`text-sm font-mono ${isPassing ? 'text-success' : 'text-destructive'}`}>
                        {score.correct}/{score.total} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${isPassing ? 'bg-success' : 'bg-destructive'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/review', { state })}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Review Answers
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/exam')}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Exam
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
          >
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
