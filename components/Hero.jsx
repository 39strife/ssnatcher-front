import React from "react";
import { useModalContext } from "../lib/globals/ModalContext";

export default function Hero() {
  const { setLogin, setRegister } = useModalContext();
  return (
    <div className="hero">
      <img src="/static/images/hero.png" alt="" />
      <div className="hero-overlay"></div>
      <div className="hero-inner">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12">
              <h1>Level up your fighting game</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                eleifend, felis vel imperdiet sagittis, sem massa eleifend nunc,
                nec laoreet sem quam imperdviet diam.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <button className="btn" onClick={() => setLogin(true)}>
                    Login
                  </button>
                </div>
                <div className="col-md-6">
                  <button className="btn" onClick={() => setRegister(true)}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
