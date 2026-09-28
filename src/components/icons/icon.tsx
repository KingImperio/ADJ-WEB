import type { LucideIcon, LucideProps } from "lucide-react";

export const ICON_SIZES = {
  sm: 16,
  md: 18,
  lg: 20,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

type IconProps = Omit<LucideProps, "ref"> & {
  icon: LucideIcon;
  size?: IconSize | number;
};

export function Icon({
  icon: IconComponent,
  size = "md",
  className,
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  const pixel = typeof size === "number" ? size : ICON_SIZES[size];

  return (
    <IconComponent
      width={pixel}
      height={pixel}
      strokeWidth={strokeWidth}
      className={`block shrink-0 ${className ?? ""}`.trim()}
      aria-hidden={props["aria-hidden"] ?? true}
      {...props}
    />
  );
}
