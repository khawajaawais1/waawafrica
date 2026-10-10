import { promises as fs } from "node:fs";
import path from "node:path";

/** Local-development only: serves posters uploaded from /admin when Vercel Blob isn't configured. */
const ROOT = path.join(process.cwd(), ".data", "uploads");
const TYPES: Record<string, string> = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };

export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const parts = (await params).path;
  const file = path.normalize(path.join(ROOT, ...parts));
  if (!file.startsWith(ROOT)) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(file);
    return new Response(data, {
      headers: { "Content-Type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream", "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
