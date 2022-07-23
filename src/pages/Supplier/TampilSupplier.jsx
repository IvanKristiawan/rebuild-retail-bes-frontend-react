import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTableSupplier } from "../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const TampilSupplier = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();
  const [kode, setKode] = useState("");
  const [namaSupplier, setNama] = useState("");
  const [alamatSupplier, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [telp, setTelp] = useState("");
  const [npwp, setNpwp] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.namaSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.alamatSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kota.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return val;
    }
  });
  const currentPosts = tempPosts.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(tempPosts.length / PER_PAGE);
  const _DATA = usePagination(users, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getUsers();
    {
      id && getUserById();
    }
  }, [id]);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/supplierForTable`);
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/suppliers/${id}`);
      setKode(response.data.kode);
      setNama(response.data.namaSupplier);
      setAlamat(response.data.alamatSupplier);
      setKota(response.data.kota);
      setTelp(response.data.telp);
      setNpwp(response.data.npwp);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/suppliers/${id}`);
      getUsers();
      setKode("");
      setNama("");
      setAlamat("");
      setKota("");
      setTelp("");
      setNpwp("");
      setLoading(false);
      navigate("/supplier");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Supplier
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <ButtonModifier
          id={id}
          kode={kode}
          addLink={`/supplier/tambahSupplier`}
          editLink={`/supplier/${id}/edit`}
          deleteUser={deleteUser}
        />
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row"
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            mr: {
              xs: 0,
              sm: 10
            }
          }}
        >
          <TextField
            id="outlined-basic"
            label="Kode"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={kode}
          />
          <TextField
            id="outlined-basic"
            label="Nama"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={namaSupplier}
          />
          <TextField
            id="outlined-basic"
            label="Alamat"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={alamatSupplier}
          />
        </Box>
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <TextField
            id="outlined-basic"
            label="Kota"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={kota}
          />
          <TextField
            id="outlined-basic"
            label="Telpon"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={telp}
          />
          <TextField
            id="outlined-basic"
            label="NPWP"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={npwp}
          />
        </Box>
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 6, display: "flex", justifyContent: "center" }}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTableSupplier
          currentPosts={currentPosts}
          searchTerm={searchTerm}
        />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="primary"
          size={screenSize <= 600 ? "small" : "large"}
        />
      </Box>
    </Box>
  );
};

export default TampilSupplier;
