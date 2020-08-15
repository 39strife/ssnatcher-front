import { useState } from "react";
import { formEventTOJSON } from "../helpers";
import { useAuthActions } from "../globals/AuthContext";
import nookies from "nookies";
const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "https://api.splustesting.ga/api"
    : "http://127.0.0.1:8000/api";

export async function postData(url = "", data = {} || FormData, ctx = null) {
  return new Promise(async (resolve, reject) => {
    // Default options are marked with *
    const { jwt: token } = nookies.get(ctx);
    let error = false;
    console.log(
      data instanceof FormData ? "multipart/form-data" : "application/json"
    );
    const response = await fetch(BASE_URL + url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
        Authorization: token ? "Bearer " + token : null,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data instanceof FormData ? data : JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((e) => {
        error = e.status === 200;
        return e.json();
      })
      .catch((e) => {
        error = true;
        console.log(e);
      });
    if (error) {
      resolve(response);
    } else {
      reject(response);
    }
  });
}

export async function getData(url = "", ctx = null) {
  return new Promise(async (resolve, reject) => {
    // Default options are marked with *
    const { jwt: token } = nookies.get(ctx);
    let error = false;
    const response = await fetch(BASE_URL + url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accepts: "application/json",
        Authorization: token ? "Bearer " + token : null,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
      .then((e) => {
        error = e.status === 200;
        try {
          resolve(e.json());
        } catch (e) {
          throw e;
        }
      })
      .catch((e) => {
        reject(e);
      });
    console.log(error);
    if (error) {
      resolve(response);
    } else {
      throw response;
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
  profile: {
    me: "/profile/me",
    update: "/profile/update",
  },
};

export function useForm({
  endpoint = "",
  withConsent = false,
  test = false,
  onSubmit = null,
  formData = false,
} = {}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const authActions = useAuthActions();
  const handleSubmit = async (event = HTMLFormElement) => {
    if (formData) {
      event.preventDefault();
      const formData = new FormData(event.target);
      if (test || typeof onSubmit === "function") {
        return onSubmit(formData);
      }
    }
    setLoading(true);
    const json = formEventTOJSON(event);
    if (test || typeof onSubmit === "function") {
      return onSubmit(json);
    }
    if (withConsent && json.consent !== "true") {
      setErrors((state) => ({
        ...state,
        consent: ["You can't sit with us if you don't want to"],
      }));
      return null;
    }
    try {
      const result = await postData(endpoint, json);
      if (result.access_token) {
        console.log(authActions, "authRequest");
        authActions.login(result);
      }
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

export const useRequest = () => {
  const [{ loading, message, errors }, setResponse] = useState({
    loading: false,
    status: false,
    errors: {},
    message: "",
  });
  const useRequest = async (endpoint, data) => {
    setResponse((state) => ({ ...state, loading: true }));

    try {
      const result = await postData(endpoint, data);
      console.log("result", result);
      if (result.message) {
        setResponse((state) => ({ ...state, message: result.message }));
      }
    } catch (e) {
      console.log("e", e);
      setResponse((state) => ({ ...state, message: e.message }));
    } finally {
      setResponse((state) => ({ ...state, loading: false }));
    }
  };
  return [useRequest, { loading, message, errors }];
};
