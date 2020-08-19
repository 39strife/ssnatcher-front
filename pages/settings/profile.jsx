import React from "react";
import { useAuth } from "../../lib/globals/AuthContext";
import {
  Image,
  SocialsInputs,
  Input,
} from "../../components/Modals/ModalHelpers";
import { useForm, apiRoutes, useRequest } from "../../lib/hooks/useRequest";
import SettingsLayout from "../../components/Settings/SettingsLayout";

export default function SettingsPage() {
  const { user } = useAuth();
  const [postData, { loading, message, errors, Message }] = useRequest();
  const form = useForm({
    test: true,
    onSubmit: (formData) => {
      postData(apiRoutes.profile.update, formData);
    },
    formData: true,
  });
  return (
    <SettingsLayout
      title="Profile"
      description="Let's get you looking clean 🧼"
    >
      <form onSubmit={form.handleSubmit}>
        <Image
          errors={errors}
          name="avatar"
          label="Avatar"
          value={user.profile.avatar}
        />
        <Image
          errors={errors}
          name="banner"
          label="Banner"
          value={user.profile.banner}
        />
        <Input
          errors={errors}
          textarea
          value={user.profile.description}
          name="description"
          label="Description"
          placeholder="Tell us something about you"
        />
        <SocialsInputs errors={errors} />
        <Message />
        <div className="form-group">
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </SettingsLayout>
  );
}
