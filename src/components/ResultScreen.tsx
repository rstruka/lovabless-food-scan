import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Copy, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { ProductData } from "@/hooks/useOpenFoodFacts";
import { useToast } from "@/hooks/use-toast";

interface ResultScreenProps {
  barcode: string;
  productData: ProductData | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
  onScanAgain: () => void;
}

export const ResultScreen = ({ 
  barcode, 
  productData, 
  isLoading, 
  error, 
  onBack, 
  onScanAgain 
}: ResultScreenProps) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "JSON data copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="safe-area min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold">Scan Result</h1>
        <Button variant="ghost" size="icon" onClick={onScanAgain}>
          <RefreshCw className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Barcode Info */}
        <Card className="p-4 bg-[var(--gradient-card)] border-0">
          <div className="space-y-2">
            <h3 className="font-medium">Scanned Barcode</h3>
            <div className="flex items-center justify-between">
              <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                {barcode}
              </code>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(barcode)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="p-6 text-center">
            <div className="space-y-3">
              <div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground">Fetching product data...</p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-4 bg-destructive/10 border border-destructive/20">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-medium text-destructive">Error</h3>
                <p className="text-sm text-destructive/80 mt-1">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Success State */}
        {productData && !isLoading && !error && (
          <Card className="flex-1 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Product Data</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(formatJson(productData))}
                >
                  <Copy className="w-4 h-4" />
                  Copy JSON
                </Button>
              </div>
              {productData.status === 1 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Product found in database
                </p>
              )}
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-x-auto font-mono whitespace-pre-wrap">
                {formatJson(productData)}
              </pre>
            </ScrollArea>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            Back to Home
          </Button>
          <Button variant="result" className="flex-1" onClick={onScanAgain}>
            <RefreshCw className="w-4 h-4" />
            Scan Again
          </Button>
        </div>
      </div>
    </div>
  );
};