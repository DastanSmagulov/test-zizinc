import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/db.json");

function readData() {
  try {
    const fileContent = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading data:", error);
    return { posts: [] };
  }
}

export async function GET() {
  const data = readData();
  return NextResponse.json({ products: data.products });
}
