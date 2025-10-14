import HeroSection from "../components/sections/HeroSection.jsx";

const HomePage = () => {
  return (
    <div className="relative z-20 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-3 sm:px-4 md:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header - ENHANCED GLASS EFFECT */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="bg-background/95 backdrop-blur-md border border-border shadow-xl mb-4 sm:mb-6 inline-block rounded-2xl transition-colors">
            <div className="p-6 sm:p-8 md:p-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 drop-shadow-md">
                🌾 AgroChain Platform
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Revolutionizing agriculture with blockchain technology,
                connecting farmers to markets, and ensuring transparency from
                farm to table.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section with enhanced glass wrapper */}
        {/* Hero Section with Glass Effect */}
        <div className="bg-background/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-border shadow-xl transition-all duration-500">
          <HeroSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
