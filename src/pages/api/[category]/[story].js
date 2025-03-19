import axios from "axios";
import { load } from "cheerio";

/* const baseURL = "https://netutgafan.snerpa.is/thjod"; */
export default async function handler(req, res) {
  const { story } = req.query;
  console.log("story:", story);
  const data = await axios.get("https://netutgafan.snerpa.is/thjod/" + story);
  const json = load(data.data).extract({
    title: {
      selector: "h2",
    },
    content: {
      selector: "blockquote",
    },
  });

  res.send(json);
}
