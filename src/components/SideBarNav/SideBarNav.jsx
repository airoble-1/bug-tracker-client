import React from "react";
import CustomLink from "./CustomLink";
export default function SideBarNav({ linkDetails }) {
  return (
    <nav className="mt-4 flex flex-col items-center" aria-label="NavBar">
      {linkDetails.map((link) => (
        <CustomLink key={link.name} Icon={link.icon} {...link} />
      ))}
    </nav>
  );
}
