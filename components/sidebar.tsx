import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

const labelItem = [
  {
    label: "Learn",
    href: "/learn",
    icon: "/learn.svg",
  },
  {
    label: "LeaderBoard",
    href: "/leaderboard",
    icon: "/leaderboard.svg",
  },
  { label: "Quest", href: "/quest", icon: "/quest.svg" },
  {
    label: "Shop",
    href: "/shop",
    icon: "/shop.svg",
  },
];
export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex  h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href={"/learn"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src={"/logo.svg"} height={40} width={40} alt="logo" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Duolingo Clone
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        {labelItem.map((item) => (
          <SidebarItem label={item.label} href={item.href} icon={item.icon} />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
