import { useEffect } from 'react';
import Papa from 'papaparse';

const Parser = ({ onParseComplete }) => {

  const fetchAndParseCSV = async () => {
    const response = await fetch('/hotel_bookings_1000.csv');
    const csvText = await response.text();
    Papa.parse(csvText, {
      header: true, 
      skipEmptyLines: true,
      complete: (result) => {
        const cleanData = result.data.map((row) => {
          return Object.fromEntries(
            Object.entries(row).filter(([key, value]) => key && !key.startsWith('_') && value)
          );
        });
        
        onParseComplete(cleanData);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  useEffect(() => {
    fetchAndParseCSV();
  }, []);

  return (
    <>
    </>
  );
};

export default Parser;
