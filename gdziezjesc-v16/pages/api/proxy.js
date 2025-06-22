export default async function handler(req, res) {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).json({ error: "Brak wymaganych parametrów: query i type" });
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
    url.searchParams.set("query", query);
    url.searchParams.set("type", type);
    url.searchParams.set("key", process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Błąd proxy" });
  }
}