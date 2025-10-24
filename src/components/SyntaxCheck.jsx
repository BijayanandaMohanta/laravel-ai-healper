import { useState } from "react";
import Markdown from "react-markdown";

const SyntaxCheck = () => {
    // external icons

    // states
    const [htmlCode, htmlCodeUpdate] = useState("table");
    const [loading, setLoading] = useState(false);
    const [resultCode, setResultCode] = useState("");

    // generate function
    const generateArtisan = async () => {
      setLoading(true);
      setResultCode(""); // Clear previous results
      const resp = await puter.ai.chat(
        `Check syntax of the code and return the correct code for it no need of any explanation just give the correct code of
        ${htmlCode}
        and if code is correct then return code is correct
        `,
        { stream: true, model: "claude" }
      );
      for await (const part of resp) {
        setResultCode((prev) => prev + part?.text);
      }
      setLoading(false);
    };
    return (
      <>
        <div className="container mt-2">
          <h2>Syntax Check</h2>
          <p className="text-muted">Check the code is correct or not.</p>
          Give your code :
          <textarea
            name="htmlCode"
            id="htmlCode"
            onInput={(e) => htmlCodeUpdate(e.target.value)}
            rows={10}
            className="form-control mb-2"
          ></textarea>
          <button
            className="btn btn-success"
            onClick={generateArtisan}
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Check Syntax"
            )}
          </button>
          <div className="mt-4">
            <p className="text-muted">Correct Code</p>
            <Markdown>{resultCode}</Markdown>
          </div>
        </div>
      </>
    );
};
export default SyntaxCheck
