import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, ArrowLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { domains } from '@/data/examQuestions';

interface ReviewState {
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

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ReviewState | null;
  
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');

  if (!state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No review data found.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const { userAnswers, questions } = state;

  const toggleQuestion = (id: number) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredQuestions = questions.filter((question, index) => {
    const answer = userAnswers[index];
    const isCorrect = answer.selectedAnswer === question.correctAnswer;
    
    if (filter === 'correct' && !isCorrect) return false;
    if (filter === 'incorrect' && isCorrect) return false;
    if (domainFilter !== 'all' && question.domain !== domainFilter) return false;
    
    return true;
  });

  const correctCount = questions.filter((q, i) => userAnswers[i].selectedAnswer === q.correctAnswer).length;
  const incorrectCount = questions.length - correctCount;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Review All Questions</h1>
            <div className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({questions.length})
              </Button>
              <Button
                variant={filter === 'correct' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('correct')}
                className={filter === 'correct' ? 'bg-success hover:bg-success/90' : ''}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Correct ({correctCount})
              </Button>
              <Button
                variant={filter === 'incorrect' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('incorrect')}
                className={filter === 'incorrect' ? 'bg-destructive hover:bg-destructive/90' : ''}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Incorrect ({incorrectCount})
              </Button>
            </div>

            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="bg-secondary text-foreground text-sm rounded-lg px-3 py-2 border border-border"
            >
              <option value="all">All Domains</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => {
            const answerIndex = questions.findIndex(q => q.id === question.id);
            const answer = userAnswers[answerIndex];
            const isCorrect = answer.selectedAnswer === question.correctAnswer;
            const isExpanded = expandedQuestions.has(question.id);

            return (
              <div
                key={question.id}
                className={`bg-card/50 backdrop-blur-sm border rounded-xl overflow-hidden transition-all ${
                  isCorrect ? 'border-success/30' : 'border-destructive/30'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="w-full p-4 text-left flex items-start gap-4"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-primary font-medium">Q{question.id}</span>
                      <span className="px-2 py-0.5 text-xs bg-secondary rounded-full text-muted-foreground">
                        {question.domain}
                      </span>
                    </div>
                    <p className="text-foreground line-clamp-2">{question.question}</p>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/50">
                    <div className="pt-4 space-y-3">
                      {question.options.map((option, index) => {
                        const isSelected = answer.selectedAnswer === index;
                        const isCorrectOption = question.correctAnswer === index;
                        
                        let bgClass = 'bg-secondary/50';
                        let textClass = 'text-muted-foreground';
                        let borderClass = 'border-transparent';
                        
                        if (isCorrectOption) {
                          bgClass = 'bg-success/10';
                          textClass = 'text-success';
                          borderClass = 'border-success/30';
                        } else if (isSelected && !isCorrectOption) {
                          bgClass = 'bg-destructive/10';
                          textClass = 'text-destructive';
                          borderClass = 'border-destructive/30';
                        }

                        return (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${bgClass} ${borderClass}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                isCorrectOption 
                                  ? 'bg-success text-success-foreground' 
                                  : isSelected 
                                  ? 'bg-destructive text-destructive-foreground'
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className={textClass}>{option}</span>
                              {isSelected && !isCorrectOption && (
                                <span className="ml-auto text-xs text-destructive">Your answer</span>
                              )}
                              {isCorrectOption && (
                                <span className="ml-auto text-xs text-success">Correct answer</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-2">Explanation:</p>
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No questions match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
