import fetch from "node-fetch";

export default async function handler(req, res) {
  const { category, story } = req.query;

  try {
    const apiUrl = `https://thjodsogur.vegur.is/thjodsogur/${encodeURIComponent(
      category,
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
  }
}
