import axios from "axios";
import useAuth from "../hooks/useAuth";

const { CancelToken } = axios;

const cancel = {};

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  const refresh = localStorage.getItem("refreshToken");
  const expires = localStorage.getItem("expiresIn");
  // if (!refresh) {
  //   // localStorage?.clear();
  //   window.history.pushState({}, null, "/auth");
  //   return;
  // }
  if (
    (new Date().getTime() >= expires ||
      isNaN(expires || token === "undefined")) &&
    refresh
  ) {
    axios
      .post("http://localhost:4000/refresh", {
        refresh,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res?.data?.accessToken);
        const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
        localStorage.setItem("expiresIn", expires);
        return res?.data?.accessToken;
      })
      .catch(() => {
        window.location = "/auth";
      });
  } else {
    if (isNaN(expires) || token === "undefined") {
      axios
        .post("http://localhost:4000/refresh", {
          refresh,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("accessToken", res?.data?.accessToken);
          const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
          localStorage.setItem("expiresIn", expires);
          return res?.data?.accessToken;

          // navigate("/home");
        })
        .catch(() => {
          window.location = "/auth";
        });
    } else {
      return token;
    }
  }
};
// Common Request
export async function request(options) {
  if (options.cancel_token && cancel[options.cancel_token]) {
    cancel[options.cancel_token]();
  }
  try {
    const response = await axios(
      formatRequest(
        options.method,
        options.url,
        options.params,
        options.is_authenticated,
        options.content_type,
        options.cancel_token
      )
    );
    return handleResponse(options.route, response, options.is_authenticated);
  } catch (error) {
    // if (axios.isCancel(error)) {
    //   return false;
    // }
    return handleError(options.route, error, options.hideModal);
  }
}

// Formate Request Options
export function formatRequest(
  method = "GET",
  url = null,
  params = null,
  isAuthenticated = true,
  contentType = "json",
  cancelToken = null
) {
  const requestOptions = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    credentials: "include",
    method,
    url: `${process.env.REACT_APP_API_URL}${url}`,
  };
  if (isAuthenticated) {
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken = getAccessToken();
    console.log(accessToken);

    if (accessToken) {
      requestOptions.headers.Authorization = `${accessToken}`;
    }
  }

  if (method === "GET" && params) {
    requestOptions.params = params;
  } else if (contentType === "json") {
    requestOptions.headers["Content-Type"] = "application/json";
    requestOptions.data = params;
  } else {
    requestOptions.data = params;
  }
  if (cancelToken) {
    requestOptions.cancelToken = new CancelToken((c) => {
      cancel[cancelToken] = c;
    });
  }

  return requestOptions;
}

// Handle Error  Response
export function handleError(route, error, hideModal) {
  if (error && error.response) {
    if (error.response.status === 401) {
      hideModal && hideModal();
      localStorage.removeItem("userAccessToken");
      window.location.assign("/auth");
    }
  }
  return Promise.reject(error);
}

// Handle Response
export function handleResponse(route, response) {
  return response;
}

export default request;
