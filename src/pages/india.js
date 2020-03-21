import React, { useEffect } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_indiaLow from "@amcharts/amcharts4-geodata/indiaLow"

export default () => {
  useEffect(() => {
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

    polygonSeries.data = [{
      "id": "IN-GJ",
      "value": 100
    }]
  }, [])

  return (
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
}
