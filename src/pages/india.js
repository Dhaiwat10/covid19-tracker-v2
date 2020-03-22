import React, { useEffect } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_indiaLow from "@amcharts/amcharts4-geodata/indiaLow"
import useIndiaStats from "../utils/useIndiaStats"
import { Loader } from "../components"

export default () => {
  let { map, loading, error } = useIndiaStats(
    "https://api.rootnet.in/covid19-in/stats/latest"
  )

  if (loading) return <Loader />
  if (error) return <div>Error</div>

  return (
    map
  )
}
