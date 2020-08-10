import React from "react";
import { makeClasses } from "../lib/helpers";

export default function CardWithImage({
  title,
  description,
  image,
  red = false,
  right = false,
}) {
  return (
    <div className="col-lg-6 m-t-5">
      <div className={makeClasses("card", red && "red")}>
        <div className={makeClasses("card-body", right && "right")}>
          <div className="card-image">
            <img src={image} />
          </div>
          <div className="card-body_inner">
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <a href="#" className="btn">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
