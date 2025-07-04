export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Brak adresu URL" });
  }

  const targetUrl = decodeURIComponent(url);
  if (!targetUrl.startsWith("https://maps.googleapis.com/")) {
    return res.status(400).json({ error: "Niepoprawny adres URL" });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Błąd proxy" });
  }
}