import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import ManRegister from './manager/ManRegister';
import AdminHome from "./admin/AdminHome";
import ManHome from "./manager/ManHome";
import Login from "./Login";
import Man from "./manager/Man";

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <Routes>
      <Route path="/admin" element={<AdminHome logged={logged} />} />
      <Route path='/manager' element={<Man logged={logged} />} />
      <Route path="/manager/dashboard" element={<ManHome logged={logged} />} />
      <Route path="/" element={<Login set={setLogged} />} />
      <Route path="/register" element={<ManRegister />} />
    </Routes>
  );
}

export default App;
