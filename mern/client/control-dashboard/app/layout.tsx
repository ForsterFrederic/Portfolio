import {ThemeProvider} from "@/app/components/theme-provider"
import {Toaster} from "@/app/components/ui/sonner"
import {GeistSans} from 'geist/font/sans'
import type {Metadata} from 'next'
import './globals.css'

export const viewport = {
    themeColor: "#ffffff",
};

export const metadata: Metadata = {
    title: "Frédéric's Portfolio Dashboard",
    description: 'A control dashboard for managing portfolio content.',
    icons: {
        icon: '/logo3.webp',
        apple: '/logo3.webp',
    },
    manifest: '/manifest.json',
};

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="apple-touch-icon" href="/logo3.webp" />
            <link rel="icon" href="/logo3.webp" />
            <link rel="icon" href="/logo3.webp" sizes="32x32" />
            <link rel="icon" href="/logo3.webp" sizes="16x16" />
            <link
                rel="preload"
                href="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
                as="image"
            />
            <link
                rel="preload"
                href="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
                as="image"
            />
        </head>
        <body className={GeistSans.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    )
}