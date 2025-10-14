import {useState, useEffect, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
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

  // Optimized navigation handlers
  const handleJoinFarmer = useCallback(() => {
    alert("Farmer registration coming soon!");
  }, []);

  const handleExploreMarketplace = useCallback(() => {
    navigate("/marketplace");
  }, [navigate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-emerald-100/50 dark:from-emerald-950/10 dark:via-green-950/10 dark:to-emerald-900/10" />

      {/* Minimal Animated Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-emerald-200 dark:bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 dark:bg-green-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 dark:bg-blue-500/20 rounded-full blur-lg animate-pulse" />
      </div>

      {/* SINGLE MAIN CONTAINER - No nested cards */}
      <div
        className={`relative z-10 w-full max-w-5xl mx-auto p-6 sm:p-8 md:p-10 lg:p-16 text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header Badge */}
        <div className="mb-4 sm:mb-6">
          <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-700 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full">
            🌱 Agricultural Blockchain Platform
          </Badge>
        </div>

        {/* Main Headline */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="block mb-2">Empowering</span>
          <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 bg-clip-text text-transparent block">
            Farmers
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl block mt-2 text-muted-foreground">
            Through Blockchain
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Connect directly with farmers, ensure product authenticity, and
          participate in a transparent agricultural marketplace powered by
          blockchain technology.
        </p>

        {/* Features Grid - Simplified Cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10 transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-muted/20 border border-border rounded-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call-to-Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 md:mb-10 transition-all duration-700 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
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
            className="w-full sm:w-auto border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/20 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-xl"
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
          className={`pt-4 sm:pt-6 border-t border-emerald-200 dark:border-emerald-700 transition-all duration-700 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex items-center justify-center gap-2">
            <span>🌟</span>
            Building the future of agriculture
            <span>🌟</span>
          </p>

          {/* Statistics Grid - Simplified */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-3 sm:p-4 bg-muted/20 border rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                  currentStat === index
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 shadow-md scale-105"
                    : "border-border hover:border-emerald-300"
                }`}
              >
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                  {stat.icon}
                </div>
                <div
                  className={`text-base sm:text-lg font-bold mb-0.5 sm:mb-1 ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Elements */}
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
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
      </div>
    </section>
  );
};

export default HeroSection;
