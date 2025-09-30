import HeroSection from "../components/sections/HeroSection.jsx";

const HomePage = () => {
  return (
    <div className="relative z-20 pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header - ENHANCED GLASS EFFECT */}
        <div className="text-center mb-12">
          <div className="backdrop-blur-xl bg-card/70 border-border/50 shadow-2xl mb-6 inline-block rounded-2xl border">
            <div className="p-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 drop-shadow-lg">
                🌾 AgroChain Platform
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Revolutionizing agriculture with blockchain technology,
                connecting farmers to markets, and ensuring transparency from
                farm to table.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section with enhanced glass wrapper */}
        <div className="backdrop-blur-xl bg-card/70 border-border/50 shadow-2xl rounded-2xl p-6 border">
          <HeroSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
