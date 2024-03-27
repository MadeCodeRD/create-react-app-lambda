import {
  Calendar,
  List,
  Users,
  Home,
  Tag,
  Layers,
  FileText,
} from "react-feather";

import { Business } from "@mui/icons-material";

const pagesSection = [
  {
    href: "/smartkiu/admin/dashboard",
    icon: Home,
    title: "Inicio",
  },
  {
    href: "/smartkiu/admin/tickets",
    icon: Tag,
    title: "Tickets",
  },
  {
    href: "/smartkiu/admin/reservas",
    icon: Calendar,
    title: "Reserva",
  },
  {
    href: "/smartkiu/admin/empresas",
    icon: Business,
    title: "Empresas",
  },
  {
    href: "/smartkiu/admin/empleados",
    icon: Users,
    title: "Empleados",
  },
  {
    href: "/smartkiu/admin/sucursales",
    icon: Layers,
    title: "Sucursales",
  },
  {
    href: "/smartkiu/admin/survey",
    icon: FileText,
    title: "Encuestas",
  },
  {
    href: "/smartkiu/admin/changelog",
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
