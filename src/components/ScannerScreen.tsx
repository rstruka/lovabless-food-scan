import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";

interface ScannerScreenProps {
  onBack: () => void;
  onBarcodeScanned: (barcode: string) => void;
}

export const ScannerScreen = ({ onBack, onBarcodeScanned }: ScannerScreenProps) => {
  const { scanBarcode, isScanning } = useBarcodeScanner();
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setError(null);
    const result = await scanBarcode();
    
    if (result.success) {
      onBarcodeScanned(result.barcode);
    } else {
      setError(result.error || 'Failed to scan barcode');
    }
  };

  useEffect(() => {
    // Auto-start camera on mount
    handleScan();
  }, []);

  return (
    <div className="safe-area min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold">Scan Barcode</h1>
        <div className="w-10" />
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          {/* Camera Viewfinder */}
          <Card className="aspect-square bg-muted/20 border-2 border-dashed border-primary/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-4 border-2 border-primary rounded-xl opacity-60" />
            <div className="text-center space-y-4">
              {isScanning ? (
                <>
                  <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Opening camera...
                  </p>
                </>
              ) : (
                <>
                  <Camera className="w-12 h-12 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Position barcode within the frame
                  </p>
                </>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-4 bg-[var(--gradient-card)] border-0">
            <div className="text-center space-y-2">
              <h3 className="font-medium">Scanning Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Hold device steady</li>
                <li>• Ensure good lighting</li>
                <li>• Keep barcode clearly visible</li>
              </ul>
            </div>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="p-4 bg-destructive/10 border border-destructive/20">
              <p className="text-destructive text-sm text-center">{error}</p>
            </Card>
          )}

          {/* Manual Scan Button */}
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                Try Again
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};