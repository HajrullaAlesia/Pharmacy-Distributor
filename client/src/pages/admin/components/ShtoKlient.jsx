import React, { useState, useContext } from "react";
import axios from "axios";
import AlertContext from "../../../context/alertContext/AlertContext";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

export default function ShtoKlient({ closePop, refreshData }) {
  const alertContext = useContext(AlertContext);
  const [username, setUsername] = useState("");
  const [emer, setEmer] = useState("");
  const [mbiemer, setMbiemer] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [emri_biznesit, setEmriBiznesit] = useState("");
  const [adresa, setAdresa] = useState("");
  const [qyteti, setQyteti] = useState("");
  const [nipt, setNipt] = useState("");

  const shtoKlient = (e) => {
    e.preventDefault();

    const payload = {
      username,
      emer,
      mbiemer,
      password,
      email,
      telefon,
      emri_biznesit,
      adresa,
      qyteti,
      nipt,
    };

    axios.post("http://localhost/prime/user/addClient", payload).then((res) => {
      if (res.data.status === 1) {
        setUsername("");
        setEmer("");
        setMbiemer("");
        setPassword("");
        setEmail("");
        setTelefon("");
        setEmriBiznesit("");
        setAdresa("");
        setQyteti("");
        setNipt("");
        closePop();
        alertContext.setAlert(`${res.data.message}`, "success");
        refreshData();
      } else {
        alertContext.setAlert(`${res.data.message}`, "error");
      }
    });
  };

  return (
    <div className="shtoklient-pop flex jc-center ai-center">
      <div className="shtoklient-pop-opa" onClick={closePop}></div>
      <div className="shtoklient-pop-content container flex fd-column">
        <CloseOutlinedIcon
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "27px",
            cursor: "pointer",
          }}
          onClick={closePop}
        />
        <p className="shtoklient-pop-content-title fs-24 fw-semi">
          Krijo një klient
        </p>
        <form
          className="shtoklient-pop-content-form flex jc-spaceb"
          onSubmit={shtoKlient}
        >
          <div className="shtoklient-pop-content-form-left">
            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Username</label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Emer</label>
              <input
                type="text"
                placeholder="Emer"
                onChange={(e) => setEmer(e.target.value)}
              />
            </div>

            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Mbiemer</label>
              <input
                type="text"
                placeholder="Mbiemer"
                onChange={(e) => setMbiemer(e.target.value)}
              />
            </div>

            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Email</label>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="shtoklient-pop-content-form-right">
            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Telefon</label>
              <input
                type="text"
                placeholder="Telefon"
                onChange={(e) => setTelefon(e.target.value)}
              />
            </div>

            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Emri i Biznesit</label>
              <input
                type="text"
                placeholder="Emri biznesit"
                onChange={(e) => setEmriBiznesit(e.target.value)}
              />
            </div>

            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Adresa</label>
              <input
                type="text"
                placeholder="Adresa"
                onChange={(e) => setAdresa(e.target.value)}
              />
            </div>
            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Qyteti</label>
              <input
                type="text"
                placeholder="Qyteti"
                onChange={(e) => setQyteti(e.target.value)}
              />
            </div>
            <div className="shtoklient-pop-content-form-inputs flex fd-column ai-start  ">
              <label htmlFor="#">Nipt</label>
              <input
                type="text"
                placeholder="Nipt"
                onChange={(e) => setNipt(e.target.value)}
              />
            </div>
            <button className="shtoklient-pop-content-form-submit-btn">
              Ruaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
