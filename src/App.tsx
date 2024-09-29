import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Movie from "./pages/Movie";
import Showtime from "./pages/Showtime";
import ProductAndService from "./pages/ProductAndService";
import Customer from "./pages/Customer";
import Employee from "./pages/Employee";
import { Toaster } from "react-hot-toast";
import Problem from "./pages/Problem";
import Event from "./pages/Event";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { LoginProvider } from "./contexts/LoginContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "movie",
        element: <Movie />,
      },
      {
        path: "showtime",
        element: <Showtime />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "product-and-service",
        element: <ProductAndService />,
      },
      {
        path: "information",
        element: <ProductAndService />,
      },
      {
        path: "problem",
        element: <Problem />,
      },
      {
        path: "event",
        element: <Event />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-slate-800 w-full min-w-[1300px]">
      <div className="w-[1300px] mx-auto rounded-2xl overflow-hidden">
        <LoginProvider>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" />
        </LoginProvider>
      </div>
    </div>
  );
}

export default App;
