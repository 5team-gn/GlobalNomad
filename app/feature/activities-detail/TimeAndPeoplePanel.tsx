function TimeAndPeoplePanel() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-14-b">예약 가능한 시간</p>
        {!selectedDate ? (
          <p className="mt-2 text-14-m text-gray-500">날짜를 선택해주세요.</p>
        ) : (
          <TimeButtons />
        )}
      </div>

      <div className={selectedTime ? "" : "opacity-40 pointer-events-none"}>
        <p className="text-14-b">참여 인원 수</p>
        <PeopleCounter />
      </div>
    </div>
  );
}
