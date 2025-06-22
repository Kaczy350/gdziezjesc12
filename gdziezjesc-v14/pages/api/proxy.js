export default async function handler(req, res) {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).json({ error: "Brak wymaganych parametrów: query i type" });
  }

  const encodedQuery = encodeURIComponent(query);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedQuery}&type=${type}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Błąd proxy" });
  }
}