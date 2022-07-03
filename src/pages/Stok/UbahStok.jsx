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
import EditIcon from "@mui/icons-material/Edit";

const UbahStok = () => {
  const [gambar, setGambar] = useState("");
  const [kode, setKode] = useState("");
  const [namaStok, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [satuanKecil, setSatuanKecil] = useState("");
  const [satuanBesar, setSatuanBesar] = useState("");
  const [konversi, setKonversi] = useState("");
  const [qty, setQty] = useState("");
  const [hargaJualKecil, setHargaJualKecil] = useState("");
  const [hargaJualBesar, setHargaJualBesar] = useState("");
  const [grup, setGrup] = useState([]);
  const [kodeGrup, setKodeGrup] = useState("ACK");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
    getGroupStok();
  }, []);

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(`${tempUrl}/stoks/${id}`);
      setGambar(response.data.gambar);
      setKode(response.data.kode);
      setNama(response.data.namaStok);
      setMerk(response.data.merk);
      setSatuanKecil(response.data.satuanKecil);
      setSatuanBesar(response.data.satuanBesar);
      setKonversi(response.data.konversi);
      setQty(response.data.qty);
      setHargaJualKecil(response.data.hargaJualKecil);
      setHargaJualBesar(response.data.hargaJualBesar);
      setKodeGrup(response.data.kodeGrup);
      setLoading(false);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/stoks/${id}`, {
        kodeGrup,
        kode,
        namaStok,
        merk,
        qty,
        satuanKecil,
        satuanBesar,
        konversi,
        hargaJualKecil,
        hargaJualBesar
      });
      setLoading(false);
      navigate("/stok");
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupStok = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/groupStoks`);
    setGrup(response.data);
    setLoading(false);
  };

  const groupStokOptions = grup.map((grupStok) => ({
    label: grupStok.kode,
    namaGroup: grupStok.namaGroup
  }));

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Ubah Stok
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
            mr: {
              xs: 0,
              sm: 10
            }
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={groupStokOptions}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.label} - {option.namaGroup}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Kode Groups" />
            )}
            onInputChange={(e, value) => setKodeGrup(value)}
            defaultValue={{ label: kodeGrup }}
          />
          <TextField
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            sx={{ mt: 4 }}
            value={kode}
            onChange={(e) => setKode(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Nama"
            variant="outlined"
            sx={{ mt: 4 }}
            value={namaStok}
            onChange={(e) => setNama(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Merk"
            variant="outlined"
            sx={{ mt: 4 }}
            value={merk}
            onChange={(e) => setMerk(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            sx={{ mt: 4 }}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <TextField
            id="outlined-basic"
            label="Satuan Kecil"
            variant="outlined"
            sx={{
              mt: {
                xs: 4,
                sm: 0
              }
            }}
            value={satuanKecil}
            onChange={(e) => setSatuanKecil(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Satuan Besar"
            variant="outlined"
            sx={{ mt: 4 }}
            value={satuanBesar}
            onChange={(e) => setSatuanBesar(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Konversi"
            variant="outlined"
            sx={{ mt: 4 }}
            value={konversi}
            onChange={(e) => setKonversi(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Harga Jual Kecil"
            variant="outlined"
            sx={{ mt: 4 }}
            value={hargaJualKecil}
            onChange={(e) => setHargaJualKecil(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Harga Jual Besar"
            variant="outlined"
            sx={{ mt: 4 }}
            value={hargaJualBesar}
            onChange={(e) => setHargaJualBesar(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={updateUser}
        >
          Ubah
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default UbahStok;
