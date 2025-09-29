import {useState, useEffect, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const navigate = useNavigate();

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoized statistics - only essential data
  const stats = useMemo(
    () => [
      {
        icon: "👨‍🌾",
        value: "Growing",
        label: "Farmer Network",
        color: "text-emerald-600",
      },
      {
        icon: "🔗",
        value: "Secure",
        label: "Blockchain",
        color: "text-green-600",
      },
      {icon: "🌍", value: "Global", label: "Reach", color: "text-blue-600"},
      {
        icon: "⚡",
        value: "Fast",
        label: "Transactions",
        color: "text-purple-600",
      },
    ],
    []
  );

  // Optimized cycling stats animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [stats.length]);

  // Memoized features data
  const features = useMemo(
    () => [
      {
        icon: "💎",
        title: "Transparent Pricing",
        description: "Direct farmer-to-consumer pricing without middlemen",
        color: "emerald",
      },
      {
        icon: "🔗",
        title: "Supply Chain Trust",
        description: "Blockchain-verified product journey tracking",
        color: "green",
      },
      {
        icon: "🌐",
        title: "Global Access",
        description: "Connect with buyers and sellers worldwide",
        color: "blue",
      },
    ],
    []
  );

  // Memoized styling functions
  const getFeatureCardStyle = useCallback((color) => {
    const styles = {
      emerald:
        "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-700",
      green:
        "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-700",
      blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-700",
    };
    return styles[color] || styles.emerald;
  }, []);

  const getFeatureTitleStyle = useCallback((color) => {
    const styles = {
      emerald: "text-emerald-700 dark:text-emerald-300",
      green: "text-green-700 dark:text-green-300",
      blue: "text-blue-700 dark:text-blue-300",
    };
    return styles[color] || styles.emerald;
  }, []);

  // Optimized navigation handlers
  const handleJoinFarmer = useCallback(() => {
    alert("Farmer registration coming soon!");
  }, []);

  const handleExploreMarketplace = useCallback(() => {
    navigate("/marketplace");
  }, [navigate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-emerald-100/50 dark:from-emerald-950/10 dark:via-green-950/10 dark:to-emerald-900/10" />

      {/* Minimal Animated Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-emerald-200 dark:bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 dark:bg-green-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 dark:bg-blue-500/20 rounded-full blur-lg animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <Card
          className={`bg-background/95 backdrop-blur-sm border border-emerald-200 dark:border-emerald-700 shadow-xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CardContent className="p-8 sm:p-12 lg:p-16 text-center">
            {/* Header Badge */}
            <div className="mb-6">
              <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-700 px-4 py-2 text-sm font-semibold rounded-full">
                🌱 Agricultural Blockchain Platform
              </Badge>
            </div>

            {/* Main Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block mb-2">Empowering</span>
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-transparent block">
                Farmers
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl block mt-2 text-muted-foreground">
                Through Blockchain
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Connect directly with farmers, ensure product authenticity, and
              participate in a transparent agricultural marketplace powered by
              blockchain technology.
            </p>

            {/* Features Grid */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 transition-all duration-700 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`${getFeatureCardStyle(
                    feature.color
                  )} border p-6 transition-all duration-300 hover:scale-105 group cursor-pointer`}
                >
                  <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3
                    className={`font-bold text-lg mb-3 ${getFeatureTitleStyle(
                      feature.color
                    )}`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 transition-all duration-700 delay-800 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
                onClick={handleJoinFarmer}
              >
                <span className="flex items-center gap-2">
                  <span>👨‍🌾</span>
                  Join as Farmer
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/20 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-xl"
                onClick={handleExploreMarketplace}
              >
                <span className="flex items-center gap-2">
                  <span>🛒</span>
                  Explore Marketplace
                </span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              className={`pt-6 border-t border-emerald-200 dark:border-emerald-700 transition-all duration-700 delay-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-sm text-muted-foreground mb-6 flex items-center justify-center gap-2">
                <span>🌟</span>
                Building the future of agriculture
                <span>🌟</span>
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className={`p-4 bg-muted/20 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                      currentStat === index
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-md scale-105"
                        : "border-border hover:border-emerald-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-lg font-bold mb-1 ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Trust Elements */}
              <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="text-green-500">✅</span>
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-blue-500">🔒</span>
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-purple-500">⚡</span>
                  <span>Fast</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-emerald-500">🌱</span>
                  <span>Sustainable</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Minimal CSS */}
      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
