import React from "react"
import "./index.css"
import useStats from "../utils/useStats"
import { Loader, CountryStats, Footer, Table } from "../components"

export default () => {
  const { stats, loading, error } = useStats("https://covid19.mathdro.id/api")

  if (loading) return <Loader />
  if (error)
    return (
      <div>
        An error occured while fetching the data. Please try refreshing the
        page.
      </div>
    )

  return (
    <React.Fragment>
      <h1>COVID-19 LIVE Global Statistics</h1>

      {/* <hr /> */}

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

      <Table />

      <Footer />
    </React.Fragment>
  )
}
