import { useEffect, useState } from "react";
import Markdown from "react-markdown";

const CrudGenerator = () => {
  // states
  const [htmlCode, htmlCodeUpdate] = useState("");
  const [modelName, modelNameUpdate] = useState("");
  const [prompt, promptUpdate] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeGenerator, setActiveGenerator] = useState(null);

  // Auto-highlight when generatedCode changes
  useEffect(() => {
    const highlightAll = () => {
      const blocks = document.querySelectorAll("pre code");
      blocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    };

    highlightAll();
  }, [generatedCode]);

  const extractFieldNames = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const inputs = doc.querySelectorAll(
      "input[name], select[name], textarea[name]"
    );
    const fieldNames = Array.from(inputs).map((input) => input.name);
    return fieldNames;
  };

  const handleGenerate = (generatorType) => {
    setLoading(true);
    setGeneratedCode("Generating code..."); // Set a temporary message
    setActiveGenerator(generatorType);

    let response = "";
    let fieldNames = extractFieldNames(htmlCode);

    if (fieldNames.length == 0 || !htmlCode.trim()) {
      setGeneratedCode("Invalid form code given.");
      setLoading(false);
      return;
    }
    if (modelName == "") {
      setGeneratedCode("Model name not given.");
      setLoading(false);
      return;
    }
    // Store
    if (generatorType === "store") {
      const imageFields = fieldNames.filter((name) =>
        name.toLowerCase().includes("image")
      );
      const passwordFields = fieldNames.filter((name) =>
        name.toLowerCase().includes("password")
      );

      response = "```php\n";
      response += `public function store(Request $request)\n{\n`;
      response += `    $data = $request->validate([\n`;

      response += fieldNames
        .map((name) => {
          if (imageFields.includes(name)) {
            return `        '${name}' => 'required|image|mimes:jpeg,png,jpg,gif,webp'`;
          } else if (passwordFields.includes(name)) {
            return `        '${name}' => 'required|string|min:6'`;
          } else {
            return `        '${name}' => 'required'`;
          }
        })
        .join(",\n");

      response += `\n    ]);\n\n`;

      imageFields.forEach((name) => {
        const folder = modelName.toLowerCase();
        response += `    if ($request->hasFile('${name}')) {\n`;
        response += `        $imageName = uniqid() . '.' . $request->file('${name}')->getClientOriginalExtension();\n`;
        response += `        $request->file('${name}')->move(public_path('uploads/${folder}'), $imageName);\n`;
        response += `        $data['${name}'] = 'uploads/${folder}/' . $imageName;\n`;
        response += `    }\n\n`;
      });

      passwordFields.forEach((name) => {
        response += `    $data['${name}'] = bcrypt($data['${name}']);\n`;
      });

      response += `\n    // You can add any additional logic here (e.g., events, logging, etc.)\n`;
      response += `    ${modelName}::create($data);\n\n`;
      response += `    return redirect()->back()->with('success', 'Created successfully.');\n`;
      response += `}\n`;
      response += "```";
    }

    // Update
    if (generatorType === "update") {
      const imageFields = fieldNames.filter((name) =>
        name.toLowerCase().includes("image")
      );
      const passwordFields = fieldNames.filter((name) =>
        name.toLowerCase().includes("password")
      );

      response = "```php\n";
      response += `public function update(Request $request, $id)\n{\n`;
      response += `    $data = $request->validate([\n`;

      response += fieldNames
        .map((name) => {
          if (imageFields.includes(name)) {
            return `        '${name}' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp'`;
          } else if (passwordFields.includes(name)) {
            return `        '${name}' => 'nullable|string|min:6'`;
          } else {
            return `        '${name}' => 'required'`;
          }
        })
        .join(",\n");

      response += `\n    ]);\n\n`;

      imageFields.forEach((name) => {
        const folder = modelName.toLowerCase();
        response += `    if ($request->hasFile('${name}')) {\n`;
        response += `        $imageName = uniqid() . '.' . $request->file('${name}')->getClientOriginalExtension();\n`;
        response += `        $request->file('${name}')->move(public_path('uploads/${folder}'), $imageName);\n`;
        response += `        $data['${name}'] = 'uploads/${folder}/' . $imageName;\n`;
        response += `    }\n\n`;
      });

      passwordFields.forEach((name) => {
        response += `    if (!empty($data['${name}'])) {\n`;
        response += `        $data['${name}'] = bcrypt($data['${name}']);\n`;
        response += `    }\n`;
      });

      response += `\n    $record = ${modelName}::findOrFail($id);\n`;
      response += `    $record->update($data);\n\n`;
      response += `    return redirect()->back()->with('success', 'Updated successfully.');\n`;
      response += `}\n`;
      response += "```";
    }

    // Delete
    if (generatorType === "delete") {
      const imageFields = fieldNames.filter((name) =>
        name.toLowerCase().includes("image")
      );
      const folder = modelName.toLowerCase();

      response = "```php\n";
      response += `public function destroy($id)\n{\n`;
      response += `    $record = ${modelName}::findOrFail($id);\n\n`;

      imageFields.forEach((name) => {
        response += `    if (!empty($record->${name}) && file_exists(public_path($record->${name}))) {\n`;
        response += `        unlink(public_path($record->${name}));\n`;
        response += `    }\n\n`;
      });

      response += `    $record->delete();\n\n`;
      response += `    return redirect()->back()->with('success', 'Deleted successfully.');\n`;
      response += `}\n`;
      response += "```";
    }
      
      

    // Here you would call the specific generator component or AI
    // For now, let's simulate a response for other types
    if (generatorType === "ai") {
      response = `AI generated code for: ${htmlCode}`;
    }

    setGeneratedCode(response);
    setLoading(false);
  };

  return (
    <div className="container mt-2">
      <h2>CRUD Generator from Form Code</h2>
      <p className="text-muted">
        The store, update, delete. All controller code you can
        generate as per the form you give
      </p>
      Model Name :
      <input
        name="modelName"
        type="text"
        className="form-control"
        onInput={(e) => modelNameUpdate(e.target.value)}
      />
      Give your form code :
      <textarea
        name="htmlCode"
        id="htmlCode"
        onInput={(e) => htmlCodeUpdate(e.target.value)}
        rows={15}
        className="form-control mb-2"
      ></textarea>
      Enhance with AI of the response :
      <input
        name="prompt"
        type="text"
        className="form-control mb-3"
        onInput={(e) => promptUpdate(e.target.value)}
      />
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
        <button
          className="btn btn-primary"
          onClick={() => handleGenerate("store")}
          disabled={loading}
        >
          Store Generator
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleGenerate("update")}
          disabled={loading}
        >
          Update Generator
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleGenerate("delete")}
          disabled={loading}
        >
          Delete Generator
        </button>
        <button
          className="btn btn-success"
          onClick={() => handleGenerate("ai")}
          disabled={loading}
        >
          Enhance with AI
        </button>
      </div>
      <div className="mt-2">
        {loading &&
        generatedCode === "AI response is delayed. Please try again later." ? (
          <p>AI response is delayed. Please try again later.</p>
        ) : (
          <Markdown>{generatedCode}</Markdown>
        )}
      </div>
    </div>
  );
};
export default CrudGenerator;
