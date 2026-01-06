import DeleteIcon from "@/public/icon_delete.svg";

export default function ReservationHeader({
  dateKey,
  onClose,
}: {
  dateKey: string;
  onClose: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold">{dateKey}</h2>
      <button onClick={onClose}>
        <DeleteIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
