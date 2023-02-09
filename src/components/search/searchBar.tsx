import React from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import Styles from "./search.module.scss";

export default function SearchBar() {
  return (
    <div>
      <Search
        input={{ icon: "search", iconPosition: "left" }}
        className={Styles.searchContainer}
        // loading={loading}
        placeholder="Search..."
        // onResultSelect={(e, data) =>
        //   dispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
        // }
        // onSearchChange={handleSearchChange}
        // results={results}
        // value={value}
      />
    </div>
  );
}
