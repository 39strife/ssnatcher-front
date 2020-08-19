import React from "react";
import Layout from "../../lib/Layout";
import { getSingleProfile } from "../../lib/requests";
import { STORAGE_URL } from "../../lib/hooks/useRequest";
export default function SingleProfile({ user }) {
  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-page-banner">
          <div className="profile-page-banner_overlay"></div>
          <img src={user.profile.banner} />
        </div>
        <div className="wrapper">
          <div className="profile-page-header">
            <div className="row">
              <div className="col-md-4 avatar">
                <img src={user.profile.avatar} />
              </div>
              <div className="col-md-8 description">
                <div className="row align-center">
                  <div className="col-md-6">
                    <h1>{user.username}</h1>
                  </div>
                  <div className="col-md-6">
                    <div className="profile-page_socials">
                      {Boolean(user.profile.socials) &&
                        user.profile.socials.map((e) => {
                          return <span>{e.value}</span>;
                        })}
                    </div>
                  </div>
                </div>
                <p>{user.profile.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper p-y-10">
          <div className="row">
            <div className="col-md-12">
              <h2>Combos</h2>
            </div>
          </div>
        </div>
        <div className="wrapper p-y-10">
          <div className="row">
            <div className="col-md-12">
              <h2>Posts</h2>
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
