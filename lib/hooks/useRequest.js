import { useState } from "react";
import { formEventTOJSON } from "../helpers";
import { useAuthActions } from "../globals/AuthContext";
import nookies from "nookies";
const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "https://api.splustesting.ga/api"
    : "http://127.0.0.1:8000/api";

export const STORAGE_URL =
  process.env.NODE_ENV !== "development"
    ? "https://api.splustesting.ga/"
    : "http://127.0.0.1:8000/";

export async function postData(
  url = "",
  data = {} || FormData,
  ctx = null,
  method = POST
) {
  return new Promise(async (resolve, reject) => {
    // Default options are marked with *
    const { jwt: token } = nookies.get(ctx);
    let error = false;
    const response = await fetch(BASE_URL + url, {
      method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
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
  characters: {
    all: "/character",
    single: (slug) => "/character/" + slug,
    charactersByGame: (slug) => "/character?game=" + slug,
  },
  games: {
    all: "/gaames",
  },
  games: {
    all: "/games",
    single: (slug) => "/games/" + slug,
  },
  profile: {
    me: "/profile/me",
    update: "/profile/update",
    single: (slug) => "/profile/" + slug,
  },
};

export function useForm({
  endpoint = "",
  withConsent = false,
  test = false,
  onSubmit = null,
  formData = false,
  method = "POST",
} = {}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const authActions = useAuthActions();
  const handleSubmit = async (event = HTMLFormElement) => {
    setLoading(true);
    const json = formEventTOJSON(event);
    const formDataData = new FormData(event.target);
    formDataData.append("_method", method);
    const data = formData ? formDataData : json;
    if (test || typeof onSubmit === "function") {
      return onSubmit(data);
    }
    if (withConsent && json.consent !== "true") {
      setErrors((state) => ({
        ...state,
        consent: ["You can't sit with us if you don't want to"],
      }));
      return null;
    }
    try {
      const result = await postData(endpoint, data, null, method);
      console.log(result);
      if (result && result.access_token) {
        authActions.login(result);
      }
    } catch (e) {
      console.log(e);
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
      if (result.message) {
        setResponse((state) => ({
          ...state,
          message: result.message,
          errors: {},
        }));
      }
    } catch (e) {
      setResponse((state) => ({
        ...state,
        message: e.message,
        errors: e.errors,
      }));
    } finally {
      setResponse((state) => ({ ...state, loading: false }));
    }
  };
  return [
    useRequest,
    {
      loading,
      message,
      errors,
      Message: () =>
        Boolean(message) && (
          <div className="alert alert-message">
            <p>{message}</p>
          </div>
        ),
    },
  ];
};
