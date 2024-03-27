import {
  Calendar,
  List,
  Users,
  Home,
  Tag,
  Layers,
  FileText,
} from "react-feather";

const pagesSection = [
  {
    href: "/smartkiu/company/dashboard",
    icon: Home,
    title: "Inicio",
  },
  {
    href: "/smartkiu/company/tickets",
    icon: Tag,
    title: "Tickets",
  },
  {
    href: "/smartkiu/company/reservas",
    icon: Calendar,
    title: "Reserva",
  },
  {
    href: "/smartkiu/company/empleados",
    icon: Users,
    title: "Empleados",
  },
  {
    href: "/smartkiu/company/sucursales",
    icon: Layers,
    title: "Sucursales",
  },
  {
    href: "/smartkiu/company/survey",
    icon: FileText,
    title: "Encuestas",
  },
  {
    href: "/smartkiu/company/changelog",
    icon: List,
    title: "Changelog",
    badge: "v1.0.0",
  },
];

const navItems = [
  {
    title: "MENU",
    pages: pagesSection,
  },
];

export default navItems;
