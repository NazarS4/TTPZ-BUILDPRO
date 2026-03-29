import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Calculator } from "./pages/Calculator";
import { Bookings } from "./pages/Bookings";
import { Auth } from "./pages/Auth";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "properties", Component: Properties },
      { path: "properties/:id", Component: PropertyDetail },
      { path: "calculator", Component: Calculator },
      { path: "bookings", Component: Bookings },
      { path: "auth", Component: Auth },
      { path: "employee", Component: EmployeeDashboard },
    ],
  },
]);