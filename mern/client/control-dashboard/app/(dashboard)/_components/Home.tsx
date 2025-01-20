"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { differenceInHours, formatDistanceToNow, parseISO, isValid } from "date-fns";
import dynamic from "next/dynamic";
import L from "leaflet";
import {Button} from '@/app/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/app/components/ui/card'
import Link from 'next/link'
import {ArrowUpRight} from 'lucide-react'
import ContinentBarChart from "@/app/(dashboard)/_components/ContinentsBarChart";
import ContinentsBarChart from "@/app/(dashboard)/_components/ContinentsBarChart";
import {DaysVisitBarChart} from "@/app/(dashboard)/_components/DaysVisitBarChart";

const DynamicMapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const DynamicTileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const DynamicMarker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const DynamicPopup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://frederic-forster.com/api";

interface Location {
    loc: string;
    city: string;
    country: string;
    region: string;
    timestamp: string;
}

interface ApiResponse {
    localisation: Location[];
}

export default function Home() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001/api";
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

    // const categorizedLocations = useMemo(() => categorizeLocations(), [locations]);

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
        <div className="flex flex-col items-start gap-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Visitors</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-lg overflow-hidden">
                            <DynamicMapContainer
                                center={[43.8566, 20.3522]}
                                zoom={2}
                                className="h-full w-full relative z-0"
                            >
                                <DynamicTileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {[...recent, ...week, ...older].map((location, index) => (
                                    <DynamicMarker
                                        key={index}
                                        icon={locationIcon}
                                        position={[
                                            parseFloat(location.loc.split(",")[0]),
                                            parseFloat(location.loc.split(",")[1])
                                        ]}
                                    >
                                        <DynamicPopup>
                                            <strong>{location.city}</strong>
                                            <br />
                                            {formatDistanceToNow(safeParseISO(location.timestamp)!, { addSuffix: true })}
                                        </DynamicPopup>
                                    </DynamicMarker>
                                ))}
                            </DynamicMapContainer>
                        </div>

                        <div className="w-full max-w-full lg:w-[350px] max-h-[700px] overflow-y-auto">
                            <div className="flex flex-col pb-3">
                                <div className="text-md font-medium">
                                    <h2 className="text-xl font-bold">Counter</h2>
                                    <p className="text-xs text-muted-foreground mt-auto">
                                        Created at: {formatDate(counter.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className={"flex flex-wrap gap-1 items-center"}>
                                    <div className="text-xl sm:text-2xl font-bold">{counter.total}</div>
                                    <p className="text-sm text-muted-foreground">visits in total</p>
                                </div>
                                <div className={"flex flex-wrap gap-1 items-center pt-1 pb-3"}>
                                    <div className="text-xl sm:text-2xl font-bold">{counter.count}</div>
                                    <p className="text-sm text-muted-foreground">
                                        visits since last reset
                                    </p>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="mt-2 px-3 sm:px-4 py-2 w-3/4 text-white text-sm sm:text-base bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    Reset
                                </button>
                                <p className="text-xs text-muted-foreground pt-2">
                                    Last reset: {counter.lastResetAt ? formatDate(counter.lastResetAt) : 'Never'}
                                </p>
                            </div>
                            <h2 className="text-xl font-bold mt-8 mb-2">Locations</h2>
                            {[
                                { title: "Last 24 Hours", data: recent, color: "text-blue-400" },
                                { title: "Last Week", data: week, color: "text-yellow-600" },
                                { title: "Older", data: older, color: "text-gray-600" },
                            ].map(({ title, data, color }, idx) => (
                                <VisitorSection
                                    key={idx}
                                    title={title}
                                    data={data}
                                    color={color}
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='flex flex-wrap gap-2'>
                <DaysVisitBarChart locations={locations}/>
                <ContinentsBarChart locations={locations}/>
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
        <p className="pt-1">{title}</p>
        <ul className="divide-y divide-neutral-800">
            {data.map((location, index) => (
                <li key={index} className={`py-2 text-xs text-muted-foreground`}>
                    <div>{location.city}, {location.region}, {location.country}</div>
                    <div>{formatDistanceToNow(parseISO(location.timestamp), { addSuffix: true })}</div>
                </li>
            ))}
        </ul>
    </section>
);