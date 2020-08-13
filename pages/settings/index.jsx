import React from "react";
import Layout from "../../lib/Layout";
import { ProtectedRoute, useAuth } from "../../lib/globals/AuthContext";
import { Input } from "../../components/Modals/ModalHelpers";

export default function SettingsPage() {
  const { user } = useAuth();
  console.log(user);
  return (
    <Layout>
      <ProtectedRoute />
      <div className="wrapper p-t-10">
        <div className="row">
          <div className="col-md-4">
            <ul className="settings-menu">
              <li>Account</li>
              <li>Profile</li>
            </ul>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <h1>Settings</h1>
                <p>A little update eh? 😏</p>
              </div>
            </div>
            <form>
              <div className="form-group">
                <Input
                  name="username"
                  readOnly
                  label="Username"
                  value={user.username}
                />
              </div>
              <div className="form-group">
                <Input
                  name="password"
                  label="Current Password"
                  type="password"
                />
              </div>
              <div className="form-group">
                <Input
                  name="password"
                  label="New Password"
                  type="new_password"
                />
              </div>
              <div className="form-group">
                <Input
                  name="password"
                  label="New Password (again)"
                  type="new_password_confirmation"
                />
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-blue">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
