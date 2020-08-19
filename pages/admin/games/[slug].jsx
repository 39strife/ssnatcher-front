import React from "react";
import AdminLayout from "../../../lib/AdminLayout";
import { getData, apiRoutes, useForm } from "../../../lib/hooks/useRequest";
import { Input, Image } from "../../../components/Modals/ModalHelpers";

export default function singleGame({ game }) {
  const form = useForm({
    formData: true,
    endpoint: apiRoutes.games.single(game.slug),
  });
  return (
    <AdminLayout>
      <form onSubmit={form.handleSubmit}>
        <Input
          errors={form.errors}
          name="name"
          label="Name"
          value={game.name}
        />
        <Image
          errors={form.errors}
          name="image"
          label="game"
          value={game.image}
        />
        <Input
          errors={form.errors}
          name="description"
          label="Description"
          value={game.description}
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
    game: await getData(apiRoutes.games.single(ctx.query.slug), ctx),
  };
};
