"use client"
import {Button} from '@/app/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/app/components/ui/card'
import {ArrowUpRight} from 'lucide-react'
import Link from 'next/link'
import {BarChartComponent} from '../_components/bar-chart'
import {BarChartBetter} from '../_components/bar-chart-better'
import {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://frederic-forster.com/api";
    const [counter, setCounter] = useState({ total: 0, count: 0, createdAt: '', lastResetAt: ''});
    const [loading, setLoading] = useState(true);

    const fetchCounter = async () => {
        try {
            const response = await axios.get(`${BACKEND_API_URL}/counter/`);
            setCounter(response.data);
        } catch (error) {
            console.error('Error fetching counter:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCounter();
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


    return (
        <div className='flex flex-col justify-center items-start flex-wrap px-4 pt-4 gap-4'>
            <Card className='w-[20rem]'>
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
    )
}