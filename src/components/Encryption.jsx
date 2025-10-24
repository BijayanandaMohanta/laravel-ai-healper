import React, { useState } from "react";
import bcrypt from "bcryptjs";

const Encryption = () => {
  const [textToHash, setTextToHash] = useState("");
  const [costFactor, setCostFactor] = useState(12);
  const [generatedHash, setGeneratedHash] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyText, setVerifyText] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleGenerate = async () => {
    try {
      const salt = await bcrypt.genSalt(costFactor);
      const hash = await bcrypt.hash(textToHash, salt);
      setGeneratedHash(hash);
    } catch (err) {
      setGeneratedHash("Error generating hash");
    }
  };

  const handleVerify = async () => {
    try {
      const match = await bcrypt.compare(verifyText, verifyHash);
      setVerificationResult(match ? "✅ Match" : "❌ No Match");
    } catch (err) {
      setVerificationResult("Error verifying hash");
    }
  };

  return (
    <div className="container py-2">
      <h2>Bycript Generator</h2>
      <p className="text-muted">To Generate a bycript code which use in hashing format</p>
      <div className="row g-4">
        {/* Generate Hash Section */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Generate Hash</h5>
              <p className="card-text">
                Generate a bcrypt hash from your text. Higher rounds provide
                better security but take longer to process.
              </p>

              <div className="mb-3">
                <label className="form-label">Enter text to hash</label>
                <input
                  type="text"
                  className="form-control"
                  value={textToHash}
                  onChange={(e) => setTextToHash(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Rounds (Cost Factor): {costFactor}
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="4"
                  max="16"
                  value={costFactor}
                  onChange={(e) => setCostFactor(parseInt(e.target.value))}
                />
                <div className="text-success small">
                  High security – suitable for production
                </div>
              </div>

              <button className="btn btn-primary" onClick={handleGenerate}>
                Generate Hash
              </button>

              {generatedHash && (
                <div className="mt-3">
                  <label className="form-label">Generated Hash</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    readOnly
                    value={generatedHash}
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Verify Hash Section */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Verify Hash</h5>
              <p className="card-text">
                Check if a bcrypt hash matches the original text.
              </p>

              <div className="mb-3">
                <label className="form-label">Bcrypt Hash</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={verifyHash}
                  onChange={(e) => setVerifyHash(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Original Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={verifyText}
                  onChange={(e) => setVerifyText(e.target.value)}
                />
              </div>

              <button className="btn btn-success" onClick={handleVerify}>
                Verify Hash
              </button>

              {verificationResult && (
                <div className="mt-3 alert alert-info">
                  {verificationResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encryption;
