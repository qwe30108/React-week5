import React from "react";
import axios from "axios";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Login({ getData, setIsAuth }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  // 處理登入
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //發送登入請求
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      // console.log(response.data);

      const { token, expired } = response.data;

      //儲存token到cookie
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

      //設定axios預設header
      axios.defaults.headers.common.Authorization = token;

      //載入產品資料
      getData();

      //更新登入狀態
      setIsAuth(true);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container login">
      <h1>請先登入</h1>
      <form className="form-floating" onSubmit={(e) => onSubmit(e)}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="username"
            placeholder="name@example.com"
            value={formData.username}
            onChange={(e) => handInputChange(e)}
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handInputChange(e)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          登入
        </button>
      </form>
    </div>
  );
}

export default Login;
