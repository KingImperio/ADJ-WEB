import { ArrowRight, ArrowDownRight, Check, CircleCheck, ChevronDown, ClipboardCheck, Download, GraduationCap, Headset, MapPin, Menu, MessageCircle, Phone, Route, Scale, Shield, ShieldCheck, TrendingUp, Users, X, CircleHelp, BadgeCheck, Bus, CreditCard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  arrow_forward: ArrowRight, south_east: ArrowDownRight, check: Check,
  check_circle: CircleCheck, expand_more: ChevronDown, download: Download,
  school: GraduationCap, support_agent: Headset, contact_support: CircleHelp,
  location_on: MapPin, pin_drop: MapPin, menu: Menu, close: X,
  chat: MessageCircle, call: Phone, route: Route, gavel: Scale,
  shield: Shield, verified_user: ShieldCheck, verified: BadgeCheck,
  assignment_turned_in: ClipboardCheck, quiz: ClipboardCheck,
  trending_up: TrendingUp, groups: Users, directions_bus: Bus, payments: CreditCard,
};

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  const Glyph = icons[name] ?? CircleHelp;
  return <Glyph aria-hidden="true" strokeWidth={1.75} className={`inline-block h-[1em] w-[1em] shrink-0 align-middle ${className}`} />;
}
