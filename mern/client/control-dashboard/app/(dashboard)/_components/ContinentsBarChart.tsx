import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const countryToContinent: Record<string, string> = {
    // Asia
    "ID": "Asia", "CN": "Asia", "JP": "Asia", "IN": "Asia", "PH": "Asia", "SG": "Asia", "TH": "Asia", "MY": "Asia", "KR": "Asia",
    // America
    "US": "America", "CA": "America", "MX": "America", "BR": "America", "AR": "America", "CO": "America", "PE": "America", "VE": "America",
    // Europe
    "FR": "Europe", "DE": "Europe", "GB": "Europe", "IT": "Europe", "ES": "Europe", "SE": "Europe", "PL": "Europe",
    // Oceania
    "AU": "Oceania", "NZ": "Oceania",
    // Africa
    "ZA": "Africa", "NG": "Africa", "KE": "Africa", "EG": "Africa", "GH": "Africa",
};

interface Location {
    loc: string;
    city: string;
    country: string;
    timestamp: string;
}

interface BarChartProps {
    locations: Location[];
}

const ContinentsBarChart = ({ locations }: BarChartProps) => {
    const continentCounts = useMemo(() => {
        const counts: Record<string, number> = {
            Asia: 0,
            America: 0,
            Europe: 0,
            Oceania: 0,
            Africa: 0,
        };

        locations.forEach((location) => {
            const continent = countryToContinent[location.country];
            if (continent) {
                counts[continent] += 1;
            }
        });

        return counts;
    }, [locations]);

    const totalVisitors = Object.values(continentCounts).reduce((acc, count) => acc + count, 0);

    const continentPercentages = {
        America: (continentCounts.America / totalVisitors) * 100,
        Europe: (continentCounts.Europe / totalVisitors) * 100,
        Africa: (continentCounts.Africa / totalVisitors) * 100,
        Asia: (continentCounts.Asia / totalVisitors) * 100,
        Oceania: (continentCounts.Oceania / totalVisitors) * 100,
    };

    const data = {
        labels: ["America", "Europe", "Africa", "Asia", "Oceania"],
        datasets: [
            {
                data: [
                    continentPercentages.America,
                    continentPercentages.Europe,
                    continentPercentages.Africa,
                    continentPercentages.Asia,
                    continentPercentages.Oceania,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(255, 99, 132, 0.8)",
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.raw.toFixed(2)}% visitors`;
                    },
                },
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 100,
                ticks: {
                    callback: function (value: number) {
                        return value + "%";
                    },
                },
            },
        },
    };

    return (
        <Card className={"w-full"}>
            <CardHeader>
                <CardTitle>By Continent</CardTitle>
            </CardHeader>
            <CardContent className={"w-full"}>
                <div className="flex flex-col gap-4 lg:flex-row w-full h-96">
                    <Bar data={data} options={options} className={"w-full"} />
                </div>
            </CardContent>
        </Card>
    );
};

export default ContinentsBarChart;