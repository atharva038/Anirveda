import {useState, useEffect, useRef} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const QRScanner = ({onScanResult, triggerButton}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraPermission, setCameraPermission] = useState("prompt");
  const [manualCode, setManualCode] = useState("");
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [activeCamera, setActiveCamera] = useState("environment");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Check camera permissions on component mount
  useEffect(() => {
    checkCameraPermissions();
    loadScanHistory();

    return () => {
      stopCamera();
    };
  }, []);

  // Check camera permissions
  const checkCameraPermissions = async () => {
    try {
      const permission = await navigator.permissions.query({name: "camera"});
      setCameraPermission(permission.state);

      permission.addEventListener("change", () => {
        setCameraPermission(permission.state);
      });
    } catch (err) {
      console.warn("Camera permission check not supported:", err);
      setCameraPermission("unknown");
    }
  };

  // Load scan history from localStorage
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
    } else if (data.includes("BEGIN:VCARD")) {
      return "Contact";
    } else if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        data
      )
    ) {
      return "Product ID";
    } else {
      return "Text";
    }
  };

  // Start camera stream
  const startCamera = async () => {
    try {
      setError(null);
      setIsScanning(true);

      const constraints = {
        video: {
          facingMode: activeCamera,
          width: {ideal: 640},
          height: {ideal: 480},
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Start scanning after video loads
        videoRef.current.onloadedmetadata = () => {
          scanQRCode();
        };
      }

      setCameraPermission("granted");
    } catch (err) {
      console.error("Camera access error:", err);
      setError(getCameraErrorMessage(err));
      setIsScanning(false);
      setCameraPermission("denied");
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Get user-friendly camera error message
  const getCameraErrorMessage = (error) => {
    switch (error.name) {
      case "NotAllowedError":
        return "Camera access denied. Please allow camera permissions and try again.";
      case "NotFoundError":
        return "No camera found. Please ensure your device has a camera.";
      case "NotReadableError":
        return "Camera is already in use by another application.";
      case "OverconstrainedError":
        return "Camera constraints not supported. Try switching camera mode.";
      case "SecurityError":
        return "Camera access blocked due to security restrictions.";
      default:
        return `Camera error: ${error.message || "Unknown error occurred"}`;
    }
  };

  // QR Code scanning logic using Canvas API
  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || !isScanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data for QR detection
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      try {
        // Simple QR detection simulation (in real app, use jsQR library)
        const result = detectQRFromImageData(imageData);
        if (result) {
          handleScanSuccess(result);
          return;
        }
      } catch (err) {
        console.error("QR detection error:", err);
      }
    }

    // Continue scanning
    if (isScanning) {
      requestAnimationFrame(scanQRCode);
    }
  };

  // Simulate QR detection (replace with actual jsQR implementation)
  const detectQRFromImageData = (imageData) => {
    // This is a mock implementation
    // In a real app, you would use jsQR library:
    // import jsQR from "jsqr";
    // return jsQR(imageData.data, imageData.width, imageData.height);

    // For demo purposes, return null (no QR detected)
    return null;
  };

  // Handle successful QR scan
  const handleScanSuccess = (result) => {
    setScanResult(result);
    saveScanToHistory(result);
    stopCamera();

    if (onScanResult) {
      onScanResult(result);
    }
  };

  // Handle manual code entry
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScanSuccess(manualCode.trim());
      setManualCode("");
      setShowManualEntry(false);
    }
  };

  // Switch camera (front/back)
  const switchCamera = () => {
    const newCamera = activeCamera === "environment" ? "user" : "environment";
    setActiveCamera(newCamera);

    if (isScanning) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  };

  // Open scanner dialog
  const openScanner = () => {
    setIsOpen(true);
    setScanResult(null);
    setError(null);
    setShowManualEntry(false);
  };

  // Close scanner dialog
  const closeScanner = () => {
    setIsOpen(false);
    stopCamera();
    setScanResult(null);
    setError(null);
    setShowManualEntry(false);
  };

  // Clear scan history
  const clearHistory = () => {
    setScanHistory([]);
    localStorage.removeItem("qr-scan-history");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button
            onClick={openScanner}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <span className="mr-2">📱</span>
            Scan QR Code
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>📱</span>
            QR Code Scanner
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Scan Result Display */}
          {scanResult && (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-green-800 dark:text-green-300 flex items-center gap-2">
                  <span>✅</span>
                  Scan Successful
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300">
                    {detectQRType(scanResult)}
                  </Badge>
                  <p className="text-sm font-mono bg-white dark:bg-gray-900 p-2 rounded border break-all">
                    {scanResult}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <CardContent className="pt-6">
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
              </CardContent>
            </Card>
          )}

          {/* Camera Scanner */}
          {!showManualEntry && !scanResult && (
            <div className="space-y-4">
              {/* Camera Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={isScanning ? stopCamera : startCamera}
                  disabled={cameraPermission === "denied"}
                  className={`flex-1 ${
                    isScanning
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  } text-white`}
                >
                  {isScanning ? (
                    <>
                      <span className="mr-2">⏹️</span>
                      Stop Scanning
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📷</span>
                      Start Camera
                    </>
                  )}
                </Button>

                {isScanning && (
                  <Button
                    onClick={switchCamera}
                    variant="outline"
                    size="icon"
                    className="border-emerald-600"
                  >
                    🔄
                  </Button>
                )}
              </div>

              {/* Camera Preview */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />

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

                {/* Loading State */}
                {!isScanning && !error && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <p className="text-sm">
                        Click "Start Camera" to begin scanning
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Manual Entry Toggle */}
              <Button
                onClick={() => setShowManualEntry(true)}
                variant="outline"
                className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                <span className="mr-2">⌨️</span>
                Enter Code Manually
              </Button>
            </div>
          )}

          {/* Manual Code Entry */}
          {showManualEntry && !scanResult && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <Label htmlFor="manual-code">Enter QR Code or Product ID</Label>
                <Input
                  id="manual-code"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Type or paste code here..."
                  className="font-mono"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={!manualCode.trim()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <span className="mr-2">✅</span>
                  Submit Code
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowManualEntry(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Scan History */}
          {scanHistory.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Recent Scans</CardTitle>
                  <Button
                    onClick={clearHistory}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {scanHistory.slice(0, 3).map((scan) => (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded text-xs cursor-pointer hover:bg-muted"
                      onClick={() => handleScanSuccess(scan.result)}
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
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            {scanResult ? (
              <>
                <Button
                  onClick={() => {
                    setScanResult(null);
                    setError(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <span className="mr-2">🔄</span>
                  Scan Again
                </Button>
                <Button
                  onClick={closeScanner}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <span className="mr-2">✅</span>
                  Done
                </Button>
              </>
            ) : (
              <Button
                onClick={closeScanner}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
