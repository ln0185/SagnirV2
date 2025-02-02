import fetch from "node-fetch";

let cachedData = null;
let cacheExpiration = Date.now();

export default async function handler(req, res) {
  if (cachedData && Date.now() < cacheExpiration) {
    return res.status(200).json(cachedData);
  }

  try {
    const [data1, data2, data3, data4] = await Promise.all([
      fetch("https://thjodsogur-api.deno.dev/api/troll").then((res) =>
        res.json()
      ),
      fetch("https://thjodsogur-api.deno.dev/api/draug").then((res) =>
        res.json()
      ),
      fetch("https://thjodsogur-api.deno.dev/api/alfa").then((res) =>
        res.json()
      ),
      fetch("https://thjodsogur-api.deno.dev/api/efra").then((res) =>
        res.json()
      ),
    ]);

    cachedData = [
      { category: "troll", stories: data1 },
      { category: "draug", stories: data2 },
      { category: "alfa", stories: data3 },
      { category: "efra", stories: data4 },
    ];
    cacheExpiration = Date.now() + 1000 * 60 * 5;
    res.status(200).json(cachedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
}
