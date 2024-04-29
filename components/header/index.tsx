import { UserButton, UserProfile } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="flex flex-row justify-between items-center px-4 py-3.5 h-[60px] shrink-0">
      <div>
        <Link href="/">
          <Image
            src="/recc-logo.svg"
            alt="Recc logo"
            width={54}
            height={29}
            className="w-[54px] h-[29px]"
          />
        </Link>
      </div>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
