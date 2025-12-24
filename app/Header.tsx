"use client";
// Menu data structure
const menuData = [
	{
		label: "Home",
		href: "/datacosmos",
		icon: "ri-home-2-line",
	},
	// {
	//   label: "Admin",
	//   icon: "ri-shield-user-line",
	//   submenu: [
	//     { label: "Dashboard", href: "/dashboard", icon: "ri-dashboard-line" },
	//     { label: "Users", href: "/users", icon: "ri-user-settings-line" },
	//     { label: "Accelerators", href: "/accelerators/list", icon: "ri-rocket-2-line" },
	//   ],
	// },
	{
		label: "Technology Offerings",
		icon: "ri-menu-2-line",
		submenu: [
			{
				label: "SUPERNOVA",
				href: "/offerings/supernova",
				icon: "ri-star-line",
			},
			{ label: "NEBULA", href: "/offerings/nebula", icon: "ri-cloud-line" },
			{
				label: "HYPERNOVA",
				href: "/offerings/hypernova",
				icon: "ri-fire-line",
			},
			{
				label: "PULSAR",
				href: "/offerings/pulsar",
				icon: "ri-flashlight-line",
			},
			{ label: "QUASAR", href: "/offerings/quasar", icon: "ri-lightbulb-line" },
		],
	},
	{
		label: "Industries",
		icon: "ri-building-line",
		submenu: [
			{ label: "BFS Galaxy", href: "/galaxies/bfs", icon: "ri-bank-line" },
			{
				label: "Insurance Galaxy",
				href: "/galaxies/ins",
				icon: "ri-shield-line",
			},
			{ label: "TTH Galaxy", href: "/galaxies/tth", icon: "ri-plane-line" },
			{
				label: "Retail Galaxy",
				href: "/galaxies/retail",
				icon: "ri-shopping-cart-line",
			},
			{
				label: "Healthcare Galaxy",
				href: "/galaxies/healthcare",
				icon: "ri-heart-pulse-line",
			},
			{
				label: "Energy Galaxy",
				href: "/galaxies/energy",
				icon: "ri-government-line",
			},
		],
	},
	{
		label: "Blogs",
		href: "/blogs",
		icon: "ri-article-line",
	},
	{
		label: "Podcasts",
		href: "/podcast",
		icon: "ri-mic-line",
	},
];

type ActivityItem = {
	_id: string;
	type: string;
	createdAt: string;
	meta?: Record<string, any>;
};

