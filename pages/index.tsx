import React, { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setresults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }
    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setresults(data);
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1> Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <button type="submit">buscar</button>
      </form>
      <SearchResults onAddToWishList={addToWishList} results={results} />
    </div>
  );
}
