import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahSupplier = () => {
  const [kode, setKode] = useState("");
  const [namaSupplier, setNama] = useState("");
  const [alamatSupplier, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [telp, setTelp] = useState("");
  const [npwp, setNpwp] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/suppliers/${id}`);
    setKode(response.data.kode);
    setNama(response.data.namaSupplier);
    setAlamat(response.data.alamatSupplier);
    setKota(response.data.kota);
    setTelp(response.data.telp);
    setNpwp(response.data.npwp);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/suppliers/${id}`, {
        kode,
        namaSupplier,
        alamatSupplier,
        kota,
        telp,
        npwp
      });
      setLoading(false);
      navigate(`/supplier/${id}`);
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
        Ubah Supplier
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
          <TextField
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Nama"
            variant="outlined"
            sx={{ mt: 4 }}
            value={namaSupplier}
            onChange={(e) => setNama(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Alamat"
            variant="outlined"
            sx={{ mt: 4 }}
            value={alamatSupplier}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <TextField
            id="outlined-basic"
            label="Kota"
            variant="outlined"
            sx={{
              mt: {
                xs: 4,
                sm: 0
              }
            }}
            value={kota}
            onChange={(e) => setKota(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Telpon"
            variant="outlined"
            sx={{ mt: 4 }}
            value={telp}
            onChange={(e) => setTelp(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="NPWP"
            variant="outlined"
            sx={{ mt: 4 }}
            value={npwp}
            onChange={(e) => setNpwp(e.target.value)}
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

export default UbahSupplier;
