import React, { useState } from "react"
import useStats from "../utils/useStats"
import Loader from "./Loader"
import RegionalStatsDisplay from "./RegionalStatsDisplay"
import useCountries from "../utils/useCountries"

import "./CountryStats.css"

export default () => {
  const [query, setQuery] = useState("")

  const [statsDisplay, setStatsDisplay] = useState(null)

  const { countries, countriesLoading, countriesError } = useCountries(query)

  const handleFormSubmit = e => {
    e.preventDefault()
    console.log(`New queried country: ${query}`)

    try {
      setStatsDisplay(<RegionalStatsDisplay id={countries[0]["code"]} />)
    } catch (err) {
      console.log(err)
      setStatsDisplay(<div>No data found for this query.</div>)
    }
  }

  return (
    <React.Fragment>
      <h1 style={{ maringTop: "5vh" }}>Stats by country / region</h1>

      <form onSubmit={handleFormSubmit}>
        <label style={{ marginRight: "20px" }}>
          Select a country or region
        </label>
        <input
          value={query}
          autoFocus
          type="text"
          placeholder="ID"
          onChange={e => setQuery(e.target.value)}
        ></input>
        <ul className="searchResults">
          {countries
            ? countries.map(country => {
                return (
                  <li value={country["code"]} className="searchResult">
                    {country["name"]}
                  </li>
                )
              })
            : null}
        </ul>
        <button type="submit">Submit</button>
      </form>

      {statsDisplay}
    </React.Fragment>
  )
}
