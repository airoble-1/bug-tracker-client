import React from "react";
import classNames from "classnames";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function CustomLink({ children, to, Icon, name, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      className={classNames(
        match
          ? "bg-blue-700 text-white"
          : "text-gray-300 hover:bg-blue-700 hover:text-white",
        "w-full flex items-center py-3 px-3"
      )}
      to={to}
    >
      <Icon className="h-5 w-5 mr-2" />
      {name}
    </Link>
  );
}
