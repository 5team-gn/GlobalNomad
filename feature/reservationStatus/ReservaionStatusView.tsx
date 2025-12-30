"use client";

export default function ReservaionStatusView() {
  return (
    <main className="flex">
      <div className="flex-col">
        <h1 className="text-18-b mb-2.5">예약현황 </h1>
        <span className="text-14-m text-gray-500">
          {" "}
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </span>
        <div className="flex mt-7.5 mb-7.5 ">드롭다운 자리</div>
        <div className="flex "> 달력 자리 </div>
      </div>
    </main>
  );
}
