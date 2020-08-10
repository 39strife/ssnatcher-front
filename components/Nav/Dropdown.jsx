import React, { useState } from "react";
import { useSpring, a } from "react-spring";

export default function Dropdown({
  children,
  links = [{ label: "", props: {}, icon: "" }],
}) {
  if (typeof children !== "function") {
    throw new Error("Has to be a function");
  }
  const Elem = children;
  const [open, setOpen] = useState(false);
  const style = useSpring({
    to: async (next, cancel) => {
      if (open) {
        await next({
          opacity: 1,
          transform: "translate(0%,0%)",
          display: "block",
        });
      } else {
        await next({ opacity: 0, transform: "translate(0%,100%)" });
        await next({ display: "none" });
      }
    },
  });
  return (
    <div className="dropdown">
      <Elem onClick={() => setOpen(!open)} />
      <a.ul className="dropdown-menu" style={style}>
        {links.map(({ label, props, icon: Icon }, i) => {
          return (
            <li>
              <button {...props}>
                <span className="icon">
                  <Icon />
                </span>{" "}
                {label}
              </button>
            </li>
          );
        })}
      </a.ul>
    </div>
  );
}
