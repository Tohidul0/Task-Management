import clsx from "clsx";
import React, { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode; // For optional icons passed as children
  className?: string; // Optional custom class names
  label?: string; // Optional label for the button
  type?: "button" | "submit" | "reset"; // Button type
  onClick?: () => void; // Optional onClick handler
}

const Button: React.FC<ButtonProps> = ({
  icon,
  className,
  label,
  type = "button",
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={clsx("px-3 py-2 outline-none", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
