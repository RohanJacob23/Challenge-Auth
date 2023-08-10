"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import axios, { AxiosResponse } from "axios";
import { UploadResponse } from "@/types/types";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const updateFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  bio: z.string(),
  phone: z.string(),
  email: z.string().email("Email must be a valid email address"),
  password: z.string(),
});

export default function UpdateForm({
  id,
  name,
  bio,
  phone,
  email,
  image,
}: {
  id: string;
  name: string;
  bio: string;
  phone: string | null;
  email: string;
  image: string | null;
}) {
  const [profileImage, setProfileImage] = useState(image);
  const [file, setFile] = useState<File | null>(null);
  const PRESET = "y2hbrubt";
  const uploadUrl = "https://api.cloudinary.com/v1_1/dsgswsu80/image/upload";
  // const url = "http://localhost:3000";
  const url = "https://auth-henna-eight.vercel.app";
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name,
      bio,
      phone: phone ?? "",
      email,
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateFormSchema>) => {
    toast({
      title: "Updating your profile!!",
      description: "Please wait...",
    });
    let body = {
      id,
      name: values.name,
      bio: values.bio,
      phone: values.phone.length === 0 ? null : values.phone,
      email: values.email,
      password: values.password.length === 0 ? null : values.password,
      image: image,
    };

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", PRESET);
      formData.append("folder", "auth");
      const res: UploadResponse = await axios
        .post(uploadUrl, formData)
        .then((res) => res.data)
        .catch((err) => console.log(err));
      body.image = res.url;
    }

    await axios
      .post(`${url}/api/updateProfile`, body)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      .finally(() => {
        toast({
          title: "Profile updated!!",
          description: "Your profile has been updated successfully!",
        });
        router.refresh();
      });
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      {/* photo update section */}
      <Label
        className="flex items-center space-x-3 cursor-pointer w-fit"
        htmlFor="profilePhoto"
      >
        <div className="relative w-[4.5rem] h-[4.5rem] rounded-lg">
          {profileImage && (
            <picture>
              <img
                src={profileImage}
                width={100}
                height={100}
                alt="user-icon"
                className="w-[4.5rem] h-[4.5rem] rounded-lg object-cover"
              />
            </picture>
          )}
          <Image
            src="/icons/camera.png"
            alt="camera icon"
            className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            width={100}
            height={100}
          />

          {/* overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/20 rounded-lg"></div>
        </div>
        <h1 className="text-sm text-[#828282] font-medium">Change Photo</h1>
        <Input
          type="file"
          id="profilePhoto"
          className="hidden"
          onChange={uploadImage}
          accept=".png, .jpeg, .jpg"
        />
      </Label>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* name update section */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="w-full max-w-sm">
                  <Input type="text" {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* bio update section */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl className="w-full max-w-sm">
                  <Textarea
                    {...field}
                    placeholder="Type your message here."
                    id="message"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* phone update section */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl className="w-full max-w-sm">
                  <Input type="number" {...field} placeholder="Phone" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* email update section */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="w-full max-w-sm">
                  <Input type="email" {...field} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password update section */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl className="w-full max-w-sm">
                  <Input type="password" {...field} placeholder="Password" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#2F80ED] hover:bg-[#0b6dee] font-semibold"
          >
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}
