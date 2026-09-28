import type { TestimonialCardContent } from "./types";

export const TESTIMONIAL_STAGGER_DELAY = 0.09;

export const TESTIMONIAL_EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const TESTIMONIAL_PANEL_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 40,
  mass: 0.5,
};

export const TESTIMONIAL_ENTER_SPRING = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.75,
};

export const DEFAULT_TESTIMONIAL_QUOTE =
  "GFA is a development and design studio that breaks away from conventional, established trends and adapts to the ever-evolving new world. At GFA Studio, we consider hundreds, perhaps even thousands, of factors when developing our work. That's why leading brands choose to work with us.";

export const DEFAULT_TESTIMONIAL_NAME = "Gökhan";
export const DEFAULT_TESTIMONIAL_ROLE = "Founder @ GFA Studio";

export const DEFAULT_TESTIMONIAL_IMAGE_SRC = "/testimonials/gokhan.png";

export const DEFAULT_TESTIMONIAL_IMAGE_ALT = "Portrait of Gökhan";

export const DEFAULT_TESTIMONIAL: TestimonialCardContent = {
  quote: DEFAULT_TESTIMONIAL_QUOTE,
  name: DEFAULT_TESTIMONIAL_NAME,
  role: DEFAULT_TESTIMONIAL_ROLE,
  imageSrc: DEFAULT_TESTIMONIAL_IMAGE_SRC,
  imageAlt: DEFAULT_TESTIMONIAL_IMAGE_ALT,
};
