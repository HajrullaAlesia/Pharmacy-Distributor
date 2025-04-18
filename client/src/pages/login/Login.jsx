import React, { useState, useContext } from "react";
import LoginImage from "../../images/login-image.png";
import Logo from "../../images/logo-login.png";
import Key from "../../images/key.svg";
import Person from "../../images/user.svg";
import axios from "axios";
import AlertContext from "../../context/alertContext/AlertContext";
export default function Login({ history }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const alertContext = useContext(AlertContext);

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/prime/user/login", {
        username: userName,
        password,
      })
      .then((res) => {
        if (res.data.status === 1 && res.data.role === 1) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("auth", true);
          localStorage.setItem("id", JSON.stringify(res.data.id));
          setTimeout(() => history.push("/admin"), 2000);
          alertContext.setAlert(`${res.data.message}`, "success");
        } else if (res.data.status === 1 && res.data.role === 2) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("auth", true);
          localStorage.setItem("id", JSON.stringify(res.data.id));
          setTimeout(() => history.push("/klient"), 2000);
          alertContext.setAlert(`${res.data.message}`, "success");
        } else {
          alertContext.setAlert(`${res.data.message}`, "error");
        }
      });
  };

  return (
    <div className="login flex">
      <div className="login-container flex container">
        <div className="login-container-left flex ai-center jc-end">
          <div className="login-container-left-content flex ">
            <img src={LoginImage} className="img-res" alt="" />
          </div>
        </div>
        <div className="login-container-right flex fd-column  ai-end">
          <div className="logo-login-content flex">
            <img src={Logo} alt="Logo" className="logo-login img-res" />
          </div>

          <form
            className="login-container-right-form flex fd-column ai-end"
            onSubmit={onLogin}
          >
            <div className="login-container-right-form-inputs flex ai-center ">
              <div className="login-container-right-form-inputs-logo flex ai-center jc-center">
                <img src={Person} alt="" />
              </div>
              <input
                type="text"
                placeholder="Username..."
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-container-right-form-inputs flex ai-center">
              <div className="login-container-right-form-inputs-logo flex ai-center jc-center">
                <img src={Key} alt="" />
              </div>
              <input
                type="password"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-container-right-form-buttons">
              <button className="submit-btn fs-17 fw-regular">Kyçu</button>
            </div>
          </form>

          <div className="social-links">
            <a
              className="social-links-link fs-16 fw-regular"
              href="https://www.youtube.com/"
            >
              Facebook
            </a>
            <a
              className="social-links-link fs-16 fw-regular"
              href="https://www.youtube.com/"
            >
              Instagram
            </a>
            <a
              className="social-links-link fs-16 fw-regular"
              href="https://www.youtube.com/"
            >
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
