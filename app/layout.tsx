"use client"; // Required for hooks in Next.js App Router

import React, { useContext, useState } from "react";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaHome, FaListOl, FaChartLine, FaStar, FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css"; // Import global styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isLogged = localStorage.getItem("token");
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userOpen, setUserOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const RouteToLogin=()=>{
    if(!isLogged){
      pathname==="/login"?router.push("/login"):router.push("/login");
    }
  }
  const RouteToLogOut=()=>{
    if(isLogged){
      localStorage.removeItem("token");
      router.push("/login");
    }
  }
  return (
    <html lang="en">
      <Head>
        <title>Crypto Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="bg-dark text-white">
        <div className="page-container">
          {/* Top Header */}
          <header className="top-header">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>

            <div className="logo-container">
              <Image src="/logo.jpg" alt="Crypto Tracker Logo" width={50} height={50} className="circular-logo" />
              <span className="site-name">CryptATS</span>
            </div>
            <div className="user" onMouseEnter={()=>{setUserOpen(true)}} onMouseLeave={()=>{setUserOpen(false)}}>
            <FontAwesomeIcon icon={faUser} className="user-icon"onMouseEnter={()=>{setUserOpen(true)}}/>
            <ul className={userOpen?"user-show":"user-hide"} onMouseEnter={()=>{setUserOpen(true)}} onMouseLeave={()=>{setUserOpen(false)}}><li onClick={()=>{!isLogged?RouteToLogin():RouteToLogOut()}}><p>{isLogged?"LogOut":"Login"}</p></li></ul>
            </div>
          </header>

          {/* Sidebar */}
          <aside className={`sidebar ${sidebarOpen ? "" : "hidden"}`}>
            <ul>
              <li className={pathname === "/" ? "active" : ""} onClick={() => router.push("/")}>
                <FaHome /> 
              </li>
              <li className={pathname === "/Rankings" ? "active" : ""} onClick={() => {router.push("/Rankings");RouteToLogin()}}>
                <FaListOl />
              </li>
              <li className={pathname === "/LiveCrypto" ? "active" : ""} onClick={() => {router.push("/LiveCrypto");RouteToLogin()}}>
                <FaChartLine />
              </li>
              <li className={pathname === "/Watchlist" ? "active" : ""} onClick={() => {router.push("/Watchlist");RouteToLogin()}}>
                <FaStar />
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
