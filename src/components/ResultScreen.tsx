import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, RefreshCw, AlertCircle, CheckCircle, Package, Star, Leaf, ShoppingCart } from "lucide-react";
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

  const ProductCard = ({ product }: { product: any }) => {
    if (!product) return null;

    const nutriments = product.nutriments || {};
    const ingredients = product.ingredients_text || "No ingredients listed";
    const categories = product.categories || "No categories listed";
    
    return (
      <div className="space-y-4">
        {/* Product Header */}
        <Card className="p-4">
          <div className="flex items-start space-x-4">
            {product.image_url && (
              <img 
                src={product.image_url} 
                alt={product.product_name || "Product"}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">
                {product.product_name || "Unknown Product"}
              </h2>
              {product.brands && (
                <p className="text-sm text-muted-foreground mb-2">
                  Brand: {product.brands}
                </p>
              )}
              {product.quantity && (
                <Badge variant="secondary">
                  <Package className="w-3 h-3 mr-1" />
                  {product.quantity}
                </Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Nutrition Score */}
        {(product.nutriscore_grade || product.nova_group) && (
          <Card className="p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Nutrition Scores
            </h3>
            <div className="flex space-x-4">
              {product.nutriscore_grade && (
                <div className="text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-1 ${
                    product.nutriscore_grade === 'a' ? 'bg-green-500' :
                    product.nutriscore_grade === 'b' ? 'bg-lime-500' :
                    product.nutriscore_grade === 'c' ? 'bg-yellow-500' :
                    product.nutriscore_grade === 'd' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}>
                    {product.nutriscore_grade.toUpperCase()}
                  </div>
                  <p className="text-xs text-muted-foreground">Nutri-Score</p>
                </div>
              )}
              {product.nova_group && (
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-1">
                    {product.nova_group}
                  </div>
                  <p className="text-xs text-muted-foreground">NOVA Group</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Nutrition Facts */}
        {Object.keys(nutriments).length > 0 && (
          <Card className="p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Nutrition Facts (per 100g)
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {nutriments.energy_kcal_100g && (
                <div className="flex justify-between">
                  <span>Energy:</span>
                  <span className="font-medium">{nutriments.energy_kcal_100g} kcal</span>
                </div>
              )}
              {nutriments.fat_100g && (
                <div className="flex justify-between">
                  <span>Fat:</span>
                  <span className="font-medium">{nutriments.fat_100g} g</span>
                </div>
              )}
              {nutriments.carbohydrates_100g && (
                <div className="flex justify-between">
                  <span>Carbs:</span>
                  <span className="font-medium">{nutriments.carbohydrates_100g} g</span>
                </div>
              )}
              {nutriments.proteins_100g && (
                <div className="flex justify-between">
                  <span>Protein:</span>
                  <span className="font-medium">{nutriments.proteins_100g} g</span>
                </div>
              )}
              {nutriments.salt_100g && (
                <div className="flex justify-between">
                  <span>Salt:</span>
                  <span className="font-medium">{nutriments.salt_100g} g</span>
                </div>
              )}
              {nutriments.sugars_100g && (
                <div className="flex justify-between">
                  <span>Sugars:</span>
                  <span className="font-medium">{nutriments.sugars_100g} g</span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Ingredients */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Ingredients</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {ingredients}
          </p>
        </Card>

        {/* Categories */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Categories</h3>
          <p className="text-sm text-muted-foreground">
            {categories}
          </p>
        </Card>

        {/* Raw JSON Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Raw Data</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => copyToClipboard(formatJson(product))}
            >
              <Copy className="w-4 h-4" />
              Copy JSON
            </Button>
          </div>
          <details className="group">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              View raw JSON data
            </summary>
            <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-x-auto font-mono whitespace-pre-wrap mt-3">
              {formatJson(product)}
            </pre>
          </details>
        </Card>
      </div>
    );
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
        {productData && !isLoading && !error && productData.status === 1 && (
          <ScrollArea className="flex-1">
            <ProductCard product={productData.product} />
          </ScrollArea>
        )}

        {/* Product Not Found */}
        {productData && !isLoading && !error && productData.status === 0 && (
          <Card className="p-4 bg-warning/10 border border-warning/20">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-medium text-warning">Product Not Found</h3>
                <p className="text-sm text-warning/80 mt-1">
                  This product is not in the Open Food Facts database yet.
                </p>
              </div>
            </div>
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