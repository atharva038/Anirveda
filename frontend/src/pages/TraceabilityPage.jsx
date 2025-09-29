import {useState} from "react";
import ProductTraceability from "../components/sections/ProductTraceability.jsx";
import TraceabilityScanner from "../components/TraceabilityScanner.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const TraceabilityPage = () => {
  const [activeTab, setActiveTab] = useState("scanner");
  const [scannedProductData, setScannedProductData] = useState(null);

  // Handle scan result from TraceabilityScanner
  const handleScanComplete = (productData) => {
    // Convert scanner result to ProductTraceability format
    const convertedData = {
      id: productData.id,
      name: productData.name || "Organic Product",
      farmer: productData.farmer || "Local Farmer",
      location: productData.farmLocation || "Farm Location",
      harvestDate:
        productData.harvestDate || new Date().toISOString().split("T")[0],
      qualityScore: productData.qualityScore || 90,
      certifications: productData.certifications || [
        "Organic",
        "Quality Assured",
      ],
      batchSize: productData.batchNumber || "Batch-001",
      estimatedShelfLife: "7 days",
      carbonFootprint: "2.1 kg CO₂",
      timeline: productData.supplyChain?.map((stage, index) => ({
        id: index + 1,
        stage: stage.stage,
        date: stage.date,
        location: stage.location,
        status: stage.status,
        quality:
          stage.status === "completed"
            ? "excellent"
            : stage.status === "current"
            ? "good"
            : "pending",
        details: `Stage completed at ${stage.location} on ${stage.date}`,
        temperature: "25°C",
        humidity: "60%",
        responsible: "Team Member",
        icon: getStageIcon(stage.stage),
        blockchain_hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
      })) || [
        {
          id: 1,
          stage: "Farm Harvest",
          date: productData.harvestDate || "2024-09-25",
          location: productData.farmLocation || "Farm Location",
          status: "completed",
          quality: "excellent",
          details: "Product harvested with quality checks",
          temperature: "25°C",
          humidity: "60%",
          responsible: productData.farmer || "Farmer",
          icon: "🌱",
          blockchain_hash: "0x1a2b3c...",
        },
      ],
    };

    setScannedProductData(convertedData);
    setActiveTab("details");
  };

  // Get appropriate icon for supply chain stage
  const getStageIcon = (stage) => {
    const stageIcons = {
      Farm: "🌱",
      Processing: "⚙️",
      Distribution: "🚚",
      Retail: "🏪",
      "Farm Harvest": "🌾",
      "Quality Check": "🔍",
      Packaging: "📦",
      Transport: "🚛",
      Warehouse: "🏭",
    };
    return stageIcons[stage] || "📍";
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            🔍 Product Traceability System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Verify the authenticity and track the complete journey of
            agricultural products from farm to table using blockchain technology
          </p>
        </div>

        {/* Tab Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span>🌾</span>
                Choose Traceability Method
              </CardTitle>
              <div className="flex rounded-lg border border-border overflow-hidden bg-muted/30">
                <Button
                  variant={activeTab === "scanner" ? "default" : "ghost"}
                  onClick={() => setActiveTab("scanner")}
                  className={`rounded-none border-none px-6 py-2 ${
                    activeTab === "scanner"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="mr-2">📱</span>
                  QR Scanner
                </Button>
                <Button
                  variant={activeTab === "demo" ? "default" : "ghost"}
                  onClick={() => setActiveTab("demo")}
                  className={`rounded-none border-none px-6 py-2 ${
                    activeTab === "demo"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="mr-2">🍅</span>
                  Demo Product
                </Button>
                {scannedProductData && (
                  <Button
                    variant={activeTab === "details" ? "default" : "ghost"}
                    onClick={() => setActiveTab("details")}
                    className={`rounded-none border-none px-6 py-2 ${
                      activeTab === "details"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span className="mr-2">📋</span>
                    Scanned Product
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                  QR Code Scanner
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Scan product QR codes for instant verification
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="text-2xl mb-2">🔗</div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                  Blockchain Verified
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  All data secured on blockchain for transparency
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
                  Complete Journey
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Track every step from farm to consumer
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content based on active tab */}
        <div className="space-y-6">
          {/* QR Scanner Tab */}
          {activeTab === "scanner" && (
            <div>
              <TraceabilityScanner onScanComplete={handleScanComplete} />

              {/* How it works section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>ℹ️</span>
                    How QR Traceability Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">📱</span>
                      </div>
                      <h4 className="font-semibold mb-2">1. Scan QR Code</h4>
                      <p className="text-sm text-muted-foreground">
                        Use your device camera to scan the product QR code
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">🔍</span>
                      </div>
                      <h4 className="font-semibold mb-2">2. Verify Identity</h4>
                      <p className="text-sm text-muted-foreground">
                        System verifies product authenticity on blockchain
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">📊</span>
                      </div>
                      <h4 className="font-semibold mb-2">3. View Journey</h4>
                      <p className="text-sm text-muted-foreground">
                        Access complete supply chain information
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">✅</span>
                      </div>
                      <h4 className="font-semibold mb-2">4. Make Decision</h4>
                      <p className="text-sm text-muted-foreground">
                        Make informed purchasing decisions with full
                        transparency
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Demo Product Tab */}
          {activeTab === "demo" && (
            <div>
              <ProductTraceability />
            </div>
          )}

          {/* Scanned Product Details Tab */}
          {activeTab === "details" && scannedProductData && (
            <div>
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <span className="text-xl">✅</span>
                  <span className="font-semibold">
                    Product Successfully Scanned & Verified
                  </span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Showing detailed traceability information for scanned product:{" "}
                  {scannedProductData.id}
                </p>
              </div>

              <ProductTraceability
                productId={scannedProductData.id}
                initialData={scannedProductData}
                onScanComplete={(result) =>
                  console.log("Product scan completed:", result)
                }
              />

              <div className="mt-6 flex gap-4 justify-center">
                <Button
                  onClick={() => setActiveTab("scanner")}
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  <span className="mr-2">📱</span>
                  Scan Another Product
                </Button>
                <Button
                  onClick={() => {
                    setScannedProductData(null);
                    setActiveTab("scanner");
                  }}
                  variant="outline"
                >
                  <span className="mr-2">🔄</span>
                  Reset Scanner
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <span>🏆</span>
              Benefits of Our Traceability System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                  Blockchain Security
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Immutable records ensure data integrity and prevent tampering
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200 dark:border-blue-700">
                <div className="text-3xl mb-3">👨‍🌾</div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Farmer Verification
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Verified farmer profiles with ratings and certifications
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-700">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  Sustainability Tracking
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Monitor environmental impact and sustainable practices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TraceabilityPage;
