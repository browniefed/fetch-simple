type Method = "PUT" | "POST" | "GET" | "DELETE";

interface FetchBody {
  path: string;
  token?: string;
  body?: string;
  headers?: object;
}

interface Fetch extends FetchBody {
  method: Method;
  url: string;
}

const appFetch = async ({ url, method, path, body, headers = {} }: Fetch) => {
  const response = await fetch(`${url}${path}`, {
    method,
    headers: {
      ...headers
    },
    body
  });

  try {
    checkStatus(response);
    const data = await response.json();
    return {
      data,
      response
    };
  } catch (e) {
    throw e;
  }
};

export const put = (url: string, defaultHeaders?: any) => ({ headers, ...data }: FetchBody) => {
  return appFetch({ url, method: "PUT", headers: merge(defaultHeaders, headers), ...data });
};
export const post = (url: string, defaultHeaders?: any) => ({ headers, ...data }: FetchBody) => {
  return appFetch({ url, method: "POST", headers: merge(defaultHeaders, headers), ...data });
};
export const get = (url: string, defaultHeaders?: any) => ({ headers, ...data }: FetchBody) => {
  return appFetch({ url, method: "GET", headers: merge(defaultHeaders, headers), ...data });
};
export const del = (url: string, defaultHeaders?: any) => ({ headers, ...data }: FetchBody) => {
  return appFetch({ url, method: "DELETE", headers: merge(defaultHeaders, headers), ...data });
};

export const checkStatus = (resp: Response) => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  } else {
    throw new Error(resp.statusText);
  }
};

export const scopedFetch = ({ url, headers }) => {
  return {
    put: put(url, headers),
    post: post(url, headers),
    get: get(url, headers),
    del: del(url, headers)
  };
};

const merge = (first, second) => ({ ...first, ...second });
