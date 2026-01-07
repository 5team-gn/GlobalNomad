import { useState, KeyboardEvent } from "react";

interface UseKeyboardNavigationProps {
  itemCount: number;
  onSelect: (index: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  isOpen,
  setIsOpen,
}: UseKeyboardNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) {
       if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(itemCount - 1);
      } else if (["Enter", " "].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < itemCount - 1 ? prev + 1 : 0)); // 순환
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : itemCount - 1)); // 순환
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0) {
          onSelect(activeIndex);
          setActiveIndex(-1);
        } else {
            setIsOpen(false)
        }
        break;
      case "Tab":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  return { activeIndex, setActiveIndex, handleKeyDown };
}