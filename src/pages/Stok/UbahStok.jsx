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
  Autocomplete,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  IconButton
} from "@mui/material";
import Carousel from "react-elastic-carousel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { KeyOffRounded } from "@mui/icons-material";

const UbahStok = () => {
  let [arrayImage, setArrayImage] = useState([]);
  let [arrayImageUrl, setArrayImageUrl] = useState([]);
  let [deleteGambarId, setDeleteGambarId] = useState([]);
  let [deleteGambar, setDeleteGambar] = useState([]);
  let [gambar, setGambar] = useState(null);
  let [gambarId, setGambarId] = useState(null);
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

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  useEffect(() => {
    getUserById();
    getGroupStok();
    getUrlImg();
  }, [arrayImage]);

  const getUrlImg = () => {
    let tempArrayImageUrl = [];
    Object.keys(arrayImage).map(function (key, index) {
      tempArrayImageUrl.push(URL.createObjectURL(arrayImage[key]));
      setArrayImageUrl(tempArrayImageUrl);
    });
  };

  const hapusGambar = (img, i) => {
    setGambarId(
      gambarId.filter((val) => {
        if (val === gambarId[i] || gambarId.length === 1) {
          deleteGambarId.push(val);
        }
        return val !== gambarId[i];
      })
    );

    setGambar(
      gambar.filter((val) => {
        if (val === img || gambar.length === 1) {
          deleteGambar.push(val);
        }
        return val !== img;
      })
    );
  };

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.get(`${tempUrl}/stoks/${id}`);
      setGambarId(response.data.gambarId);
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
            gambar.push(response.data.url);
            gambarId.push(response.data.public_id);
          })
          .catch((e) => {
            console.log(e);
          }));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < arrayImage.length; i++) {
      formData.append("file", arrayImage[i]);
      formData.append("upload_preset", "pnwyctyw");
      await saveImage(formData);
    }

    try {
      setLoading(true);
      await axios.patch(`${tempUrl}/stoks/${id}`, {
        deleteGambar,
        deleteGambarId,
        gambarId: gambarId,
        gambar: gambar,
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
    label: `${grupStok.kode} - ${grupStok.namaGroup}`
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
          arrayImageUrl.map((key, i) => (
            <Card sx={{ m: "auto", mt: 2 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200px"
                  src={key}
                  alt={KeyOffRounded.name}
                />
              </CardActionArea>
            </Card>
          ))}
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "300" }}>
          Hapus Gambar
        </Typography>
      </Box>
      {gambar && gambarId.length !== 0 && (
        <Carousel
          breakPoints={breakPoints}
          sx={{ display: "flex", height: "400px" }}
        >
          {gambar &&
            gambar.map((img, i) => (
              <Card
                sx={{
                  m: "auto",
                  mt: 2,
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardActionArea disableRipple>
                  <CardMedia
                    component="img"
                    height="100%"
                    src={img}
                    alt={namaStok}
                    sx={{ display: "flex", maxHeight: "150px" }}
                  />
                </CardActionArea>
                <CardActions
                  sx={{ display: "flex", justifyContent: "center", mt: "auto" }}
                >
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      color="error"
                      onClick={() => hapusGambar(img, i)}
                    />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
        </Carousel>
      )}
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
            renderInput={(params) => (
              <TextField {...params} label="Kode Groups" />
            )}
            onInputChange={(e, value) => setKodeGrup(value.split(" ", 1)[0])}
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
