import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Divider, Pagination } from "@mui/material";
import { ShowTableDaftarPenjualanStok } from "../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../components";
import { tempUrl } from "../../contexts/ContextProvider";
import { useStateContext } from "../../contexts/ContextProvider";

const TampilDaftarPembelianStok = () => {
  const { screenSize } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const kode = null;

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
      val.nomorNota.includes(searchTerm) ||
      val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.updatedAt.toUpperCase().includes(searchTerm.toUpperCase())
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
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.get(`${tempUrl}/penjualanStoks`);
    setUser(response.data);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Transaksi</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Penjualan Stok
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
          id={"/"}
          kode={kode}
          addLink={`/daftarPenjualanStok/penjualanStok/tambahPenjualanStok`}
          editLink={`/`}
          deleteUser={"/"}
        />
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 6, display: "flex", justifyContent: "center" }}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTableDaftarPenjualanStok
          currentPosts={currentPosts}
          searchTerm={searchTerm}
        />
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

export default TampilDaftarPembelianStok;
