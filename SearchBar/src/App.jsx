import React, { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [cache, setCache] = useState({});
  const [visible, setvisible] = useState(false);
  const fetchData = async () => {
    if (input == []) {
      return;
    }
    if (cache[input]) {
      console.log("cache called");
      setSuggestion(cache[input]);
      console.log(cache);
      return;
    }
    console.log("API Called");
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const data = await res.json();
    setSuggestion(data?.recipes);
    setCache((prev) => ({ ...prev, [input]: data?.recipes }));
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <div className="">
      <h1 className="text-4xl font-black text-center m-10">
        Auto Suggestion Searchbox
      </h1>
      <div className="relative flex justify-center">
        <div className="flex items-center justify-center relative w-2/5 h-10 ">
          <i
            className="absolute left-5 cursor-pointer"
            onClick={() => setInput("")}
          >
            🔍
          </i>
          {/* input box */}
          <input
            className="border max-md:w-[90%] w-full rounded-full px-12 py-2 text-lg font-black"
            type="text"
            placeholder="Search Recipes"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onFocus={() => setvisible(true)}
            onBlur={() => setvisible(false)}
          />
          <i
            className="absolute right-5 cursor-pointer "
            onClick={() => setInput("")}
          >
            ❌
          </i>
        </div>
        {/* // list of recipes suggestion */}
        {visible && (
          <ul
            className={`absolute max-md:w-[90%] w-2/5 max-h-[500px]  top-15 border-2 rounded-xl  overflow-y-scroll ${
              input ? "" : "hidden"
            }`}
          >
            {suggestion.map((recipe, i) => {
              return (
                <li
                  key={i}
                  className="text-lg  hover:bg-gray-400 font-black py-2 px-4"
                  onMouseDown={(e) => setInput(e.target.innerText)}
                >
                  {recipe.name}
                </li>
              );
            })}
            {input && suggestion.length === 0 && (
              <li className="w-full text-center py-4 font-black italic">
                No item found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
