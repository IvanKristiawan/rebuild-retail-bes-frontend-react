import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  ButtonGroup,
  Divider
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ShowTableSupplier } from "../../components/ShowTable";
import { SearchBar } from "../../components";

const TampilSupplier = () => {
  return (
    <Box sx={{ pt: 10 }}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={{ fontWeight: "900" }}>
        Supplier
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <ButtonGroup variant="contained">
          <Button
            color="success"
            sx={{ bgcolor: "success.light", textTransform: "none" }}
            startIcon={<AddCircleOutlineIcon />}
            size="small"
          >
            Tambah
          </Button>
          <Button
            color="primary"
            startIcon={<EditIcon />}
            sx={{ textTransform: "none" }}
          >
            Ubah
          </Button>
          <Button
            color="error"
            startIcon={<DeleteOutlineIcon />}
            sx={{ textTransform: "none" }}
          >
            Hapus
          </Button>
        </ButtonGroup>
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
            mr: {
              xs: 0,
              sm: 10
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
          />
          <TextField
            id="outlined-basic"
            label="Nama"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="Alamat"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <TextField
            id="outlined-basic"
            label="Kota"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="Telpon"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="NPWP"
            variant="filled"
            sx={{ display: "flex", mt: 4 }}
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
      </Box>
      <Divider sx={{ pt: 4 }} />
      <Box sx={{ pt: 6, display: "flex", justifyContent: "center" }}>
        <SearchBar />
      </Box>
      <Box sx={{ pt: 4, display: "flex", justifyContent: "center" }}>
        <ShowTableSupplier />
      </Box>
    </Box>
  );
};

export default TampilSupplier;
