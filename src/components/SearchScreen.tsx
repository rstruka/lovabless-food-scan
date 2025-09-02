import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, MapPin, Star } from "lucide-react";

interface SearchScreenProps {
  onBack: () => void;
}

// Dummy data for prototype
const DUMMY_INGREDIENTS = [
  "Almonds", "Oats", "Honey", "Vanilla", "Chocolate", "Coconut", 
  "Milk", "Sugar", "Salt", "Cocoa", "Hazelnuts", "Rice"
];

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Organic Almond Granola",
    brand: "Nature's Best",
    ingredients: ["Almonds", "Oats", "Honey"],
    rating: 4.5,
    image: "🥣",
    stores: [
      { name: "Whole Foods", distance: "0.5 miles", price: "$8.99" },
      { name: "Target", distance: "1.2 miles", price: "$7.49" },
    ]
  },
  {
    id: 2,
    name: "Honey Almond Cereal",
    brand: "Healthy Choice", 
    ingredients: ["Almonds", "Oats", "Honey", "Rice"],
    rating: 4.2,
    image: "🥛",
    stores: [
      { name: "Kroger", distance: "0.8 miles", price: "$5.99" },
      { name: "Walmart", distance: "2.1 miles", price: "$5.29" },
    ]
  },
  {
    id: 3,
    name: "Vanilla Almond Milk",
    brand: "Pure Harvest",
    ingredients: ["Almonds", "Vanilla", "Salt"],
    rating: 4.7,
    image: "🥤",
    stores: [
      { name: "Whole Foods", distance: "0.5 miles", price: "$4.99" },
      { name: "Safeway", distance: "1.5 miles", price: "$4.49" },
    ]
  }
];

export const SearchScreen = ({ onBack }: SearchScreenProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filteredIngredients = DUMMY_INGREDIENTS.filter(ingredient =>
    ingredient.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedIngredients.includes(ingredient)
  );

  const addIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => [...prev, ingredient]);
    setSearchQuery("");
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  const matchingProducts = DUMMY_PRODUCTS.filter(product =>
    selectedIngredients.some(ingredient => 
      product.ingredients.includes(ingredient)
    )
  );

  return (
    <div className="safe-area min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-3 text-xl font-semibold">Search Products</h1>
      </div>

      <div className="p-4 space-y-6">
        {!showResults ? (
          <>
            {/* Ingredient Search */}
            <Card className="p-4">
              <h2 className="font-semibold mb-3">Select Ingredients</h2>
              <div className="space-y-3">
                <Input
                  placeholder="Search ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                {/* Available Ingredients */}
                {searchQuery && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Available ingredients:</p>
                    <div className="flex flex-wrap gap-2">
                      {filteredIngredients.slice(0, 6).map(ingredient => (
                        <Badge
                          key={ingredient}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => addIngredient(ingredient)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Selected Ingredients</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedIngredients.map(ingredient => (
                    <Badge
                      key={ingredient}
                      variant="default"
                      className="cursor-pointer"
                      onClick={() => removeIngredient(ingredient)}
                    >
                      {ingredient} ×
                    </Badge>
                  ))}
                </div>
                <Button 
                  onClick={handleSearch}
                  className="w-full"
                  disabled={selectedIngredients.length === 0}
                >
                  Find Products ({selectedIngredients.length} ingredients)
                </Button>
              </Card>
            )}
          </>
        ) : (
          <>
            {/* Search Results */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Found {matchingProducts.length} products
              </h2>
              <Button variant="outline" size="sm" onClick={() => setShowResults(false)}>
                New Search
              </Button>
            </div>

            {/* Products List */}
            <div className="space-y-4">
              {matchingProducts.map(product => (
                <Card key={product.id} className="p-4">
                  <div className="space-y-3">
                    {/* Product Header */}
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{product.image}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Matching Ingredients */}
                    <div>
                      <p className="text-sm font-medium mb-2">Matching ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.ingredients
                          .filter(ing => selectedIngredients.includes(ing))
                          .map(ingredient => (
                            <Badge key={ingredient} variant="secondary" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    {/* Store Locations */}
                    <div>
                      <p className="text-sm font-medium mb-2">Available at:</p>
                      <div className="space-y-2">
                        {product.stores.map((store, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{store.name}</p>
                                <p className="text-xs text-muted-foreground">{store.distance}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">{store.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};