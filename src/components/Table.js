import React from "react"
import styles from "./Table.module.css"
import useStats from "../utils/useStats"
import Loader from "./Loader"

export default () => {
  const headers = {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "b5063fb3d5msh40d77405e56ec19p1a293bjsn2912c7eda9f3",
  }

  const { stats, loading, error } = useStats(
    `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php`,
    headers
  )

  if (loading) return <Loader />
  if (error || "error" in stats)
    return (
      <div style={{ marginTop: "5vh" }}>
        No data available for this country/region. :(
      </div>
    )

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>Country</th>
          <th>Confirmed cases</th>
          <th>Active cases</th>
          <th>Deaths</th>
          <th>Cured</th>
        </tr>
      </thead>
      <tbody>
        {stats["countries_stat"].slice(0, 20).map(country => {
          const name = country["country_name"]
          const cases = country["cases"]
          const active = country["active_cases"]
          const deaths = country["deaths"]
          const cured = country["total_recovered"]

          return (
            <tr key={name}>
              <td style={{ fontWeight: "bold" }}>{name}</td>
              <td>{cases}</td>
              <td>{active}</td>
              <td>{deaths}</td>
              <td>{cured}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
