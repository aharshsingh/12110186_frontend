import React, { useState } from 'react';
import TimeSeriesChart from './TimeSeries';
import ColumnChart from './ColumnChart';
import SparklineChart from './SparklineChart';
import Parser from './Parser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ParsedDataEntry {
    arrival_date_year: string;
    arrival_date_month: string;
    arrival_date_day_of_month: string;
    country: string;
    adults: string;
    children: string;
    babies: string;
}

export default function Dashboard() {
    const [parsedData, setParsedData] = useState<ParsedDataEntry[] | null>(null);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const handleParseComplete = (data: Record<string, string>[]) => {
        const parsedEntries: ParsedDataEntry[] = data.map((entry) => ({
            arrival_date_year: entry.arrival_date_year,
            arrival_date_month: entry.arrival_date_month,
            arrival_date_day_of_month: entry.arrival_date_day_of_month,
            country: entry.country,
            adults: entry.adults || "0",
            children: entry.children || "0",
            babies: entry.babies || "0",
        }));
        setParsedData(parsedEntries);
    };

    const getChartData = () => {
        if (!parsedData) return [];
        return parsedData
            .filter(entry => {
                const entryDate = new Date(
                    `${entry.arrival_date_year}-${entry.arrival_date_month}-${entry.arrival_date_day_of_month}`
                );
                return (!startDate || entryDate >= startDate) && (!endDate || entryDate <= endDate);
            })
            .map((entry) => ({
                date: `${entry.arrival_date_year}-${entry.arrival_date_month}-${entry.arrival_date_day_of_month}`,
                visitors: parseInt(entry.adults, 10) + parseInt(entry.children, 10) + parseInt(entry.babies, 10),
            }));
    };

    const getColumnChartData = () => {
        if (!parsedData) return [];
        const countryMap = parsedData.reduce<{ [key: string]: number }>((acc, entry) => {
            const entryDate = new Date(
                `${entry.arrival_date_year}-${entry.arrival_date_month}-${entry.arrival_date_day_of_month}`
            );
            if ((!startDate || entryDate >= startDate) && (!endDate || entryDate <= endDate)) {
                const country = entry.country || 'Unknown';
                const totalVisitors = parseInt(entry.adults, 10) + parseInt(entry.children, 10) + parseInt(entry.babies, 10);
                acc[country] = (acc[country] || 0) + totalVisitors;
            }
            return acc;
        }, {});
        return Object.entries(countryMap).map(([country, visitors]) => ({ country, visitors }));
    };

    const getSparklineData = (key: 'adults' | 'children') => {
        if (!parsedData) return [];
        return parsedData
            .filter(entry => {
                const entryDate = new Date(
                    `${entry.arrival_date_year}-${entry.arrival_date_month}-${entry.arrival_date_day_of_month}`
                );
                return (!startDate || entryDate >= startDate) && (!endDate || entryDate <= endDate);
            })
            .map((entry) => parseInt(entry[key], 10));
    };

    const timeSeriesData = getChartData();
    const columnChartData = getColumnChartData();
    const adultVisitorsData = getSparklineData('adults');
    const childrenVisitorsData = getSparklineData('children');

    return (
        <div style={{ padding: '20px', overflow: 'auto', maxWidth: '100%' }}>
            <h1>Booking Insights</h1>

            <div style={{ marginBottom: '20px' }}>
                <h2>Select the Date Range</h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center'  }}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date || undefined)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start Date"
                        style={{ width: '200px' }}
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date || undefined)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="End Date"
                        style={{ width: '200px' }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {timeSeriesData.length > 0 && (
                    <div style={{ width: '100%', maxWidth: '1200px', marginTop: '50px' }}>
                        <TimeSeriesChart data={timeSeriesData} />
                    </div>
                )}
                {columnChartData.length > 0 && (
                    <div style={{ width: '100%', maxWidth: '1200px', marginTop: '50px' }}>
                        <ColumnChart data={columnChartData} />
                    </div>
                )}
                {adultVisitorsData.length > 0 && (
                    <div style={{ width: '100%', maxWidth: '1200px', marginTop: '50px' }}>
                        <h2>Total Adult Visitors</h2>
                        <SparklineChart data={adultVisitorsData} label="Adult Visitors" />
                    </div>
                )}
                {childrenVisitorsData.length > 0 && (
                    <div style={{ width: '100%', maxWidth: '1200px', marginTop: '50px', marginBottom: '50px' }}>
                        <h2>Total Children Visitors</h2>
                        <SparklineChart data={childrenVisitorsData} label="Children Visitors" />
                    </div>
                )}
            </div>

            <Parser onParseComplete={handleParseComplete} />
        </div>
    );
}
