import { NextResponse } from "next/server";
import { getFilters } from "./filters.repository";

export async function GET() {
  const categories = await getFilters();
  return NextResponse.json(categories);
}
