import Marketplace from "../components/sections/Marketplace.jsx";

const MarketplacePage = () => {
  return (
    <div className="relative z-20 pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-zinc-900/50 border-border/50 dark:border-zinc-700/60 shadow-2xl mb-6 inline-block rounded-2xl border transition-colors">
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
        <div className="backdrop-blur-xl bg-white/55 dark:bg-zinc-900/55 supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-zinc-900/40 border-border/50 dark:border-zinc-700/60 shadow-2xl rounded-2xl border p-6 transition-colors">
          <Marketplace />
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
