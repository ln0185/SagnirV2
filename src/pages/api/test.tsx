"use server";
import axios from "axios";
import { load, fromURL } from "cheerio";

const baseURL = "https://netutgafan.snerpa.is/thjod";
const Hello = async (req, res) => {
  const data = await axios.get("https://netutgafan.snerpa.is/thjod/alfa.htm");

  const json = load(data.data).extract({
    links: [
      {
        selector: "a",
        value: "href",
      },
    ],
  });
  /*   const X = await fromURL(baseURL + json.links[0].slice(1));
  console.log(X.html()); */
  const stories = await Promise.allSettled(
    json.links.map((link) => fromURL(baseURL + link.slice(1)))
  );

  const jsonStories = stories.map((story) => story.value?.html());
  console.log(jsonStories);
  res.send(jsonStories);
};

export default Hello;
