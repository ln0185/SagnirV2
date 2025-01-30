import { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (cachedData && Date.now() < cacheExpiration) {
    return res.status(200).json(cachedData);
  }

  try {
    cachedData = await fetchCategoryData();
    cacheExpiration = Date.now() + 1000 * 60 * 5; // Cache for 5 minutes
    res.status(200).json(cachedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
}
