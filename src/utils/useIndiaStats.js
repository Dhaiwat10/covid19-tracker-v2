import React, { useState, useEffect } from "react"
import statesData from "./staticData/indiaStates"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_indiaLow from "@amcharts/amcharts4-geodata/indiaLow"

export default url => {
  const [map, setMap] = useState(
    <div
      style={{
        border: "1px solid black",
        height: "80vh",
        width: "50%",
        margin: "auto",
        textAlign: "center",
      }}
      id="chartDiv"
    ></div>
  )
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    console.log(`useIndiaStats :: Mounting or updating`)
    async function fetchData() {
      setLoading(true)
      setError()
      console.log(`useStats :: Fetching data`)
      const resData = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          setError(err)
        })

      console.log(resData)

      const stateCodes = { ...statesData }

      let finalRes = []

      for (let state of resData.data.regional) {
        finalRes.push({
          loc: state["loc"],
          code: stateCodes[state["loc"]],
          totalConfirmed:
            state["confirmedCasesIndian"] + state["confirmedCasesForeign"],
          confirmedCasesIndian: state["confirmedCasesIndian"],
          confirmedCasesForegin: state["confirmedCasesForeign"],
          cured: state["discharged"],
          deaths: state["deaths"],
        })
      }

      console.log(finalRes)
      setData(finalRes)
      setLoading(false)
    }

    async function generateMap() {
      let chart = am4core.create("chartDiv", am4maps.MapChart)
      chart.geodata = am4geodata_indiaLow
      chart.projection = new am4maps.projections.Miller()

      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

      polygonSeries.useGeodata = true

      let polygonTemplate = polygonSeries.mapPolygons.template
      polygonTemplate.tooltipText = "{name} - {value} cases"
      polygonTemplate.fill = am4core.color("#74B266")

      let hs = polygonTemplate.states.create("hover")
      hs.properties.fill = am4core.color("#367B25")

      polygonSeries.data = []

      console.log(`Inside generate map`)

      for (let state of data) {
        polygonSeries.data.push({
          id: state.code,
          value: state.totalConfirmed,
        })
      }
    }

    async function gen() {
      await fetchData()
      await generateMap()
    }

    gen()
  }, [url])

  return {
    map,
    loading,
    error,
  }
}
