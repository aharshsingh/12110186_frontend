import { useEffect } from 'react';
import Papa from 'papaparse';

interface ParserProps {
  onParseComplete: (data: Record<string, string>[]) => void;
}

const Parser: React.FC<ParserProps> = ({ onParseComplete }) => {
  useEffect(() => {
    const fetchAndParseCSV = async () => {
      try {
        const response = await fetch('/hotel_bookings_1000.csv');
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result: Papa.ParseResult<Record<string, string>>) => {
            const cleanData = result.data.map((row) =>
              Object.fromEntries(
                Object.entries(row).filter(([key, value]) => key && !key.startsWith('_') && value)
              )
            );
            onParseComplete(cleanData);
          },
        });
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchAndParseCSV();
  }, [onParseComplete]);

  return null;
};

export default Parser;
