import "../css/constants.css";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {useNavigate} from "react-router-dom";
import { Link, animateScroll } from 'react-scroll';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useEffect, useState} from "react";
import LogoAngleterre from "../assets/pictures/angleterre.webp";
import LogoFrance from "../assets/pictures/france.webp";
import LogoAllemagne from "../assets/pictures/allemagne.webp";
import axios from "axios";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(3),
        minWidth: 100,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ backendApiUrl, language, setLanguage }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [navigation, setNavigation] = useState([{ name: 'Home', to: "presentation", current: false, offset: -68 },
        { name: 'About', to: "about", current: false, offset: -68 },
        { name: 'Competencies', to: "competencies", current: false, offset: -68 },
        // { name: 'Experience', to: "experience", current: false, offset: -68},
        // { name: 'Projets', to: "projects", current: false, offset: -68 }
    ]);
    const [navigationRight, setNavigationRight] = useState([{ name: 'Contact', to: 'contact', current: false, offset: -68 }]);

    const getNavigation = async () => {
        try {
            const response = await axios.get(`${backendApiUrl}/navigation/` + language);

            setNavigation([
                { name: response.data.home, to: "presentation", current: false, offset: -68 },
                { name: response.data.about, to: "about", current: false, offset: -68 },
                { name: response.data.competencies, to: "competencies", current: false, offset: -68 },
                // { name: response.data.experience, to: "experience", current: false, offset: -68 },
                // { name: response.data.projects, to: "projects", current: false, offset: -68 },
            ]);
            setNavigationRight([
                { name: response.data.contact, to: "contact", current: false, offset: -68 }
            ]);
        } catch (error) {
            console.error('Error fetching navigation:', error);
        }
    };

    useEffect(() => {
        getNavigation();
    }, [language]);

    const getCurrentLanguageFlag = () => {
        if (language === "EN") return LogoAngleterre;
        if (language === "FR") return LogoFrance;
        if (language === "DE") return LogoAllemagne;
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="header bwhite3 w-full border-top shadow-xl">
            {({ open }) => (
                <>
                    <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-32">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
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
                            <div className="flex flex-1 items-center lg:justify-start">
                                <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center lg:hidden">
                                    <div className="cursor-pointer" onClick={() => animateScroll.scrollToTop()}>
                                        <img
                                            className="h-12 w-auto"
                                            src="/logo.png"
                                            alt="Your Company"
                                        />
                                    </div>
                                </div>
                                <div className="hidden lg:flex items-center cursor-pointer" onClick={() => navigate(process.env.REACT_APP_IS_DEVELOPMENT ? "/" : "/")}>
                                    <img
                                        className="h-12 w-auto"
                                        src="/logo.png"
                                        alt="Your Company"
                                        onClick={() => animateScroll.scrollToTop()}
                                    />
                                </div>
                                <div className={"lg:hidden ml-auto"}>
                                    <Button
                                        aria-controls={anchorEl ? 'language-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={anchorEl ? 'true' : undefined}
                                        variant="contained"
                                        disableElevation
                                        endIcon={<img src={getCurrentLanguageFlag()} style={{height: "20px", paddingLeft: "5px"}}/>}
                                        onClick={handleMenuOpen}
                                        sx={{ backgroundColor: "transparent", color: "black" }}
                                        className={' hover:tprimary transition'}
                                    >
                                        {language}
                                    </Button>
                                    <StyledMenu
                                        id="language-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={() => { handleMenuClose(); setLanguage("EN") }}>
                                            <div style={{width: "100%"}}>EN</div>
                                            <img src={LogoAngleterre} style={{height: "20px"}}/>
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleMenuClose(); setLanguage("FR") }}>
                                            <div style={{width: "100%"}}>FR</div>
                                            <img src={LogoFrance} style={{height: "20px"}}/>
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleMenuClose(); setLanguage("DE") }}>
                                            <div style={{width: "100%"}}>DE</div>
                                            <img src={LogoAllemagne} style={{height: "20px"}}/>
                                        </MenuItem>
                                    </StyledMenu>
                                </div>
                                <div className="hidden sm:ml-6 lg:block w-full">
                                    <div className={"flex"}>
                                        <div className="flex-center">
                                            {navigation.map((item) => (
                                                <Link key={item.name} className={classNames(item.current ? 'bprimary text-white' : 'text-black hover:tprimary', 'rounded px-3 py-2.5 text-sm leading-none font-medium cursor-pointer mx-2 transition w-max')} aria-current={item.current ? 'page' : undefined} to={item.to} smooth={true} duration={500} offset={item.offset}>
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="flex w-full justify-end">
                                            {navigationRight.map((item) => (
                                                <Link key={item.name} className={classNames('bprimary twhite1 border rounded leading-none px-6 py-2 text-sm font-medium cursor-pointer mx-2 hover:bg-transparent hover:tprimary transition')} aria-current={item.current ? 'page' : undefined} to={item.to} smooth={true} duration={500} offset={item.offset}>
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <div>
                                                <Button
                                                    aria-controls={anchorEl ? 'language-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={anchorEl ? 'true' : undefined}
                                                    variant="contained"
                                                    disableElevation
                                                    endIcon={<img src={getCurrentLanguageFlag()} style={{height: "20px", paddingLeft: "5px"}}/>}
                                                    onClick={handleMenuOpen}
                                                    sx={{ backgroundColor: "transparent", color: "black" }}
                                                    className={' hover:tprimary transition'}
                                                >
                                                    {language}
                                                </Button>
                                                <StyledMenu
                                                    id="language-menu"
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem onClick={() => { handleMenuClose(); setLanguage("EN") }}>
                                                        <div style={{width: "100%"}}>EN</div>
                                                        <img src={LogoAngleterre} style={{height: "20px"}}/>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => { handleMenuClose(); setLanguage("FR") }}>
                                                        <div style={{width: "100%"}}>FR</div>
                                                        <img src={LogoFrance} style={{height: "20px"}}/>
                                                    </MenuItem>
                                                    <MenuItem onClick={() => { handleMenuClose(); setLanguage("DE") }}>
                                                        <div style={{width: "100%"}}>DE</div>
                                                        <img src={LogoAllemagne} style={{height: "20px"}}/>
                                                    </MenuItem>
                                                </StyledMenu>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="lg:hidden">
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