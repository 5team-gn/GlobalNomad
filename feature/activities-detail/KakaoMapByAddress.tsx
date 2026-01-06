/**
 *
 *
 * @description 액티비티 상세 - 카카오맵 컴포넌트 (주소 -> 지도)
 */

"use client";

import { useEffect, useRef, useState } from "react";
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

  // 카카오 객체 참조(정리용)
  const kakaoMapObjRef = useRef<any>(null);
  const kakaoMarkerRef = useRef<any>(null);
  const kakaoOverlayRef = useRef<any>(null);

  const cleanupKakao = () => {
    if (kakaoOverlayRef.current) {
      kakaoOverlayRef.current.setMap(null);
      kakaoOverlayRef.current = null;
    }
    if (kakaoMarkerRef.current) {
      kakaoMarkerRef.current.setMap(null);
      kakaoMarkerRef.current = null;
    }
    // map 객체는 setMap(null)이 없어서 참조만 끊기
    kakaoMapObjRef.current = null;
  };

  // 1) 주소 -> 좌표
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setError(null);
        setCoord(null);

        const res = await fetch(
          `/api/kakao/geocode?address=${encodeURIComponent(address)}`,
          { signal: ac.signal }
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error ?? "geocode failed");
        setCoord({ lat: data.lat, lng: data.lng });
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setError(e?.message ?? "geocode error");
      }
    })();

    return () => {
      ac.abort();
    };
  }, [address]);

  // 2) 좌표 -> 지도 생성
  useEffect(() => {
    if (!coord) return;

    cleanupKakao();

    let timer: number | null = null;
    let cancelled = false;

    const init = () => {
      if (!mapRef.current) return;
      if (!window.kakao?.maps) return;

      window.kakao.maps.load(() => {
        if (cancelled) return;

        const center = new window.kakao.maps.LatLng(coord.lat, coord.lng);

        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level,
        });
        kakaoMapObjRef.current = map;

        const marker = new window.kakao.maps.Marker({ position: center });
        marker.setMap(map);
        kakaoMarkerRef.current = marker;

        if (markerText) {
          const displayText =
            markerText.length > 17 ? `${markerText.slice(0, 17)}…` : markerText;

          const wrap = document.createElement("div");
          wrap.style.position = "relative";
          wrap.style.display = "inline-flex";
          wrap.style.alignItems = "center";
          wrap.style.gap = "8px";
          wrap.style.padding = "7px 12px 7px 9px";
          wrap.style.border = "2px solid #1e6fff";
          wrap.style.borderRadius = "9999px";
          wrap.style.background = "#fff";
          wrap.style.boxShadow = "0 2px 10px rgba(0,0,0,0.10)";
          wrap.style.whiteSpace = "nowrap";

          const iconWrap = document.createElement("span");
          iconWrap.style.width = "30px";
          iconWrap.style.height = "30px";
          iconWrap.style.borderRadius = "9999px";
          iconWrap.style.background = "#1e6fff";
          iconWrap.style.display = "inline-flex";
          iconWrap.style.alignItems = "center";
          iconWrap.style.justifyContent = "center";
          iconWrap.style.flex = "0 0 auto";

          iconWrap.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="#fff"/>
              <circle cx="12" cy="10" r="2.4" fill="#1e6fff"/>
            </svg>
          `;

          const textSpan = document.createElement("span");
          textSpan.style.fontSize = "14px";
          textSpan.style.fontWeight = "700";
          textSpan.style.color = "#111";
          textSpan.style.maxWidth = "250px";
          textSpan.style.overflow = "hidden";
          textSpan.style.textOverflow = "ellipsis";
          textSpan.style.whiteSpace = "nowrap";
          textSpan.style.letterSpacing = "-0.2px";
          textSpan.textContent = displayText; // XSS 방지

          const tipBorder = document.createElement("span");
          tipBorder.style.position = "absolute";
          tipBorder.style.left = "22px";
          tipBorder.style.bottom = "-10px";
          tipBorder.style.width = "0";
          tipBorder.style.height = "0";
          tipBorder.style.borderLeft = "9px solid transparent";
          tipBorder.style.borderRight = "9px solid transparent";
          tipBorder.style.borderTop = "10px solid #1e6fff";

          const tipFill = document.createElement("span");
          tipFill.style.position = "absolute";
          tipFill.style.left = "23px";
          tipFill.style.bottom = "-7px";
          tipFill.style.width = "0";
          tipFill.style.height = "0";
          tipFill.style.borderLeft = "8px solid transparent";
          tipFill.style.borderRight = "8px solid transparent";
          tipFill.style.borderTop = "9px solid #fff";

          wrap.appendChild(iconWrap);
          wrap.appendChild(textSpan);
          wrap.appendChild(tipBorder);
          wrap.appendChild(tipFill);

          const overlay = new window.kakao.maps.CustomOverlay({
            position: center,
            content: wrap,
            xAnchor: 0.5,
            yAnchor: 1.03,
            zIndex: 10,
          });

          overlay.setMap(map);
          kakaoOverlayRef.current = overlay;
        }
      });
    };

    // SDK 로드 대기
    let t = 0;
    timer = window.setInterval(() => {
      t += 1;
      if (window.kakao?.maps) {
        if (timer) window.clearInterval(timer);
        timer = null;
        init();
      }
      if (t > 50 && timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }, 100);

    return () => {
      cancelled = true;
      if (timer) window.clearInterval(timer);
      cleanupKakao();
    };
  }, [coord, level, markerText]);

  if (error) {
    return (
      <div className="w-full h-[320px] lg:h-[420px] rounded-2xl border border-gray-100 flex items-center justify-center text-sm text-gray-500">
        지오코딩 실패: {error}
      </div>
    );
  }

  return (
    <div className="order-4 lg:col-start-1 lg:pb-0 mt-10">
      <p className="text-18-b">오시는 길</p>
      <p className="text-14-sb opacity-75 my-2">{address}</p>
      <div
        ref={mapRef}
        className="w-full h-[320px] lg:h-[420px] rounded-2xl overflow-hidden"
      />
    </div>
  );
}
