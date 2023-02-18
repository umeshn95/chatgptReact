import React, { useState } from "react";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "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";
  const model = "text-davinci-002";

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        model: model,
        max_tokens: 1000,
        temperature: 0.5
      })
    })
    .then(response => response.json())
    .then(data => {
      const text = data.choices[0].text;
      setText(text);
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <label>
        Enter a prompt:
        <input type="text" value={prompt} onChange={handlePromptChange} />
      </label>
      <button onClick={handleButtonClick} disabled={isLoading}>
        Generate text
      </button>
      {isLoading && <p>Loading...</p>}
      {text && <p>{text}</p>}
    </div>
  );
};

export default App;
