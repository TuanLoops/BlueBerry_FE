import axios from "axios";

export const Url = () => {
  return axios.create({
    baseURL: "http://localhost:8080",
  });
};

export const UrlUser = () => {
  let accessToken = JSON.parse(localStorage.getItem("AccessToken"));
  if (accessToken) {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/users",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } else {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/users",
    });
  }
};

export const UrlAppUser = () => {
  let accessToken = JSON.parse(localStorage.getItem("AccessToken"));
  if (accessToken) {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/appusers",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } else {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/appusers",
    });
  }
};

export const UrlStatus = () => {
  let accessToken = JSON.parse(localStorage.getItem("AccessToken"));
  if (accessToken) {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/status",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } else {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/status",
    });
  }
};

export const UrlFriend = () => {
  let accessToken = JSON.parse(localStorage.getItem("AccessToken"));
  if (accessToken) {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/friend",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } else {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/friend",
    });
  }
}

export const UrlSaveArticle = () => {
  let accessToken = JSON.parse(localStorage.getItem("AccessToken"));
  if (accessToken) {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/saved",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } else {
    return axios.create({
      baseURL: "http://localhost:8080/auth/api/saved",
    });
  }
}