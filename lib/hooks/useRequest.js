import { useState } from "react";
import { formEventTOJSON } from "../helpers";

const BASE_URL =
  // process.env.NODE_ENV !== "development"
  true ? "http://api.splustesting.ga/api" : "http://127.0.0.1:8000/api";

async function postData(url = "", data = {} || FormData) {
  // Default options are marked with *
  const response = await fetch(BASE_URL + url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type":
        data instanceof FormData ? "multipart/form-data" : "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data instanceof FormData ? data : JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return new Promise(async (resolve, reject) => {
    if (response.status === "200") {
      resolve(await response.json());
    } else {
      reject(await response.json());
    }
  });
}

export const apiRoutes = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    authenticate: "/auth/authenticate",
    refresh: "/auth/refresh",
  },
};

export function useForm(endpoint = "", withConsent = false) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (event = HTMLFormElement) => {
    setLoading(true);
    const json = formEventTOJSON(event);
    if (withConsent && json.consent !== "true") {
      setErrors((state) => ({
        ...state,
        consent: ["You can't sit with us if you don't want to"],
      }));
      return null;
    }
    try {
      const result = await postData(endpoint, json);
    } catch (e) {
      setErrors((state) => ({
        ...e.errors,
      }));
      setMessage((state) => e.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    message,
    loading,
    errors,
    handleSubmit,
    Message: () =>
      Boolean(message) && (
        <div className="alert alert-message">
          <p>{message}</p>
        </div>
      ),
  };
}
