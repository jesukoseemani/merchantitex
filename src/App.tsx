import React from "react";
import "./App.css";
import Loader from "./components/Loader";
import Toast from "./components/toast/Toast";
import AppRoutes from "./routes/AppRoutes";
import Modal from "./components/Modal";

function App() {
  
  return (
    <>
      <AppRoutes />
      <Toast />
      <Loader />
      <Modal />
    </>
  );
}

export default App;
