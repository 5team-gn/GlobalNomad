### 변경 요약
카드 목록을 위한 공통 레이아웃 컴포넌트 CardLayout을 추가했습니다.

### 상세 내용
grid / list 두 가지 레이아웃을 지원합니다.
레이아웃만 담당하며, 카드 내부 UI(간격, 그림자, 패딩 등)는 사용처에서 정의하도록 설계했습니다.
가로 스크롤 또는 Swiper 기반 섹션(예: 인기 체험)은 본 컴포넌트 범위에서 제외했습니다.

### 사용 방법
Grid 레이아웃: className을 통해 열 수 및 반응형 간격을 지정
List 레이아웃: 세로 스택 형태로 사용하며 간격은 className으로 제어

### 설계 의도
공통 컴포넌트의 책임을 레이아웃으로 한정하여 화면별 디자인 유연성을 확보하기 위함입니다.
향후 디자인 변경 시 CardLayout 수정 없이 각 화면에서 대응 가능하도록 구성했습니다.

### 적용 예시
import CardLayout from "@/components/common/CardLayout";

/** 1) Grid: 모든 체험 (MO 2열 / TB 3열 / PC 4열 + gap-x/gap-y 반응형) */
<CardLayout
  variant="grid"
  className="
    grid-cols-2
    gap-x-2 gap-y-6
    md:grid-cols-3 md:gap-x-4 md:gap-y-8
    xl:grid-cols-4 xl:gap-x-6 xl:gap-y-12
  "
>
  {items.map((item) => (
    <div key={item.id}>
      {/* 카드 UI는 사용처에서 구성 */}
    </div>
  ))}
</CardLayout>;

/** 2) List: 예약 내역 (MO 8 / TB 16 / PC 24 간격) */
<CardLayout
  variant="list"
  className="gap-2 md:gap-4 xl:gap-6"
>
  {reservations.map((r) => (
    <div
      key={r.id}
      className="rounded-2xl bg-[var(--color-white)] border border-[var(--color-gray-100)] shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] p-4"
    >
      {/* 예약 카드 UI는 사용처에서 구성 */}
    </div>
  ))}
</CardLayout>;
