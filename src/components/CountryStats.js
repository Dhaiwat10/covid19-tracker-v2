import React, { useState } from "react"
import StatsDisplay from "./StatsDisplay"
import useCountries from "../utils/useCountries"

import "./CountryStats.css"

export default () => {
  const [query, setQuery] = useState("")

  const [statsDisplay, setStatsDisplay] = useState(
    // <StatsDisplay name={"China"} code={"CN"} />
    null
  )

  const [showSuggestions, setShowSuggestions] = useState(false)

  const { countries, countriesLoading, countriesError } = useCountries(query)

  const handleFormSubmit = e => {
    e.preventDefault()
    console.log(`New queried country: ${query}`)
    setTimeout(() => {
      try {
        setStatsDisplay(
          <StatsDisplay
            name={countries[0]["name"]}
            code={countries[0]["code"]}
          />
        )
      } catch (err) {
        console.log(err)
        setStatsDisplay(<div>No data found for this query.</div>)
      }

      setShowSuggestions(false)
      setQuery(countries[0]["name"])
    }, 500)
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
    <div className="countryStatsGrid">
      <form onSubmit={handleFormSubmit}>
        <img className="searchIcon" src="search_icon.png" />
        <input
          className="searchBar"
          value={query}
          type="text"
          placeholder="Search data by country"
          onChange={e => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
        ></input>
        {/* <button className="submitBtn" type="submit">
          Submit
        </button> */}
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
      </form>

      {statsDisplay}
    </div>
  )
}
