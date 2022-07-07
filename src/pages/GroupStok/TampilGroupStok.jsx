import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTableGroupStok } from "../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const TampilGroupStok = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [kode, setKode] = useState("");
  const [namaGroup, setNama] = useState("");
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
      val.namaGroup.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kode.toUpperCase().includes(searchTerm.toUpperCase())
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
  }, [id]);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/groupStoks`);
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`${tempUrl}/groupStoks/${id}`);
      setKode(response.data.kode);
      setNama(response.data.namaGroup);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${tempUrl}/groupStoks/${id}`);
      getUsers();
      setKode("");
      setNama("");
      setLoading(false);
      navigate("/groupStok");
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
        Group Stok
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
          addLink={`/groupStok/tambahGroupStok`}
          editLink={`/groupStok/${id}/edit`}
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
            label="Nama Group Stok"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
            value={namaGroup}
          />
        </Box>
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 6, display: "flex", justifyContent: "center" }}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTableGroupStok
          currentPosts={currentPosts}
          searchTerm={searchTerm}
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

export default TampilGroupStok;
