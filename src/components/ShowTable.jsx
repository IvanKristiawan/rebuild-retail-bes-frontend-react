import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStateContext } from "../contexts/ContextProvider";

export function ShowTableSupplier({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  Alamat
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kota</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.namaSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.alamatSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kota.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/supplier/${user._id}`);
                  window.location.reload();
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kode}
                </TableCell>
                <TableCell>{user.namaSupplier}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.alamatSupplier}</TableCell>
                    <TableCell>{user.kota}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableGroupStok({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.namaGroup
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kode.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/groupStok/${user._id}`);
                  window.location.reload();
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kode}
                </TableCell>
                <TableCell>{user.namaGroup}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableStok({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Stok</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell
                  sx={{
                    fontWeight: "bold"
                  }}
                >
                  Sat-K
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Sat-B</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Konv.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Harga Jual - K
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Harga Jual - B
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.namaStok.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kode.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.satuanKecil
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.satuanBesar.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/stok/${user._id}`);
                  window.location.reload();
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kode}
                </TableCell>
                <TableCell>{user.namaStok}</TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.satuanKecil}</TableCell>
                    <TableCell>{user.satuanBesar}</TableCell>
                    <TableCell>{user.konversi}</TableCell>
                    <TableCell>{user.hargaJualKecil}</TableCell>
                    <TableCell>{user.hargaJualBesar}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarPembelianStok({
  currentPosts,
  searchTerm,
  suppliers
}) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No. Nota</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Jenis</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Kode Supplier</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.nomorNota.includes(searchTerm) ||
                val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kodeSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.updatedAt.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarPembelianStok/pembelianStok/${user._id}`);
                  window.location.reload();
                }}
              >
                <TableCell component="th" scope="row">
                  {user.nomorNota}
                </TableCell>
                <TableCell>
                  {user.updatedAt.slice(8, 10)}-{user.updatedAt.slice(5, 7)}-
                  {user.updatedAt.slice(0, 4)}
                </TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{user.jenis}</TableCell>
                    <TableCell>
                      {user.kodeSupplier} -
                      {suppliers
                        .filter(
                          (supplier) => supplier.kode === user.kodeSupplier
                        )
                        .map((sup) => ` ${sup.namaSupplier}`)}
                    </TableCell>
                  </>
                )}
                <TableCell>{user.total}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePembelianStok({ id, currentPosts, stoks, nomorNota }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode Stok</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Stok</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Harga</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Potongan</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (val.nomorNota === nomorNota) {
                return val;
              }
            })
            .map((aPembelianStok, index) => (
              <TableRow
                key={aPembelianStok.kodeStok}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(
                    `/daftarPembelianStok/pembelianStok/${id}/${aPembelianStok._id}`
                  );
                  window.location.reload();
                }}
              >
                <TableCell component="th" scope="row">
                  {aPembelianStok.kodeStok}
                </TableCell>
                <TableCell>
                  {stoks
                    .filter((stok) => stok.kode === aPembelianStok.kodeStok)
                    .map((stk) => ` ${stk.namaStok}`)}
                </TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{aPembelianStok.qty}</TableCell>
                    <TableCell>{aPembelianStok.hargaSatuan}</TableCell>
                    <TableCell>{aPembelianStok.potongan}%</TableCell>
                  </>
                )}
                <TableCell>{aPembelianStok.subtotal}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarPenjualanStok({ currentPosts, searchTerm }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No. Nota</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
            {screenSize >= 600 && (
              <TableCell sx={{ fontWeight: "bold" }}>Jenis</TableCell>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.nomorNota.includes(searchTerm) ||
                val.jenis.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.updatedAt.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarPenjualanStok/penjualanStok/${user._id}`);
                  window.location.reload();
                }}
              >
                <TableCell component="th" scope="row">
                  {user.nomorNota}
                </TableCell>
                <TableCell>
                  {user.updatedAt.slice(8, 10)}-{user.updatedAt.slice(5, 7)}-
                  {user.updatedAt.slice(0, 4)}
                </TableCell>
                {screenSize >= 600 && <TableCell>{user.jenis}</TableCell>}
                <TableCell>{user.total}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePenjualanStok({ id, currentPosts, stoks, nomorNota }) {
  const { screenSize } = useStateContext();
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode Stok</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Stok</TableCell>
            {screenSize >= 600 && (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Harga</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Potongan</TableCell>
              </>
            )}
            <TableCell sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (val.nomorNota === nomorNota) {
                return val;
              }
            })
            .map((aPenjualanStok, index) => (
              <TableRow
                key={aPenjualanStok.kodeStok}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(
                    `/daftarPenjualanStok/penjualanStok/${id}/${aPenjualanStok._id}`
                  );
                  window.location.reload();
                }}
              >
                <TableCell component="th" scope="row">
                  {aPenjualanStok.kodeStok}
                </TableCell>
                <TableCell>
                  {stoks
                    .filter((stok) => stok.kode === aPenjualanStok.kodeStok)
                    .map((stk) => ` ${stk.namaStok}`)}
                </TableCell>
                {screenSize >= 600 && (
                  <>
                    <TableCell>{aPenjualanStok.qty}</TableCell>
                    <TableCell>{aPenjualanStok.hargaSatuan}</TableCell>
                    <TableCell>{aPenjualanStok.potongan}%</TableCell>
                  </>
                )}
                <TableCell>{aPenjualanStok.subtotal}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
