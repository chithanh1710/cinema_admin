import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Movie from "./pages/Movie/Movie";
import Showtime from "./pages/Showtime/Showtime.tsx";
import FoodsAndDrinks from "./pages/FoodAndDrink/FoodsAndDrinks.tsx";
import Customer from "./pages/Customer/Customer.tsx";
import Employee from "./pages/Employee/Employee.tsx";
import { Toaster } from "react-hot-toast";
import Problem from "./pages/Problem";
import Event from "./pages/Event";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { LoginProvider } from "./contexts/LoginContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddMovie from "./pages/Movie/AddMovie";
import EditMovie from "./pages/Movie/EditMovie";
import DetailMovie from "./pages/Movie/DetailMovie";
import AddShowtime from "./pages/Showtime/AddShowtime.tsx";
import EditShowtime from "./pages/Showtime/EditShowtime.tsx";
import EditCustomer from "./pages/Customer/EditCustomer.tsx";
import DetailCustomer from "./pages/Customer/DetailCustomer.tsx";
import EditEmployee from "./pages/Employee/EditEmployee.tsx";
import Analysis from "./pages/Analysis.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login/>,
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<Dashboard/>
			</PrivateRoute>
		),
		children: [
			{
				path: "analysis",
				element: <Analysis/>,
			},
			{
				path: "movie",
				element: <Movie/>,
			},
			{
				path: "movie/add",
				element: <AddMovie/>,
			},
			{
				path: "movie/edit/:id",
				element: <EditMovie/>,
			},
			{
				path: "movie/detail/:id",
				element: <DetailMovie/>,
			},
			{
				path: "showtime",
				element: <Showtime/>,
			},
			{
				path: "showtime/edit/:id",
				element: <EditShowtime/>,
			},
			{
				path: "showtime/add",
				element: <AddShowtime/>,
			},
			{
				path: "employee",
				element: <Employee/>,
			}, {
				path: "employee/edit/:id",
				element: <EditEmployee/>,
			},
			{
				path: "customer",
				element: <Customer/>,
			},
			{
				path: "customer/edit/:id",
				element: <EditCustomer/>,
			}, {
				path: "customer/detail/:id",
				element: <DetailCustomer/>,
			},
			{
				path: "foods-and-drinks",
				element: <FoodsAndDrinks/>,
			},
			{
				path: "information",
				element: <FoodsAndDrinks/>,
			},
			{
				path: "problem",
				element: <Problem/>,
			},
			{
				path: "event",
				element: <Event/>,
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
