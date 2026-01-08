import EditButton from "@/public/edit_button.svg";

interface  Props {
  onClick: () => void
}

const ImageEditButton = ({onClick}:Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        absolute
        bottom-0
        right-0
        w-8
        h-8
        rounded-full
        flex
        items-center
        justify-center
        hover:bg-gray-50
        z-10
        cursor-pointer
      "
    >
      <EditButton />
    </button>
  );
};

export default ImageEditButton;
