import React, { useState, useRef } from "react";
import { useSpring, a } from "react-spring";
import useOutside from "../../lib/hooks/useOutside";

export default function Dropdown({
  children,
  links = [{ label: "", props: {}, icon: "" }],
}) {
  if (typeof children !== "function") {
    throw new Error("Has to be a function");
  }
  const Elem = children;
  const [open, setOpen] = useState(false);
  const elemRef = useRef(0);
  const style = useSpring({
    to: async (next, cancel) => {
      if (open) {
        await next({
          opacity: 1,
          transform: "translate(0%,0%)",
          display: "block",
        });
      } else {
        await next({ opacity: 0, transform: "translate(0%,50%)" });
        await next({ display: "none" });
      }
    },
    from: { opacity: 0, transform: "translate(0%,50%)", display: "none" },
  });
  useOutside(elemRef, () => open && setOpen(false));
  return (
    <div className="dropdown" ref={elemRef}>
      <Elem onClick={() => setOpen(!open)} />
      <a.ul className="dropdown-menu" style={style}>
        {links.map(({ label, props, icon: Icon }, i) => {
          return (
            <li key={i + "dropdown"}>
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
