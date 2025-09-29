import {useState, useEffect, useRef} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const TraceabilityScanner = ({onScanComplete}) => {
  const [scannedProduct, setScannedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Load scan history from localStorage
  useEffect(() => {
    loadScanHistory();
    return () => {
      stopCamera();
    };
  }, []);

  // Load scan history
  const loadScanHistory = () => {
    try {
      const history = localStorage.getItem("qr-scan-history");
      if (history) {
        setScanHistory(JSON.parse(history));
      }
    } catch (err) {
      console.error("Failed to load scan history:", err);
    }
  };

  // Save scan to history
  const saveScanToHistory = (result) => {
    try {
      const newScan = {
        id: Date.now(),
        result: result,
        timestamp: new Date().toISOString(),
        type: detectQRType(result),
      };

      const updatedHistory = [newScan, ...scanHistory.slice(0, 9)]; // Keep last 10 scans
      setScanHistory(updatedHistory);
      localStorage.setItem("qr-scan-history", JSON.stringify(updatedHistory));
    } catch (err) {
      console.error("Failed to save scan history:", err);
    }
  };

  // Detect QR code type
  const detectQRType = (data) => {
    if (data.startsWith("http://") || data.startsWith("https://")) {
      return "URL";
    } else if (data.includes("@")) {
      return "Email";
    } else if (data.startsWith("tel:")) {
      return "Phone";
    } else if (/^[A-Z0-9]{3,}-[A-Z0-9]{6,}/.test(data)) {
      return "Product ID";
    } else {
      return "Text";
    }
  };

  // Start camera for scanning
  const startCamera = async () => {
    try {
      setError(null);
      setIsScanning(true);

      const constraints = {
        video: {
          facingMode: "environment", // Use back camera
          width: {ideal: 640},
          height: {ideal: 480},
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError(getCameraErrorMessage(err));
      setIsScanning(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Get user-friendly error message
  const getCameraErrorMessage = (error) => {
    switch (error.name) {
      case "NotAllowedError":
        return "Camera access denied. Please allow camera permissions and try again.";
      case "NotFoundError":
        return "No camera found. Please ensure your device has a camera.";
      case "NotReadableError":
        return "Camera is already in use by another application.";
      default:
        return `Camera error: ${error.message || "Unknown error occurred"}`;
    }
  };

  // Handle scan result
  const handleScanResult = async (result) => {
    setLoading(true);
    saveScanToHistory(result);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock product data based on scan result
      const mockProduct = {
        id: result,
        name: "Organic Tomatoes",
        farmer: "Rajesh Kumar",
        farmLocation: "Maharashtra, India",
        harvestDate: "2024-09-25",
        qualityScore: 95,
        certifications: ["Organic Certified", "Fair Trade", "Pesticide Free"],
        batchNumber: `BATCH-${result.slice(-6)}`,
        supplyChain: [
          {
            stage: "Farm Harvest",
            location: "Maharashtra, India",
            date: "2024-09-25",
            status: "completed",
          },
          {
            stage: "Quality Check",
            location: "Processing Unit",
            date: "2024-09-26",
            status: "completed",
          },
          {
            stage: "Packaging",
            location: "Mumbai Center",
            date: "2024-09-27",
            status: "completed",
          },
          {
            stage: "Distribution",
            location: "Regional Hub",
            date: "2024-09-28",
            status: "current",
          },
        ],
      };

      setScannedProduct(mockProduct);

      // Pass result to parent component
      if (onScanComplete) {
        onScanComplete(mockProduct);
      }

      // Close scanner
      setShowScanner(false);
      stopCamera();
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      setError("Failed to fetch product information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle manual code entry
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScanResult(manualCode.trim());
      setManualCode("");
    }
  };

  // Simulate QR scan (for demo purposes)
  const simulateQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const mockProductId =
        "PROD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      handleScanResult(mockProductId);
      setIsScanning(false);
    }, 2000);
  };

  // QR Scanner Modal Component
  const ScannerModal = () => {
    if (!showScanner) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setShowScanner(false);
            stopCamera();
          }}
        />

        {/* Modal */}
        <div className="relative bg-background border border-border rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span>📱</span>
                QR Code Scanner
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowScanner(false);
                  stopCamera();
                }}
                className="h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-700 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">⚠️</span>
                    <div>
                      <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                        Scanner Error
                      </p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Camera Preview */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />

                {/* Scanning Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-emerald-400 border-dashed rounded-lg animate-pulse">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-400"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-400"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-400"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-400"></div>
                    </div>
                  </div>
                )}

                {/* Default State */}
                {!isScanning && !error && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-sm">Camera preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Scanner Controls */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    onClick={isScanning ? stopCamera : startCamera}
                    className={`flex-1 ${
                      isScanning
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    } text-white`}
                  >
                    {isScanning ? (
                      <>
                        <span className="mr-2">⏹️</span>
                        Stop Camera
                      </>
                    ) : (
                      <>
                        <span className="mr-2">📷</span>
                        Start Camera
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={simulateQRScan}
                    disabled={isScanning}
                    variant="outline"
                    className="border-emerald-600 text-emerald-600"
                  >
                    🎯 Demo Scan
                  </Button>
                </div>

                <div className="text-center text-muted-foreground text-sm">
                  or
                </div>

                {/* Manual Entry */}
                <form onSubmit={handleManualSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Enter Product ID Manually
                    </label>
                    <input
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="e.g., PROD-ABC123XYZ"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground font-mono"
                      autoFocus
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={!manualCode.trim()}
                    variant="outline"
                    className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    <span className="mr-2">✅</span>
                    Submit Code
                  </Button>
                </form>
              </div>

              {/* Scan History */}
              {scanHistory.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Recent Scans</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {scanHistory.slice(0, 3).map((scan) => (
                      <div
                        key={scan.id}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded text-xs cursor-pointer hover:bg-muted"
                        onClick={() => handleScanResult(scan.result)}
                      >
                        <div className="flex-1 truncate">
                          <Badge className="text-xs mr-2">{scan.type}</Badge>
                          <span className="font-mono">{scan.result}</span>
                        </div>
                        <span className="text-muted-foreground ml-2">
                          {new Date(scan.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Scanner Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📱</span>
            QR Code Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Scan a QR code or enter a product ID to trace the complete journey
            of your agricultural product
          </p>

          <Button
            onClick={() => setShowScanner(true)}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <span className="mr-2">📱</span>
            Open QR Scanner
          </Button>

          {loading && (
            <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-600 border-t-transparent"></div>
              <span>Loading product information...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Manual Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>⌨️</span>
            Quick Manual Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleManualSubmit} className="flex gap-3">
            <input
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Enter Product ID (e.g., PROD-ABC123)"
              className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground font-mono"
            />
            <Button
              type="submit"
              disabled={!manualCode.trim() || loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <span className="mr-2">🔍</span>
              Trace
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Scanner Modal */}
      <ScannerModal />
    </div>
  );
};

export default TraceabilityScanner;
