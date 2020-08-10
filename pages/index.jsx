import Head from "next/head";
import Layout from "../lib/Layout";
import CardWithImage from "../components/CardWithImage";
import Hero from "../components/Hero";
import SinglePost from "../components/SinglePost";

const cards = [
  {
    image: "/static/images/jin.png",
    title: "Tekken 7",
    description:
      "Tekken 7 is a fighting game developed and published by Bandai Namco Entertainment. It is the ninth overall installment in the Tekken series. Tekken 7 had a limited arcade release in March 2015.",
    link: "#",
    red: true,
  },
  {
    image: "/static/images/ryu.png",
    title: "Street Fighter V",
    description:
      "Tekken 7 is a fighting game developed and published by Bandai Namco Entertainment. It is the ninth overall installment in the Tekken series.",
    link: "#",
  },
];

const posts = [
  {
    title: "Why fighting games are good for you",
    image: "https://images.indianexpress.com/2020/06/Tekken7.jpg",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    title: "Why fighting asdasdasd are good for you",
    image: "https://images.indianexpress.com/2020/06/Tekken7.jpg",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    title: "Why asdasdas dasdasdasd asdasd asdasd games are good for you",
    image: "https://images.indianexpress.com/2020/06/Tekken7.jpg",
    description: "Lorem ipsum dolor asdas dasd asdasd asd sit amet",
  },
  {
    title: "Why fighting games are good for you",
    image: "https://images.indianexpress.com/2020/06/Tekken7.jpg",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    title: "Why fighting games are good for you",
    image: "https://images.indianexpress.com/2020/06/Tekken7.jpg",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    title: "Why fighting games are good for you",
    image: "https://images.indianexpress.com/2020/06/Tekken7.jpg",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    title: "Why fighting games are good for you",
    image: "https://images.indianexpress.com/2020/06/Tekken7.jpg",
    description: "Lorem ipsum dolor sit amet",
  },
];

export default function Home() {
  return (
    <Layout>
      <Hero />
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
            {cards.map((e, i) => (
              <CardWithImage right={i % 2} {...e} key={i + "homeCard"} />
            ))}
          </div>
        </div>
      </section>
      <section className="p-y-10">
        <div className="wrapper">
          <div className="row text-right">
            <div className="col-md-12">
              <h2>Blog</h2>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <p>Good ol’ reading material</p>
            </div>
          </div>
        </div>
        <div className="wrapper m-t-10">
          <div className="row">
            {posts.map((e, i) => (
              <SinglePost {...e} key={i + "homeCard"} />
            ))}
            <SinglePost viewAll />
          </div>
        </div>
      </section>
    </Layout>
  );
}
