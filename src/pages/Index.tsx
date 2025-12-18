import { useEffect, useState } from "react";
import { Network, Database, BookOpen, Trophy, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NetworkNode } from "@/components/NetworkNode";
import { StatusBadge } from "@/components/StatusBadge";
import { FeatureCard } from "@/components/FeatureCard";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Just check if we can reach the auth endpoint
        const { data } = await supabase.auth.getSession();
        setIsConnected(true);
      } catch {
        setIsConnected(false);
      } finally {
        setChecking(false);
      }
    };

    checkConnection();
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Study Materials",
      description: "Comprehensive coverage of all Network+ exam objectives with interactive content."
    },
    {
      icon: Database,
      title: "Progress Tracking",
      description: "Track your learning progress and identify areas that need more attention."
    },
    {
      icon: Trophy,
      title: "Practice Exams",
      description: "Test your knowledge with realistic practice questions and detailed explanations."
    },
    {
      icon: Shield,
      title: "Security Concepts",
      description: "Master network security fundamentals including encryption and access control."
    },
    {
      icon: Zap,
      title: "Quick Quizzes",
      description: "Reinforce your learning with focused quizzes on specific topics."
    },
    {
      icon: Network,
      title: "Network Diagrams",
      description: "Visual learning with interactive network topology diagrams."
    },
  ];

  return (
    <div className="min-h-screen bg-background network-grid relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      {/* Network nodes decoration */}
      <NetworkNode className="top-20 left-[10%]" delay={0} />
      <NetworkNode className="top-40 right-[15%]" delay={0.5} />
      <NetworkNode className="bottom-32 left-[20%]" delay={1} />
      <NetworkNode className="top-1/3 right-[25%]" delay={1.5} />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-effect">
              <Network className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Network+</h1>
              <p className="text-xs text-muted-foreground">Student Demo</p>
            </div>
          </div>
          <StatusBadge connected={isConnected} />
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-8">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground font-mono">
              {checking ? "Checking connection..." : isConnected ? "Database connected" : "Configure Supabase to connect"}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Master </span>
            <span className="gradient-text">Network+</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Your comprehensive study companion for CompTIA Network+ certification. 
            Interactive lessons, practice exams, and progress tracking all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect" onClick={() => window.location.href = '/auth'}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary" onClick={() => window.location.href = '/auth'}>
              Sign In
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* Connection Info */}
        {!isConnected && !checking && (
          <section className="container mx-auto px-4 pb-20">
            <div className="max-w-2xl mx-auto p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Configure Supabase Connection</h3>
              <p className="text-sm text-muted-foreground mb-4">
                To connect to your external Supabase database, add these environment variables:
              </p>
              <div className="bg-background rounded-lg p-4 font-mono text-sm">
                <p className="text-muted-foreground"><span className="text-primary">VITE_SUPABASE_URL</span>=your-project-url</p>
                <p className="text-muted-foreground"><span className="text-primary">VITE_SUPABASE_ANON_KEY</span>=your-anon-key</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Network+ Student Demo Connected • Built with Lovable
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
