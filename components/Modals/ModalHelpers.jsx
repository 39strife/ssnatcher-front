import React from "react";
import { makeClasses } from "../../lib/helpers";

export const Input = ({
  errors = {},
  name = "",
  placeholder = "",
  type = "text",
  label = "",
  readOnly = Boolean,
  value = "",
}) => {
  let error = (() => {
    try {
      return errors[name] || [];
    } catch {
      return [];
    }
  })();
  const hasError = Boolean(error.length);
  return (
    <div className={makeClasses("form-group", hasError && "has-error")}>
      <label htmlFor={name}>{label}</label>
      <input
        defaultValue={value}
        autoComplete="off"
        id={name}
        type={type}
        readOnly={readOnly}
        name={name}
        placeholder={placeholder}
      />
      {hasError && (
        <div className="alert-error">
          {error.map((e, i) => (
            <p key={name + i + "error"}>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export const Consent = ({ errors }) => {
  const error = errors["consent"] || [];
  const hasError = Boolean(error.length);
  return (
    <div className={makeClasses("form-group consent", hasError && "has-error")}>
      <label htmlFor="consent" className="checkbox">
        <input
          type="checkbox"
          onChange={(e) => {
            console.log(e.target.checked);
          }}
          value={true}
          name="consent"
          id="consent"
        />
        <span className="checkbox-custom"></span>
      </label>
      <label htmlFor="consent">
        By signing up you agree to our Terms and Services
      </label>
      {hasError && (
        <div className="alert-error">
          {error.map((e, i) => (
            <p key={name + i + "error"}>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
};
