import express from "express";
import multer from "multer";
import { createCanvas, loadImage, Image, Canvas } from "canvas";
import { BarcodeDetector } from "barcode-detector/ponyfill";

(globalThis as any).window = globalThis;
(globalThis as any).Image = Image;
(globalThis as any).HTMLCanvasElement = Canvas;
(globalThis as any).OffscreenCanvas = Canvas;
(globalThis as any).document = {};

if (!(globalThis as any).navigator) {
  Object.defineProperty(globalThis, "navigator", {
    value: { userAgent: "node" },
    configurable: true,
  });
}

(globalThis as any).DOMRectReadOnly = class DOMRectReadOnly {
  x: number;
  y: number;
  width: number;
  height: number;
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
};

(globalThis as any).DOMRect = globalThis.DOMRectReadOnly;

const router = express.Router();

async function detectFromFile(buffer: Buffer) {
  // Get *all* supported formats
  const supported = await BarcodeDetector.getSupportedFormats();
  const formats = [...supported]; // turn into mutable string[]

  const detector = new BarcodeDetector({ formats });

  const img = await loadImage(buffer);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const results = await detector.detect(canvas as unknown as ImageBitmapSource);
  return results;
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/decode", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "file is required" });

  const buffer = file.buffer; // buffer is directly available in memory
  const result = await detectFromFile(buffer);

  if (!result.length) return res.json({ message: "No barcode found" });

  res.json({ rawValue: result[0].rawValue, format: result[0].format });
});

export default router;
