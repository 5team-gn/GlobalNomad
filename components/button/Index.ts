import ButtonRoot from "./Button";
import ButtonIcon from "./Button.Icon";
import ButtonLabel from "./Button.Label";

export const Button = Object.assign(ButtonRoot, {
  Icon: ButtonIcon,
  Label: ButtonLabel,
});
