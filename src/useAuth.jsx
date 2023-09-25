import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [ExpiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5174/login", {
        code,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        window.location = "/";
      });
  }, code);
};

export default useAuth;
