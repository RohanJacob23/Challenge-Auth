import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import SigninForm from "@/components/SigninForm";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Card className="border-none border md:border-solid border-[#BDBDBD] rounded-3xl w-full h-full md:w-[30rem] md:h-[34rem]">
        <CardContent className="p-5 md:p-14 pt-4 md:pt-0 pb-8">
          <Image
            src="/devchallenges.svg"
            alt="logo"
            width={150}
            height={150}
            className="dark:hidden block md:mb-7 md:mt-12 w-32 h-5"
          />
          <Image
            src="/devchallenges-light.svg"
            alt="logo"
            width={150}
            height={150}
            className="hidden dark:block md:mb-7 md:mt-12 w-32 h-5"
          />
          <CardTitle className="text-lg mb-4 mt-7 md:mt-0">Login</CardTitle>

          {/* input component */}
          <SigninForm login={true} />
        </CardContent>
        <CardFooter className="flex flex-col items-center p-5 pt-4  md:p-14 md:pt-0 space-y-6">
          <p className="text-[#828282] text-sm">
            or continue with these social profile
          </p>

          {/* social profile sigin in methods */}
          <div className="flex justify-center items-center space-x-5">
            <Image
              src="/socialProfiles/Google.svg"
              alt="google"
              width={100}
              height={100}
              className="w-11 h-11 cursor-pointer"
            />
            <Image
              src="/socialProfiles/Facebook.svg"
              alt="facebook"
              width={100}
              height={100}
              className="w-11 h-11 cursor-pointer"
            />
            <Image
              src="/socialProfiles/Twitter.svg"
              alt="twitter"
              width={100}
              height={100}
              className="w-11 h-11 cursor-pointer"
            />
            <Image
              src="/socialProfiles/Github.svg"
              alt="github"
              width={100}
              height={100}
              className="w-11 h-11 cursor-pointer"
            />
          </div>

          <p className="text-[#828282] text-sm">
            Dont&apos;t have an account yet?{" "}
            <Link href="/signin" className="text-[#2D9CDB]">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
      <div className="flex justify-between items-center text-[#828282] text-sm w-full md:w-[30rem] mt-3 px-5">
        <h1>
          <span className="hidden md:inline-block">created by</span>
          Rohan Jacob
        </h1>
        <h1>devChallenges.io</h1>
      </div>
    </main>
  );
}
