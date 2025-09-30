import Marketplace from "../components/sections/Marketplace.jsx";

const MarketplacePage = () => {
  return (
    <div className="relative z-20 pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="backdrop-blur-xl bg-card/70 border-border/50 shadow-2xl mb-6 inline-block rounded-2xl border">
            <div className="p-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 drop-shadow-lg">
                🛒 Marketplace
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                Discover, verify, and purchase authentic agricultural products
                directly from trusted farmers and suppliers.
              </p>
            </div>
          </div>
        </div>
        {/* Marketplace Section with glass effect */}
        <div className="backdrop-blur-xl bg-card/70 border-border/50 shadow-2xl rounded-2xl border p-6">
          <Marketplace />
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
