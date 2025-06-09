import { NextResponse } from "next/server";
import { getFilters } from "./filters.repository";

export async function GET() {
  const filters = await getFilters();
  return NextResponse.json(filters);
}
