"use client";

import React, { useState } from "react";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_SAVE_URL = "http://localhost:3100/service_request/";

interface RequestDataItem {
  SR: string;
  Title: string;
  Description: string;
  Customer: string;
}

const Page = () => {
  const [formData, setFormData] = useState<RequestDataItem>({
    SR: "",
    Title: "",
    Customer: "",
    Description: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event: { target: { id: any; value: any } }) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsSaving(true);

    try {
      const response = await fetch(API_SAVE_URL, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      // Show a toast message when the data has been saved
      toast("Data has been saved!", { type: "success" });
    } catch (error) {
      console.error("Error saving data", error);

      // Show a toast message when there is an error
      toast("Error saving data", { type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <ToastContainer/> 
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <Card className="shadow-lg max-w-2xl mx-auto mb-8 mt-1-3">
          <CardHeader>
            <CardTitle>Vector Creation Form</CardTitle>
            <CardDescription>
              Enter the details of the information to create a search vector.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Title">Title</Label>
              <Input
                id="Title"
                placeholder="Enter the Title of the request"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Description">Description</Label>
              <Textarea
                id="Description"
                placeholder="Enter the Description of the request"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Customer">Customer</Label>
              <Input
                id="Customer"
                placeholder="Enter the Customer's name"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="SR">SR (Service Request)</Label>
              <Input
                id="SR"
                placeholder="Enter the service request number"
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={isSaving}
              className="w-1/3"
              onClick={handleSubmit}
              onSubmit={handleSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-32 grid text-center lg:text-left fixed top-0 right-0 pb-10">
        <Link
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Search{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Go to the text search page.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Page;
