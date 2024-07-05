import "../css/constants.css";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {useNavigate} from "react-router-dom";

const navigation = [
    { name: 'Accueil', href: process.env.REACT_APP_IS_DEVELOPMENT ? '/home' : "/", current: true },
    { name: 'Projets', href: "/projects", current: false },
    { name: 'Projets', href: "/projects", current: false },
]

const navigationRight = [
    { name: 'Contact', href: '/contact', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="var(--RealWhite)">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block w-full">
                                    <div className={"flex"}>
                                        <div className="flex-center">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    onClick={() => navigate(item.href)}
                                                    className={classNames(
                                                        item.current ? 'bprimary text-white' : 'text-black hover:tprimary',
                                                        'rounded px-3 py-2.5 text-sm leading-none font-medium cursor-pointer mx-2 transition',
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                        <div className="flex w-full justify-end">
                                            {navigationRight.map((item) => (
                                                <a
                                                    key={item.name}
                                                    onClick={() => navigate(item.href)}
                                                    className={classNames(
                                                        'border tprimary rounded leading-none px-6 py-2 text-sm font-medium cursor-pointer mx-2 hover:bprimary hover:twhite1 transition',
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 py-3 bgrayl1 border-top shadow-xl border-bottom">
                            {navigation.concat(navigationRight).map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bprimary text-white' : 'text-black hover:tprimary',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}