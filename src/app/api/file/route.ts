import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("companyLogo") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "bin";
  const safeName = `${nanoid()}.${ext.replace(/[^a-zA-Z0-9]/g, "")}`;

  try {
    const blob = await put(`uploads/${safeName}`, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "File upload failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");

  if (!fileUrl) {
    return NextResponse.json(
      { error: "Missing 'url' query parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch file" },
        { status: response.status }
      );
    }

    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("File fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}
