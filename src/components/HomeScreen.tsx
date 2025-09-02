import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Scan, Search } from "lucide-react";

interface HomeScreenProps {
  onScanPress: () => void;
  onSearchPress: () => void;
}
export const HomeScreen = ({
  onScanPress,
  onSearchPress
}: HomeScreenProps) => {
  return <div className="safe-area min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* App Title */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-[var(--shadow-soft)]">
            <Scan className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">RR Food Scanner</h1>
            <h2 className="text-3xl font-bold text-foreground">Scanner</h2>
            <p className="text-muted-foreground mt-2">
              Discover nutrition facts by scanning product barcodes
            </p>
          </div>
        </div>

        {/* Scan and Search Features */}
        <Card className="p-6 bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-elevated)]">
          <div className="flex items-stretch gap-6">
            {/* Scan Button */}
            <div className="flex-1 space-y-4">
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto text-primary mb-2" />
                <h3 className="font-semibold text-lg">Ready to scan</h3>
                <p className="text-sm text-muted-foreground">
                  Point your camera at any product barcode
                </p>
              </div>
              
              <Button variant="scanner" size="xl" className="w-full" onClick={onScanPress}>
                <Scan className="w-5 h-5" />
                Scan Barcode
              </Button>
            </div>

            {/* Vertical Separator */}
            <div className="w-px bg-border"></div>

            {/* Search Products Button */}
            <div className="flex-1 space-y-4">
              <div className="text-center">
                <Search className="w-8 h-8 mx-auto text-primary mb-2" />
                <h3 className="font-semibold text-lg">Search Products</h3>
                <p className="text-sm text-muted-foreground">
                  Find products by ingredients and see where to buy them
                </p>
              </div>
              
              <Button variant="secondary" size="xl" className="w-full" onClick={onSearchPress}>
                <Search className="w-5 h-5" />
                Search Products
              </Button>
            </div>
          </div>
        </Card>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Powered by Open Food Facts</p>
          <p className="mt-1">Free and open database of food products</p>
        </div>
      </div>
    </div>;
};