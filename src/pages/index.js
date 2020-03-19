import React from "react"
import "./index.css"
import useStats from "../utils/useStats"
import { Loader, CountryStats } from "../components"

export default () => {
  const { stats, loading, error } = useStats(
    "https://covid19.mathdro.id/api"
  )

  if (loading) return <Loader />
  if (error)
    return (
      <div>
        An error occured while fetching the data. Please try refreshing the
        page.
      </div>
    )

  return (
    <div className="paper">
      <h1>LIVE Global Statistics</h1>

      <div className="globalStatsGrid">
        <div className="globalStat">
          <h3>Confirmed cases</h3>
          <h1 className="counter">{stats.confirmed.value}</h1>
        </div>
        <div className="globalStat">
          <h3>Deaths</h3>
          <h1 className="counter">{stats.deaths.value}</h1>
        </div>
        <div className="globalStat">
          <h3>Cured</h3>
          <h1 className="counter">{stats.recovered.value}</h1>
        </div>
      </div>

      <CountryStats />
    </div>
  )
}
