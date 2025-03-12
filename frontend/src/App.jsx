import React from "react";
import { Route, Routes } from "react-router-dom";
import UserForm from "./pages/UserForm";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./Provider/AuthProvider";

const App = () => {
  return (
    <div className="w-screen h-screen">
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<UserForm />} />
       
          <Route path="/dashboard" element={<AuthProvider>{<Dashboard/>}</AuthProvider>} />
        
      </Routes>
    </div>
  );
};

export default App;
