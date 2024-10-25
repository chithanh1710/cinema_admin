import { X } from "lucide-react";
import { ReactNode } from "react";

export default function Show({
	                             setIsClick,
	                             children,
	                             title,
                             }: {
	setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
	title: string;
}) {
	return (
		<>
			<div
				onClick={ () => setIsClick(false) }
				className="w-screen h-screen top-0 left-0 fixed bg-black/80 z-40"
			></div>
			<section
				className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden shadow-md z-50">
				<div className="flex justify-between bg-blue-400 p-4">
					<h2 className="text-2xl font-bold text-white">{ title }</h2>
					<button onClick={ () => setIsClick(false) }>
						<X className="size-8 bg-white rounded-full"/>
					</button>
				</div>
				{ children }
			</section>
		</>
	);
}
