"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  label: string;
  icon: string;
  href: string;
};

export const SidebarItem = ({ label, icon, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image src={icon} height={25} width={25} alt="label" className="mr-5" />
        {label}
      </Link>
    </Button>
  );
};
