export default function ScreenSize() {
    return (
        <div className={"p-2 m-2 rounded tbprimary screenSize"}>
            <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
                <p className="text-center text-sm">XS</p>
            </div>
            <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <p className="text-center text-sm">SM</p>
            </div>
            <div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
                <p className="text-center text-sm">MD</p>
            </div>
            <div className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">
                <p className="text-center text-sm">LG</p>
            </div>
            <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
                <p className="text-center text-sm">XL</p>
            </div>
            <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
                <p className="text-center text-sm">2XL</p>
            </div>
        </div>
    );
};
