import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const TambahPembelianStok = () => {
  const [nomorNota, setNomorNota] = useState("");
  const [jenis, setJenis] = useState("TUNAI");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const jenisTransaksi = [{ label: "TUNAI" }, { label: "KREDIT" }];

  const supplierOptions = suppliers.map((supplier) => ({
    label: `${supplier.kode} - ${supplier.namaSupplier}`
  }));

  useEffect(() => {
    getSupplier();
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers`);
    setSuppliers(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/pembelianStoks`, {
        nomorNota,
        jenis,
        kodeSupplier
      });
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
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Tambah Pembelian
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
          <TextField
            id="outlined-basic"
            label="Nomor Nota"
            variant="outlined"
            value={nomorNota}
            onChange={(e) => setNomorNota(e.target.value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={jenisTransaksi}
            sx={{ mt: 4 }}
            renderInput={(params) => (
              <TextField {...params} label="Jenis Transaksi" />
            )}
            onInputChange={(e, value) => setJenis(value)}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={supplierOptions}
            renderInput={(params) => (
              <TextField {...params} label="Kode Groups" />
            )}
            onInputChange={(e, value) =>
              setKodeSupplier(value.split(" ", 1)[0])
            }
            sx={{ mt: 4 }}
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

export default TambahPembelianStok;
