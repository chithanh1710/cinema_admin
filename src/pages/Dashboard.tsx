import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Main from "../layouts/Main";
import Aside from "../layouts/Aside";
import { useEffect } from "react";

function Dashboard() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/dashboard") {
			navigate("/dashboard/analysis");
		}
	}, [navigate, location.pathname]);

	return (
		<div className="flex h-[100vh] flex-col overflow-hidden">
			<Header/>
			<Main>
				<Aside/>
				<section className="h-full overflow-y-auto py-4 mx-4">
					<Outlet/>
				</section>
			</Main>
			<Footer/>
		</div>
	);
}

export default Dashboard;
