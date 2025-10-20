import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Signup/login";
import Introduction from "./components/Introduction/introduction";
import Template from "./components/Templates/template";
import UploadCustomers from "./components/CustomerUpload/uploadCustomer";
import Reviews from "./components/Review/review";
import Contact from "./components/Contact/contact";
import ThankYou from "./components/ThanksGiving/Thankyou";
import Analysis from "./components/Analysis/analysis";
// Temporary placeholder until you add other pages
const Dashboard = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#01b0f0",
      color: "#fff",
      fontSize: "2rem",
      fontWeight: "bold",
    }}
  >
    Welcome to Dashboard 🚀
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Introduction" element={<Introduction />} />
          <Route path="/Template" element={<Template />} />
          <Route path="/UploadCustomers" element={<UploadCustomers />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/thankYou" element={<ThankYou />} />
          <Route path="/Analysis" element={<Analysis />} />
        </Routes>
      </div>s
    </Router>
  );
}

export default App;
