import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import Navbar from "./Navbar";

const Layout = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log("Gemini2 background image loaded successfully!");
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load Gemini2 background image");
      setImageLoaded(false);
    };
    img.src = "/img/Gemini1.png";
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Global Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Main background image - Gemini1.png */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: imageLoaded ? `url('/img/Gemini1.png')` : "none",
            opacity: imageLoaded ? 1 : 0,
          }}
        />

        {/* Fallback gradient while image loads */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-100 via-emerald-50 to-cyan-100 dark:from-blue-950 dark:via-emerald-950 dark:to-cyan-950 transition-opacity duration-1000"
          style={{
            opacity: imageLoaded ? 0 : 1,
          }}
        />

        {/* Pattern overlay for texture */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.1) 2px, transparent 0),
                             radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.1) 2px, transparent 0)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Theme-aware overlay for readability */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/60" />

        {/* Gradient overlay for better content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10 dark:from-black/50 dark:via-black/20 dark:to-black/30" />
      </div>

      {/* Animated floating elements */}
      <div className="fixed inset-0 opacity-30 dark:opacity-15 pointer-events-none z-10">
        <div className="absolute top-20 left-10 w-24 h-24 bg-blue-400/30 dark:bg-blue-400/15 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-400/30 dark:bg-emerald-400/15 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-400/30 dark:bg-cyan-400/15 rounded-full blur-lg animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-green-300/30 dark:bg-green-300/15 rounded-full blur-lg animate-pulse" />

        {/* Floating geometric shapes */}
        <div
          className="absolute top-32 right-20 w-8 h-8 bg-gray-600/20 dark:bg-white/10 rounded-sm animate-float"
          style={{animationDelay: "0s"}}
        />
        <div
          className="absolute bottom-32 left-20 w-6 h-6 bg-gray-600/15 dark:bg-white/8 rounded-full animate-float"
          style={{animationDelay: "1s"}}
        />
        <div
          className="absolute top-2/3 right-1/3 w-4 h-4 bg-gray-600/25 dark:bg-white/12 rounded-full animate-float"
          style={{animationDelay: "2s"}}
        />
      </div>

      {/* Navigation */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="relative z-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
