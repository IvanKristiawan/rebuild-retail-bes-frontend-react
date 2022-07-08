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
  Autocomplete,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  IconButton
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from "@mui/icons-material/Save";
import { KeyOffRounded } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TambahStok = () => {
  const [arrayImage, setArrayImage] = useState([]);
  let [arrayImageUrl, setArrayImageUrl] = useState([]);
  let [tempGambarId, setTempGambarId] = useState([]);
  let [tempGambar, setTempGambar] = useState([]);
  const [kode, setKode] = useState("");
  const [namaStok, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [satuanKecil, setSatuanKecil] = useState("");
  const [satuanBesar, setSatuanBesar] = useState("");
  const [konversi, setKonversi] = useState("");
  const [qty, setQty] = useState(0);
  const [hargaJualKecil, setHargaJualKecil] = useState("");
  const [hargaJualBesar, setHargaJualBesar] = useState("");
  const [grup, setGrup] = useState([]);
  const [kodeGrup, setKodeGrup] = useState("");
  const navigate = useNavigate();
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
    getGroupStok();
    getUrlImg();
  }, [arrayImage]);

  const getUrlImg = () => {
    Object.keys(arrayImage).map(function (key, index) {
      arrayImageUrl.push(URL.createObjectURL(arrayImage[key]));
    });
  };

  const deleteGambar = (key) => {
    let tempUrl = [];
    arrayImageUrl.filter((val) => {
      if (val !== key) {
        tempUrl.push(val);
      }
    });
    setArrayImageUrl(tempUrl);
  };

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setUser(response.data);
    setLoading(false);
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

  const saveImage = async (formData) => {
    try {
      setLoading(true);

      arrayImage &&
        (await axios
          .post(
            "https://api.cloudinary.com/v1_1/dbtag5lau/image/upload",
            formData
          )
          .then((response) => {
            tempGambar.push(response.data.url);
            tempGambarId.push(response.data.public_id);
          })
          .catch((e) => {
            console.log(e);
          }));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < arrayImage.length; i++) {
      formData.append("file", arrayImage[i]);
      formData.append("upload_preset", "pnwyctyw");
      saveImage(formData);
    }

    try {
      setLoading(true);

      await axios.post(`${tempUrl}/stoks`, {
        gambarId: tempGambarId,
        gambar: tempGambar,
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Tambah Stok
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box
        mt={2}
        textAlign="center"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <input
          accept="image/*"
          type="file"
          id="select-image"
          style={{ display: "none" }}
          onChange={(e) => setArrayImage(e.target.files)}
          multiple
        />
        <label htmlFor="select-image">
          <Button
            variant="contained"
            color="primary"
            component="span"
            endIcon={<FileUploadIcon />}
          >
            Unggah Gambar
          </Button>
        </label>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {arrayImageUrl &&
          arrayImage &&
          arrayImageUrl.map((key) => (
            <Card sx={{ m: "auto", mt: 2 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200px"
                  src={key}
                  alt={KeyOffRounded.name}
                />
              </CardActionArea>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <DeleteOutlineIcon
                    color="error"
                    onClick={() => {
                      deleteGambar(key);
                    }}
                  />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </Box>
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
            label="Nama Stok"
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
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default TambahStok;
