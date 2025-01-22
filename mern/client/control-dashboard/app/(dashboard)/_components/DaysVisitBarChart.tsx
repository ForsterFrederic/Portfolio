import * as React from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Location } from './types';

interface BarChartProps {
    locations: Location[]
}

export function DaysVisitBarChart({ locations }: BarChartProps) {
    const [activeChart, setActiveChart] = React.useState<"desktop" | "mobile">(
        "desktop"
    )

    const chartConfig = {
        desktop: { label: "Desktop Visitors" },
        mobile: { label: "Mobile Visitors" },
    }

    const chartData = React.useMemo(() => {
        if (!locations || locations.length === 0) {
            return []
        }

        const data = locations.reduce((acc, entry) => {
            if (entry.device !== "desktop" && entry.device !== "mobile") {
                return acc;
            }

            const date = new Date(entry.timestamp).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })

            if (!acc[date]) {
                acc[date] = { date, desktop: 0, mobile: 0 }
            }

            if (entry.device === "desktop") {
                acc[date].desktop += 1
            } else if (entry.device === "mobile") {
                acc[date].mobile += 1
            }

            return acc
        }, {} as Record<string, { date: string; desktop: number; mobile: number }>)

        return Object.values(data).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
    }, [locations])

    const filteredData = React.useMemo(
        () => chartData.filter((entry) => entry[activeChart] > 0),
        [chartData, activeChart]
    )

    const total = {
        desktop: chartData.reduce((sum, entry) => sum + entry.desktop, 0),
        mobile: chartData.reduce((sum, entry) => sum + entry.mobile, 0),
    }

    if (filteredData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No data available</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No visits to display for the selected device type.</p>
                </CardContent>
            </Card>
        )
    }

    const CustomTooltip = (props: any) => {
        const { active, payload, label } = props;
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', color: "black" }}>
                    <p style={{ fontWeight: 'bold' }}>{label}</p>
                    <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>By Day and Device</CardTitle>
                <CardDescription>
                    Number of visitors categorized by device type
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row w-full">
                    {["desktop", "mobile"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex-1 flex flex-col justify-center gap-1 px-4 py-3 sm:px-6 sm:py-4 border-t sm:border-l data-[active=true]:bg-muted/50"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold sm:text-2xl">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>

                <div className="mt-4 w-full h-[200px] sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={filteredData}
                            margin={{
                                top: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <YAxis width={30} allowDecimals={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey={activeChart}
                                fill={activeChart === "desktop" ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}
                                name={chartConfig[activeChart].label}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}