import fetch from "node-fetch";
import { load } from "cheerio";

let cachedData = null;
let cacheExpiration = Date.now();

export default async function handler(req, res) {
  if (cachedData && Date.now() < cacheExpiration) {
    return res.status(200).json(cachedData);
  }

  try {
    const [data1, data2, data3, data4] = await Promise.all([
      fetch("https://netutgafan.snerpa.is/thjod/troll.htm")
        .then((res) => res.text())
        .then((html) => {
          const json = load(html).extract({
            category: {
              selector: "h1",
            },
            stories: [
              {
                selector: "a",
              },
            ],
          });
          console.log(json);
          return json;
        }),
      fetch("https://netutgafan.snerpa.is/thjod/draug.htm")
        .then((res) => res.text())
        .then((html) => {
          const json = load(html).extract({
            category: {
              selector: "h1",
            },
            stories: [
              {
                selector: "a",
              },
            ],
          });
          console.log(json);
          return json;
        }),
      fetch("https://netutgafan.snerpa.is/thjod/alfa.htm")
        .then((res) => res.text())
        .then((html) => {
          const json = load(html).extract({
            category: {
              selector: "h1",
            },
            stories: [
              {
                selector: "a",
              },
            ],
          });
          console.log(json);
          return json;
        }),
      fetch("https://netutgafan.snerpa.is/thjod/efra.htm")
        .then((res) => res.text())
        .then((html) => {
          const json = load(html).extract({
            category: {
              selector: "h1",
            },
            stories: [
              {
                selector: "a",
              },
            ],
          });
          console.log(json);
          return json;
        }),
    ]);

    cachedData = [
      {
        category: "all",
        stories: {
          category: "all",
          stories: [
            ...data1.stories,
            ...data2.stories,
            ...data3.stories,
            ...data4.stories,
          ],
        },
      },
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
