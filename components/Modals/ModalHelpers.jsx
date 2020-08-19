import React, { useState, useRef, useEffect } from "react";
import { makeClasses, formatBytes } from "../../lib/helpers";
import { useFiles } from "../../lib/hooks/useFiles";
import { sentenceCase } from "change-case";
import { ExitIcon } from "../../styles/icons";
import { useAuth } from "../../lib/globals/AuthContext";
import { STORAGE_URL } from "../../lib/hooks/useRequest";
const SocialTypes = ["instagram", "facebook", "twitch", "steam", "discord"];

export const SocialsInputs = () => {
  const { user } = useAuth();
  const [socials, setSocials] = useState(
    user?.profile?.socials
      ? user.profile.socials
      : SocialTypes.map((e) => ({ name: e, value: "" }))
  );
  return (
    <div className="socials-editable row">
      <input type="hidden" name="socials" value={JSON.stringify(socials)} />
      {socials.map((social, i) => {
        return (
          <div key={social.name + i} className="form-group col-md-6">
            <label htmlFor={social.name}>{sentenceCase(social.name)}</label>
            <input
              onChange={(x) => {
                const { value, name } = x.target;
                setSocials((state) =>
                  state.map((e) =>
                    e.name === social.name ? { name, value } : e
                  )
                );
              }}
              type="text"
              id={social.name}
              name={social.name}
              value={social.value}
            />
          </div>
        );
      })}
    </div>
  );
};

export const Image = ({ name, label, value, errors = {} }) => {
  const [over, setOver] = useState(false);
  const [files, setFiles] = useFiles();
  const inputRef = useRef(0);
  let error = (() => {
    try {
      return errors[name] || [];
    } catch {
      return [];
    }
  })();
  const hasError = Boolean(error.length);
  return (
    <>
      {Boolean(value) && (
        <div className="form-group image-preview">
          <label>Current {label}:</label>
          <img src={value} />
        </div>
      )}
      <div className="form-group">
        <div
          className={makeClasses("ss-drop", over && "over")}
          // onDrop={(e) => {
          //   e.preventDefault();
          //   e.persist();
          //   const dataTransfer = [...e.dataTransfer.files].filter((e) =>
          //     e.type.includes("image/")
          //   );
          //   setOver(false);
          //   setFiles(dataTransfer);
          // }}
          // onDragOver={(e) => {
          //   e.preventDefault();
          //   setOver(true);
          // }}
          // onDragLeave={(e) => {
          //   e.preventDefault();
          //   setOver(false);
          // }}
        >
          <input
            style={{ display: "none" }}
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            ref={inputRef}
            name={Boolean(files.length) ? name : ""}
            accept="image/*"
          />
          {Boolean(!files.length) && (
            <div
              onClick={() => inputRef.current.click()}
              className="ss-drop_inner"
            >
              <h3>Click here to update your {label}</h3>
            </div>
          )}
          {Boolean(files.length) && (
            <div className="ss-drop_preview">
              {files.map(
                (
                  {
                    lastModifiedDate,
                    name,
                    preview,
                    size,
                    type,
                    webkitRelativePath,
                  },
                  i
                ) => {
                  return (
                    <div
                      key={name + i}
                      className="ss-drop_single-preview row align-center"
                    >
                      <div className="previews col-md-2 m-b-0">
                        <img src={preview} alt={name} />
                      </div>
                      <div className="details col-md-7 offset-md-1 m-b-0">
                        <h3>{name}</h3>
                        <p>
                          {type} - {formatBytes(size, 2)}
                        </p>
                      </div>
                      <div className="remove m-x-auto">
                        <button
                          onClick={() => (
                            setFiles([]), (inputRef.current.value = "")
                          )}
                          type="button"
                        >
                          <ExitIcon />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
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

export const Input = ({
  errors = {},
  textarea = false,
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
  const hasError = Boolean(error.length);
  return (
    <div className={makeClasses("form-group", hasError && "has-error")}>
      <label htmlFor={name}>{label}</label>
      {textarea ? (
        <textarea
          defaultValue={value}
          autoComplete="off"
          id={name}
          type={type}
          readOnly={readOnly ? "readonly" : false}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          onChange={onChange}
          defaultValue={value}
          autoComplete="off"
          id={name}
          type={type}
          readOnly={readOnly ? "readonly" : false}
          name={name}
          placeholder={placeholder}
        />
      )}

      {hasError && (
        <div className="alert-error">
          {error.map((e, i) => {
            const replacements = e.includes("/") ? e.replace("/") : e;
            return <p key={name + i + "error"}>{replacements}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export const Select = ({
  errors = {},
  name = "",
  type = "text",
  label = "",
  readOnly = false,
  value = "",
  onChange = () => {},
  options = [],
  placeholder = "",
}) => {
  if (!options.length) {
    return <></>;
  }
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
      <select
        onChange={onChange}
        defaultValue={value}
        autoComplete="off"
        id={name}
        type={type}
        readOnly={readOnly ? "readonly" : false}
        name={name}
        defaultValue=""
      >
        <option>{placeholder}</option>
        {options.map((e, i) => {
          return <option key={e.value + i}>{e.label}</option>;
        })}
      </select>

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
          onChange={(e) => {}}
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
