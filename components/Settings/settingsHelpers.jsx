import React from "react";
import { Router, useRouter } from "next/router";

export const SettingsMenu = () => {
  const router = useRouter();
  return (
    <div className="col-md-3">
      <ul className="settings-menu">
        <li onClick={() => router.push("/settings")}>Account</li>
        <li onClick={() => router.push("/settings/profile")}>Profile</li>
        <li
          onClick={() =>
            router.push("/settings/new/[new]", "/settings/new/combo")
          }
        >
          New Combo
        </li>
        <li
          onClick={() =>
            router.push("/settings/new/[new]", "/settings/new/post")
          }
        >
          New Post
        </li>
      </ul>
    </div>
  );
};

export const SettingsForm = ({ children, title, description }) => (
  <div className="col-md-8 offset-md-1">
    <div className="row">
      <div className="col-md-12">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
    {children}
  </div>
);
