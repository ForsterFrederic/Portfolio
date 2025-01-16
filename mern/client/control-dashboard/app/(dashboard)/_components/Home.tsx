"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { differenceInHours, formatDistanceToNow, parseISO, isValid } from "date-fns";
import dynamic from "next/dynamic";
import L from "leaflet";
import {BarChartComponent} from './bar-chart'
import {BarChartBetter} from './bar-chart-better'
import {Button} from '@/app/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/app/components/ui/card'
import Link from 'next/link'
import {ArrowUpRight} from 'lucide-react'

const DynamicMapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const DynamicTileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const DynamicMarker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const DynamicPopup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://frederic-forster.com/api";

interface Location {
    loc: string;
    city: string;
    timestamp: string;
}

interface ApiResponse {
    localisation: Location[];
}

export default function Home() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://frederic-forster.com/api";
    const [counter, setCounter] = useState({ total: 0, count: 0, createdAt: '', lastResetAt: ''});

    const fetchCounter = async () => {
        try {
            const response = await axios.get(`${BACKEND_API_URL}/counter/`);
            setLocations(response.data.localisation || []);
            setCounter(response.data);
        } catch (error) {
            console.error('Error fetching counter:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            fetchCounter();
        }
    }, []);

    const handleReset = async () => {
        try {
            await axios.delete(`${BACKEND_API_URL}/counter/`);
            fetchCounter();
        } catch (error) {
            console.error('Error resetting counter:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error('Invalid date:', dateString);
            return 'Invalid date';
        }

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        const formattedDate = date.toLocaleDateString('fr-FR', options);
        const formattedTime = date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        return `${formattedDate}, ${formattedTime}`;
    };

    const safeParseISO = (dateString: string | undefined): Date | null => {
        if (!dateString) return null;
        const parsedDate = parseISO(dateString);
        return isValid(parsedDate) ? parsedDate : null;
    };

    const categorizeLocations = () => {
        const now = new Date();
        return {
            recent: locations.filter((loc) => {
                const date = safeParseISO(loc.timestamp);
                return date && differenceInHours(now, date) <= 24;
            }),
            week: locations.filter((loc) => {
                const date = safeParseISO(loc.timestamp);
                return date && differenceInHours(now, date) > 24 && differenceInHours(now, date) <= 168;
            }),
            older: locations.filter((loc) => {
                const date = safeParseISO(loc.timestamp);
                return date && differenceInHours(now, date) > 168;
            }),
        };
    };

    const { recent, week, older } = categorizeLocations();

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    const icon = `
<svg fill="#FF0000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 466.583 466.582" xml:space="preserve">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <g>
            <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834 c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64 c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80 s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z"></path>
        </g>
    </g>
</svg>
`;

    const locationIcon = L.divIcon({
        html: icon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        className: '',
    });

    return (
        <div className="flex flex-col items-start px-4 pt-4 gap-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Visitor Locations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 h-[700px] rounded-lg overflow-hidden">
                            <DynamicMapContainer center={[43.8566, 20.3522]} zoom={2} className="h-full w-full">
                                <DynamicTileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {[...recent, ...week, ...older].map((location, index) => (
                                    <DynamicMarker key={index} icon={locationIcon} position={[parseFloat(location.loc.split(",")[0]), parseFloat(location.loc.split(",")[1])]}>
                                        <DynamicPopup>
                                            <strong>{location.city}</strong>
                                            <br />
                                            {formatDistanceToNow(safeParseISO(location.timestamp)!, { addSuffix: true })}
                                        </DynamicPopup>
                                    </DynamicMarker>
                                ))}
                            </DynamicMapContainer>
                        </div>

                        <div className="min-w-96 max-h-[700px] overflow-y-auto">
                            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-4">
                                <CardTitle className="text-md font-medium text-center">
                                    Portfolio Visits Counter
                                    <p className="text-xs text-muted-foreground pt-2">Created at: {formatDate(counter.createdAt)}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className={"text-center"}>
                                <div className="text-2xl font-bold">{counter.total}</div>
                                <p className="text-xs text-muted-foreground">visits in total</p>
                                <div className="text-2xl font-bold pt-6">{counter.count}</div>
                                <p className="text-xs text-muted-foreground pb-1">
                                    visits since last reset
                                </p>
                                <button onClick={handleReset} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                                    Reset
                                </button>
                                <p className="text-xs text-muted-foreground pt-3">
                                    Last reset: {counter.lastResetAt ? formatDate(counter.lastResetAt) : 'Never'}
                                </p>
                            </CardContent>
                            <h2 className="text-lg font-bold">Visitors</h2>
                            {[
                                { title: "Last 24 Hours", data: recent, color: "text-blue-400" },
                                { title: "Last Week", data: week, color: "text-yellow-600" },
                                { title: "Older", data: older, color: "text-gray-600" },
                            ].map(({ title, data, color }, idx) => (
                                <VisitorSection key={idx} title={title} data={data} color={color} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className='w-[20rem]'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Welcome to Control Dashboard
                    </CardTitle>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">100</div>
                    <p className="text-xs text-muted-foreground">
                        Enter your subtitle here
                    </p>
                </CardContent>
            </Card>
            <div className='flex flex-wrap gap-2'>
                <BarChartComponent/>
                <BarChartBetter/>
            </div>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 w-full gap-3'>
                <Card className="">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Latest Projects</CardTitle>
                            <CardDescription>
                                Recent projects generated by Control Dashboard
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="/projects">
                                View All
                                <ArrowUpRight className="h-4 w-4"/>
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div style={{maxHeight: '320px', overflowY: 'auto'}}>
                            <main className="flex flex-col gap-2 lg:gap-2 h-[300px] w-full">
                                <div
                                    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-xl font-bold tracking-tight">
                                            You have no projects
                                        </h1>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Projects will show when you start using Nextjs Starter Kit
                                        </p>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

interface VisitorSectionProps {
    title: string;
    data: Location[];
    color: string;
}

const VisitorSection: React.FC<VisitorSectionProps> = ({ title, data, color }) => (
    <section>
        <h3 className="text-md font-semibold">{title}</h3>
        <ul className="divide-y divide-gray-200">
            {data.map((location, index) => (
                <li key={index} className={`py-2 ${color}`}>
                    <div>{location.city}</div>
                    <div>{formatDistanceToNow(parseISO(location.timestamp), { addSuffix: true })}</div>
                </li>
            ))}
        </ul>
    </section>
);