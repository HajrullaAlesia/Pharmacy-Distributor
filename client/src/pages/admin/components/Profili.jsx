import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AlertContext from "../../../context/alertContext/AlertContext";
export default function Profili() {
  const alertContext = useContext(AlertContext);
  const [activeTab, setActiveTab] = useState("general");
  const [editEmer, setEditEmer] = useState("");
  const [editMbiemer, setEditMbiemer] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTelefon, setEditTelefon] = useState("");
  const [editEmriBiznezit, setEditEmriBiznesit] = useState("");
  const [editAdresa, setEditAdresa] = useState("");
  const [editQyteti, setEditQyteti] = useState("");
  const [editNipt, setEditNipt] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost/prime/user/getProfile", {
        id: JSON.parse(localStorage.getItem("id")),
      })
      .then((res) => {
        setEditEmer(res.data[0].emer);
        setEditMbiemer(res.data[0].mbiemer);
        setEditEmail(res.data[0].email);
        setEditTelefon(res.data[0].telefon);
        setEditEmriBiznesit(res.data[0].emri_biznesit);
        setEditAdresa(res.data[0].adresa);
        setEditQyteti(res.data[0].qyteti);
        setEditNipt(res.data[0].nipt);
      });
  }, []);

  const generaleChange = (e) => {
    e.preventDefault("");
    const payload = {
      id: JSON.parse(localStorage.getItem("id")),
      emer: editEmer,
      mbiemer: editMbiemer,
      telefon: editTelefon,
      emri_biznesit: editEmriBiznezit,
      email: editEmail,
      adresa: editAdresa,
      qyteti: editQyteti,
      nipt: editNipt,
    };

    axios
      .post("http://localhost/prime/user/changeGeneralProfile", payload)
      .then((res) => {
        if (res.data.status === 1) {
          alertContext.setAlert(`${res.data.message}`, "success");
          axios
            .post("http://localhost/prime/user/getProfile", {
              id: JSON.parse(localStorage.getItem("id")),
            })
            .then((res) => {
              setEditEmer(res.data[0].emer);
              setEditMbiemer(res.data[0].mbiemer);
              setEditEmail(res.data[0].email);
              setEditTelefon(res.data[0].telefon);
              setEditEmriBiznesit(res.data[0].emri_biznesit);
              setEditAdresa(res.data[0].adresa);
              setEditQyteti(res.data[0].qyteti);
              setEditNipt(res.data[0].nipt);
            });
        } else {
          alertContext.setAlert(`${res.data.message}`, "error");
        }
      });
  };

  const changePassword = (e) => {
    e.preventDefault("");
    const payload = {
      id: JSON.parse(localStorage.getItem("id")),
      oldPassword,
      newPassword,
    };
    axios
      .post("http://localhost/prime/user/changePassword", payload)
      .then((res) => {
        if (res.data.status === 1) {
          alertContext.setAlert(`${res.data.message}`, "success");
          setNewPassword("");
          setOldPassword("");
        } else {
          alertContext.setAlert(`${res.data.message}`, "error");
        }
      });
  };

  return (
    <div className="profili">
      <div className="profili-header flex ai-center">
        <p
          className={
            activeTab === "general"
              ? "profili-header-titles active-tab fs-18 fw-regular"
              : "profili-header-titles  fs-18 fw-regular"
          }
          onClick={() => setActiveTab("general")}
        >
          General
        </p>
        <p
          className={
            activeTab === "password"
              ? "profili-header-titles active-tab fs-18 fw-regular"
              : "profili-header-titles  fs-18 fw-regular"
          }
          onClick={() => setActiveTab("password")}
        >
          Password
        </p>
      </div>
      {activeTab === "general" && (
        <form
          onSubmit={generaleChange}
          className="general-form flex jc-spaceb "
        >
          <div className="general-form-left flex fd-column ai-start">
            <div className="general-form-inputs flex fd-column ai-start">
              <label htmlFor="#">Emri</label>
              <input
                type="text"
                placeholder="Emri..."
                value={editEmer}
                onChange={(e) => setEditEmer(e.target.value)}
              />
            </div>
            <div className="general-form-inputs flex fd-column ai-start">
              <label htmlFor="#">Mbiemer</label>
              <input
                type="text"
                placeholder="Mbiemer..."
                value={editMbiemer}
                onChange={(e) => setEditMbiemer(e.target.value)}
              />
            </div>
            <div className="general-form-inputs flex fd-column ai-start">
              <label htmlFor="#">Email</label>
              <input
                type="text"
                placeholder="Email..."
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            <div className="general-form-inputs flex fd-column ai-start">
              <label htmlFor="#">Telefon</label>
              <input
                type="text"
                placeholder="Telefon..."
                value={editTelefon}
                onChange={(e) => setEditTelefon(e.target.value)}
              />
            </div>
          </div>
          <div className="general-form-right">
            <div className="general-form-inputs flex fd-column ai-start">
              <label htmlFor="#">Emri Biznesit</label>
              <input
                type="text"
                placeholder="Emri Biznesit..."
                value={editEmriBiznezit}
                onChange={(e) => setEditEmriBiznesit(e.target.value)}
              />
            </div>
            <div className="general-form-inputs flex fd-column ai-start">
              <label htmlFor="#">Adresa</label>
              <input
                type="text"
                placeholder="Adresa..."
                value={editAdresa}
                onChange={(e) => setEditAdresa(e.target.value)}
              />
            </div>
            <div className="general-form-inputs flex fd-column ai-start">
              <label htmlFor="#">Qyteti</label>
              <input
                type="text"
                placeholder="Qyteti..."
                value={editQyteti}
                onChange={(e) => setEditQyteti(e.target.value)}
              />
            </div>
            <div className="general-form-inputs flex fd-column ai-start">
              <label htmlFor="#">Nipt</label>
              <input
                type="text"
                placeholder="Nipt..."
                value={editNipt}
                onChange={(e) => setEditNipt(e.target.value)}
              />
            </div>

            <button className="general-form-submit-btn fs-18 fw-regular">
              Ruaj
            </button>
          </div>
        </form>
      )}
      {activeTab === "password" && (
        <form
          className="password-form"
          style={{ paddingBottom: "180px" }}
          onSubmit={changePassword}
        >
          <div className="password-form-inputs flex fd-column ai-start">
            <label htmlFor="#">Passwordi i vjeter</label>
            <input
              type="password"
              placeholder="Password i vjeter"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="password-form-inputs flex fd-column ai-start">
            <label htmlFor="#">Passwordi i ri</label>
            <input
              type="password"
              placeholder="Password i ri"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button className="general-form-submit-btn fs-18 fw-regular">
            Ruaj
          </button>
        </form>
      )}
    </div>
  );
}
