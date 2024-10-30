import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react"; // Nhập lazy và Suspense
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import { LoginProvider } from "./contexts/LoginContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Sử dụng React.lazy để tải các component
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Movie = lazy(() => import("./pages/Movie/Movie"));
const Showtime = lazy(() => import("./pages/Showtime/Showtime.tsx"));
const FoodsAndDrinks = lazy(() => import("./pages/FoodAndDrink/FoodsAndDrinks.tsx"));
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
const DetailCustomer = lazy(() => import("./pages/Customer/DetailCustomer.tsx"));
const EditEmployee = lazy(() => import("./pages/Employee/EditEmployee.tsx"));
const Analysis = lazy(() => import("./pages/Analysis.tsx"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Suspense fallback={<div>Loading...</div>}> {/* Hiển thị loading khi đang tải */}
				<Login/>
			</Suspense>
		),
	},
	{
		path: "/dashboard",
		element: (
			<Suspense fallback={<div>Loading...</div>}> {/* Hiển thị loading khi đang tải */}
				<PrivateRoute>
					<Dashboard/>
				</PrivateRoute>
			</Suspense>
		),
		children: [
			{
				path: "analysis",
				element: (
					<Suspense fallback={<div>Loading...</div>}> {/* Hiển thị loading khi đang tải */}
						<Analysis/>
					</Suspense>
				),
			},
			{
				path: "movie",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Movie/>
					</Suspense>
				),
			},
			{
				path: "movie/add",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<AddMovie/>
					</Suspense>
				),
			},
			{
				path: "movie/edit/:id",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<EditMovie/>
					</Suspense>
				),
			},
			{
				path: "movie/detail/:id",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<DetailMovie/>
					</Suspense>
				),
			},
			{
				path: "showtime",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Showtime/>
					</Suspense>
				),
			},
			{
				path: "showtime/edit/:id",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<EditShowtime/>
					</Suspense>
				),
			},
			{
				path: "showtime/add",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<AddShowtime/>
					</Suspense>
				),
			},
			{
				path: "employee",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Employee/>
					</Suspense>
				),
			},
			{
				path: "employee/edit/:id",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<EditEmployee/>
					</Suspense>
				),
			},
			{
				path: "customer",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Customer/>
					</Suspense>
				),
			},
			{
				path: "customer/edit/:id",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<EditCustomer/>
					</Suspense>
				),
			},
			{
				path: "customer/detail/:id",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<DetailCustomer/>
					</Suspense>
				),
			},
			{
				path: "foods-and-drinks",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<FoodsAndDrinks/>
					</Suspense>
				),
			},
			{
				path: "information",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<FoodsAndDrinks/>
					</Suspense>
				),
			},
			{
				path: "problem",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Problem/>
					</Suspense>
				),
			},
			{
				path: "event",
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<Event/>
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
						<RouterProvider router={router}/>
						<ReactQueryDevtools initialIsOpen={false}/>
						<Toaster position="top-center"/>
					</QueryClientProvider>
				</LoginProvider>
			</div>
		</div>
	);
}

export default App;
