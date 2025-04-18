import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Pagination from "@material-ui/lab/Pagination";
import ShtoPorosi from "./ShtoPorosi";
import axios from "axios";
import KlientDokumente from "./KlientDokumente";

export default function Porosite() {
  const [porosite, setPorosite] = useState([]);
  const [shtoPorosi, openShtoPorosi] = useState(false);
  const [klientDokumente, openKlientDokumente] = useState(false);
  const [klientId, setKlientId] = useState("");
  const [porosiaFile, setPorosiaFile] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(10);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  useEffect(() => {
    axios
      .post("http://localhost/prime/user/getOrder", {
        klient_id: JSON.parse(localStorage.getItem("id")),
      })
      .then((res) => {
        setPorosite(res.data);
        if (res.data !== "") {
        }
      });
  }, []);
  const refreshData = () => {
    axios
      .post("http://localhost/prime/user/getOrder", {
        klient_id: JSON.parse(localStorage.getItem("id")),
      })
      .then((res) => {
        setPorosite(res.data);
      });
  };
  const filteredKlient = porosite.filter((pacient) =>
    pacient.date.toString().toLowerCase().includes(search.toLowerCase())
  );
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      {klientDokumente && (
        <KlientDokumente
          refreshData={() => refreshData()}
          closePop={() => openKlientDokumente(false)}
          klientId={klientId}
        />
      )}
      {shtoPorosi && (
        <ShtoPorosi
          refreshData={() => refreshData()}
          closePop={() => openShtoPorosi(false)}
        />
      )}
      <div className="porosite-header flex ai-center jc-spaceb">
        <div className="flex">
          <p className="porosite-header-title fs-40 fw-bold">Porosite</p>
          <span className="porosite-header-subtitle fs-24 fw-regular">
            ({porosite.length})
          </span>
        </div>
        <div className="flex ai-center">
          <div className="admin-container-header-search flex ai-center jc-spaceb">
            <input
              type="text"
              placeholder="Kerko..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchOutlinedIcon style={{ color: "#FFD4B4" }} />
          </div>
          <button
            className="porosite-header-btn-shto fs-18 fw-regular"
            onClick={() => openShtoPorosi(true)}
          >
            {" "}
            + Shto Porosi
          </button>
        </div>
      </div>

      <div className="porosite-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredKlient.slice(start, end).map((porosi) => (
              <TableRow
                style={{ cursor: "pointer" }}
                onClick={() => {
                  openKlientDokumente(true);
                  setKlientId(porosi.id);
                }}
              >
                <TableCell>#{porosi.id}</TableCell>
                <TableCell>{porosi.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="pagination flex jc-end">
        <Pagination
          count={Math.ceil(filteredKlient.length / itemPage)}
          showFirstButton
          showLastButton
          size="large"
          onChange={handleChange}
        />
      </div>
    </>
  );
}
