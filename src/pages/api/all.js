import fetch from "node-fetch";

let cachedData = null;
let cacheExpiration = Date.now();

export default async function handler(req, res) {
  if (cachedData && Date.now() < cacheExpiration) {
    return res.status(200).json(cachedData);
  }

  try {
    const [data1, data2, data3, data4] = await Promise.all([
      fetch("https://thjodsogur.vegur.is/thjodsogur/troll").then((res) =>
        res.json()
      ),
      fetch("https://thjodsogur.vegur.is/thjodsogur/draugar").then((res) =>
        res.json()
      ),
      fetch("https://thjodsogur.vegur.is/thjodsogur/alfar-og-huldufolk").then(
        (res) => res.json()
      ),
      fetch(
        "https://thjodsogur.vegur.is/thjodsogur/ur-efra-og-nedra-helgisogur"
      ).then((res) => res.json()),
    ]);

    cachedData = [
      { category: "troll", stories: data1 },
      { category: "draugar", stories: data2 },
      { category: "alfar-og-huldufolk", stories: data3 },
      { category: "ur-efra-og-nedra-helgisogur", stories: data4 },
    ];
    cacheExpiration = Date.now() + 1000 * 60 * 5;
    res.status(200).json(cachedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
}
