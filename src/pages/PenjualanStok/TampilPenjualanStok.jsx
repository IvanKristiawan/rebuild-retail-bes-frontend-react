import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTablePenjualanStok } from "../../components/ShowTable";
import { Loader, usePagination, ButtonModifier } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const TampilPenjualanStok = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { screenSize } = useStateContext();
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("");
  const [total, setTotal] = useState("");
  const [aPenjualanStoks, setAPenjualanStok] = useState([]);
  const [stoks, setStoks] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const currentPosts = aPenjualanStoks.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(aPenjualanStoks.length / PER_PAGE);
  const _DATA = usePagination(aPenjualanStoks, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getStoks();
    getAPenjualanStoks();
    {
      id && getUserById();
    }
  }, [id]);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stokForTransaction`);
    setStoks(response.data);
    setLoading(false);
  };

  const getAPenjualanStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aPenjualanStoks`);
    setAPenjualanStok(response.data);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
      setNomorNota(response.data.nomorNota);
      setJenis(response.data.jenis);
      setTotal(response.data.total);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      for (let aPenjualanStok of aPenjualanStoks) {
        for (let stok of stoks) {
          if (
            aPenjualanStok.kodeStok === stok.kode &&
            aPenjualanStok.nomorNota === nomorNota
          ) {
            let newQty = stok.qty + aPenjualanStok.qty;
            await axios.patch(`${tempUrl}/stoks/${stok._id}`, {
              qty: newQty
            });
            await axios.delete(
              `${tempUrl}/aPenjualanStoks/${aPenjualanStok._id}`
            );
          }
        }
      }
      await axios.delete(`${tempUrl}/penjualanStoks/${id}`);
      setLoading(false);
      navigate("/daftarPenjualanStok");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Transaksi</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Penjualan Stok
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
          kode={"test"}
          addLink={`/daftarPenjualanStok/penjualanStok/${id}/tambahAPenjualanStok`}
          editLink={`/daftarPenjualanStok/penjualanStok/${id}/edit`}
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
            maxWidth: {
              md: "40vw"
            }
          }}
        >
          <TextField
            id="outlined-basic"
            label="Nomor Nota"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={nomorNota}
          />
          <TextField
            id="outlined-basic"
            label="Jenis"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={jenis}
          />
          <TextField
            id="outlined-basic"
            label="Total"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={total}
          />
        </Box>
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTablePenjualanStok
          id={id}
          currentPosts={currentPosts}
          stoks={stoks}
          nomorNota={nomorNota}
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

export default TampilPenjualanStok;
