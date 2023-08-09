"use client";

import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

export default function SocialLogins() {
  return (
    <div className="flex justify-center items-center space-x-5">
      <Image
        src="/socialProfiles/Google.svg"
        alt="google"
        width={100}
        height={100}
        className="w-11 h-11 cursor-pointer"
        onClick={() => signIn("google", { callbackUrl: "/" })}
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
  );
}
