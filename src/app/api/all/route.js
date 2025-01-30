import { NextResponse } from "next/server";

let cachedData = null;
let cacheExpiration = Date.now();

async function fetchCategoryData() {
  const [data1, data2, data3, data4] = await Promise.all([
    fetch("https://thjodsogur-api.deno.dev/api/troll").then((res) =>
      res.json()
    ),
    fetch("https://thjodsogur-api.deno.dev/api/draug").then((res) =>
      res.json()
    ),
    fetch("https://thjodsogur-api.deno.dev/api/alfa").then((res) => res.json()),
    fetch("https://thjodsogur-api.deno.dev/api/efra").then((res) => res.json()),
  ]);

  return [
    { category: "troll", stories: data1 },
    { category: "draug", stories: data2 },
    { category: "alfa", stories: data3 },
    { category: "efra", stories: data4 },
  ];
}

export async function GET() {
  if (cachedData && Date.now() < cacheExpiration) {
    return NextResponse.json(cachedData);
  }

  try {
    cachedData = await fetchCategoryData();
    cacheExpiration = Date.now() + 1000 * 60 * 5; // Cache for 5 minutes
    return NextResponse.json(cachedData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}
