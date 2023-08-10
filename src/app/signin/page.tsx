import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import SigninForm from "@/components/SigninForm";
import Link from "next/link";
import SocialLogins from "@/components/SocialLogins";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Card className="border-none border md:border-solid border-[#BDBDBD] rounded-3xl w-full h-full md:w-[30rem] md:min-h-[40rem]">
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
          <CardTitle className="text-lg mb-4 mt-7 md:mt-0">
            Join thousands of learners from around the world
          </CardTitle>
          <CardDescription className="text-base">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </CardDescription>

          {/* input component */}
          <SigninForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center p-5 pt-4  md:p-14 md:pt-0 space-y-6">
          <p className="text-[#828282] text-sm">
            or continue with these social profile
          </p>

          {/* social profile sigin in methods */}
          <SocialLogins />

          <p className="text-[#828282] text-sm">
            Adready a member?{" "}
            <Link href="/login" className="text-[#2D9CDB]">
              Login
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
