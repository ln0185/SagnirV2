import { NextApiRequest, NextApiResponse } from "next";

async function getStory(categoryName: string, storyName: string) {
  const response = await fetch(
    `https://thjodsogur-api.deno.dev/api/${categoryName}/${storyName}`
  );
  return response.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { categoryName, storyName } = req.query;

  if (typeof categoryName !== "string" || typeof storyName !== "string") {
    return res.status(400).json({ message: "Invalid parameters" });
  }

  try {
    const data = await getStory(categoryName, storyName);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching story" });
  }
}
