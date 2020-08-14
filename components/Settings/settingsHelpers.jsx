import React from "react";
import { Router, useRouter } from "next/router";

export const SettingsMenu = () => {
  const router = useRouter();
  return (
    <div className="col-md-3">
      <ul className="settings-menu">
        <li onClick={() => router.push("/settings")}>Account</li>
        <li onClick={() => router.push("/settings/profile")}>Profile</li>
      </ul>
    </div>
  );
};

export const SettingsForm = ({ children, title, description }) => (
  <div className="col-md-7 offset-md-2">
    <div className="row">
      <div className="col-md-12">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
    {children}
  </div>
);
