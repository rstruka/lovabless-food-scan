import { useState } from 'react';

export interface ProductData {
  status: number;
  status_verbose: string;
  product?: any;
}

export const useOpenFoodFacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (barcode: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setProductData(null);

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductData = await response.json();
      setProductData(data);

      if (data.status === 0) {
        setError('Product not found in Open Food Facts database');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setProductData(null);
    setError(null);
  };

  return {
    fetchProduct,
    clearData,
    productData,
    isLoading,
    error,
  };
};