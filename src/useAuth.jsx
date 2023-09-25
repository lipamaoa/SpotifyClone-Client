import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:5174/login", {
        code,
      })
      .then((res) => {
        
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);
  
  useEffect(()=>{
    if(!refreshToken || !expiresIn) return;
      axios
      .post("http://localhost:5174/refresh", {
          refreshToken,
        })
        .then((res) => {
            console.log("This is the data ",res.data);
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
            
        })
    },[refreshToken, expiresIn])
    
    return accessToken
};

export default useAuth;
