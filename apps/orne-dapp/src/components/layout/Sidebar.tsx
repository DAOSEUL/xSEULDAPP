import { useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';
import { Icon } from '../ui/Icon';

export function Sidebar() {
	const sidebar = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => {
		if (sidebar.current) {
			sidebar.current.classList.toggle('!translate-x-0');
		}
	};

	return (
		<>
			<button
				onClick={toggleSidebar}
				className="bg-offWhite fixed top-2 left-2 z-10 flex h-14 w-14 items-center justify-center rounded-full shadow-lg lg:hidden"
			>
				<Icon name="menu" className="w-6" />
			</button>
			<div
				ref={sidebar}
				className="fixed left-0 top-0 z-20 flex h-screen w-full -translate-x-full flex-col items-center justify-between bg-white p-10 transition-transform duration-500 ease-in-out lg:w-80 lg:-translate-x-0 lg:items-start"
			>
				<button
					onClick={toggleSidebar}
					className="bg-offWhite fixed top-2 right-2 z-10 flex h-14 w-14 items-center justify-center rounded-full shadow-lg lg:hidden"
				>
					<Icon name="close" className="w-6" />
				</button>
				<div>
					<Link onClick={toggleSidebar} to={'/'} className="mb-10 block">
						<img src={logo} alt="Orne.io" width={148} height={50} />
					</Link>
					<ul className="flex flex-col items-center gap-6 md:items-start">
						<li onClick={toggleSidebar}>
							<Link
								to={'/'}
								className="hover:text-darkBlue50 flex items-center gap-2 text-2xl font-semibold transition-colors lg:text-base"
							>
								<Icon name="dashboard" />
								Dashboard
							</Link>
						</li>
						<li onClick={toggleSidebar}>
							<Link
								to={'/swap'}
								className="hover:text-darkBlue50 flex items-center gap-2 text-2xl font-semibold transition-colors lg:text-base"
							>
								<Icon name="swap" />
								Swap
							</Link>
						</li>
						<li onClick={toggleSidebar}>
							<Link
								to={'/earn'}
								className="hover:text-darkBlue50 flex items-center gap-2 text-2xl font-semibold transition-colors lg:text-base"
							>
								<Icon name="earn" />
								Earn
							</Link>
						</li>
						{/* <li onClick={toggleSidebar}>
							<Link
								to={'/vault'}
								className="hover:text-darkBlue50 flex items-center gap-2 text-2xl font-semibold transition-colors lg:text-base"
							>
								<Icon name="tree" />
								Trees
							</Link>
						</li>*/}
					</ul>
				</div>
				<div>
					<ul className="flex gap-3">
						<li>
							<a href="https://t.me/orne_io" target="_blank" rel="noreferrer nofollow">
								<Icon name="telegram" />
							</a>
						</li>
						<li>
							<a href="https://twitter.com/orne_i_o" target="_blank" rel="noreferrer nofollow">
								<Icon name="twitter" />
							</a>
						</li>
						<li>
							<a href="https://github.com/orne-io" target="_blank" rel="noreferrer nofollow">
								<Icon name="github" />
							</a>
						</li>
						<li>
							<a href="https://medium.com/@orne" target="_blank" rel="noreferrer nofollow">
								<Icon name="medium" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
