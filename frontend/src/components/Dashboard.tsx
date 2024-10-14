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

    const handleParseComplete = (data: ParsedDataEntry[]) => {
        setParsedData(data);
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
        <div style={{ paddingBottom: '50px', overflow: 'auto' }}>  {/* Add padding and overflow */}
            <h1>Booking Insights</h1>

            <div style={{ marginBottom: '20px' }}>
                <h2>Select the Date Range</h2>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date || undefined)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date || undefined)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                />
            </div>

            <div style={{ width: '1500px', marginLeft: "250px", marginTop: "100px" }}>
                {timeSeriesData.length > 0 && <TimeSeriesChart data={timeSeriesData} />}
            </div>

            <div style={{ width: '1500px', marginLeft: "250px", marginTop: "100px" }}>
                {columnChartData.length > 0 && <ColumnChart data={columnChartData} />}
            </div>

            <div style={{ width: '1500px', marginLeft: "250px", marginTop: "100px" }}>
                <h2 style={{ textAlign: "left" }}>Total Adult Visitors</h2>
                {adultVisitorsData.length > 0 && <SparklineChart data={adultVisitorsData} label="Adult Visitors" />}
            </div>

            <div style={{ width: '1500px', marginLeft: "250px", marginTop: "100px", paddingBottom: '100px' }}> {/* Increased padding-bottom */}
                <h2 style={{ textAlign: "left" }}>Total Children Visitors</h2>
                {childrenVisitorsData.length > 0 && <SparklineChart data={childrenVisitorsData} label="Children Visitors" />}
            </div>

            <Parser onParseComplete={handleParseComplete} />
        </div>
    );
}
