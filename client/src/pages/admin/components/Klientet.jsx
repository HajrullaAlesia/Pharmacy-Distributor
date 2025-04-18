import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Pagination from "@material-ui/lab/Pagination";
import ShtoKlient from "./ShtoKlient";
import ShtoOferta from "./ShtoOferta";
import axios from "axios";

export default function Klientet() {
  const [shtoKlient, opentShtoKlient] = useState(false);
  const [klientet, setKlientet] = useState([]);
  const [oferta, openOferta] = useState(false);
  const [klientid, setKlientid] = useState("");
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(10);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost/prime/user/getAllClients").then((res) => {
      setKlientet(res.data);
    });
  }, []);

  const refreshData = () => {
    axios.get("http://localhost/prime/user/getAllClients").then((res) => {
      setKlientet(res.data);
    });
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredKlient = klientet.filter(
    (pacient) =>
      pacient.email.toString().toLowerCase().includes(search.toLowerCase()) ||
      pacient.telefon.toString().toLowerCase().includes(search.toLowerCase()) ||
      pacient.emer.toString().toLowerCase().includes(search.toLowerCase()) ||
      pacient.mbiemer.toString().toLowerCase().includes(search.toLowerCase()) ||
      pacient.emri_biznesit
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      pacient.qyteti.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {oferta && (
        <ShtoOferta klientId={klientid} closePop={() => openOferta(false)} />
      )}
      {shtoKlient && (
        <ShtoKlient
          closePop={() => opentShtoKlient(false)}
          refreshData={() => refreshData()}
        />
      )}
      <div className="admin-container-header flex jc-spaceb ai-center">
        <div className="flex">
          <p className="admin-container-header-title fs-40 fw-bold">Klientet</p>
          <span className="admin-container-header-subitle fs-24 fw-regular">
            {" "}
            ({klientet.length}){" "}
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
            className="admin-container-header-btn fs-18 fw-regular"
            onClick={() => opentShtoKlient(true)}
          >
            + Shto Klient
          </button>
        </div>
      </div>

      <div className="admin-container-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Farmacia</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Adresa</TableCell>
              <TableCell>Qyteti</TableCell>
              <TableCell>Menaxheri</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredKlient.slice(start, end).map((klient) => (
              <TableRow
                style={{ cursor: "pointer" }}
                onClick={() => {
                  openOferta(true);
                  setKlientid(klient.id);
                }}
              >
                <TableCell>{klient.emri_biznesit}</TableCell>
                <TableCell>{klient.email}</TableCell>
                <TableCell> {klient.telefon} </TableCell>
                <TableCell> {klient.adresa} </TableCell>
                <TableCell> {klient.qyteti} </TableCell>
                <TableCell>
                  {" "}
                  {klient.emer} {klient.mbiemer}{" "}
                </TableCell>
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
