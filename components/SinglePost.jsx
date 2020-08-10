import React from "react";

export default function SinglePost({ title, image, description }) {
  return (
    <div className="col-md-3">
      <div className="card-post">
        <div className="card-post_body">
          <div className="card-post_image">
            <img src={image} />
          </div>
          <div className="card-post_inner">
            <h3>{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
