/* import fetch from "node-fetch"; */

import axios from "axios";
import { load } from "cheerio";

/* const baseURL = "https://netutgafan.snerpa.is/thjod"; */
export default async function handler(req, res) {
  const { story } = req.query;
  console.log(story);
  const data = await axios.get(
    "https://netutgafan.snerpa.is/thjod/" + story + ".htm"
  );
  const json = load(data.data).extract({
    title: {
      selector: "h2",
    },
    content: {
      selector: "blockquote",
    },
  });
  console.log(json);
  /*  const stories = await Promise.allSettled(
    json.links.map((link) => fromURL(baseURL + link.slice(1)))
  ); */

  /*   const jsonStories = stories.map((story) => story.value?.html()); */

  res.send(json);

  /*   try {
    const apiUrl = `https://thjodsogur.vegur.is/thjodsogur/${encodeURIComponent(
      category
    )}/${encodeURIComponent(story)}`;
    console.log("Requesting URL:", apiUrl);

    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(404).json({ message: "Story not found" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching story" });
  } */
}
