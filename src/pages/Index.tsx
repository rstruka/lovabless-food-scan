import { useState, useEffect } from "react";
import { HomeScreen } from "@/components/HomeScreen";
import { ScannerScreen } from "@/components/ScannerScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { SearchScreen } from "@/components/SearchScreen";
import { useOpenFoodFacts } from "@/hooks/useOpenFoodFacts";
import { useToast } from "@/hooks/use-toast";

type Screen = 'home' | 'scanner' | 'result' | 'search';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [scannedBarcode, setScannedBarcode] = useState<string>('');
  
  const { 
    fetchProduct, 
    clearData, 
    productData, 
    isLoading, 
    error 
  } = useOpenFoodFacts();
  
  const { toast } = useToast();

  const handleScanPress = () => {
    setCurrentScreen('scanner');
  };

  const handleSearchPress = () => {
    setCurrentScreen('search');
  };

  const handleBarcodeScanned = async (barcode: string) => {
    setScannedBarcode(barcode);
    setCurrentScreen('result');
    
    // Show success toast
    toast({
      title: "Barcode Scanned!",
      description: `Barcode: ${barcode}`,
    });
    
    // Fetch product data
    await fetchProduct(barcode);
  };

  const handleBack = () => {
    clearData();
    setCurrentScreen('home');
  };

  const handleScanAgain = () => {
    clearData();
    setCurrentScreen('scanner');
  };

  // SEO meta tags
  useEffect(() => {
    document.title = "Food Facts Scanner - Discover Nutrition Information";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Scan product barcodes to discover nutrition facts and ingredients using the Open Food Facts database. Free mobile-friendly barcode scanner.');
    }
  }, []);

  return (
    <main className="min-h-screen">
      {currentScreen === 'home' && (
        <HomeScreen onScanPress={handleScanPress} onSearchPress={handleSearchPress} />
      )}
      
      {currentScreen === 'scanner' && (
        <ScannerScreen 
          onBack={handleBack}
          onBarcodeScanned={handleBarcodeScanned}
        />
      )}
      
      {currentScreen === 'search' && (
        <SearchScreen onBack={handleBack} />
      )}
      
      {currentScreen === 'result' && (
        <ResultScreen
          barcode={scannedBarcode}
          productData={productData}
          isLoading={isLoading}
          error={error}
          onBack={handleBack}
          onScanAgain={handleScanAgain}
        />
      )}
    </main>
  );
};

export default Index;
