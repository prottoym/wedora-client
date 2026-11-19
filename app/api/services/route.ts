import { NextResponse } from "next/server";
import { MOCK_SERVICES } from "@/lib/mock-services";

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;

  const search = (sp.get("search") ?? "").trim().toLowerCase();
  const category = sp.get("category") ?? "";
  const location = (sp.get("location") ?? "").trim().toLowerCase();
  const sort = sp.get("sort") ?? "latest";
  const page = Math.max(parseInt(sp.get("page") ?? "1", 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(sp.get("limit") ?? "9", 10) || 9, 1), 50);

  let list = MOCK_SERVICES.filter(
    (s) =>
      (!search || s.serviceName.toLowerCase().includes(search)) &&
      (!category || s.category === category) &&
      (!location || s.location.toLowerCase().includes(location)),
  );

  list = [...list].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    return +new Date(b.createdAt) - +new Date(a.createdAt);
  });

  const total = list.length;
  const services = list.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    services,
    total,
    page,
    pages: Math.max(Math.ceil(total / limit), 1),
  });
}