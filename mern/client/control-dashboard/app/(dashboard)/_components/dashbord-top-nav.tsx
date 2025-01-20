"use client"
import ModeToggle from '@/app/components/mode-toggle'
import { Button } from '@/app/components/ui/button'
import { Dialog, DialogClose } from '@/app/components/ui/dialog'
import { Separator } from '@/app/components/ui/separator'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet'
import { UserProfile } from '@/app/components/user-profile'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Star, Languages, Folder, HomeIcon, Settings, BookOpenCheck } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  const IS_PROD = process.env.NEXT_PUBLIC_IS_PROD || true;

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <HamburgerMenuIcon />
            <Link href={`${IS_PROD === "TRUE" ? "/private" : ""}/home`}>
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href={`${IS_PROD === "TRUE" ? "/private" : ""}/home`}>
                <SheetTitle>Control Dashboard</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href={`${IS_PROD === "TRUE" ? "/private" : ""}/home`}>
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href={`${IS_PROD === "TRUE" ? "/private" : ""}/experiences`}>
                  <Button variant="outline" className="w-full">
                    <BookOpenCheck className="mr-2 h-4 w-4" />
                    Experiences
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href={`${IS_PROD === "TRUE" ? "/private" : ""}/projects`}>
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Projects
                  </Button>
                </Link>
              </DialogClose>
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href={`${IS_PROD === "TRUE" ? "/private" : ""}/settings`}>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto">
          <UserProfile />
        </div>
      </header>
      {children}
    </div>
  )
}
