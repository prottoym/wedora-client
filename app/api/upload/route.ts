import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Image upload is not configured." }, { status: 500 });
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file was sent." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WEBP or GIF images are allowed." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Image must be 5 MB or smaller." }, { status: 400 });
  }

  const body = new FormData();
  body.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body,
    });
    const json = await res.json();
    if (!res.ok || !json?.data?.url) {
      return NextResponse.json({ error: "Image hosting rejected the upload." }, { status: 502 });
    }
    return NextResponse.json({ url: json.data.url as string });
  } catch {
    return NextResponse.json({ error: "Could not reach the image host." }, { status: 502 });
  }
}