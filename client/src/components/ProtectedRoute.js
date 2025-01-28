import React, { useEffect } from "react";
import { message } from "antd";
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { SetUser } from "../redux/usersSlice";

//the token validation in home page also needs to be other pages
//so instead of writing the same code in every page, we can create a protected route component

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await GetUserInfo();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
        // localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!user) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return user && <div>
    {user.email}
    {props.children}
  </div>;
}

export default ProtectedRoute;
