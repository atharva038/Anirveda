import {useState} from "react";
import QRScanner from "./QRScanner";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const TraceabilityScanner = () => {
  const [scannedProduct, setScannedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle QR scan result
  const handleScanResult = async (result) => {
    setLoading(true);

    try {
      // Simulate API call to get product information
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock product data based on scan result
      const mockProduct = {
        id: result,
        name: "Organic Tomatoes",
        farmer: "Rajesh Kumar",
        farmLocation: "Maharashtra, India",
        harvestDate: "2024-09-25",
        certifications: ["Organic", "Fair Trade"],
        batchNumber: "TOM-2024-0925-001",
        qualityScore: 95,
        supplyChain: [
          {
            stage: "Farm",
            location: "Maharashtra, India",
            date: "2024-09-25",
            status: "completed",
          },
          {
            stage: "Processing",
            location: "Mumbai, India",
            date: "2024-09-26",
            status: "completed",
          },
          {
            stage: "Distribution",
            location: "Delhi, India",
            date: "2024-09-27",
            status: "completed",
          },
          {
            stage: "Retail",
            location: "Local Market",
            date: "2024-09-28",
            status: "current",
          },
        ],
      };

      setScannedProduct(mockProduct);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      alert("Failed to fetch product information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔍</span>
            Product Traceability Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Scan a QR code to trace the journey of agricultural products from
            farm to table
          </p>

          <QRScanner
            onScanResult={handleScanResult}
            triggerButton={
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <span className="mr-2">📱</span>
                Scan Product QR Code
              </Button>
            }
          />

          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-600 border-t-transparent"></div>
              Loading product information...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Information */}
      {scannedProduct && (
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <span>✅</span>
              Product Verified
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg">{scannedProduct.name}</h3>
                <p className="text-muted-foreground">
                  Farmer: {scannedProduct.farmer}
                </p>
                <p className="text-muted-foreground">
                  Location: {scannedProduct.farmLocation}
                </p>
                <p className="text-muted-foreground">
                  Harvest: {scannedProduct.harvestDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Batch: {scannedProduct.batchNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Quality Score: {scannedProduct.qualityScore}%
                </p>
                <div className="flex gap-2 mt-2">
                  {scannedProduct.certifications.map((cert, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Supply Chain */}
            <div>
              <h4 className="font-semibold mb-3">Supply Chain Journey</h4>
              <div className="space-y-3">
                {scannedProduct.supplyChain.map((stage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        stage.status === "completed"
                          ? "bg-green-500"
                          : stage.status === "current"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="font-medium">{stage.stage}</p>
                      <p className="text-sm text-muted-foreground">
                        {stage.location} • {stage.date}
                      </p>
                    </div>
                    <Badge
                      className={
                        stage.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : stage.status === "current"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {stage.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TraceabilityScanner;
