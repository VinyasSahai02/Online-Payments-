import React, { useEffect, useState } from "react";
import { message } from "antd";
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

//the token validation in home page also needs to be other pages
//so instead of writing the same code in every page, we can create a protected route component

function ProtectedRoute(props) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await GetUserInfo();
      if (response.success) {
        setUserData(response.data);
        }
      else {
          message.error(response.message);
          navigate("/login");
        }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!userData) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{props.children}</div>;
}

export default ProtectedRoute;
