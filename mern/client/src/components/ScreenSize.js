export default function ScreenSize() {
    return (
        <div className={"py-10 tbprimary"}>
            <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
                <p className="text-center text-xs">I am on an XS screen</p>
            </div>
            <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <p className="text-center text-sm">I am on an SM screen</p>
            </div>
            <div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
                <p className="text-center text-base">I am on an MD screen</p>
            </div>
            <div className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">
                <p className="text-center text-lg">I am on an LG screen</p>
            </div>
            <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
                <p className="text-center text-xl">I am on an XL screen</p>
            </div>
            <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
                <p className="text-center text-2xl">I am on a 2XL screen</p>
            </div>
        </div>
    );
};
