import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [touchStart, setTouchStart] = useState({x: 0, y: 0});
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterSticky, setIsFilterSticky] = useState(false);

  // Mock marketplace data with real images
  const mockProducts = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "vegetables",
      price: 45,
      unit: "kg",
      farmer: {
        name: "Rajesh Kumar",
        location: "Maharashtra, India",
        rating: 4.8,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        contact: "+91 98765 43210",
        experience: "15 years",
        verified: true,
      },
      images: [
        "https://organicbazar.net/cdn/shop/products/Untitled-design-2023-02-05T170000.099.jpg?v=1756473500",
        "https://organicbazar.net/cdn/shop/products/Untitled-design-2023-02-05T170000.099.jpg?v=1756473500",
        "https://organicbazar.net/cdn/shop/products/Untitled-design-2023-02-05T170000.099.jpg?v=1756473500",
      ],
      description:
        "Fresh, organically grown tomatoes harvested this morning. Rich in vitamins and perfect for cooking. Grown using traditional farming methods without any chemical pesticides.",
      stock: 150,
      certifications: ["Organic", "Fair Trade"],
      harvestDate: "2024-09-28",
      expiryDate: "2024-10-05",
      qualityScore: 95,
      nutritionalInfo: "Rich in Vitamin C, Lycopene, and Antioxidants",
    },
    {
      id: 2,
      name: "Basmati Rice",
      category: "grains",
      price: 120,
      unit: "kg",
      farmer: {
        name: "Priya Sharma",
        location: "Punjab, India",
        rating: 4.9,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face",
        contact: "+91 87654 32109",
        experience: "20 years",
        verified: true,
      },
      images: [
        "https://images.cnbctv18.com/wp-content/uploads/2021/02/rice_exports.jpg",
        "https://images.cnbctv18.com/wp-content/uploads/2021/02/rice_exports.jpg",
        "https://images.cnbctv18.com/wp-content/uploads/2021/02/rice_exports.jpg",
      ],
      description:
        "Premium quality Basmati rice with authentic aroma and taste. Aged for perfect texture and exceptional cooking quality. Export-grade quality rice.",
      stock: 200,
      certifications: ["Premium Quality", "Export Grade"],
      harvestDate: "2024-08-15",
      expiryDate: "2025-08-15",
      qualityScore: 98,
      nutritionalInfo: "High in Carbohydrates, Low Glycemic Index",
    },
    {
      id: 3,
      name: "Fresh Apples",
      category: "fruits",
      price: 80,
      unit: "kg",
      farmer: {
        name: "Amit Singh",
        location: "Himachal Pradesh, India",
        rating: 4.7,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        contact: "+91 76543 21098",
        experience: "12 years",
        verified: true,
      },
      images: [
        "https://www.shutterstock.com/image-photo/autumn-day-rural-garden-frame-600nw-1798373137.jpg",
        "https://www.shutterstock.com/image-photo/autumn-day-rural-garden-frame-600nw-1798373137.jpg",
        "https://www.shutterstock.com/image-photo/autumn-day-rural-garden-frame-600nw-1798373137.jpg",
      ],
      description:
        "Crispy and sweet apples grown in the hills. Perfect for snacking and cooking. Hand-picked at optimal ripeness for maximum flavor and nutrition.",
      stock: 100,
      certifications: ["Organic", "Mountain Grown"],
      harvestDate: "2024-09-20",
      expiryDate: "2024-11-20",
      qualityScore: 92,
      nutritionalInfo: "Rich in Fiber, Vitamin C, and Natural Sugars",
    },
    {
      id: 4,
      name: "Fresh Milk",
      category: "dairy",
      price: 55,
      unit: "liter",
      farmer: {
        name: "Sunita Devi",
        location: "Gujarat, India",
        rating: 4.6,
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        contact: "+91 65432 10987",
        experience: "18 years",
        verified: true,
      },
      images: ["🥛", "🐄", "🏡", "📦"],
      description:
        "Pure, fresh cow milk from grass-fed cows. Rich in nutrients and completely natural. Daily fresh supply from healthy, well-cared cows.",
      stock: 50,
      certifications: ["A2 Milk", "Grass Fed"],
      harvestDate: "2024-09-29",
      expiryDate: "2024-10-02",
      qualityScore: 96,
      nutritionalInfo: "High in Protein, Calcium, and Vitamin D",
    },
    {
      id: 5,
      name: "Organic Wheat",
      category: "grains",
      price: 35,
      unit: "kg",
      farmer: {
        name: "Ravi Patel",
        location: "Madhya Pradesh, India",
        rating: 4.8,
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        contact: "+91 54321 09876",
        experience: "25 years",
        verified: true,
      },
      images: [
        "https://cdn.mos.cms.futurecdn.net/SG2ntLa6UohdZfZNMyTp27.jpg",
        "https://cdn.mos.cms.futurecdn.net/SG2ntLa6UohdZfZNMyTp27.jpg",
        "https://cdn.mos.cms.futurecdn.net/SG2ntLa6UohdZfZNMyTp27.jpg",
      ],
      description:
        "Premium organic wheat flour perfect for making rotis, bread, and other baked goods. Stone-ground for maximum nutrition retention.",
      stock: 300,
      certifications: ["Organic", "Stone Ground"],
      harvestDate: "2024-04-15",
      expiryDate: "2025-04-15",
      qualityScore: 94,
      nutritionalInfo: "Rich in Fiber, Protein, and B Vitamins",
    },
    {
      id: 6,
      name: "Green Leafy Vegetables",
      category: "vegetables",
      price: 25,
      unit: "bunch",
      farmer: {
        name: "Meera Joshi",
        location: "Karnataka, India",
        rating: 4.5,
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        contact: "+91 43210 98765",
        experience: "10 years",
        verified: true,
      },
      images: [
        "https://static.vecteezy.com/system/resources/thumbnails/042/202/768/small_2x/ai-generated-assorted-fresh-leafy-greens-for-a-plant-based-diet-free-photo.jpeg",
        "https://static.vecteezy.com/system/resources/thumbnails/042/202/768/small_2x/ai-generated-assorted-fresh-leafy-greens-for-a-plant-based-diet-free-photo.jpeg",
        "https://static.vecteezy.com/system/resources/thumbnails/042/202/768/small_2x/ai-generated-assorted-fresh-leafy-greens-for-a-plant-based-diet-free-photo.jpeg",
      ],
      description:
        "Fresh spinach, methi, and other leafy greens grown without chemicals. Rich in iron and vitamins. Hydroponically grown for maximum freshness.",
      stock: 80,
      certifications: ["Pesticide Free", "Hydroponic"],
      harvestDate: "2024-09-29",
      expiryDate: "2024-10-03",
      qualityScore: 90,
      nutritionalInfo: "High in Iron, Folate, and Vitamin K",
    },
  ];

  const categories = [
    {id: "all", name: "All Products", icon: "🌱", color: "emerald"},
    {id: "vegetables", name: "Vegetables", icon: "🥕", color: "green"},
    {id: "fruits", name: "Fruits", icon: "🍎", color: "red"},
    {id: "grains", name: "Grains", icon: "🌾", color: "yellow"},
    {id: "dairy", name: "Dairy", icon: "🥛", color: "blue"},
  ];

  // Scroll handler for sticky filter
  useEffect(() => {
    const handleScroll = () => {
      setIsFilterSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize component
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      // Initialize image indices
      const initialIndices = {};
      mockProducts.forEach((product) => {
        initialIndices[product.id] = 0;
      });
      setCurrentImageIndex(initialIndices);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filter products based on category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle image carousel navigation
  const nextImage = (productId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]:
        (prev[productId] + 1) %
        products.find((p) => p.id === productId).images.length,
    }));
  };

  const prevImage = (productId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [productId]:
        prev[productId] === 0
          ? products.find((p) => p.id === productId).images.length - 1
          : prev[productId] - 1,
    }));
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e, productId) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      productId: productId,
    });
  };

  const handleTouchEnd = (e, productId) => {
    if (!touchStart.productId || touchStart.productId !== productId) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = Math.abs(touchStart.y - touchEnd.y);

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextImage(productId); // Swipe left - next image
      } else {
        prevImage(productId); // Swipe right - previous image
      }
    }
  };

  // Contact farmer handler
  const handleContactFarmer = (farmer) => {
    alert(
      `Contacting ${farmer.name}\nPhone: ${farmer.contact}\nLocation: ${farmer.location}`
    );
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    alert(
      `Added ${product.name} to cart!\nPrice: ₹${product.price}/${product.unit}`
    );
  };

  // Check if image is a URL or emoji
  const isImageUrl = (image) => {
    return image && image.startsWith("http");
  };

  // Get quality badge color
  const getQualityBadgeColor = (score) => {
    if (score >= 95) return "bg-emerald-500";
    if (score >= 90) return "bg-green-500";
    if (score >= 85) return "bg-yellow-500";
    return "bg-orange-500";
  };

  // Get certification badge color
  const getCertificationColor = (cert) => {
    const colors = {
      Organic: "bg-green-100 text-green-800 border-green-200",
      "Fair Trade": "bg-blue-100 text-blue-800 border-blue-200",
      "Premium Quality": "bg-purple-100 text-purple-800 border-purple-200",
      "Export Grade": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Mountain Grown": "bg-gray-100 text-gray-800 border-gray-200",
      "A2 Milk": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Grass Fed": "bg-lime-100 text-lime-800 border-lime-200",
      "Stone Ground": "bg-amber-100 text-amber-800 border-amber-200",
      "Pesticide Free": "bg-emerald-100 text-emerald-800 border-emerald-200",
      Hydroponic: "bg-teal-100 text-teal-800 border-teal-200",
    };
    return colors[cert] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }
    return stars;
  };

  // Enhanced Loading Component
  const LoadingCard = () => (
    <Card className="h-[600px] animate-pulse overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-muted via-muted/50 to-muted shimmer"></div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded shimmer"></div>
          <div className="h-4 bg-muted rounded w-3/4 shimmer"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded-full w-16 shimmer"></div>
          <div className="h-6 bg-muted rounded-full w-20 shimmer"></div>
        </div>
        <div className="h-16 bg-muted rounded shimmer"></div>
        <div className="flex gap-3">
          <div className="h-10 bg-muted rounded flex-1 shimmer"></div>
          <div className="h-10 bg-muted rounded flex-1 shimmer"></div>
        </div>
      </CardContent>
    </Card>
  );

  // Enhanced Empty State Component
  const EmptyState = () => (
    <div className="text-center py-16 px-4">
      <div className="mb-6">
        <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">
        No products found
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        We couldn't find any products matching your search criteria. Try
        adjusting your filters or search terms.
      </p>
      <Button
        onClick={() => {
          setSearchTerm("");
          setSelectedCategory("all");
        }}
        variant="outline"
        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            🌾 Agricultural Marketplace
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect directly with verified farmers and get fresh, quality
            produce at fair prices
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-4 pl-12 border-2 border-border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-background text-foreground placeholder:text-muted-foreground shadow-sm"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xl">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Category Filter */}
        <div
          className={`${
            isFilterSticky
              ? "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-lg border-b border-border py-4"
              : "mb-12"
          } transition-all duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className={`${
                    selectedCategory === category.id
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg scale-105"
                      : "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20"
                  } transition-all duration-200 px-6 py-3 rounded-full font-semibold`}
                >
                  <span className="mr-2 text-lg">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Add spacing when filter is sticky */}
        {isFilterSticky && <div className="h-20"></div>}

        {/* Loading State */}
        {isLoading ? (
          <>
            <style jsx>{`
              .shimmer {
                background: linear-gradient(
                  90deg,
                  transparent,
                  rgba(255, 255, 255, 0.4),
                  transparent
                );
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
              }
              @keyframes shimmer {
                0% {
                  background-position: -200% 0;
                }
                100% {
                  background-position: 200% 0;
                }
              }
            `}</style>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <LoadingCard key={i} />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="h-[600px] overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-emerald-200 group"
                >
                  {/* Image Carousel */}
                  <div className="relative h-48 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-emerald-900/20">
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onTouchStart={(e) => handleTouchStart(e, product.id)}
                      onTouchEnd={(e) => handleTouchEnd(e, product.id)}
                    >
                      {isImageUrl(
                        product.images[currentImageIndex[product.id] || 0]
                      ) ? (
                        <img
                          src={
                            product.images[currentImageIndex[product.id] || 0]
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                      ) : (
                        <span className="text-6xl">
                          {product.images[currentImageIndex[product.id] || 0]}
                        </span>
                      )}
                      {/* Fallback emoji */}
                      <span className="text-6xl hidden">
                        {product.category === "vegetables"
                          ? "🥕"
                          : product.category === "fruits"
                          ? "🍎"
                          : product.category === "grains"
                          ? "🌾"
                          : product.category === "dairy"
                          ? "🥛"
                          : "🌱"}
                      </span>
                    </div>

                    {/* Navigation arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(product.id)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => nextImage(product.id)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          →
                        </button>
                      </>
                    )}

                    {/* Image indicators */}
                    {product.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {product.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === (currentImageIndex[product.id] || 0)
                                ? "bg-emerald-600 w-4"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Enhanced Quality Score Badge */}
                    <Badge
                      className={`absolute top-3 right-3 ${getQualityBadgeColor(
                        product.qualityScore
                      )} text-white px-3 py-1 rounded-full font-semibold shadow-lg`}
                    >
                      <span className="mr-1">🏆</span>
                      {product.qualityScore}%
                    </Badge>

                    {/* Stock Indicator */}
                    <Badge
                      className={`absolute top-3 left-3 ${
                        product.stock < 50 ? "bg-orange-500" : "bg-green-500"
                      } text-white px-3 py-1 rounded-full font-semibold shadow-lg`}
                    >
                      {product.stock < 50 ? "⚠️ Low Stock" : "✅ In Stock"}
                    </Badge>
                  </div>

                  <CardContent className="p-6 flex flex-col h-[352px]">
                    {/* Product Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          📦 {product.stock} {product.unit} available
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-emerald-600">
                          ₹{product.price}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          per {product.unit}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Certifications */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.certifications.slice(0, 2).map((cert, index) => (
                        <Badge
                          key={index}
                          className={`${getCertificationColor(
                            cert
                          )} border text-xs font-medium px-2 py-1 rounded-full`}
                        >
                          {cert}
                        </Badge>
                      ))}
                      {product.certifications.length > 2 && (
                        <Badge className="bg-gray-100 text-gray-600 border border-gray-200 text-xs font-medium px-2 py-1 rounded-full">
                          +{product.certifications.length - 2} more
                        </Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                      {product.description}
                    </p>

                    {/* Enhanced Farmer Info */}
                    <div className="flex items-center mb-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                      <div className="relative mr-3">
                        {isImageUrl(product.farmer.avatar) ? (
                          <img
                            src={product.farmer.avatar}
                            alt={product.farmer.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl border-2 border-emerald-200">
                            {product.farmer.avatar}
                          </div>
                        )}
                        {product.farmer.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-sm truncate">
                          {product.farmer.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <span className="mr-1">📍</span>
                          <span className="truncate">
                            {product.farmer.location}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center mt-1">
                          <div className="flex items-center mr-2">
                            {renderStarRating(product.farmer.rating)}
                            <span className="ml-1">
                              {product.farmer.rating}
                            </span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="ml-1">
                            {product.farmer.experience}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        onClick={() => handleContactFarmer(product.farmer)}
                        variant="outline"
                        className="flex-1 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <span className="mr-2">👋</span>
                        Contact
                      </Button>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <span className="mr-2">🛒</span>
                        Add to Cart
                      </Button>
                    </div>

                    {/* Compact Dates for Mobile */}
                    <div className="mt-3 text-xs text-muted-foreground grid grid-cols-2 gap-2 md:hidden">
                      <div className="truncate">🌱 {product.harvestDate}</div>
                      <div className="truncate">📅 {product.expiryDate}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && <EmptyState />}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                >
                  <span className="mr-2">⬇️</span>
                  Load More Products
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Marketplace;
