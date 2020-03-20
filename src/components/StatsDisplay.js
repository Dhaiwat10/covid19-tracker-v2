import React from "react"
import useStats from "../utils/useStats"
import Loader from "./Loader"
import "./StatsDisplay.css"

export default ({ code, name }) => {
  const { stats, loading, error } = useStats(
    `https://covid19.mathdro.id/api/countries/${code}`
  )

  if (loading) return <Loader />
  if (error || "error" in stats)
    return (
      <div style={{ marginTop: "5vh" }}>
        No data available for this country/region. :(
      </div>
    )

  return (
    <div style={{ marginTop: "5vh" }}>
      <div className="grid">
        <div className="globalStat">
          <h2>Confirmed cases</h2>
          <h1 className="counter">{stats.confirmed.value}</h1>
        </div>
        <div className="globalStat">
          <h2>Deaths</h2>
          <h1 className="counter">{stats.deaths.value}</h1>
        </div>
        <div className="globalStat">
          <h2>Cured</h2>
          <h1 className="counter">{stats.recovered.value}</h1>
        </div>
      </div>
    </div>
  )
}
