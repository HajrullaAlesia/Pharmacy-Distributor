import React, { useState, useEffect, useContext } from "react";
import ExcelBtn from "../../../images/excel-shkarko.png";
import axios from "axios";
import AlertContext from "../../../context/alertContext/AlertContext";
import Pdf from "../../../images/pdf.png";

export default function ShtoPorosi({ closePop, refreshData }) {
  const alertContext = useContext(AlertContext);
  const [dokumente, setDokumente] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFilename] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost/prime/user/shkarkoCmimet", {
        klient_id: JSON.parse(localStorage.getItem("id")),
      })
      .then((res) => {
        setDokumente(res.data);
      });
  }, []);

  let cmimet;
  if (dokumente !== "") {
    cmimet = dokumente.filter((dok) => {
      return (
        dok.file.split(".")[1] !== "pdf" && dok.file.split(".")[1] !== "docx"
      );
    });
  }
  let kataloget;
  if (dokumente !== "") {
    kataloget = dokumente.filter((dok) => {
      return dok.file.split(".")[1] === "pdf";
    });
  }

  const makeOrder = () => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", fileName);
    formdata.append(
      "type",
      file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
    );
    formdata.append("klient_id", JSON.parse(localStorage.getItem("id")));

    axios
      .post("http://localhost/prime/user/bejPorosi", formdata)
      .then((res) => {
        if (res.data.status === 1) {
          setFile("");
          setFilename("");
          alertContext.setAlert(`${res.data.message}`, "success");
          refreshData();
        } else {
          alertContext.setAlert(`${res.data.message}`, "error");
        }
      });
  };

  return (
    <div className="shtoporosi-pop flex ai-center jc-center">
      <div className="shtoporosi-pop-opa" onClick={closePop}></div>
      <div className="shtoporosi-pop-content container">
        <div className="shtoporosi-pop-content-buttons flex ai-center">
          <a
            href={
              cmimet ? `http://localhost/prime/files/${cmimet[0].file}` : "#"
            }
            download
            className="shtoporosi-pop-content-buttons-shkarko flex ai-center"
          >
            <p className="fs-18 fw-regular"> Shkarko Cmimet </p>
            <img src={ExcelBtn} alt="Exel-logo" />
          </a>

          {file ? (
            <div className="flex ai-center">
              <input
                className="input-porosi-text"
                type="text"
                style={{ width: fileName.length + "ch" }}
                value={fileName}
                onChange={(e) => setFilename(e.target.value)}
              />
              <button
                className="porosi-btn fs-18 fw-regular"
                onClick={() => makeOrder()}
              >
                Dergo
              </button>
              <button
                className="porosi-btn anullo-btn-porosi fs-18 fw-regular"
                onClick={() => {
                  setFile("");
                  setFilename("");
                }}
              >
                Anullo
              </button>
            </div>
          ) : (
            <>
              <label
                className="shtoporosi-pop-content-buttons-porosit fs-18 fw-regular"
                htmlFor="porosi"
              >
                Bej Porosine
              </label>
              <input
                type="file"
                hidden
                id="porosi"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFilename(e.target.files[0].name.split(".")[0]);
                }}
              />
            </>
          )}
        </div>
        <div className="shtoporosi-pop-content-katalogu flex  fd-column ai-start">
          <p className="shtoporosi-pop-content-katalogu-title fs-18 fw-regular">
            Katalogu
          </p>
          {kataloget && (
            <div className="kataloget">
              {kataloget.map((katlog) => (
                <div className="kataloget-item flex fd-column ai-center">
                  <a
                    href={`http://localhost/prime/files/${katlog.file}`}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Pdf} className="img-res" alt="" />
                  </a>
                  <p>{katlog.file}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
