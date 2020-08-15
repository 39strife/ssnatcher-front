import React from "react";
import Layout from "../../lib/Layout";
import { getSingleProfile } from "../../lib/requests";
import { STORAGE_URL } from "../../lib/hooks/useRequest";
export default function SingleProfile({ user }) {
  console.log(user);
  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-page-banner">
          <div className="profile-page-banner_overlay"></div>
          <img src={STORAGE_URL + user.profile.banner} />
        </div>
        <div className="wrapper">
          <div className="profile-page-header">
            <div className="row">
              <div className="col-md-4 avatar">
                <img src={STORAGE_URL + user.profile.avatar} />
              </div>
              <div className="col-md-8 description">
                <h1>{user.username}</h1>
                <p>{user.profile.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

SingleProfile.getInitialProps = async (ctx) => {
  const user = await getSingleProfile(ctx.query.slug);
  return { user };
};
