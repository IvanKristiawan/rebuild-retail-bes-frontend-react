import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Typography, Divider, Button } from "@mui/material";
import { Loader } from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TampilAPenjualanStok = () => {
  const { id, idAPenjualanStok } = useParams();
  const navigate = useNavigate();
  const [kodeStok, setKodeStok] = useState("");
  const [qty, setQty] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [potongan, setPotongan] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [stoks, setStok] = useState([]);
  const [penjualanStoks, setPenjualanStok] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStoks();
    getPenjualanStoks();
    getUserById();
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

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(
        `${tempUrl}/aPenjualanStoks/${idAPenjualanStok}`
      );
      setKodeStok(response.data.kodeStok);
      setQty(response.data.qty);
      setHargaSatuan(response.data.hargaSatuan);
      setPotongan(response.data.potongan);
      setSubTotal(response.data.subtotal);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const findStok = stoks.find((stok) => stok.kode === kodeStok);
      const newQty = parseInt(findStok.qty) + parseInt(qty);
      await axios.patch(`${tempUrl}/stoks/${findStok._id}`, {
        qty: newQty
      });
      await axios.patch(`${tempUrl}/penjualanStoks/${id}`, {
        total: penjualanStoks.total - subtotal
      });
      await axios.delete(`${tempUrl}/aPenjualanStoks/${idAPenjualanStok}`);
      setKodeStok("");
      setQty("");
      setHargaSatuan("");
      setPotongan("");
      setSubTotal("");
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
        Stok Pembelian
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{ textTransform: "none" }}
          onClick={() => deleteUser(id)}
        >
          Hapus
        </Button>
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
            label="Kode Stok"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={kodeStok}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={qty}
          />
          <TextField
            id="outlined-basic"
            label="Harga Satuan"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={hargaSatuan}
          />
          <TextField
            id="outlined-basic"
            label="Potongan"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={potongan}
          />
          <TextField
            id="outlined-basic"
            label="Subtotal"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={subtotal}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TampilAPenjualanStok;
