"use client"

export default function Settings() {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            <a
                href="https://frederic-forster.com/generate-screenshots"
                target="_blank"
                rel="noopener noreferrer"
                className="w-72 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
            >
              Generate Screenshots
            </a>
            <a
                href={`${baseUrl}/settings/development`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-72 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
            >
                Development Mode
            </a>
        </div>
    )
}
