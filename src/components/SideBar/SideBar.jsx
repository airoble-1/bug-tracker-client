import React from "react";
import SideBarNav from "../SideBarNav/SideBarNav";
import { AiFillBug } from "react-icons/ai";

export default function SideBar({ linkDetails }) {
  return (
    <aside
      className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-700 pt-2"
      aria-label="Sidebar"
    >
      <div className="flex justify-center items-center">
        <AiFillBug className="h-8 w-8 text-indigo-500 mr-2" />
        <span className="text-center">Bug Tracker</span>
      </div>
      <div className="flex flex-col overflow-y-auto">
        <SideBarNav linkDetails={linkDetails} />
      </div>
    </aside>
  );
}
