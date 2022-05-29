import React from "react";
import SideBar from "../components/SideBar/SideBar";
import { AiFillDashboard } from "react-icons/ai";
import { GiTicket } from "react-icons/gi";
import { AiFillProject } from "react-icons/ai";

export default function Dashboard() {
  const linkDetails = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: AiFillDashboard,
    },
    {
      name: "Projects",
      to: "/projects",
      icon: AiFillProject,
    },
    {
      name: "Tickets",
      to: "/tickets",
      icon: GiTicket,
    },
  ];
  return (
    <div className="h-screen bg-gray-100">
      <div className="h-screen grid max-w-7xl mx-auto">
        <SideBar linkDetails={linkDetails} />
        {/* <div class="row-start-1 row-end-4 col-span-1 bg-slate-700">01</div>
        <div class="col-start-2 col-span-3 ">02</div>
        <div class="row-span-2 col-span-3 ...">03</div> */}
      </div>
    </div>
  );
}
