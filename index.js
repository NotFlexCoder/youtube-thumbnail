import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.json({ status: "error", message: "Missing URL" });

  try {
    const apiUrl = `https://flex-youtuber.vercel.app/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "success") {
      return res.json({
        status: "success",
        thumbnail: data.thumbnail
      });
    } else {
      return res.json({
        status: "error",
        message: data.message || "Unknown error"
      });
    }
  } catch {
    return res.json({ status: "error", message: "Failed to fetch data" });
  }
});

app.listen(3000);
