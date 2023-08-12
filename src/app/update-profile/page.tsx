import Header from "@/components/Header";
import { Profile, User } from "@/types/types";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import UpdateForm from "@/components/UpdateForm";

const URL = "https://auth-henna-eight.vercel.app";
// const URL = "http://localhost:3000";

async function getUserProfile(id: string): Promise<Profile> {
  const res = await fetch(`${URL}/api/getUser?id=${id}`, {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user: User | undefined = session.user;
  const userProfile = await getUserProfile(user?.id ?? "");
  const firstLetterOfFirstName = userProfile.name.split(" ")[0].charAt(0);
  const firstLetterOfLastName = userProfile.name.split(" ")[1].charAt(0);
  return (
    <main className="md:px-20 py-7">
      <Header
        name={userProfile.name}
        firstLetterOfFirstName={firstLetterOfFirstName}
        firstLetterOfLastName={firstLetterOfLastName}
        image={userProfile.image}
      />
      <section className="flex flex-col items-center mt-14">
        <Card className=" relative border-none rounded-none md:rounded-xl shadow-none md:shadow md:border-solid w-full max-w-3xl mt-11">
          <CardHeader>
            <div className="absolute -top-7 left-4 md:left-0 flex items-center text-[#2D9CDB]">
              <ChevronLeftIcon />
              <Link href="/">Back</Link>
            </div>
            <CardTitle className="text-2xl font-normal mb-1">
              Change Info
            </CardTitle>
            <CardDescription className="text-sm font-medium text-[#828282]">
              Changes will be reflected to every services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              <UpdateForm
                id={userProfile.id}
                name={userProfile.name}
                bio={userProfile.bio}
                email={userProfile.email}
                phone={userProfile.phone}
                image={userProfile.image}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
