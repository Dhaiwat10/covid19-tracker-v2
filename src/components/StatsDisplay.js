import React from "react"
import useStats from "../utils/useStats"
import Loader from "./Loader"
import useCountries from "../utils/useCountries"
import "./StatsDisplay.css"

export default ({ code, name }) => {
  const { stats, loading, error } = useStats(
    `https://covid19.mathdro.id/api/countries/${code}`
  )

  const { countries, countriesLoading, countriesError } = useCountries()

  if (loading) return <Loader />
  if (error || "error" in stats)
    return (
      <div>
        No data available for this country/region.
      </div>
    )

  return (
    <div>
      <h1>{name}</h1>
      <div className="grid">
        <div>
          <h2>Confirmed cases</h2>
          <h1>{stats.confirmed.value}</h1>
        </div>
        <div>
          <h2>Deaths</h2>
          <h1>{stats.deaths.value}</h1>
        </div>
        <div>
          <h2>Cured</h2>
          <h1>{stats.recovered.value}</h1>
        </div>
      </div>
    </div>
  )
}
