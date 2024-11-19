import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react"; // Nhập lazy và Suspense
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import { LoginProvider } from "./contexts/LoginContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingFullPage from "@/components/Shared/LoadingFullPage";
import Restore from "./pages/Restore/Restore.tsx";

// Sử dụng React.lazy để tải các component
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Movie = lazy(() => import("./pages/Movie/Movie"));
const Showtime = lazy(() => import("./pages/Showtime/Showtime.tsx"));
const FoodsAndDrinks = lazy(
  () => import("./pages/FoodAndDrink/FoodsAndDrinks.tsx")
);
const Customer = lazy(() => import("./pages/Customer/Customer.tsx"));
const Employee = lazy(() => import("./pages/Employee/Employee.tsx"));
const Problem = lazy(() => import("./pages/Problem"));
const Event = lazy(() => import("./pages/Event"));
const Login = lazy(() => import("./pages/Login"));
const AddMovie = lazy(() => import("./pages/Movie/AddMovie"));
const EditMovie = lazy(() => import("./pages/Movie/EditMovie"));
const DetailMovie = lazy(() => import("./pages/Movie/DetailMovie"));
const AddShowtime = lazy(() => import("./pages/Showtime/AddShowtime.tsx"));
const EditShowtime = lazy(() => import("./pages/Showtime/EditShowtime.tsx"));
const EditCustomer = lazy(() => import("./pages/Customer/EditCustomer.tsx"));
const DetailCustomer = lazy(
  () => import("./pages/Customer/DetailCustomer.tsx")
);
const EditEmployee = lazy(() => import("./pages/Employee/EditEmployee.tsx"));
const Analysis = lazy(() => import("./pages/Analysis.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFullPage />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<LoadingFullPage />}>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: "analysis",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <Analysis />
          </Suspense>
        ),
      },
      {
        path: "movie",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <Movie />
          </Suspense>
        ),
      },
      {
        path: "movie/add",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <AddMovie />
          </Suspense>
        ),
      },
      {
        path: "movie/edit/:id",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <EditMovie />
          </Suspense>
        ),
      },
      {
        path: "movie/detail/:id",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <DetailMovie />
          </Suspense>
        ),
      },
      {
        path: "showtime",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <Showtime />
          </Suspense>
        ),
      },
      {
        path: "showtime/edit/:id",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <EditShowtime />
          </Suspense>
        ),
      },
      {
        path: "showtime/add",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <AddShowtime />
          </Suspense>
        ),
      },
      {
        path: "employee",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <Employee />
          </Suspense>
        ),
      },
      {
        path: "employee/edit/:id",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <EditEmployee />
          </Suspense>
        ),
      },
      {
        path: "customer",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <Customer />
          </Suspense>
        ),
      },
      {
        path: "customer/edit/:id",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <EditCustomer />
          </Suspense>
        ),
      },
      {
        path: "customer/detail/:id",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <DetailCustomer />
          </Suspense>
        ),
      },
      {
        path: "foods-and-drinks",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <FoodsAndDrinks />
          </Suspense>
        ),
      },
      {
        path: "information",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <FoodsAndDrinks />
          </Suspense>
        ),
      },
      {
        path: "problem",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <Problem />
          </Suspense>
        ),
      },
      {
        path: "event",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <Event />
          </Suspense>
        ),
      },
      {
        path: "backup",
        element: (
          <Suspense fallback={<LoadingFullPage />}>
            <Restore />
          </Suspense>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <div className="bg-slate-800 w-full min-w-[1300px]">
      <div className="w-[1300px] mx-auto rounded-2xl overflow-hidden">
        <LoginProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster position="top-center" />
          </QueryClientProvider>
        </LoginProvider>
      </div>
    </div>
  );
}

export default App;
