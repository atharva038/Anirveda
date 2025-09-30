import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {ThemeToggle} from "./ThemeToggle";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormsDropdownOpen, setIsFormsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    {path: "/", name: "Home", icon: "🏠"},
    {path: "/traceability", name: "Traceability", icon: "🔍"},
    {path: "/marketplace", name: "Marketplace", icon: "🛒"},
    {path: "/dashboard", name: "Dashboard", icon: "📊"},
    {path: "/forms", name: "Forms", icon: "📝"},
  ];

  const handleFormsNavigation = (path) => {
    navigate(path);
    setIsFormsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsFormsDropdownOpen(false);
            }}
          >
            <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
              🌱
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              AgroChain
            </span>
            <div className="hidden sm:block">
              <span className="text-xs text-muted-foreground ml-1 font-medium">
                Beta
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className={`transition-all duration-200 font-medium ${
                    isActive(link.path)
                      ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700 scale-105"
                      : "text-foreground hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:scale-105"
                  }`}
                  onClick={() => setIsFormsDropdownOpen(false)}
                >
                  <span className="mr-2 text-sm">{link.icon}</span>
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Enhanced Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {/* Login Button */}
            <Button
              variant="outline"
              size="sm"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/20 font-medium transition-all duration-200 hover:scale-105"
              onClick={() => alert("Login feature coming soon!")}
            >
              <span className="mr-1">🔐</span>
              Login
            </Button>

            {/* Join as Farmer Button */}
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              onClick={() => handleFormsNavigation("/forms/farmer")}
            >
              <span className="mr-1">👨‍🌾</span>
              Join as Farmer
            </Button>
          </div>

          {/* Enhanced Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsFormsDropdownOpen(false);
              }}
              className="text-foreground hover:bg-muted p-2 transition-all duration-200"
            >
              <div className="space-y-1">
                <div
                  className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></div>
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden border-t border-border`}
        >
          <div className="py-4 space-y-2 bg-background/50 backdrop-blur-sm">
            {/* Mobile Navigation Links */}
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "text-foreground hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen
                      ? "slideInLeft 0.3s ease-out forwards"
                      : "none",
                  }}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </Button>
              </Link>
            ))}

            {/* Enhanced Mobile Action Buttons */}
            <div className="pt-4 border-t border-border space-y-3">
              <Button
                variant="outline"
                className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/20 font-medium transition-all duration-200"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  alert("Login feature coming soon!");
                }}
              >
                <span className="mr-2">🔐</span>
                Login to Account
              </Button>

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={() => handleFormsNavigation("/forms/farmer")}
              >
                <span className="mr-2">👨‍🌾</span>
                Join as Farmer
              </Button>

              {/* Mobile-only Quick Stats */}
              <div className="pt-3 border-t border-border">
                <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">✅</span>
                    Secure
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-1">🔒</span>
                    Verified
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-500 mr-1">🌱</span>
                    Sustainable
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hover\\:shadow-lg:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
