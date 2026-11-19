import { NextResponse } from "next/server";
import { MOCK_SERVICES } from "@/lib/mock-services";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!/^[a-f0-9]{24}$/i.test(id)) {
    return NextResponse.json({ message: "Invalid service ID" }, { status: 400 });
  }

  const service = MOCK_SERVICES.find((s) => s._id === id);
  if (!service) {
    return NextResponse.json(
      { message: "Service not found or not available" },
      { status: 404 },
    );
  }
  return NextResponse.json({ service });
}