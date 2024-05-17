// cryptoUtils.ts

export const fetchCryptoPrice = async (cryptoSymbol: string): Promise<number | null> => {
    try {
      const apiKey = 'df830fa5-eab5-4302-87cc-544ecc1bd0e3';
      const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=USD&symbol=${cryptoSymbol}&limit=1&CMC_PRO_API_KEY=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      // Extract price from the response
      const price = data.data[0].quote.USD.price;
      return price;
    } catch (error) {
      console.error('Error fetching crypto price:', error);
      return null;
    }
  };
  
  export const calculateTotalAmountInCrypto = async (invoiceAmount: number, fees: number, cryptoSymbol: string): Promise<number | null> => {
    try {
      const cryptoPrice = await fetchCryptoPrice(cryptoSymbol);
      if (!cryptoPrice) return null;
  
      // Calculate total amount including fees in crypto
      const totalAmountInCrypto = (invoiceAmount + fees) / cryptoPrice;
      return totalAmountInCrypto;
    } catch (error) {
      console.error('Error calculating total amount in crypto:', error);
      return null;
    }
  };
  