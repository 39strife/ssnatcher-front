import React from "react";

export default function SinglePost({
  title,
  image,
  description,
  viewAll = false,
}) {
  if (viewAll) {
    return (
      <div className="col-md-3">
        <div className="card-post">
          <div className="card-post_thumb">
            <img src="/static/images/king.png" alt="" />
            <div className="card-post_thumb_inner">
              <div className="card-post_thumb__inner">
                <h3>VIEW ALL</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
