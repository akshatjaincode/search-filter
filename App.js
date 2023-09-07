import { useEffect, useState } from "react";
import "./app.css";
import Table from "./Table";
import Navbar from "./navbar";

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]); // State to store the fetched users
  const keys = ["first_name", "last_name", "email"];

  useEffect(() => {
    // Fetch data from your API here and set it in the users state variable
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div>
      <Navbar />
      <div className="app">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <Table data={search(users)} /> {/* Pass the fetched users to the Table component */}
      </div>
    </div>
  );
}

export default App;
