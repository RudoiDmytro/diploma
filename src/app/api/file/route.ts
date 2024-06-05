import { NextResponse } from "next/server";
import path from "path";
import { writeFile, readFile } from "fs/promises";

export async function POST(req, res) {
  const formData = await req.formData();

  const file = formData.get("companyLogo");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");

  try {
    await writeFile(path.join(process.cwd(), "src/assets/" + filename), buffer);
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}

export async function GET(req:Request) {
  const baseUrl = "https://upcdn.io";
  const body = await req.json();
  const path = `/${body.accountId}/raw${body.filePath}`;
  const entries = (obj) =>
    Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
  const query = entries(body.querystring ?? {})
    .flatMap(([k, v]) => (Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]))
    .map((kv) => kv.join("="))
    .join("&");

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Authorization", `Bearer ${process.env.apiKey}`);

  const response = await fetch(
    `${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );

  if (Math.floor(response.status / 100) !== 2) {
    const result = await response.json();
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  }

  try {
    return NextResponse.json(response.blob());
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
