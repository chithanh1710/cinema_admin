import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Movie from "./pages/Movie/Movie";
import Showtime from "./pages/Showtime/Showtime.tsx";
import ProductAndService from "./pages/ProductAndService";
import Customer from "./pages/Customer";
import Employee from "./pages/Employee";
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
			},
			{
				path: "customer",
				element: <Customer/>,
			},
			{
				path: "product-and-service",
				element: <ProductAndService/>,
			},
			{
				path: "information",
				element: <ProductAndService/>,
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
