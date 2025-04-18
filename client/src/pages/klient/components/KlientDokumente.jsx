import React, { useState, useEffect } from "react";
import axios from "axios";
import Excel from "../../../images/excel.png";
import Pdf from "../../../images/pdf.png";
import Word from "../../../images/word.png";

export default function KlientDokumente({ closePop, klientId, refreshData }) {
  const [files, setFiles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    axios
      .post("http://localhost/prime/user/getSingleClientFiles", {
        porosi_id: klientId,
        klient_id: JSON.parse(localStorage.getItem("id")),
      })
      .then((res) => {
        setFiles(res.data);
      });
  }, []);
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
  console.log(files);

  return (
    <div className="klientdokumente-pop flex ai-center jc-center">
      <div className="klientdokumente-pop-opa" onClick={closePop}></div>
      <div className="klientdokumente-content container flex">
        {files.map((file, index) => (
          <div className="dokumente flex ai-center fd-column jc-end">
            {index === activeIndex && (
              <div className="dokumente-delete flex fd-column ai-center">
                <p className="fs-16 fw-regular">
                  Jeni te sigurt qe doni ta fshini?
                </p>
                <div className="dokumente-delete-buttons">
                  <button
                    className="fs-16 fw-regular"
                    onClick={() => {
                      axios
                        .post("http://localhost/prime/user/deleteClientFile", {
                          porosi_id: file.id,
                          id: file.porosi_id,
                        })
                        .then((res) => {
                          console.log(res.data);
                          if (res.data.status === 1) {
                            setActiveIndex(-1);
                            axios
                              .post(
                                "http://localhost/prime/user/getSingleClientFiles",
                                {
                                  porosi_id: klientId,
                                  klient_id: JSON.parse(
                                    localStorage.getItem("id")
                                  ),
                                }
                              )
                              .then((res) => {
                                setFiles(res.data);
                              });
                            refreshData();
                          } else if (
                            res.data.status === 2 ||
                            res.data.closepop === 1
                          ) {
                            setActiveIndex(-1);
                            axios
                              .post(
                                "http://localhost/prime/user/getSingleClientFiles",
                                {
                                  porosi_id: klientId,
                                  klient_id: JSON.parse(
                                    localStorage.getItem("id")
                                  ),
                                }
                              )
                              .then((res) => {
                                setFiles(res.data);
                              });
                            refreshData();
                            closePop();
                          }
                        });
                    }}
                  >
                    Po
                  </button>
                  <button
                    className="fs-16 fw-regular"
                    onClick={() => setActiveIndex(-1)}
                  >
                    Jo
                  </button>
                </div>
              </div>
            )}
            <div
              className="dokumente-close"
              style={{ display: activeIndex === index ? "none" : "" }}
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
              href={`http://localhost/prime/files/${file.file}`}
              download
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={renderFileType(
                  file.file.substring(
                    file.file.lastIndexOf(".") + 1,
                    file.file.length
                  )
                )}
                alt=""
              />
            </a>
            <p>{file.file}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
