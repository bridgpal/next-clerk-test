import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import {
  ClerkProvider,
  SignInButton,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Nav() {
  return (
    <header>
      <Head>
        <title>Clerk Login</title>
      </Head>
      <div className="navbar bg-neutral text-neutral-100  ">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost sm:text-lg">
            Clerk Login
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </li>
            <li>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
