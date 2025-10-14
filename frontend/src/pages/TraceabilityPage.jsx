import {useState} from "react";
import ProductTraceability from "../components/sections/ProductTraceability.jsx";
import TraceabilityScanner from "../components/TraceabilityScanner.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const TraceabilityPage = () => {
  const [activeTab, setActiveTab] = useState("scanner");
  const [scannedProductData, setScannedProductData] = useState(null);

  const handleScanComplete = (productData) => {
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
    <div className="relative z-20 pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Card className="bg-background/95 backdrop-blur-md border border-border shadow-xl mb-6 inline-block transition-colors">
            <CardContent className="p-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-md">
                🔍 Product Traceability System
              </h1>
              <p className="text-xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Verify the authenticity and track the complete journey of
                agricultural products from farm to table using blockchain
                technology
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-10 bg-background/95 backdrop-blur-md border border-border shadow-xl transition-colors">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white drop-shadow-md text-2xl">
                <span>🌾</span>
                Choose Traceability Method
              </CardTitle>
              <div className="flex rounded-xl border border-border/60 overflow-hidden bg-muted/50 backdrop-blur-lg shadow-lg">
                <Button
                  variant={activeTab === "scanner" ? "default" : "ghost"}
                  onClick={() => setActiveTab("scanner")}
                  className={`rounded-none border-none px-8 py-3 transition-all duration-300 ${
                    activeTab === "scanner"
                      ? "bg-primary text-primary-foreground shadow-lg backdrop-blur-md"
                      : "hover:bg-muted/70 text-foreground backdrop-blur-sm"
                  }`}
                >
                  <span className="mr-3 text-lg">📱</span>
                  QR Scanner
                </Button>
                <Button
                  variant={activeTab === "demo" ? "default" : "ghost"}
                  onClick={() => setActiveTab("demo")}
                  className={`rounded-none border-none px-8 py-3 transition-all duration-300 ${
                    activeTab === "demo"
                      ? "bg-primary text-primary-foreground shadow-lg backdrop-blur-md"
                      : "hover:bg-muted/70 text-foreground backdrop-blur-sm"
                  }`}
                >
                  <span className="mr-3 text-lg">🍅</span>
                  Demo Product
                </Button>
                {scannedProductData && (
                  <Button
                    variant={activeTab === "details" ? "default" : "ghost"}
                    onClick={() => setActiveTab("details")}
                    className={`rounded-none border-none px-8 py-3 transition-all duration-300 ${
                      activeTab === "details"
                        ? "bg-primary text-primary-foreground shadow-lg backdrop-blur-md"
                        : "hover:bg-muted/70 text-foreground backdrop-blur-sm"
                    }`}
                  >
                    <span className="mr-3 text-lg">📋</span>
                    Scanned Product
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-primary/15 backdrop-blur-lg rounded-xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="font-bold text-primary mb-2 text-lg">
                  QR Code Scanner
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Scan product QR codes for instant verification
                </p>
              </div>
              <div className="p-6 bg-secondary/20 backdrop-blur-lg rounded-xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="font-bold text-foreground mb-2 text-lg">
                  Blockchain Verified
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All data secured on blockchain for transparency
                </p>
              </div>
              <div className="p-6 bg-accent/20 backdrop-blur-lg rounded-xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-bold text-foreground mb-2 text-lg">
                  Complete Journey
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Track every step from farm to consumer
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {activeTab === "scanner" && (
            <div className="space-y-8">
              <div className="bg-background/95 backdrop-blur-md border border-border shadow-xl rounded-xl p-8 transition-colors">
                <TraceabilityScanner onScanComplete={handleScanComplete} />
              </div>
              <Card className="bg-background/95 backdrop-blur-md border border-border shadow-xl transition-colors">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white text-2xl">
                    <span className="text-2xl">ℹ️</span>
                    How QR Traceability Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        icon: "📱",
                        title: "1. Scan QR Code",
                        desc: "Use your device camera to scan the product QR code",
                      },
                      {
                        icon: "🔍",
                        title: "2. Verify Identity",
                        desc: "System verifies product authenticity on blockchain",
                      },
                      {
                        icon: "📊",
                        title: "3. View Journey",
                        desc: "Access complete supply chain information",
                      },
                      {
                        icon: "✅",
                        title: "4. Make Decision",
                        desc: "Make informed purchasing decisions with full transparency",
                      },
                    ].map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-primary/15 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border border-border/30 hover:scale-110 transition-transform duration-300">
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                        <h4 className="font-bold mb-3 text-foreground text-lg">
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "demo" && (
            <div className="bg-background/95 backdrop-blur-md border border-border shadow-xl rounded-xl p-6 transition-colors">
              <ProductTraceability />
            </div>
          )}

          {activeTab === "details" && scannedProductData && (
            <div className="space-y-8">
              <div className="p-6 bg-primary/15 backdrop-blur-lg rounded-xl border border-border/40 shadow-xl">
                <div className="flex items-center gap-3 text-primary">
                  <span className="text-2xl">✅</span>
                  <span className="font-bold text-lg">
                    Product Successfully Scanned & Verified
                  </span>
                </div>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  Showing detailed traceability information for scanned product:{" "}
                  <span className="font-semibold text-primary">
                    {scannedProductData.id}
                  </span>
                </p>
              </div>
              <div className="bg-background/95 backdrop-blur-md border border-border shadow-xl rounded-xl p-6 transition-colors">
                <ProductTraceability
                  productId={scannedProductData.id}
                  initialData={scannedProductData}
                  onScanComplete={(result) =>
                    console.log("Product scan completed:", result)
                  }
                />
              </div>
              <div className="flex gap-6 justify-center">
                <Button
                  onClick={() => setActiveTab("scanner")}
                  variant="outline"
                  className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-md bg-card/30 border-border/60 shadow-lg"
                >
                  <span className="mr-3 text-xl">📱</span>
                  Scan Another Product
                </Button>
                <Button
                  onClick={() => {
                    setScannedProductData(null);
                    setActiveTab("scanner");
                  }}
                  variant="secondary"
                  className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-md bg-secondary/30 shadow-lg"
                >
                  <span className="mr-3 text-xl">🔄</span>
                  Reset Scanner
                </Button>
              </div>
            </div>
          )}
        </div>

        <Card className="mt-16 bg-background/95 backdrop-blur-md border border-border shadow-xl transition-colors">
          <CardHeader className="pb-6">
            <CardTitle className="text-center flex items-center justify-center gap-3 text-gray-900 dark:text-white text-2xl">
              <span className="text-2xl">🏆</span>
              Benefits of Our Traceability System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔒",
                  title: "Blockchain Security",
                  desc: "Immutable records ensure data integrity and prevent tampering",
                },
                {
                  icon: "��‍🌾",
                  title: "Farmer Verification",
                  desc: "Verified farmer profiles with ratings and certifications",
                },
                {
                  icon: "🌱",
                  title: "Sustainability Tracking",
                  desc: "Monitor environmental impact and sustainable practices",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-gradient-to-br from-primary/15 to-primary/5 backdrop-blur-lg rounded-2xl border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="font-bold text-foreground mb-3 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TraceabilityPage;
