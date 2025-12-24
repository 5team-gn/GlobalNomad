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
    cache: "no-store",
  });

  const text = await res.text(); //성공이든 실패든 텍스트 받기

  if (!res.ok) {
    console.error("[Kakao Geocode Error]", res.status, text);
    return NextResponse.json(
      { error: "kakao api failed", status: res.status, detail: text },
      { status: 502 }
    );
  }

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "invalid kakao response", detail: text },
      { status: 502 }
    );
  }

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
