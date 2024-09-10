import "../css/constants.css";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {useNavigate} from "react-router-dom";
import { Link, animateScroll } from 'react-scroll';

const navigation = [
    { name: 'Home', to: "presentation", current: false, offset: -68 },
    { name: 'About', to: "about", current: false, offset: -68 },
    { name: 'Competencies', to: "competencies", current: false, offset: -210 },
    // { name: 'Experience', to: "experience", current: false, offset: -144},
    { name: 'Projets', to: "projects", current: false, offset: -2 },
]

const navigationRight = [
    { name: 'Contact', to: 'contact', current: false, offset: -68 },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="header bwhite3 w-full border-top shadow-xl">
            {({ open }) => (
                <>
                    <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-32">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 btprimary hover:bprimary hover:twhite1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:justify-start">
                                <div className="flex flex-shrink-0 items-center cursor-pointer mr-6" onClick={() => navigate(process.env.REACT_APP_IS_DEVELOPMENT ? "/home" : "/")}>
                                    <img
                                        className="h-12 w-auto"
                                        src="/logo.png"
                                        alt="Your Company"
                                        onClick={() => animateScroll.scrollToTop()}
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block w-full">
                                    <div className={"flex"}>
                                        <div className="flex-center">
                                            {navigation.map((item) => (
                                                <Link key={item.name} className={classNames(item.current ? 'bprimary text-white' : 'text-black hover:tprimary', 'rounded px-3 py-2.5 text-sm leading-none font-medium cursor-pointer mx-2 transition')} aria-current={item.current ? 'page' : undefined} to={item.to} smooth={true} duration={500} offset={item.offset}>
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="flex w-full justify-end">
                                            {/*<div className={"flex gap-2 my-auto mr-5 ml-14"}>*/}
                                            {/*    <p className={"cursor-pointer"}>FR</p>*/}
                                            {/*    <p>|</p>*/}
                                            {/*    <p className={"tprimary cursor-pointer"}>EN</p>*/}
                                            {/*</div>*/}
                                            {navigationRight.map((item) => (
                                                <Link key={item.name} className={classNames('border tprimary rounded leading-none px-6 py-2 text-sm font-medium cursor-pointer mx-2 hover:bprimary hover:twhite1 transition')} aria-current={item.current ? 'page' : undefined} to={item.to} smooth={true} duration={500} offset={item.offset}>
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="pl-10 space-y-1 px-2 py-3 bgrayl1 border-top shadow-xl border-bottom">
                            {navigation.concat(navigationRight).map((item) => (
                                <DisclosureButton key={item.name} as="div" className="w-full">
                                    <Link
                                        className={classNames(item.current ? 'bprimary text-white' : 'text-black hover:tprimary', 'justify-start rounded text-lg font-medium py-2 cursor-pointer transition w-full h-full flex items-center')}
                                        aria-current={item.current ? 'page' : undefined}
                                        to={item.to}
                                        smooth={true}
                                        duration={500}
                                        offset={item.offset}
                                        onClick={() => {
                                            document.querySelector('button[aria-expanded="true"]')?.click();
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}