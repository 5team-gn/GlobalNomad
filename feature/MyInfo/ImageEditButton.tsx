import EditButton from "@/public/edit_button.svg";

const ImageEditButton = () => {
  return (
    <button
      type="button"
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
      "
    >
      <EditButton />
    </button>
  );
};

export default ImageEditButton;
