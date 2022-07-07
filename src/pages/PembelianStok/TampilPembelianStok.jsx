import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTablePembelianStok } from "../../components/ShowTable";
import { Loader, usePagination, ButtonModifier } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const TampilPembelianStok = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { screenSize } = useStateContext();
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [total, setTotal] = useState("");
  const [aPembelianStoks, setAPembelianStok] = useState([]);
  const [stoks, setStoks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 24;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const currentPosts = aPembelianStoks.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(aPembelianStoks.length / PER_PAGE);
  const _DATA = usePagination(aPembelianStoks, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getSupplier();
    getStoks();
    getAPembelianStoks();
    {
      id && getUserById();
    }
  }, [id]);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers`);
    setSuppliers(response.data);
  };

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setStoks(response.data);
    setLoading(false);
  };

  const getAPembelianStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/aPembelianStoks`);
    setAPembelianStok(response.data);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/pembelianStoks/${id}`);
      setNomorNota(response.data.nomorNota);
      setJenis(response.data.jenis);
      setKodeSupplier(response.data.kodeSupplier);
      setTotal(response.data.total);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      for (let aPembelianStok of aPembelianStoks) {
        for (let stok of stoks) {
          if (aPembelianStok.kodeStok === stok.kode) {
            let newQty = stok.qty - aPembelianStok.qty;
            await axios.patch(`${tempUrl}/stoks/${stok._id}`, {
              qty: newQty
            });
            await axios.delete(
              `${tempUrl}/aPembelianStoks/${aPembelianStok._id}`
            );
          }
        }
      }
      await axios.delete(`${tempUrl}/pembelianStoks/${id}`);
      setLoading(false);
      navigate("/daftarPembelianStok");
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
        Pembelian Stok
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
          addLink={`/daftarPembelianStok/pembelianStok/${id}/tambahAPembelianStok`}
          editLink={`/daftarPembelianStok/pembelianStok/${id}/edit`}
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
            label="Kode Supplier"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={`${kodeSupplier} - ${suppliers
              .filter((supplier) => supplier.kode === kodeSupplier)
              .map((sup) => ` ${sup.namaSupplier}`)}`}
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
        <ShowTablePembelianStok
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

export default TampilPembelianStok;
