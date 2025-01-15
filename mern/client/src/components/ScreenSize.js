import React from 'react';
import {useWindowDimensions} from "../contexts/WindowDimensionsContext";

export default function ResponsiveScreenSizes() {
    const windowDimensions = useWindowDimensions();

    return (
        <div className="p-2 m-2 rounded tbprimary screenSize">
            <div className="block sm:hidden">
                <p className="text-center text-sm">XS</p>
            </div>
            <div className="hidden sm:block sm-1:hidden">
                <p className="text-center text-sm">SM</p>
            </div>
            <div className="hidden sm-1:block sm-2:hidden">
                <p className="text-center text-sm">SM-1</p>
            </div>
            <div className="hidden sm-2:block sm-3:hidden">
                <p className="text-center text-sm">SM-2</p>
            </div>
            <div className="hidden sm-3:block md:hidden">
                <p className="text-center text-sm">SM-3</p>
            </div>
            <div className="hidden md:block md-1:hidden">
                <p className="text-center text-sm">MD</p>
            </div>
            <div className="hidden md-1:block md-2:hidden">
                <p className="text-center text-sm">MD-1</p>
            </div>
            <div className="hidden md-2:block md-3:hidden">
                <p className="text-center text-sm">MD-2</p>
            </div>
            <div className="hidden md-3:block lg:hidden">
                <p className="text-center text-sm">MD-3</p>
            </div>
            <div className="hidden lg:block lg-1:hidden">
                <p className="text-center text-sm">LG</p>
            </div>
            <div className="hidden lg-1:block lg-2:hidden">
                <p className="text-center text-sm">LG-1</p>
            </div>
            <div className="hidden lg-2:block lg-3:hidden">
                <p className="text-center text-sm">LG-2</p>
            </div>
            <div className="hidden lg-3:block xl:hidden">
                <p className="text-center text-sm">LG-3</p>
            </div>
            <div className="hidden xl:block xl-1:hidden">
                <p className="text-center text-sm">XL</p>
            </div>
            <div className="hidden xl-1:block xl-2:hidden">
                <p className="text-center text-sm">XL-1</p>
            </div>
            <div className="hidden xl-2:block xl-3:hidden">
                <p className="text-center text-sm">XL-2</p>
            </div>
            <div className="hidden xl-3:block 2xl:hidden">
                <p className="text-center text-sm">XL-3</p>
            </div>
            <div className="hidden 2xl:block 2xl-1:hidden">
                <p className="text-center text-sm">2XL</p>
            </div>
            <div className="hidden 2xl-1:block 2xl-2:hidden">
                <p className="text-center text-sm">2XL-1</p>
            </div>
            <div className="hidden 2xl-2:block 2xl-3:hidden">
                <p className="text-center text-sm">2XL-2</p>
            </div>
            <div className="hidden 2xl-3:block 3xl:hidden">
                <p className="text-center text-sm">2XL-3</p>
            </div>
            <div className="hidden 3xl:block 3xl-1:hidden">
                <p className="text-center text-sm">3XL</p>
            </div>
            <div className="hidden 3xl-1:block 3xl-2:hidden">
                <p className="text-center text-sm">3XL-1</p>
            </div>
            <div className="hidden 3xl-2:block 3xl-3:hidden">
                <p className="text-center text-sm">3XL-2</p>
            </div>
            <div className="hidden 3xl-3:block 4xl:hidden">
                <p className="text-center text-sm">3XL-3</p>
            </div>
            <div className="hidden 4xl:block 4xl-1:hidden">
                <p className="text-center text-sm">4XL</p>
            </div>
            <div className="hidden 4xl-1:block 4xl-2:hidden">
                <p className="text-center text-sm">4XL-1</p>
            </div>
            <div className="hidden 4xl-2:block 4xl-3:hidden">
                <p className="text-center text-sm">4XL-2</p>
            </div>
            <div className="hidden 4xl-3:block 5xl:hidden">
                <p className="text-center text-sm">4XL-3</p>
            </div>
            <div className="hidden 5xl:block">
                <p className="text-center text-sm">5XL</p>
            </div>
            <div>
                <p className="text-center text-sm">{windowDimensions.windowWidth}</p>
            </div>
        </div>
    );
}