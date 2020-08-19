import React from "react";
import { useAuth, useAuthActions } from "../../lib/globals/AuthContext";
import {
  Image,
  SocialsInputs,
  Input,
} from "../../components/Modals/ModalHelpers";
import {
  useForm,
  apiRoutes,
  useRequest,
  getData,
} from "../../lib/hooks/useRequest";
import SettingsLayout from "../../components/Settings/SettingsLayout";

export default function SettingsPage() {
  const { user } = useAuth();
  const { update } = useAuthActions();
  const [postData, { loading, message, errors, Message }] = useRequest();
  const form = useForm({
    test: true,
    onSubmit: async (formData) => {
      await postData(apiRoutes.profile.update, formData);
      const user = await getData(apiRoutes.profile.me);
      update(user);
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
