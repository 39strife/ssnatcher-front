import React from "react";
import { useAuth } from "../../lib/globals/AuthContext";
import { Input } from "../../components/Modals/ModalHelpers";
import SettingsLayout from "../../components/Settings/SettingsLayout";

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <SettingsLayout
      title="Settings"
      description="A little change never hurt nobody ✨"
    >
      <form>
        <div className="form-group">
          <Input
            name="username"
            readOnly
            label="Username"
            value={user?.username}
          />
        </div>
        <div className="form-group">
          <Input name="password" label="Current Password" type="password" />
        </div>
        <div className="form-group">
          <Input name="password" label="New Password" type="new_password" />
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
    </SettingsLayout>
  );
}
