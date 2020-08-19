import React, { useState, useRef } from "react";
import { MagnifyingGlass, Profile, Enter, CheckMark } from "../../styles/icons";
import NavSidebar from "./NavSidebar";
import Dropdown from "./Dropdown";
import { useModalContext } from "../../lib/globals/ModalContext";
import { makeClasses, formEventTOJSON } from "../../lib/helpers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth, useAuthActions } from "../../lib/globals/AuthContext";
import { alert } from "../../lib/Alerts/alert";
import { STORAGE_URL } from "../../lib/hooks/useRequest";

export default function Nav() {
  const { setLogin, setRegister } = useModalContext();
  const [focus, setFocus] = useState(false);
  const searchRef = useRef();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { logout } = useAuthActions();
  return (
    <nav>
      <div className="background"></div>
      <div className="nav">
        <Link href="/">
          <a className="brand">
            <div className="brand-logo">
              <img src="" />
            </div>
            <div className="brand-text">
              <h4>String Snatcher</h4>
            </div>
          </a>
        </Link>
        <div className={makeClasses("sides", focus && "focused")}>
          <div className="search">
            <MagnifyingGlass />
            <form
              onSubmit={(e) => {
                const values = formEventTOJSON(e);
                router.push(
                  "/search/[slug]",
                  `/search/${encodeURI(values.search)}`
                );
              }}
            >
              <input
                onClick={async () => {
                  try {
                    const x = await alert();
                  } catch (e) {}
                }}
                name="search"
                ref={searchRef}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                  setFocus(false);
                  searchRef.current.value = "";
                }}
                type="text"
                placeholder="Search..."
              />
            </form>
          </div>
          <div className="profile m-l-2">
            <Dropdown
              links={
                isAuthenticated
                  ? [
                      {
                        label: "Profile",
                        href: "/profile/[slug]",
                        as: "/profile/" + user?.username,
                      },
                      {
                        label: "Settings",
                        href: "/settings",
                      },
                      {
                        label: "New Combo",
                        href: "/settings/new/[new]",
                        as: "/settings/new/combo",
                      },
                      {
                        label: "New Post",
                        href: "/settings/new/[new]",
                        as: "/settings/new/post",
                      },
                      {
                        label: "Log Out",
                        props: {
                          onClick: () => logout(),
                        },
                      },
                    ]
                  : [
                      {
                        label: "Login",
                        props: {
                          onClick: () => setLogin(true),
                        },
                        icon: Enter,
                      },
                      {
                        label: "Register",
                        props: { onClick: () => setRegister(true) },
                        icon: CheckMark,
                      },
                    ]
              }
            >
              {(props) => {
                return isAuthenticated ? (
                  <button {...props} className="nav-avatar_wrapper">
                    <img
                      src={STORAGE_URL + user.profile.avatar}
                      className="nav-avatar"
                    />{" "}
                  </button>
                ) : (
                  <button {...props}>
                    <Profile />
                  </button>
                );
              }}
            </Dropdown>
          </div>
          <div className="burger m-l-2">
            <NavSidebar />
          </div>
        </div>
      </div>
    </nav>
  );
}
