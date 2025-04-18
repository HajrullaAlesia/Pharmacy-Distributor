import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Excel from "../../../images/excel.png";
import Pdf from "../../../images/pdf.png";
import Word from "../../../images/word.png";
import AlertContext from "../../../context/alertContext/AlertContext";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

export default function ShtoOferta({ klientId, closePop }) {
  const alertContext = useContext(AlertContext);
  const [singleClient, setSingleClient] = useState({});
  const [file, setFile] = useState("");
  const [fileName, setFilename] = useState("");
  const [ofertat, setOfertat] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [porosit, setPorosit] = useState([]);
  const [fileIndex, setFileIndex] = useState(-1);

  useEffect(() => {
    axios
      .post("http://localhost/prime/user/getSinleClient", { user_id: klientId })
      .then((res) => {
        setSingleClient(res.data[0]);
      });

    axios
      .post("http://localhost/prime/user/getSingleOfertClinic", {
        klient_id: klientId,
      })
      .then((res) => {
        setOfertat(res.data);
      });

    axios
      .post("http://localhost/prime/user/getOrder", { klient_id: klientId })
      .then((res) => {
        setPorosit(res.data);
      });
  }, [klientId]);

  console.log(porosit);

  const renderFileType = (type) => {
    if (
      type === "xlsx" ||
      type === "xlsm" ||
      type === "xlsb" ||
      type === "xltx" ||
      type === "xls"
    ) {
      return Excel;
    } else if (type === "pdf") {
      return Pdf;
    } else {
      return Word;
    }
  };

  const dergoDoc = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", fileName);
    formData.append("klient_id", klientId);
    formData.append(
      "type",
      file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
    );

    axios
      .post("http://localhost/prime/user/ngarkoOfert", formData)
      .then((res) => {
        if (res.data.status === 1) {
          alertContext.setAlert(`${res.data.message}`, "succes");
          setFile("");
          setFilename("");
          axios
            .post("http://localhost/prime/user/getSingleOfertClinic", {
              klient_id: klientId,
            })
            .then((res) => {
              setOfertat(res.data);
            });
        }
      });
  };

  console.log(porosit);

  return (
    <div className="shto-oferta-pop flex ai-center jc-center">
      <div className="shto-oferta-pop-opa" onClick={closePop}></div>
      <div className="shto-oferta-pop-content container flex">
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

        <div className="shto-oferta-pop-content-left flex fd-column ai-start">
          <div className="ngarko-doc flex">
            {file ? (
              <div className="flex ai-end" style={{ width: "100%" }}>
                <div className="flex fd-column ai-start">
                  <label className="label-file fs-14 fw-regular" htmlFor="#">
                    Emri Doc
                  </label>
                  <input
                    className="emri-doc"
                    style={{ width: fileName.length + "ch" }}
                    type="text"
                    value={fileName}
                    onChange={(e) => setFilename(e.target.value)}
                  />
                </div>
                <button className="ruaj-file-btn" onClick={() => dergoDoc()}>
                  Ruaj
                </button>
                <button
                  className="ruaj-file-btn anullo-file-btn"
                  onClick={() => setFile("")}
                >
                  Anullo
                </button>
              </div>
            ) : (
              <>
                <label
                  className="ngarko-doc-btn fs-18 fw-regular"
                  htmlFor="file"
                >
                  {" "}
                  Ngarko Doc
                </label>
                <input
                  type="file"
                  id="file"
                  accept=".pdf,image/*,.csv,.doc, .docx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.xls,.xlsx"
                  hidden
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFilename(e.target.files[0].name.split(".")[0]);
                  }}
                />
              </>
            )}
          </div>

          <div className="klient-ofertat flex ai-end">
            {ofertat.map((oferta, index) => (
              <div className="klient-ofertat-item flex fd-column ai-center">
                {activeIndex === index && (
                  <div className="delete-oferta-pop flex fd-column ai-center">
                    <p className="delete-oferta-pop-title">
                      Deshironi te fshini dokumentin
                    </p>
                    <div className="flex ai-center">
                      <button
                        className="delete-oferta-pop-btn"
                        onClick={() => {
                          axios
                            .post(
                              "http://localhost/prime/user/deleteOfertSingleClient",
                              { oferta_id: oferta.id }
                            )
                            .then((res) => {
                              if (res.data.status === 1) {
                                setActiveIndex(-1);
                                alertContext.setAlert(
                                  `${res.data.message}`,
                                  "success"
                                );
                                axios
                                  .post(
                                    "http://localhost/prime/user/getSingleOfertClinic",
                                    { klient_id: klientId }
                                  )
                                  .then((res) => {
                                    setOfertat(res.data);
                                  });
                              } else {
                                alertContext.setAlert(
                                  `${res.data.message}`,
                                  "error"
                                );
                              }
                            });
                        }}
                      >
                        Po
                      </button>
                      <button
                        onClick={() => {
                          setActiveIndex(-1);
                        }}
                        className="delete-oferta-pop-btn"
                      >
                        Jo
                      </button>
                    </div>
                  </div>
                )}
                <div
                  className="delete-oferta"
                  onClick={() => setActiveIndex(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                  >
                    <g
                      id="Group_1245"
                      data-name="Group 1245"
                      transform="translate(-482 -403)"
                    >
                      <g id="Group_1246" data-name="Group 1246">
                        <g
                          id="Group_47"
                          data-name="Group 47"
                          transform="translate(-29 -33)"
                        >
                          <circle
                            id="Ellipse_36"
                            data-name="Ellipse 36"
                            cx="14"
                            cy="14"
                            r="14"
                            transform="translate(511 436)"
                            fill="#e91717"
                          />
                          <g
                            id="Group_46"
                            data-name="Group 46"
                            transform="translate(518.826 443.826)"
                          >
                            <line
                              id="Line_25"
                              data-name="Line 25"
                              x1="12.807"
                              y2="12.807"
                              fill="none"
                              stroke="#fff"
                              stroke-width="1"
                            />
                            <line
                              id="Line_26"
                              data-name="Line 26"
                              x1="12.807"
                              y1="12.807"
                              fill="none"
                              stroke="#fff"
                              stroke-width="1"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <a
                  href={`http://localhost/prime/files/${oferta.file_name}`}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="klient-ofertat-item-image"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={renderFileType(oferta.file_name.split(".")[1])}
                    className="img-res"
                    alt=""
                  />
                </a>
                <p className="klient-ofertat-item-title fs-18 fw-regular">
                  {oferta.file_name}
                </p>
              </div>
            ))}
          </div>
          <p style={{ margin: "20px 0" }} className="fs-24 fw-semi">
            {" "}
            Porosit
          </p>
          <div className="porosite-klient">
            {porosit.length === 0 ? (
              <p>Nuk ka porosi</p>
            ) : (
              <>
                {porosit.map((porosi, index) => (
                  <div className="porosite-klient-item flex jc-center ai-center">
                    {porosi.files.length === 1 ? (
                      <a
                        style={{ textDecoration: "none", color: "inherit" }}
                        href={`http://localhost/prime/files/${porosi.files[0].file_name}`}
                        download
                        target="_blank"
                        rel="noreferrer"
                      >
                        {porosi.date}
                      </a>
                    ) : (
                      <>
                        {fileIndex === index && (
                          <div className="files-client-pop">
                            <p
                              className="files-client-pop-close"
                              onClick={() => setFileIndex(-1)}
                            >
                              X
                            </p>
                            {porosi.files.map((file) => (
                              <a
                                href={`http://localhost/prime/files/${file.file_name}`}
                                download
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={renderFileType(
                                    file.file_name.substring(
                                      file.file_name.lastIndexOf(".") + 1,
                                      file.file_name.length
                                    )
                                  )}
                                  alt=""
                                  className="img-res"
                                />
                              </a>
                            ))}
                          </div>
                        )}

                        <p onClick={() => setFileIndex(index)}>{porosi.date}</p>
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="shto-oferta-pop-content-right flex fd-column ai-center">
          <p className="shto-oferta-pop-content-right-title fs-24 fw-semi">
            {singleClient.emri_biznesit}
          </p>
          <div className="shto-oferta-pop-content-right-items flex ai-center">
            <svg
              id="call"
              xmlns="http://www.w3.org/2000/svg"
              width="19.35"
              height="19.35"
              viewBox="0 0 19.35 19.35"
            >
              <g id="Group_28" data-name="Group 28">
                <path
                  id="Path_26"
                  data-name="Path 26"
                  d="M17.8,12.7a10.986,10.986,0,0,1-3.45-.55,1.577,1.577,0,0,0-1.534.323l-2.176,1.642a12.024,12.024,0,0,1-5.406-5.4L6.826,6.593A1.564,1.564,0,0,0,7.21,5.009a11,11,0,0,1-.552-3.456A1.554,1.554,0,0,0,5.106,0H1.553A1.554,1.554,0,0,0,0,1.553a17.817,17.817,0,0,0,17.8,17.8A1.554,1.554,0,0,0,19.35,17.8V14.253A1.554,1.554,0,0,0,17.8,12.7Z"
                  fill="#101010"
                />
              </g>
            </svg>
            <p className="fs-18 fw-regular">{singleClient.telefon}</p>
          </div>
          <div className="shto-oferta-pop-content-right-items flex ai-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19.885"
              height="14.914"
              viewBox="0 0 19.885 14.914"
            >
              <g id="envelope" transform="translate(0 -64)">
                <g
                  id="Group_30"
                  data-name="Group 30"
                  transform="translate(0 64)"
                >
                  <g id="Group_29" data-name="Group 29">
                    <path
                      id="Path_27"
                      data-name="Path 27"
                      d="M7.06,65.21c2.729,2.311,7.518,6.377,8.925,7.645a.831.831,0,0,0,1.2,0c1.409-1.269,6.2-5.336,8.927-7.647a.414.414,0,0,0,.058-.572,1.645,1.645,0,0,0-1.3-.638H8.3a1.645,1.645,0,0,0-1.3.638A.414.414,0,0,0,7.06,65.21Z"
                      transform="translate(-6.645 -64)"
                      fill="#101010"
                    />
                    <path
                      id="Path_28"
                      data-name="Path 28"
                      d="M19.644,126.45a.412.412,0,0,0-.442.06c-3.027,2.566-6.889,5.854-8.1,6.949a1.678,1.678,0,0,1-2.312,0c-1.3-1.167-5.633-4.855-8.1-6.949a.414.414,0,0,0-.682.316v10.418A1.659,1.659,0,0,0,1.657,138.9H18.228a1.659,1.659,0,0,0,1.657-1.657V126.826A.414.414,0,0,0,19.644,126.45Z"
                      transform="translate(0 -123.988)"
                      fill="#101010"
                    />
                  </g>
                </g>
              </g>
            </svg>

            <p className="fs-18 fw-regular">{singleClient.email}</p>
          </div>
          <div className="shto-oferta-pop-content-right-items flex ai-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.915"
              height="19.204"
              viewBox="0 0 14.915 19.204"
            >
              <path
                id="map-location"
                d="M43.4,0a7.458,7.458,0,0,0-7.458,7.458c0,4.119,5.082,11.746,7.458,11.746s7.458-7.628,7.458-11.746A7.458,7.458,0,0,0,43.4,0Zm0,10.876A3.926,3.926,0,1,1,47.324,6.95,3.926,3.926,0,0,1,43.4,10.876Z"
                transform="translate(-35.941)"
                fill="#101010"
              />
            </svg>

            <p className="fs-18 fw-regular">{singleClient.adresa}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
