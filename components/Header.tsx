"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";

export function Header({ session }: { session: Session }) {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-semibold text-white"
      >
        <Image
          src="/icons/logo.svg"
          width={40}
          height={40}
          alt="Bookwise Logo"
        />
        BookWise
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={`text-base cursor-pointer capitalize ${
              pathname === "/library" ? "text-primary" : "text-white"
            }`}
          >
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100 text-secondary text-sm font-bold">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
}
