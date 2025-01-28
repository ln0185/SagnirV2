import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let cachedData = null;
let cacheExpiration = Date.now();

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://thjodsogur-api.deno.dev/api/");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.get("/all", async (req, res) => {
  if (cachedData && Date.now() < cacheExpiration) {
    return res.json(cachedData);
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
    res.json(cachedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

const getCategoryStories = async (category) => {
  const response = await fetch(
    `https://thjodsogur-api.deno.dev/api/${category}`
  );
  return response.json();
};

["troll", "draug", "alfa", "efra"].forEach((category) => {
  app.get(`/${category}`, async (req, res) => {
    try {
      const data = await getCategoryStories(category);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${category} stories` });
    }
  });
});

app.get("/:categoryName/:storyName", async (req, res) => {
  const { categoryName, storyName } = req.params;

  try {
    const response = await fetch(
      `https://thjodsogur-api.deno.dev/api/${categoryName}/${storyName}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching story" });
  }
});

app.listen(8080);
