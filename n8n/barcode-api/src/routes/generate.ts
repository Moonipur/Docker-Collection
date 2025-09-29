import express from "express";
import bwipjs from "bwip-js";

const router = express.Router();

router.post("/generate-qr", async (req, res) => {
  const { text } = req.body as string as any;
  if (!text) return res.status(400).json({ error: "text is required" });

  const buffer = await bwipjs.toBuffer({
    bcid: "qrcode",
    text,
    scale: 3,
  });
  res.type("image/png").send(buffer);
});

router.post("/generate-bar", async (req, res) => {
  const { text } = req.body as string as any;
  if (!text) return res.status(400).json({ error: "text is required" });

  const buffer = await bwipjs.toBuffer({
    bcid: "code128",
    text,
    scale: 3,
    height: 10,
    includetext: true,
    textfont: "Helvetica",
    textxalign: "center",
    textsize: 7,
    textgaps: 1,
    textyoffset: 1,
  });
  res.type("image/png").send(buffer);
});

export default router;
