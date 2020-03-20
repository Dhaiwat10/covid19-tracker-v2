import React, { useState } from "react"
import StatsDisplay from "./StatsDisplay"
import useCountries from "../utils/useCountries"

import "./CountryStats.css"

export default () => {
  const [query, setQuery] = useState("China")

  const [statsDisplay, setStatsDisplay] = useState(<StatsDisplay name={"China"} code={"CN"} />)

  const [showSuggestions, setShowSuggestions] = useState(false)

  const { countries, countriesLoading, countriesError } = useCountries(query)

  const handleFormSubmit = e => {
    e.preventDefault()
    console.log(`New queried country: ${query}`)

    try {
      setStatsDisplay(
        <StatsDisplay name={countries[0]["name"]} code={countries[0]["code"]} />
      )
    } catch (err) {
      console.log(err)
      setStatsDisplay(<div>No data found for this query.</div>)
    }

    setShowSuggestions(false)
    setQuery(countries[0]["name"])
  }

  const handleResultItemClick = (e, code, name) => {
    console.log(`CLICKED!`)
    console.log(code)

    try {
      setStatsDisplay(<StatsDisplay code={code} name={name} />)
    } catch (err) {
      console.log(err)
      setStatsDisplay(<div>No data found for this query.</div>)
    }

    setShowSuggestions(false)
    setQuery(name)
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
          onChange={e => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
        ></input>
        <ul className="searchResults">
          {countries && showSuggestions && query !== ""
            ? countries.map(country => {
                return (
                  <li
                    key={country["code"]}
                    onClick={e =>
                      handleResultItemClick(e, country["code"], country["name"])
                    }
                    className="searchResult"
                  >
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
