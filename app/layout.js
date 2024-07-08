import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

import Nav from "./components/Nav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <Nav />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
