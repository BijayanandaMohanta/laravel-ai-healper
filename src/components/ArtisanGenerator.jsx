import { useState } from "react";
import Markdown from "react-markdown";

const ArtisanGenerator = () => {
    // external icons
    const vscode_icon =
      `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><path fill="currentColor" d="M34.474 4.411c3.195-3.189 9.511-.595 9.344 4.027q.183 11.735.182 23.472q.001 3.407-.013 6.814c.242 5.088-6.667 8.267-10.462 4.859A1753 1753 0 0 1 3.853 18.74a2.4 2.4 0 0 1-.842-1.599a2.34 2.34 0 0 1 .531-1.72a2.4 2.4 0 0 1 1.606-.85c.63-.066 1.26.117 1.76.495a1750 1750 0 0 1 30.618 23.701c.021.03.097-.047.05-.043q-.013-3.407-.013-6.814q0-11.328.17-22.656c-3.577 3.039-7.189 5.974-10.733 8.954a772 772 0 0 0-3.891 3.291a2.5 2.5 0 0 1-1.728.594a2.4 2.4 0 0 1-1.653-.755a2.33 2.33 0 0 1-.632-1.682a2.4 2.4 0 0 1 .738-1.649a402 402 0 0 1 3.718-3.554c3.62-3.418 7.318-6.714 10.922-10.042M8.14 28.625a2.245 2.245 0 0 1 3.26.16c.858.98.787 2.498-.156 3.39l-3.383 3.2a2.246 2.246 0 0 1-3.26-.159c-.857-.981-.789-2.499.153-3.391z"/></svg>`;

    // states
    const [type, updateType] = useState("");
    const [name, updateName] = useState("table");
    const [loading, setLoading] = useState(false);
    const [artisanCommand, setArtisanCommand] = useState("");

    // generate function
    const generateArtisan = async () => {
      setLoading(true);
      setArtisanCommand(""); // Clear previous results
      const resp = await puter.ai.chat(
        `give me code artisan command of ${type} and I want the name should be ${name} but before that check the name entered is as per convention or not like models singular and so on. Then after that only give the command to make no explanation needed or comment needed. only a single line to of artisan make command give`,
        { stream: true, model: "claude" }
      );
      for await (const part of resp) {
        setArtisanCommand((prev) => prev + part?.text);
      }
      setLoading(false);
    };
    return (
      <>
        <div className="container mt-2">
        <h2>Generate Artisan Command</h2>
        <p className="text-muted">It will generate appropriate command which follows all kind of laravel professional convention and give you, so you can copy the code and run it on terminal of <span dangerouslySetInnerHTML={{ __html: vscode_icon }} /> vscode.</p>
          Generate type :
          <select
            name="type"
            id="type"
            className="form-control mb-2"
            onChange={(e) => updateType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="table">Table</option>
            <option value="controller">Controller</option>
            <option value="model">Model</option>
          </select>
          Enter the name :
          <input
            type="text"
            placeholder="e.g : table name / model name / controller name"
            className="form-control mb-2"
            onInput={(e) => updateName(e.target.value)}
          />
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
              "Generate artisan command"
            )}
          </button>
          <div className="mt-4">
            <p className="text-muted">Appropriate Command will be</p>
            <Markdown>{artisanCommand}</Markdown>
          </div>
        </div>
      </>
    );
};
export default ArtisanGenerator
