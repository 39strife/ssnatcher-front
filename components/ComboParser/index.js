import { useState, useEffect } from "react";
import { makeClasses } from "../../lib/helpers";
import comboVars from "./comboVars.json";
import { Select } from "../Modals/ModalHelpers";
import { CheckMark } from "../../styles/icons";
import { headerCase, sentenceCase } from "change-case";

const STRING_URL = "/static/stringBuilder/";
export const ComboParser = ({ combo }) => {
  if (!combo) {
    return null;
  }
  console.log(combo.trim().split(" ").filter(Boolean));
  return (
    <div className="combo-parser">
      {combo
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((e, i) => {
          const parse = (() => {
            if (comboVars.all.includes(e)) {
              return {
                type: "svg",
                content: e + ".svg",
              };
            } else if (e === ",") {
              return {
                type: "next",
                content: "Next.svg",
              };
            } else if (e.includes("/")) {
              return {
                type: "svg",
                content: e.replace("/", "") + ".svg",
              };
            } else if (typeof e !== "undefined" && Boolean(e)) {
              return {
                type: "tooltip",
                content: e,
              };
            }
          })();
          const isAttack = comboVars.attacks.includes(
            parse.content.replace(".svg", "")
          );
          const isMovement = comboVars.movement.includes(
            parse.content.replace(".svg", "")
          );
          const className =
            (isAttack && "attack") || (isMovement && "movement");
          switch (parse.type) {
            case "svg":
              return (
                <img
                  key={i + "comboPreview"}
                  className={className || ""}
                  src={`${STRING_URL}${parse.content}`}
                />
              );
            case "next":
              return (
                <img
                  key={i + e + "comboPreview"}
                  className="next"
                  src={`${STRING_URL}${parse.content}`}
                />
              );
            case "tooltip":
              return (
                <span key={i + e + "comboPreview"} className="tooltip">
                  {parse.content}
                </span>
              );
            default:
              return (
                <span key={i + e + "comboPreview"} className="tooltip">
                  unknwon
                </span>
              );
          }
        })}
    </div>
  );
};

const Checkbox = ({ value, label, name, onChange }) => {
  return (
    <div className={makeClasses("checkbox-wrapper")}>
      <label htmlFor={name} className="checkbox">
        <input
          type="checkbox"
          onChange={onChange}
          value={true}
          name={name}
          id={name}
        />
        <span className="checkbox-custom"></span>
      </label>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

const Radio = ({ value, valueChecked, label, name, onChange }) => {
  return (
    <div className={makeClasses("checkbox-wrapper")}>
      <label htmlFor={name + value} className="checkbox">
        <input
          type="radio"
          onChange={onChange}
          value={value}
          name={name}
          defaultChecked={valueChecked === value}
          id={name + value}
        />
        <span className="checkbox-custom"></span>
      </label>
      <label htmlFor={name + value}>{label}</label>
    </div>
  );
};

const ComboGrid = ({ onChange }) => {
  const [type, setType] = useState("all");
  const [comboArray, setArray] = useState([]);
  useEffect(() => {
    console.log(comboArray);
    if (typeof onChange === "function") {
      onChange(comboArray.join(" "));
    }
  }, [comboArray.length]);
  return (
    <div className="combo-grid">
      <div className="combo-grid_header">
        <ul>
          {Object.keys(comboVars).map((e, i) => (
            <li key={e + i} onClick={() => setType(e)}>
              {sentenceCase(e)}
            </li>
          ))}
          <li
            onClick={() =>
              setArray((arr) =>
                arr.filter((e, i) => {
                  console.log(i - 1 !== arr.length);
                  return i + 1 !== arr.length;
                })
              )
            }
          >
            Remove
          </li>
        </ul>
      </div>
      <div className="combo-grid_icons">
        {comboVars[type].map((e, i) => (
          <div
            onClick={() => {
              const parse = (() => {
                switch (e) {
                  case "Next":
                    return " , ";
                  default:
                    return e;
                }
              })();
              setArray((array) => [...array, parse]);
            }}
            key={e + i}
            className="single-icon"
          >
            <img src={STRING_URL + e + ".svg"} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ComboMaker = ({
  errors = {},
  name = "",
  placeholder = "",
  type = "text",
  label = "",
  readOnly = false,
  value = "",
  onChange = () => {},
}) => {
  let error = (() => {
    try {
      return errors[name] || [];
    } catch {
      return [];
    }
  })();
  const [innerValue, setValue] = useState(value);
  const [comboType, setType] = useState("text");
  console.log(comboType);
  const hasError = Boolean(error.length);
  return (
    <>
      <ComboParser combo={innerValue} />
      <div className={makeClasses("form-group", hasError && "has-error")}>
        <label htmlFor={name}>{label}</label>
        <div className="way-combo">
          <Radio
            label="Text"
            name="comboType"
            value="text"
            valueChecked={comboType}
            onChange={(e) => setType(e.target.value)}
          />
          <Radio
            label="Visual"
            name="comboType"
            valueChecked={comboType}
            value="visual"
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        {comboType === "visual" && <ComboGrid onChange={(e) => setValue(e)} />}
        <input
          onChange={(e) => {
            e.persist();
            setValue(e.target.value);
          }}
          value={innerValue}
          autoComplete="off"
          id={name}
          type={type}
          readOnly={readOnly ? "readonly" : false}
          name={name}
          placeholder={placeholder}
        />
        <small className="note">
          Please use spaces between commas, so our parser can work in real time!
          😈💘
        </small>
        {hasError && (
          <div className="alert-error">
            {error.map((e, i) => (
              <p key={name + i + "error"}>{e}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
