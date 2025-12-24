"use client";

import { useEffect, useRef, useState } from "react";
import { mockActivityDetail } from "@/app/mocks/activityDetail.mock";

declare global {
  interface Window {
    kakao: any;
  }
}

type Props = {
  address: string;
  level?: number;
  markerText?: string;
};

export default function KakaoMapByAddress({
  address,
  level = 3,
  markerText,
}: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [coord, setCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mock = mockActivityDetail;
  // 1) 주소 -> 좌표
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        setCoord(null);

        const res = await fetch(
          `/api/kakao/geocode?address=${encodeURIComponent(address)}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error ?? "geocode failed");
        if (!cancelled) setCoord({ lat: data.lat, lng: data.lng });
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "geocode error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [address]);

  // 2) 좌표 -> 지도 생성
  useEffect(() => {
    if (!coord) return;

    const init = () => {
      if (!mapRef.current) return;
      if (!window.kakao?.maps) return;

      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(coord.lat, coord.lng);

        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level,
        });

        const marker = new window.kakao.maps.Marker({ position: center });
        marker.setMap(map);

        // 말풍선(커스텀)
        if (markerText) {
          const displayText =
            markerText.length > 17 ? `${markerText.slice(0, 17)}…` : markerText;

          const content = document.createElement("div");
          content.innerHTML = `
          <div style="
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 7px 12px 7px 9px;
            border: 2px solid #1e6fff;
            border-radius: 9999px;
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.10);
            white-space: nowrap;
          ">
            <span style="
              width: 30px;                        
              height: 30px;
              border-radius: 9999px;
              background: #1e6fff;                 
              display: inline-flex;
              align-items: center;
              justify-content: center;
              flex: 0 0 auto;
            ">
              <!-- 핀 아이콘 -->
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="#fff"/>
                <circle cx="12" cy="10" r="2.4" fill="#1e6fff"/>
              </svg>
            </span>

            <span style="
              font-size: 14px;                      
              font-weight: 700;
              color: #111;
              max-width: 250px;                      
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              letter-spacing: -0.2px;
            ">${displayText}</span>

            <!-- 꼬리 -->
            <span style="
              position:absolute;
              left: 22px;                           
              bottom: -10px;
              width:0;height:0;
              border-left: 9px solid transparent;
              border-right: 9px solid transparent;
              border-top: 10px solid #1e6fff;      
            "></span>
            <span style="
              position:absolute;
              left: 23px;
              bottom: -7px;
              width:0;height:0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 9px solid #fff;           
            "></span>
          </div>
        `;

          const overlay = new window.kakao.maps.CustomOverlay({
            position: center,
            content,
            xAnchor: 0.5,
            yAnchor: 1.03,
            zIndex: 10,
          });

          overlay.setMap(map);
        }
      });
    };

    // SDK 로드 대기
    let t = 0;
    const timer = window.setInterval(() => {
      t += 1;
      if (window.kakao?.maps) {
        window.clearInterval(timer);
        init();
      }
      if (t > 50) window.clearInterval(timer);
    }, 100);

    return () => window.clearInterval(timer);
  }, [coord, level, markerText]);

  if (error) {
    return (
      <div className="w-full h-[320] lg:h-[420] rounded-2xl border border-gray-100 flex items-center justify-center text-sm text-gray-500">
        지오코딩 실패: {error}
      </div>
    );
  }

  return (
    <div className="order-4 lg:col-start-1 pb-[96] lg:pb-0 mt-10">
      <p className="text-18-b">오시는 길</p>
      <p className="text-14-sb opacity-75 my-2">{mock.address}</p>
      <div
        ref={mapRef}
        className="w-full h-[320] lg:h-[420] rounded-2xl overflow-hidden"
      />
    </div>
  );
}
