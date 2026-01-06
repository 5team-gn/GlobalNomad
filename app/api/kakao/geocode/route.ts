import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  if (!address) {
    return NextResponse.json({ error: "address is required" }, { status: 400 });
  }

  const restKey = process.env.KAKAO_REST_API_KEY;
  if (!restKey) {
    return NextResponse.json(
      { error: "KAKAO_REST_API_KEY is missing (restart dev server?)" },
      { status: 500 }
    );
  }

  const url =
    "https://dapi.kakao.com/v2/local/search/address.json?query=" +
    encodeURIComponent(address);

  const res = await fetch(url, {
    headers: { Authorization: `KakaoAK ${restKey}` },
    next: { revalidate: 60 }, // 60초 동안 캐시
  });

  if (!res.ok) {
    // body가 길 수 있으니 일부만
    const detail = await res.text().catch(() => "");
    console.error("[Kakao Geocode Error]", res.status, detail.slice(0, 500));
    return NextResponse.json(
      { error: "kakao api failed", status: res.status },
      { status: 502 }
    );
  }

  const data = await res.json();
  const doc = data?.documents?.[0];
  if (!doc) {
    return NextResponse.json({ error: "address not found" }, { status: 404 });
  }

  return NextResponse.json({
    address,
    lat: Number(doc.y),
    lng: Number(doc.x),
  });
}
