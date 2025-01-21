import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu"
import config from "@/config"
import {
    CreditCard,
    Eye,
    Settings,
    User
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ModeToggle from "@/app/components/mode-toggle";

export function UserProfile() {
    const IS_PROD = process.env.NEXT_PUBLIC_IS_PROD || true;
    const router = useRouter()

    if (!config?.auth?.enabled) {
        router.back()
    }

    const handleSignOut = () => {
        window.location.href = "https://frederic-forster.com/no";
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-[2.25rem] h-[2.25rem]">
                <Avatar >
                    <AvatarImage src={"/logo3.webp"} alt="User Profile" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <ModeToggle/>
            <DropdownMenuTrigger onClick={handleSignOut}>
                <Eye className="mr-2 h-4 w-4" />
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
}
