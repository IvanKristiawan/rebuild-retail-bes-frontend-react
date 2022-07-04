import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Autocomplete
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahAPenjualanStok = () => {
  const { id } = useParams();
  const [kodeStok, setKodeStok] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [potongan, setPotongan] = useState("");
  const [subtotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const [stoks, setStok] = useState([]);
  const [penjualanStoks, setPenjualanStok] = useState([]);
  const [loading, setLoading] = useState(false);

  const stokOptions = stoks.map((stok) => ({
    label: stok.kode,
    namaStok: stok.namaStok
  }));

  useEffect(() => {
    getStoks();
    getPenjualanStoks();
  }, []);

  const getStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setStok(response.data);
    setLoading(false);
  };

  const getPenjualanStoks = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/penjualanStoks/${id}`);
    setPenjualanStok(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/aPenjualanStoks`, {
        nomorNota: penjualanStoks.nomorNota,
        kodeStok,
        qty,
        hargaSatuan,
        potongan,
        subtotal: hargaSatuan * qty - (hargaSatuan * qty * potongan) / 100
      });
      await axios.patch(`${tempUrl}/penjualanStoks/${id}`, {
        total:
          penjualanStoks.total +
          hargaSatuan * qty -
          (hargaSatuan * qty * potongan) / 100
      });
      const findStok = stoks.find((stok) => stok.kode === kodeStok);
      const newQty = parseInt(findStok.qty) - parseInt(qty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty
      });
      setLoading(false);
      navigate(`/daftarPenjualanStok/penjualanStok/${id}`);
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
        Tambah Stok Penjualan
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{
          mt: 4,
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
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={stokOptions}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.label} - {option.namaStok}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Kode Stok" />
            )}
            onInputChange={(e, value) => setKodeStok(value)}
            sx={{ mt: 4 }}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            sx={{ mt: 4 }}
          />
          <TextField
            id="outlined-basic"
            label="Harga Satuan"
            variant="outlined"
            value={hargaSatuan}
            onChange={(e) => setHargaSatuan(e.target.value)}
            sx={{ mt: 4 }}
          />
          <TextField
            id="outlined-basic"
            label="Potongan"
            variant="outlined"
            value={potongan}
            onChange={(e) => setPotongan(e.target.value)}
            sx={{ mt: 4 }}
          />
          <TextField
            id="outlined-basic"
            label="Subtotal"
            variant="outlined"
            value={hargaSatuan * qty - (hargaSatuan * qty * potongan) / 100}
            onChange={(e) => setSubTotal(e.target.value)}
            sx={{ mt: 4 }}
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default TambahAPenjualanStok;
