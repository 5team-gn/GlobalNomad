import { cva } from "class-variance-authority";

export const ButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors select-none disabled:pointer-events-none gap-2 hover:cursor-pointer",
  {
    variants: {
      variant: {
        primary: `
          bg-primary-500
          disabled:bg-gray-200
        `,
        secondary: `
          bg-white border border-gray-200
          active:bg-primary-500
          disabled:bg-white
        `,
        text: `
        bg-gray-600 
        active:bg-primary-100
        `,
        ghost: `
          bg-white
          active:bg-gray-900
        `,
      },

      size: {
        lg: "h-[54px]  ",
        md: "h-[48px]  ",
        sm: "h-[41px]  ",
      },

      full: {
        true: "w-full h-full",
        false: "",
      },
    },

    compoundVariants: [],

    defaultVariants: {
      variant: "primary",
      size: "md",
      full: false,
    },
  }
);

export const buttonIconVariants = cva("flex-shrink-0 transition-colors", {
  variants: {
    variant: {
      primary: `
          text-white
          hover:text-gray-100
          active:text-yellow-300
          disabled:text-gray-300
        `,
      secondary: `
          text-gray-600
          hover:text-white
          active:text-primary-500
          disabled:text-gray-300
        `,
      text: `
        text-gray-600 
        active:text-primary-500
        `,
      ghost: `
          text-black
          hover:text-white
          active:text-white
          disabled:text-gray-600
        `,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const buttonLabelVariants = cva("whitespace-nowrap transition-colors", {
  variants: {
    variant: {
      primary: `
          text-white
          active:text-white
          disabled:text-gray-50
        `,
      secondary: `
          text-gray-600
          hover:text-white
          active:text-white
          disabled:text-gray-200
        `,
      text: `
        text-gray-600
        active:text-gray-950
        `,

      ghost: `
          text-black
          hover:text-white
          active:text-white
          disabled:text-gray-600
        `,
    },
    size: {
      lg: `text-16-b`,
      md: `text-16-m`,
      sm: `text-14-b`,
      xs: `text-14-m`,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
