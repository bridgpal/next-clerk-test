import Image from "next/image";

import { SignUp } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="hero bg-base-200 min-h-72">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-5xl font-bold">Welcome to Clerk Demo App</h1>
            <p className=" p-10"></p>
            <button className="btn btn-primary">
              <a href="/sign-up">Sign Up</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
