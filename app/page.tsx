"use client";

import React, { useState, useEffect } from "react";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const API_SEARCH_URL = "http://localhost:3100/search";

interface ResponseDataItem {
  SR: string;
  Title: string;
  Description: string;
  Customer: string;
  Score: number;
}

type ResponseData = ResponseDataItem[];

const Page = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState({
    query: "",
    limit: 5,
    candidates: 5,
  });
  const [responseData, setResponseData] = useState<ResponseData>([]);

  async function fetchData(url: string) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setResponseData([]);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResponseData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  const handleSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // prevent the form from refreshing the page

    console.log(`Searching for ${searchText}`);
    searchTerm.query = searchText;
    setSearchTerm(searchTerm);

    // Call fetchData after updating searchTerm
    fetchData(
      `${API_SEARCH_URL}?query=${searchTerm.query}&limit=${searchTerm.limit}&candidates=${searchTerm.candidates}`
    );
  };

  const columns = [
    {
      label: "SR",
      width: "10%",
    },
    {
      label: "Title",
      width: "30%",
    },
    {
      label: "Customer",
      width: "10%",
    },
    {
      label: "Description",
      width: "45%",
    },
    {
      label: "Score",
      width: "5%",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <Card
          className="shadow-lg max-w-2xl mx-auto mb-8 mt-1-3"
          style={{ width: "50%" }}
        >
          <CardHeader>
            <CardTitle>Search</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex items-center space-x-2">
              <Input
                className="flex-grow"
                placeholder="Enter search query"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                className="w-1/3"
                onClick={handleSearch}
                onSubmit={handleSearch}
              >
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
        {responseData && responseData.length !== 0 && (
          <Card className="shadow-lg mx-auto mb-8 w-4/5">
            <div className={`grid grid-cols-${columns.length} gap-4 p-4`}>
              {columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`font-bold text-xl col-span-${column.width}`}
                >
                  {column.label}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200">
              {responseData &&
                responseData.map((row, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-${columns.length} gap-4 p-4`}
                  >
                    <div className="font-bold">{row.SR}</div>
                    <div>{row.Description}</div>
                    <div>{row.Customer}</div>
                    <div>{row.Description}</div>
                    <div>{row.Score.toFixed(6)}</div>
                  </div>
                ))}
            </div>
          </Card>
        )}
      </div>
      <div className="mb-32 grid text-center lg:text-left fixed top-0 right-0 pb-10">
        <Link
          href="/addvector"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Add Vector{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Add information to the model by vectorizintg your text.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Page;
