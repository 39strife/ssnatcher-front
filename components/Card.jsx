import React from "react";

export default function Card({ title, description, image, red = false }) {
  return (
    <div className="col-lg-6 m-t-5">
      <div className="card red">
        <div className="card-body">
          <div className="card-image">
            <img src="/static/images/jin.png" />
          </div>
          <div className="card-body_inner">
            <div>
              <h3>TEKKEN 7</h3>
              <p>
                Tekken 7 is a fighting game developed and published by Bandai
                Namco Entertainment. It is the ninth overall installment in the
                Tekken series. Tekken 7 had a limited arcade release in March
                2015.
              </p>
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
