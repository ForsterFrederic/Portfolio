import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropzoneProps {
    onChange: (file: File | string | null) => void; // Allow string for URL
    initialFile?: File | string | null; // Allow string for URL
}

const Dropzone: React.FC<DropzoneProps> = ({ onChange, initialFile = null }) => {
    const [file, setFile] = React.useState<File | string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        setFile(initialFile);
    }, [initialFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            onChange(selectedFile);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            onChange(droppedFile);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const handleReset = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        onChange(null);
    };

    const isFile = (file: File | string | null): file is File => {
        return file instanceof File;
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center aspect-[16/9] w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                {file ? (
                    isFile(file) ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Uploaded preview"
                                className="w-full h-full object-contain rounded-md"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <img
                                src={file}
                                alt="Uploaded preview"
                                className="w-full h-full object-contain rounded-md"
                            />
                        </div>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or <span className="font-semibold">Drag and Drop</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                    </div>
                )}
            </label>
            {file && (
                <div className="flex flex-col items-center mt-2">
                    <span className="text-sm text-muted-foreground">{isFile(file) ? file.name : "Uploaded from URL"}</span>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-sm text-red-600 hover:underline mt-1"
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
};

export { Dropzone };
