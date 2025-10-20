import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import Confetti from "react-confetti";

import "./uploadCustomer.css";

const UploadCustomers = () => {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState("");
  const [dataPreview, setDataPreview] = useState([]);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Unsupported file type. Please upload CSV or Excel.");
      setFileName("");
      setDataPreview([]);
      return;
    }

    setError("");
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      try {
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        setDataPreview(jsonData.slice(0, 5));
      } catch (err) {
        console.error("Error reading file:", err);
        setError("Failed to read the file. Make sure it's a valid CSV/Excel.");
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleContinue = async () => {
    if (!fileName || !fileInputRef.current.files[0]) {
      setError("Please upload a file before continuing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    try {
      setError("");
      setProcessing(true);

      const res = await fetch("http://localhost:8000/upload-customers/", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send emails.");
        return;
      }

      // Trigger celebration if all emails sent successfully
   if (data.success && data.failed === 0) {
  setCelebrate(true); // show confetti

  // wait 5 seconds
  setTimeout(() => {
    setCelebrate(false); // stop confetti
  }, 5000);

  // redirect after 5 seconds (after confetti duration)
  setTimeout(() => {
    navigate("/Reviews");
  }, 5000);
} else {
  alert(`✅ Emails sent: ${data.success}\n⚠ Failed: ${data.failed}`);
}
    } catch (err) {
      console.error(err);
      setError("Error sending emails. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="upload-container intro-page">
      {/* Celebration Confetti above everything */}
      {celebrate && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
          pointerEvents: "none"
        }}>
          <Confetti width={dimensions.width} height={dimensions.height} />
          <div style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "2rem",
            color: "#ff4b2b",
            fontWeight: "bold",
            textShadow: "2px 2px #fff"
          }}>
            🎉 Success! All emails sent 🎉
          </div>
        </div>
      )}

      {/* Paper planes background */}
      <div className="planes-background">
              <div className="paper-plane plane1">
                <div className="plane-body">
                  <div className="plane-wing"></div>
                </div>
              </div>
              <div className="trail trail1"></div>
              
              <div className="paper-plane plane2">
                <div className="plane-body">
                  <div className="plane-wing"></div>
                </div>
              </div>
              <div className="trail trail2"></div>
              
              <div className="paper-plane plane3">
                <div className="plane-body">
                  <div className="plane-wing"></div>
                </div>
              </div>
              <div className="trail trail3"></div>
              
              <div className="paper-plane plane4">
                <div className="plane-body">
                  <div className="plane-wing"></div>
                </div>
              </div>
              <div className="trail trail4"></div>
              
              <div className="paper-plane plane5">
                <div className="plane-body">
                  <div className="plane-wing"></div>
                </div>
              </div>
              <div className="trail trail5"></div>
            </div>

      {/* Card wrapper */}
      <div className="intro-card upload-card">
        <h1 className="upload-title">Upload Your Customer List 📋</h1>
        <p className="upload-subtitle">
          Upload a CSV or Excel file containing your customers' emails and names.
        </p>

        <div className="upload-disclaimer">
          <h4>Important Instructions:</h4>
          <p>Please ensure your file has the following columns in <strong>exact order and case</strong>:</p>
          <ul>
            <li>Company Name</li>
            <li>RPC Name</li>
            <li>RPC Email Address</li>
            <li>Industry</li>
            <li>HAVC Needs</li>
          </ul>
          <p><strong>Note:</strong> Columns are case sensitive.</p>
        </div>

        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="file-input"
        />

        {error && <p className="error-msg">{error}</p>}
        {fileName && <p className="file-name">Selected file: {fileName}</p>}

        <button
          className="upload-continue-btn continue-btn"
          onClick={handleContinue}
          disabled={processing}
        >
          {processing ? "Sending Emails..." : "Continue →"}
        </button>

        {dataPreview.length > 0 && (
          <div className="preview-table">
            <h3>Preview (first 5 rows)</h3>
            <table>
              <tbody>
                {dataPreview.map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, cidx) => <td key={cidx}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCustomers;
