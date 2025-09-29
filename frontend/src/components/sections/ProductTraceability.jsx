import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

const ProductTraceability = ({
  productId = "PRD-2024-001",
  initialData = null,
  onScanComplete = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [touchStart, setTouchStart] = useState({x: 0, y: 0});
  const [animateTimeline, setAnimateTimeline] = useState(false);

  // Mock product data - in real app this would come from blockchain/API
  const [productData, setProductData] = useState({
    id: productId,
    name: "Organic Tomatoes",
    farmer: "Rajesh Kumar",
    location: "Maharashtra, India",
    harvestDate: "2024-09-25",
    qualityScore: 95,
    certifications: ["Organic", "Fair Trade", "Non-GMO"],
    batchSize: "500 kg",
    estimatedShelfLife: "7 days",
    carbonFootprint: "2.1 kg CO₂",
    timeline: [
      {
        id: 1,
        stage: "Seed Planting",
        date: "2024-06-15",
        location: "Farm Field A-12, Nashik",
        status: "completed",
        quality: "excellent",
        details:
          "Organic certified seeds planted in nutrient-rich soil with optimal spacing and depth",
        temperature: "28°C",
        humidity: "65%",
        responsible: "Rajesh Kumar",
        icon: "🌱",
        blockchain_hash: "0x1a2b3c...",
      },
      {
        id: 2,
        stage: "Growth Monitoring",
        date: "2024-07-20",
        location: "Farm Field A-12, Nashik",
        status: "completed",
        quality: "excellent",
        details:
          "Regular monitoring with IoT sensors, organic fertilizers and natural pest control applied",
        temperature: "32°C",
        humidity: "70%",
        responsible: "Rajesh Kumar",
        icon: "🌿",
        blockchain_hash: "0x2b3c4d...",
      },
      {
        id: 3,
        stage: "Harvesting",
        date: "2024-09-25",
        location: "Farm Field A-12, Nashik",
        status: "completed",
        quality: "excellent",
        details:
          "Hand-picked at optimal ripeness with careful handling to maintain quality",
        temperature: "29°C",
        humidity: "60%",
        responsible: "Harvest Team",
        icon: "🍅",
        blockchain_hash: "0x3c4d5e...",
      },
      {
        id: 4,
        stage: "Quality Processing",
        date: "2024-09-26",
        location: "Processing Unit B, Pune",
        status: "completed",
        quality: "excellent",
        details:
          "Cleaned, sorted, and packaged under strict hygienic conditions with quality checks",
        temperature: "18°C",
        humidity: "45%",
        responsible: "Quality Team",
        icon: "📦",
        blockchain_hash: "0x4d5e6f...",
      },
      {
        id: 5,
        stage: "Cold Chain Transport",
        date: "2024-09-27",
        location: "En Route to Mumbai",
        status: "in-progress",
        quality: "good",
        details:
          "Temperature-controlled transportation with real-time monitoring",
        temperature: "4°C",
        humidity: "55%",
        responsible: "LogiCorp Ltd",
        icon: "🚛",
        blockchain_hash: "0x5e6f7g...",
      },
      {
        id: 6,
        stage: "Retail Distribution",
        date: "2024-09-28",
        location: "Pending Delivery",
        status: "pending",
        quality: "pending",
        details: "Awaiting delivery to certified organic retail stores",
        temperature: "N/A",
        humidity: "N/A",
        responsible: "Retail Partner",
        icon: "🏪",
        blockchain_hash: "Pending...",
      },
    ],
  });

  // Simulate QR code scanning with enhanced feedback
  const handleQRScan = async () => {
    setIsLoading(true);

    // Simulate blockchain verification delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockScanResult = {
      success: true,
      productId: productId,
      scanTime: new Date().toISOString(),
      location: "Mumbai, India",
      blockchainVerified: true,
      trustScore: 98.5,
    };

    setScanResults(mockScanResult);
    setIsLoading(false);
    setAnimateTimeline(true);
    onScanComplete(mockScanResult);
  };

  // Handle touch interactions for mobile
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e, stageId) => {
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const distance = Math.sqrt(
      Math.pow(touchEnd.x - touchStart.x, 2) +
        Math.pow(touchEnd.y - touchStart.y, 2)
    );

    // If it's a tap (not a swipe), toggle stage details
    if (distance < 10) {
      setSelectedStage(selectedStage === stageId ? null : stageId);
    }
  };

  // Get quality badge color with theme support
  const getQualityColor = (quality) => {
    switch (quality) {
      case "excellent":
        return "bg-emerald-500 text-white border-emerald-400";
      case "good":
        return "bg-blue-500 text-white border-blue-400";
      case "fair":
        return "bg-yellow-500 text-white border-yellow-400";
      case "poor":
        return "bg-red-500 text-white border-red-400";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  // Get status badge color with theme support
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white border-green-400";
      case "in-progress":
        return "bg-blue-500 text-white border-blue-400";
      case "pending":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  // Get timeline dot color
  const getTimelineDotColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 border-green-400 shadow-green-500/50";
      case "in-progress":
        return "bg-blue-500 border-blue-400 shadow-blue-500/50 animate-pulse";
      case "pending":
        return "bg-muted border-border";
      default:
        return "bg-muted border-border";
    }
  };

  // Get certification colors
  const getCertificationColor = (cert) => {
    const colors = {
      Organic:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-700",
      "Fair Trade":
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-700",
      "Non-GMO":
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-700",
    };
    return colors[cert] || "bg-muted text-muted-foreground border-border";
  };

  useEffect(() => {
    if (initialData) {
      setProductData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (isExpanded && animateTimeline) {
      // Animate timeline items one by one
      const timelineItems = document.querySelectorAll(".timeline-item");
      timelineItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.animation = "slideInLeft 0.5s ease-out forwards";
        }, index * 200);
      });
      setAnimateTimeline(false);
    }
  }, [isExpanded, animateTimeline]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-950/30 rounded-full mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Product Traceability
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your product's complete journey from farm to table with
            blockchain-verified transparency
          </p>
        </div>

        {/* Enhanced QR Scanner Card */}
        <Card className="mb-8 border-2 hover:border-emerald-200 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span>QR Code Scanner</span>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-700">
                🔗 Blockchain Verified
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {!scanResults ? (
              <div className="py-8">
                <div className="w-32 h-32 mx-auto mb-6 border-4 border-dashed border-emerald-300 dark:border-emerald-700 rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/20 transition-all duration-300 hover:scale-105">
                  {isLoading ? (
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl">📡</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-4xl animate-bounce">📷</span>
                  )}
                </div>
                <Button
                  onClick={handleQRScan}
                  disabled={isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Verifying on Blockchain...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>🔍</span>
                      Scan QR Code
                    </span>
                  )}
                </Button>
              </div>
            ) : (
              <div className="py-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-3xl text-green-600">✅</span>
                </div>
                <p className="text-green-600 font-bold text-xl mb-2">
                  Verification Successful!
                </p>
                <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-700 max-w-md mx-auto">
                  <p className="text-sm text-green-700 dark:text-green-300 mb-1">
                    📍 Scanned at: {scanResults.location}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-1">
                    ⏰ Time: {new Date(scanResults.scanTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    🔗 Trust Score: {scanResults.trustScore}%
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Product Overview Card */}
        <Card className="mb-8 border-2 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍅</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {productData.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    ID: {productData.id}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {productData.certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    className={`${getCertificationColor(
                      cert
                    )} border font-medium px-3 py-1 rounded-full text-xs`}
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {productData.qualityScore}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Quality Score
                </div>
                <div className="text-xs text-emerald-600 mt-1">
                  🏆 Excellent
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-700">
                <div className="text-lg font-semibold text-blue-600 mb-1">
                  {productData.farmer}
                </div>
                <div className="text-sm text-muted-foreground">Farmer</div>
                <div className="text-xs text-blue-600 mt-1">👨‍🌾 Verified</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-700">
                <div className="text-lg font-semibold text-purple-600 mb-1">
                  {productData.location}
                </div>
                <div className="text-sm text-muted-foreground">Origin</div>
                <div className="text-xs text-purple-600 mt-1">📍 Traced</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-700">
                <div className="text-lg font-semibold text-orange-600 mb-1">
                  {productData.batchSize}
                </div>
                <div className="text-sm text-muted-foreground">Batch Size</div>
                <div className="text-xs text-orange-600 mt-1">📦 Fresh</div>
              </div>
            </div>

            {/* Additional Product Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">⏱️</span>
                <div>
                  <div className="font-medium text-foreground">Shelf Life</div>
                  <div className="text-sm text-muted-foreground">
                    {productData.estimatedShelfLife}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <div>
                  <div className="font-medium text-foreground">
                    Carbon Footprint
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {productData.carbonFootprint}
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02]"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">🕒</span>
                {isExpanded ? "Hide" : "Show"} Detailed Journey Timeline
                <span
                  className={`transform transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Timeline Card with Animations */}
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Card className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl">🗺️</span>
                <span>Product Journey Timeline</span>
                <Badge className="bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-700">
                  Blockchain Secured
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {productData.timeline.map((stage, index) => (
                  <div
                    key={stage.id}
                    className="timeline-item relative pl-12 pb-6 cursor-pointer group"
                    style={{opacity: 0, transform: "translateX(-20px)"}}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, stage.id)}
                    onClick={() =>
                      setSelectedStage(
                        selectedStage === stage.id ? null : stage.id
                      )
                    }
                  >
                    {/* Enhanced Timeline line */}
                    {index < productData.timeline.length - 1 && (
                      <div className="absolute left-6 top-12 w-1 h-full bg-gradient-to-b from-emerald-500 via-blue-500 to-muted rounded-full"></div>
                    )}

                    {/* Enhanced Timeline dot */}
                    <div
                      className={`absolute left-3 top-3 w-6 h-6 rounded-full border-2 ${getTimelineDotColor(
                        stage.status
                      )} shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-125`}
                    >
                      {stage.status === "completed" && (
                        <span className="text-white text-xs">✓</span>
                      )}
                      {stage.status === "in-progress" && (
                        <span className="text-white text-xs">⏳</span>
                      )}
                    </div>

                    {/* Enhanced Stage content */}
                    <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-border hover:border-emerald-200 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{stage.icon}</span>
                          <h4 className="font-bold text-xl text-card-foreground">
                            {stage.stage}
                          </h4>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            className={`${getStatusColor(
                              stage.status
                            )} border font-medium px-3 py-1 rounded-full`}
                          >
                            {stage.status.replace("-", " ")}
                          </Badge>
                          <Badge
                            className={`${getQualityColor(
                              stage.quality
                            )} border font-medium px-3 py-1 rounded-full`}
                          >
                            {stage.quality}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <span>📅</span>
                          <span>{stage.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>📍</span>
                          <span>{stage.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>👤</span>
                          <span>{stage.responsible}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🔗</span>
                          <span className="font-mono text-xs">
                            {stage.blockchain_hash}
                          </span>
                        </div>
                      </div>

                      <p className="text-card-foreground mb-4 leading-relaxed">
                        {stage.details}
                      </p>

                      {/* Enhanced Expandable details */}
                      <div
                        className={`transition-all duration-500 overflow-hidden ${
                          selectedStage === stage.id
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="border-t border-border pt-4 mt-4">
                          <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <span>📊</span>
                            Environmental Conditions
                          </h5>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                              <div className="flex items-center gap-2 mb-1">
                                <span>🌡️</span>
                                <span className="font-medium text-blue-700 dark:text-blue-300">
                                  Temperature
                                </span>
                              </div>
                              <span className="text-lg font-bold text-blue-600">
                                {stage.temperature}
                              </span>
                            </div>
                            <div className="bg-cyan-50 dark:bg-cyan-950/20 p-3 rounded-lg border border-cyan-200 dark:border-cyan-700">
                              <div className="flex items-center gap-2 mb-1">
                                <span>💧</span>
                                <span className="font-medium text-cyan-700 dark:text-cyan-300">
                                  Humidity
                                </span>
                              </div>
                              <span className="text-lg font-bold text-cyan-600">
                                {stage.humidity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
            <span className="flex items-center gap-2">
              <span>📄</span>
              Download Certificate
            </span>
          </Button>
          <Button
            variant="outline"
            className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span>📱</span>
              Share Traceability
            </span>
          </Button>
          <Button
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/20 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span>⚠️</span>
              Report Issue
            </span>
          </Button>
        </div>

        {/* CSS for timeline animations */}
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
        `}</style>
      </div>
    </section>
  );
};

export default ProductTraceability;
