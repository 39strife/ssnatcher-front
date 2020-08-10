import Head from "next/head";
import Layout from "../lib/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="hero">
        <img src="/static/images/hero.png" alt="" />
        <div className="hero-overlay"></div>
        <div className="hero-inner">
          <div className="wrapper">
            <h1>Level up your fighting game</h1>
            <div className="row">
              <div className="col-md-6">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  eleifend, felis vel imperdiet sagittis, sem massa eleifend
                  nunc, nec laoreet sem quam imperdviet diam.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn">Login</button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="p-y-10 spotlight">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12">
              <h2>The games we currently support</h2>
            </div>
            <div className="col-md-6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                eleifend, felis vel imperdiet sagittis, sem massa eleifend nunc,
                nec laoreet sem quam imperdviet diam.
              </p>
            </div>
          </div>
        </div>
        <div className="wrapper m-t-10 card-parent">
          <div className="row">
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
                        Tekken 7 is a fighting game developed and published by
                        Bandai Namco Entertainment. It is the ninth overall
                        installment in the Tekken series. Tekken 7 had a limited
                        arcade release in March 2015.
                      </p>
                    </div>
                    <a href="#" className="btn">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 m-t-5">
              <div className="card">
                <div className="card-body right">
                  <div className="card-image">
                    <img src="/static/images/ryu.png" />
                  </div>
                  <div className="card-body_inner">
                    <div>
                      <h3>TEKKEN 7</h3>
                      <p>
                        Tekken 7 is a fighting game developed and published by
                        Bandai Namco Entertainment. It is the ninth overall
                        installment in the Tekken series.
                      </p>
                    </div>
                    <a href="#" className="btn">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
