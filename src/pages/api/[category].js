export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { category } = req.query;

  try {
    const response = await fetch(
      `https://thjodsogur-api.deno.dev/api/${category}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Error fetching ${category} stories` });
  }
}
