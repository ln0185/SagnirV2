import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://thjodsogur.vegur.is/thjodsogur");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
}
