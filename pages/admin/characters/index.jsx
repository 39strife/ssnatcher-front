import React, { useState } from "react";
import { ProtectedRoute } from "../../../lib/globals/AuthContext";
import Layout from "../../../lib/Layout";
import { useRouter } from "next/router";
import { getData, apiRoutes, STORAGE_URL } from "../../../lib/hooks/useRequest";
import SideMenu from "../../../components/Admin/SideMenu";
import AdminLayout from "../../../lib/AdminLayout";
import { Input } from "../../../components/Modals/ModalHelpers";

export default function characterPanel({ characters }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <AdminLayout>
      <div className="row">
        <div className="col-md-12">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            label="Search"
          />
        </div>
        {characters.map(({ name, slug, image, description }, i) => {
          if (!name.toLowerCase().includes(search.toLowerCase())) {
            return <></>;
          }
          return (
            <div
              key={slug}
              onClick={() =>
                router.push(
                  "/admin/characters/[slug]",
                  "/admin/characters/" + slug
                )
              }
              className="col-md-4 cursor-pointer admin-character"
            >
              <img src={image} />
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}

characterPanel.getInitialProps = async (ctx) => {
  const result = await getData(apiRoutes.characters.all, ctx);
  return { characters: result };
};
