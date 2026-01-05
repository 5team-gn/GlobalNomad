/**
 *
 * @description 예약 흐름을 UI 컴포넌트에 연결하기 위한 타입 정의 모음
 */

import type {
  ReservationSelection,
  ReservationStep,
  TimeSlot,
} from "@/types/reservation/types";

// 예약정보 prop 타입
export type ReservationCoreProps = {
  price: number;
  maxPeople: number;
};

// 예약 플로우를 관리하는 훅에서 반환하는 prop 타입
export type ReservationFlowProps = {
  open: boolean;
  step: ReservationStep;
  selection: ReservationSelection;
  slots: TimeSlot[];
  enabledDateSet: Set<string>;
  openPicker: () => void;
  close: () => void;
  setDate: (d: Date) => void;
  setTimeSlot: (s: TimeSlot) => void;
  incPeople: () => void;
  decPeople: () => void;
  goNext: () => void;
  goBack: () => void;
  goPeople: () => void;
  goBackMobile: () => void;
  clearTimeSlot: () => void;
  canReserve: boolean;
  canConfirm: boolean;
  onReserve: () => void;
};

// 예약 UI 컴포넌트 prop 타입
export type ReservationUIProps = ReservationCoreProps & ReservationFlowProps;

// 공통으로 사용하는 속성만 Pick으로 뽑아냄
type SheetSharedFromFlow = Pick<
  ReservationFlowProps,
  "open" | "step" | "slots" | "enabledDateSet" | "clearTimeSlot"
>;

// 예약 시트 컴포넌트 prop 타입
export type ReservationSheetProps = SheetSharedFromFlow & {
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (s: TimeSlot) => void;
  people: number;
  onInc: () => void;
  onDec: () => void;
  tabletConfirmDisabled: boolean;
  onTabletConfirm: () => void;
  mobileConfirmDisabled: boolean;
  onGoPeople: () => void;
  onGoBackMobile: () => void;
};

// 시간대 섹션 prop 타입
export type TimeSlotsSectionProps = {
  selectedDate: Date | null;
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (s: TimeSlot) => void;
  labelText: string;
  emptyText: string;
  labelClassName: string;
  emptyClassName: string;
  listClassName: string;
  buttonClassName: string;
};

// pc 예약에서 Flow로부터 사용하는 최소 필드
type DesktopSharedFromFlow = Pick<
  ReservationFlowProps,
  | "slots"
  | "setDate"
  | "setTimeSlot"
  | "incPeople"
  | "decPeople"
  | "canReserve"
  | "onReserve"
  | "enabledDateSet"
  | "clearTimeSlot"
>;

// 데스크탑 예약 prop 타입
export type ReservationPanelDesktopProps = ReservationCoreProps &
  DesktopSharedFromFlow & {
    selectedDate: Date | null;
    selectedSlot: TimeSlot | null;
    people: number;
  };

// 모바일 예약 바텀바에서 Flow로부터 공통으로 사용하는 속성만 Pick
type MobileBarSharedFromFlow = Pick<
  ReservationFlowProps,
  "selection" | "canReserve" | "openPicker" | "onReserve"
>;

// 모바일 예약 바텀바 컴포넌트 prop 타입
export type ReservationBarMobileProps = Pick<ReservationCoreProps, "price"> &
  MobileBarSharedFromFlow;
