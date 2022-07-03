import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Backdrop
} from "@mui/material";
import { ShowTableStok } from "../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const TampilStok = () => {
  const { screenSize } = useStateContext();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
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
  const [kodeGrup, setKodeGrup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 24;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.namaStok.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.satuanKecil.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.satuanBesar.toUpperCase().includes(searchTerm.toUpperCase())
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
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/stoks`);
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
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
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/stoks/${id}`);
      getUsers();
      setGambar("");
      setKode("");
      setNama("");
      setMerk("");
      setSatuanKecil("");
      setSatuanBesar("");
      setKonversi("");
      setQty("");
      setHargaJualKecil("");
      setHargaJualBesar("");
      setKodeGrup("");
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
        Stok
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
          addLink={`/stok/tambahStok`}
          editLink={`/stok/${id}/edit`}
          deleteUser={deleteUser}
        />
      </Box>
      <Divider sx={{ pt: 4 }} />

      {gambar && (
        <Box sx={{ display: "flex" }}>
          <Card
            sx={{ maxWidth: 345 }}
            sx={{ m: "auto", mt: 2 }}
            onClick={() => setOpen(!open)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="200px"
                src={gambar}
                alt={namaStok}
              />
              <CardContent>
                <Typography gutterBottom component="div">
                  Lihat Gambar
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <Box sx={{ display: "flex" }}>
          <Card sx={{ maxWidth: 345 }} sx={{ m: "auto", mt: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                src={gambar}
                alt={namaStok}
                sx={{
                  height: {
                    xs: "300px",
                    sm: "500px"
                  }
                }}
              />
            </CardActionArea>
          </Card>
        </Box>
      </Backdrop>

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
            label="Kode Group"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={kodeGrup}
          />
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
            value={namaStok}
          />
          <TextField
            id="outlined-basic"
            label="Merk"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={merk}
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
        </Box>
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <TextField
            id="outlined-basic"
            label="Satuan Kecil"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={satuanKecil}
          />
          <TextField
            id="outlined-basic"
            label="Satuan Besar"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={satuanBesar}
          />
          <TextField
            id="outlined-basic"
            label="Konversi"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={konversi}
          />
          <TextField
            id="outlined-basic"
            label="Harga Jual Kecil"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={hargaJualKecil}
          />
          <TextField
            id="outlined-basic"
            label="Harga Jual Besar"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={hargaJualBesar}
          />
        </Box>
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 6, display: "flex", justifyContent: "center" }}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTableStok currentPosts={currentPosts} searchTerm={searchTerm} />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        {screenSize <= 600 ? (
          <Pagination
            count={count}
            size="large"
            page={page}
            onChange={handleChange}
            color="primary"
            size="small"
          />
        ) : (
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
};

export default TampilStok;
