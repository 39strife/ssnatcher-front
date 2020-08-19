import React from "react";
import AdminLayout from "../../../lib/AdminLayout";
import { getData, apiRoutes, useForm } from "../../../lib/hooks/useRequest";
import { Input, Image } from "../../../components/Modals/ModalHelpers";

export default function singleCharacter({ character }) {
  const form = useForm({
    formData: true,
    endpoint: apiRoutes.characters.single(character.slug),
  });
  return (
    <AdminLayout>
      <form onSubmit={form.handleSubmit}>
        <Input
          errors={form.errors}
          name="name"
          label="Name"
          value={character.name}
        />
        <Image
          errors={form.errors}
          name="image"
          label="Image"
          value={character.image}
        />
        <Input
          errors={form.errors}
          name="description"
          label="Description"
          value={character.description}
          textarea
        />
        <form.Message />
        <div className="form-group">
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}

singleCharacter.getInitialProps = async (ctx) => {
  return {
    character: await getData(apiRoutes.characters.single(ctx.query.slug), ctx),
  };
};
