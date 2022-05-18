import React from "react";
import SideBarNav from "../SideBarNav/SideBarNav";

export default function SideBar() {
  return (
    <aside
      className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-slate-700 pt-2"
      aria-label="Sidebar"
    >
      <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
        alt="Teams logo"
      />
      <div className="flex flex-col overflow-y-auto">
        <SideBarNav />
      </div>
    </aside>
  );
}
