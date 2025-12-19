import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, BookOpen, Trophy, Clock, Play, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NetworkNode } from '@/components/NetworkNode';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Don't render protected UI until auth is confirmed - prevents flash of protected content
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary animate-pulse">Loading...</div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleStartExam = () => {
    navigate('/exam');
  };

  return (
    <div className="min-h-screen bg-background network-grid relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      {/* Network nodes decoration */}
      <NetworkNode className="top-20 left-[10%]" delay={0} />
      <NetworkNode className="top-40 right-[15%]" delay={0.5} />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-effect">
              <Network className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Network+ Exam Prep</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome, <span className="gradient-text">{user?.user_metadata?.full_name || 'Student'}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to test your Network+ knowledge? Take a practice exam with 50 questions covering all certification domains.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Start Exam Card */}
          <div className="col-span-full lg:col-span-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center glow-effect flex-shrink-0">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Network+ Practice Exam</h3>
                <p className="text-muted-foreground mb-4">
                  50 multiple-choice questions • All domains covered • Detailed explanations
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Networking Concepts', 'Infrastructure', 'Network Operations', 'Network Security', 'Troubleshooting'].map((domain) => (
                    <span key={domain} className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground">
                      {domain}
                    </span>
                  ))}
                </div>
                <Button onClick={handleStartExam} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect">
                  <Play className="w-4 h-4 mr-2" />
                  Start Exam
                </Button>
              </div>
            </div>
          </div>

          {/* Exam Info Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Exam Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">No Time Limit</p>
                  <p className="text-xs text-muted-foreground">Practice at your own pace</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Passing Score: 72%</p>
                  <p className="text-xs text-muted-foreground">36 of 50 questions correct</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
