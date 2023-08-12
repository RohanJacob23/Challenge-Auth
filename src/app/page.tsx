import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Profile, User } from "@/types/types";
import Header from "@/components/Header";
import Link from "next/link";

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

export default async function Home() {
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
      {/* header section */}
      <Header
        name={userProfile.name}
        firstLetterOfFirstName={firstLetterOfFirstName}
        firstLetterOfLastName={firstLetterOfLastName}
        image={userProfile.image}
      />

      {/* profile section */}
      <section className="flex flex-col items-center mt-14">
        <h1 className="text-2xl md:text-4xl mt-2">Personal info</h1>
        <p className="text-sm md:text-lg font-light">
          Basic info, like your name and photo
        </p>

        <Card className="border-none rounded-none md:rounded-xl shadow-none md:shadow md:border-solid w-full max-w-3xl mt-11">
          <CardHeader className="flex flex-row items-center justify-between px-5 md:px-12">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-normal">Profile</CardTitle>
              <CardDescription className="text-sm font-medium text-[#828282]">
                Some info may be visible to other people
              </CardDescription>
            </div>
            <Button
              asChild
              variant="outline"
              className="font-medium text-base text-[#828282] rounded-xl"
            >
              <Link href="/update-profile">Edit</Link>
            </Button>
          </CardHeader>
          <Separator className="hidden md:block" />
          <CardContent className="p-0 text-[#BDBDBD] font-medium">
            <div className="flex flex-col">
              <div className="flex items-center justify-between md:justify-normal md:space-x-44 py-11 px-5 md:px-12 md:py-11">
                <h1 className="text-sm w-12">PHOTO</h1>
                {userProfile.image && (
                  <picture>
                    <source srcSet={userProfile.image} />
                    <img
                      src={userProfile.image}
                      width={100}
                      height={100}
                      alt="user"
                      className="w-[4.5rem] h-[4.5rem] rounded-lg object-cover"
                    />
                  </picture>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between md:justify-normal space-x-6 py-10 px-5 md:space-x-44 md:px-12 md:py-7">
                <h1 className="text-sm w-12">NAME</h1>
                <h1 className="text-black dark:text-white text-base md:text-lg">
                  {userProfile.name}
                </h1>
              </div>
              <Separator />
              <div className="flex items-center justify-between md:justify-normal space-x-6 py-10 px-5 md:space-x-44 md:px-12 md:py-7">
                <h1 className="text-sm w-12">BIO</h1>
                <h1 className="text-black dark:text-white text-base md:text-lg">
                  {userProfile.bio ? userProfile.bio : "No bio entered"}
                </h1>
              </div>
              <Separator />
              <div className="flex items-center justify-between md:justify-normal space-x-6 py-10 px-5 md:space-x-44 md:px-12 md:py-7">
                <h1 className="text-sm w-12">PHONE</h1>
                <h1 className="text-black dark:text-white text-base md:text-lg">
                  {userProfile.phone ? userProfile.phone : "No Number entered"}
                </h1>
              </div>
              <Separator />
              <div className="flex items-center justify-between md:justify-normal space-x-6 py-10 px-5 md:space-x-44 md:px-12 md:py-7">
                <h1 className="text-sm w-12">EMAIL</h1>
                <h1 className="break-all text-black dark:text-white text-base md:text-lg">
                  {userProfile.email}
                </h1>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="hidden md:flex justify-between items-center text-[#828282] w-full max-w-3xl mt-3 px-5">
          <h1>
            <span className="hidden md:inline-block">created by</span> Rohan
            Jacob
          </h1>
          <h1>devChallenges.io</h1>
        </div>
      </section>
    </main>
  );
}