// Reusable MenuList component
type MenuListProps = {
	menu: typeof menuData;
	isMobile?: boolean;
	onClose?: () => void;
};
function MenuList({ menu, isMobile = false, onClose }: MenuListProps) {
	const [openIdx, setOpenIdx] = React.useState<number | null>(null);

	// Outside click/escape close for desktop dropdowns
	React.useEffect(() => {
		if (isMobile || openIdx === null) return;
		function handleClick(e: MouseEvent) {
			// Only close if click is outside any dropdown
			if (
				!(e.target as HTMLElement).closest(".offerings-dropdown") &&
				!(e.target as HTMLElement).closest(".galaxies-dropdown")
			) {
				setOpenIdx(null);
			}
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setOpenIdx(null);
			}
		}
		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isMobile, openIdx]);
	return (
		<>
			{menu.map((item, idx) => {
				if (!item.submenu) {
					return (
						<Link
							key={item.label}
							href={item.href}
							className={`menu-link flex items-center gap-2${
								isMobile
									? " text-2xl w-full justify-start"
									: " text-sm xl:text-lg"
							}`}
							onClick={onClose}
						>
							<i
								className={`${item.icon} ${
									isMobile ? "text-2xl" : "text-sm xl:text-lg"
								}`}
							></i>
							{item.label}
						</Link>
					);
				}
				// Submenu
				if (isMobile) {
					return (
						<React.Fragment key={item.label}>
							<button
								className={`menu-link flex items-center gap-2 w-full justify-start text-left${
									isMobile ? " text-2xl" : ""
								}`}
								onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
								aria-expanded={openIdx === idx}
							>
								<i className={`${item.icon} text-2xl`}></i>
								{item.label}
								<span className="ml-auto">
									{openIdx === idx ? "▴" : "▾"}
								</span>
							</button>
							{openIdx === idx && (
								<div className="flex flex-col gap-4 pl-8 w-full">
									{item.submenu.map((sub) => (
										<Link
											key={sub.label}
											href={sub.href}
											className="menu-link flex items-center gap-2"
											onClick={onClose}
										>
											<i className={`${sub.icon} text-2xl`}></i>
											{sub.label}
										</Link>
									))}
								</div>
							)}
						</React.Fragment>
					);
				}
				// Desktop: dropdowns
				// For the last menu (Industries), shift dropdown left
				const isLastMenu = idx === menu.length - 1;
				return (
					<div
						key={item.label}
						className={`relative ${
							item.label === "Technology Offerings"
								? "offerings-dropdown"
								: "galaxies-dropdown"
						}`}
					>
						<button
							className="menu-link flex items-center gap-2 focus:outline-none text-sm xl:text-lg"
							onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
							aria-haspopup="true"
							aria-expanded={openIdx === idx}
						>
							<i className={`${item.icon} text-sm xl:text-lg`}></i>
							{item.label} ▾
						</button>
						{openIdx === idx && (
							<div
								className={`absolute mt-2 min-w-[220px] bg-[#131B3ACF] rounded shadow-lg transition-opacity z-50 ${
									isLastMenu ? "left-[-100px]" : "left-0"
								}`}
							>
								<ul
									className="py-2"
									style={{
										border: "1px solid #add8e66e",
										borderRadius: "0 0 10px 10px",
									}}
								>
									{item.submenu.map((sub) => (
										<li key={sub.label}>
											<Link
												href={sub.href}
												className="menu-link block px-6 py-2 flex items-center gap-2 text-sm xl:text-lg"
											>
												<i className={`${sub.icon} text-sm xl:text-lg`}></i>
												{sub.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				);
			})}
		</>
	);
}

import React, { useState } from "react";
import { Avatar } from "antd";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";
import Link from "next/link";

export default function Header() {
	const { data: session, status } = useSession();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [galaxyDropdownOpen, setGalaxyDropdownOpen] = useState(false);

	const [activityOpen, setActivityOpen] = useState(false);
	const [activities, setActivities] = useState<ActivityItem[]>([]);
	const [activityLoading, setActivityLoading] = useState(false);
	const [activityError, setActivityError] = useState<string | null>(null);

	// Close dropdown on outside click or escape
	React.useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (!(e.target as HTMLElement).closest(".offerings-dropdown")) {
				setDropdownOpen(false);
			}
			if (!(e.target as HTMLElement).closest(".galaxies-dropdown")) {
				setGalaxyDropdownOpen(false);
			}
		}
		function handleEscape(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setDropdownOpen(false);
				setGalaxyDropdownOpen(false);
			}
		}
		if (dropdownOpen || galaxyDropdownOpen) {
			document.addEventListener("mousedown", handleClick);
			document.addEventListener("keydown", handleEscape);
		}
		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [dropdownOpen, galaxyDropdownOpen]);

	// Mobile menu state
	const [menuOpen, setMenuOpen] = useState(false);

	function toggleActivity() {
		const next = !activityOpen;
		setActivityOpen(next);
	}

	// Close activity panel on outside click / escape
	React.useEffect(() => {
		if (!activityOpen) return;
		function handleClick(e: MouseEvent) {
			if (
				!(e.target as HTMLElement).closest(".user-activity-panel") &&
				!(e.target as HTMLElement).closest(".user-activity-trigger")
			) {
				setActivityOpen(false);
			}
		}
		function handleEsc(e: KeyboardEvent) {
			if (e.key === "Escape") setActivityOpen(false);
		}
		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleEsc);
		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleEsc);
		};
	}, [activityOpen]);

	// Theme state
	const [theme, setTheme] = useState(
		typeof window !== "undefined" && window.localStorage.getItem("theme") === "dark" ? "dark" : "light"
	);

	React.useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			window.localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			window.localStorage.setItem("theme", "light");
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	return (
		<>
			{/* Desktop Header (hidden on mobile) */}
			<header className="sticky top-0 z-50 w-full bg-[#0A0F2C] shadow-md py-2 xl:py-4 px-8 items-center justify-between hidden md:flex">
				<div className="flex items-center gap-3">
					<Link href="/datacosmos">
						<Image
							src={`${basePath}/logos/galaxies/coforge-cosmos_white.svg`}
							loading="eager"
							alt="Coforge Logo"
							width={200}
							height={36}
							className="w-[140px] xl:w-[200px]"
							style={{ height: "auto" }}
						/>
					</Link>
				</div>
				<nav className="flex gap-6 items-center">
					<MenuList menu={menuData} />
					<Link href="http://coforge-data-cosmos-apps.eastus2.cloudapp.azure.com:4019/" target="_blank" rel="noopener noreferrer">
						<button className="ml-2 px-4 py-2 rounded bg-[#f15840] text-white font-semibold hover:bg-[#d94c2f] transition text-sm xl:text-base">
							Training Ground
						</button>
					</Link>
					{/* Replace with a single theme toggle button */}
					<button
						className="ml-2 px-4 py-2 rounded bg-gray-700 text-white font-semibold hover:bg-gray-600 transition text-sm xl:text-base flex items-center justify-center"
						onClick={toggleTheme}
						aria-label="Toggle theme"
					>
						{theme === "dark" ? (
							<i className="ri-sun-line text-yellow-400 text-xl"></i>
						) : (
							<i className="ri-moon-line text-blue-400 text-xl"></i>
						)}
					</button>
					{status === "loading" ? null : session && session.user ? (
						<div className="flex items-center gap-3 ml-6 relative">
							<div
								className="user-activity-trigger flex items-center gap-3 cursor-pointer"
								onClick={toggleActivity}
								title="Show my activity"
							>
								<Avatar
									src={
										typeof session.user.image === "string" && session.user.image
											? session.user.image
											: undefined
									}
									alt={session.user.name || session.user.email || "User"}
									size={36}
									style={{
										border: "1px solid #f15840",
										background: "#140436ff",
									}}
								>
									{session.user.name
										? session.user.name[0]
										: session.user.email
										? session.user.email[0]
										: "U"}
								</Avatar>
								<span className="text-white text-sm font-semibold max-w-[160px] truncate">
									{session.user.name || session.user.email}
								</span>
							</div>
							{/* <span className="ps-1 text-white">|</span> */}

							{activityOpen && (
								<div className="p-2 user-activity-panel absolute top-[52px] right-0 w-[150px] max-h-[420px] bg-[#131B3A] border border-[#f15840] rounded shadow-xl flex flex-col overflow-hidden z-50">
									<div className="flex flex-col gap-2 items-center text-center">
										<Link
											href={`/activities`}
											className="px-2 py-1 rounded text-[#f15840] font-semibold shadow hover:bg-[#d94c2f] hover:text-white transition text-sm"
											title="View my activity"
										>
											My Activity
										</Link>
										<hr className="w-full border-t border-[#f15840]" />
										<button
											className="px-2 py-1 rounded text-[#f15840] font-semibold shadow hover:bg-[#d94c2f] hover:text-white transition text-sm"
											onClick={() =>
												signOut({ callbackUrl: `${basePath}/signin` })
											}
										>
											Signout
										</button>
									</div>
								</div>
							)}
						</div>
					) : null}
				</nav>
			</header>

			{/* Mobile Header (visible on < md) */}
			<header className="sticky top-0 z-50 w-full bg-[#0A0F2C] shadow-md md:hidden">
				<div className="h-14 px-4 flex items-center justify-between">
					<Link href="/datacosmos" className="flex items-center">
						<Image
							src={`${basePath}/logos/galaxies/coforge-cosmos_white.svg`}
							loading="eager"
							alt="Coforge Logo"
							width={140}
							height={28}
							className="w-[120px]"
							style={{ height: "auto" }}
						/>
					</Link>
					<button
						aria-label="Toggle menu"
						className="text-white text-2xl"
						onClick={() => setMenuOpen((p) => !p)}
					>
						<i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
					</button>
				</div>

				{menuOpen && (
					<div className="fixed md:hidden top-14 left-0 right-0 bottom-0 bg-[#0A0F2C]/95 backdrop-blur-sm z-50 overflow-y-auto">
						<div className="p-5 flex flex-col gap-6">
							<MenuList menu={menuData} isMobile onClose={() => setMenuOpen(false)} />

							<Link
								href="http://coforge-data-cosmos-apps.eastus2.cloudapp.azure.com:4019/"
								target="_blank"
								rel="noopener noreferrer"
								className="w-full"
								onClick={() => setMenuOpen(false)}
							>
								<button className="w-full px-4 py-3 rounded bg-[#f15840] text-white font-semibold hover:bg-[#d94c2f] transition text-base">
									Training Ground
								</button>
							</Link>

							{status !== "loading" && session?.user && (
								<div className="mt-2 flex flex-col gap-3">
									<div className="flex items-center gap-3">
										<Avatar
											src={
												typeof session.user.image === "string" && session.user.image
													? session.user.image
													: undefined
											}
											alt={session.user.name || session.user.email || "User"}
											size={36}
											style={{ border: "1px solid #f15840", background: "#140436ff" }}
										>
											{session.user.name
												? session.user.name[0]
												: session.user.email
												? session.user.email[0]
												: "U"}
										</Avatar>
										<span className="text-white text-sm font-semibold truncate">
											{session.user.name || session.user.email}
										</span>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<Link
											href="/activities"
											className="px-3 py-2 text-center rounded text-[#f15840] font-semibold border border-[#f15840] hover:bg-[#d94c2f] hover:text-white transition"
											onClick={() => setMenuOpen(false)}
										>
											My Activity
										</Link>
										<button
											className="px-3 py-2 rounded text-[#f15840] font-semibold border border-[#f15840] hover:bg-[#d94c2f] hover:text-white transition"
											onClick={() => {
												setMenuOpen(false);
												signOut({ callbackUrl: `${basePath}/signin` });
											}}
										>
											Signout
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</header>
		</>
	);
}
