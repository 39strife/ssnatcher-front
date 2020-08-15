import { render, unmountComponentAtNode } from "react-dom";
import { useEffect, useRef, useState } from "react";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function CustomAlert({ text, onClick, cancellable = false }) {
  const id = useRef("alert" + makeid(5));
  const [animationState, setAnimationState] = useState("animate-in");
  useEffect(() => {
    setTimeout(() => setAnimationState("hold"), 500);
  }, []);
  const handleClose = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onClick === "function") {
      onClick(i);
      setAnimationState("animate-out");
      setTimeout(
        () =>
          unmountComponentAtNode(
            document.getElementById(id.current).closest("#Alertify-container")
          ),
        500
      );
    }
  };
  return (
    <div
      className={["alert", animationState].join(" ")}
      id={id.current}
      onClick={(e) => handleClose(e, cancellable)}
    >
      <div
        className={["alert-inner"].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="alert-inner_text">{text}</div>
        <div className="button-container">
          <button className="btn m-t-5" onClick={(e) => handleClose(e, true)}>
            OK
          </button>
          {cancellable && (
            <button
              className="btn m-t-5"
              onClick={(e) => handleClose(e, false)}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export async function alert() {
  const parent = document.getElementById("Alertify-container");
  return new Promise((resolve, reject) => {
    render(
      <CustomAlert
        onClick={(e) => (e ? resolve("I accepted") : reject("I rejected"))}
        text="I am an alert"
      />,
      parent
    );
  });
}
