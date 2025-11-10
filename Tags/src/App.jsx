import { useState } from "react";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");
  const [tags, settags] = useState([]);

  const handleEnter = (e) => {
    if (e.keyCode === 13 && input.length != 0 && input.trim() != "") {
      settags((prev) => [...prev, e.target.value]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    console.log(index);
    const filtertags = tags.filter((e, i) => i != index);
    settags(filtertags);
  };
  return (
    <div className="container">
      <h1 className="heading">Tags</h1>
      <div className="input-container">
        <input
          className="input-box"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
        />
        <ul className="tags-container">
          {tags &&
            tags.map((tag, i) => (
              <li className="tag" key={i}>
                {tag}
                <span onClick={() => handleDelete(i)}>❌</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
