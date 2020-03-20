import { useState, useEffect } from "react"

export default function useCountries(query) {
  const [countries, setCountries] = useState()
  const [countriesLoading, setLoading] = useState(true)
  const [countriesError, setcountriesError] = useState()

  useEffect(() => {
    // console.log(`Query: ${query}`)

    // console.log(`useCountries :: Mounting or upadting`)
    async function fetchData() {
      setLoading(true)
      setcountriesError()
      try {
        // console.log(`useCountries :: Fetching data`)
        const data = await fetch(
          `https://restcountries.eu/rest/v2/name/${query}`
        )
        const json = await data.json()

        //console.log(json)
        const resCountries = []

        const filtered = json.filter(country => country["name"][0].toLowerCase() === query[0].toLowerCase())

        console.log(filtered)

        for (let country of filtered) {
          let obj = {
            code: country["alpha2Code"],
            name: country["name"],
          }

          if (obj.code !== "IO") {
            if (obj.name[0].toLowerCase() === query[0].toLowerCase()) {
              resCountries.unshift(obj)
            } else {
              resCountries.push(obj)
            }
          }
        }

        // console.log(`useCountries :: Matching countries`)
        //console.log(resCountries.slice(0, 5))

        setCountries(resCountries.slice(0, 5).reverse())
      } catch (err) {
        setcountriesError(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [query])

  return {
    countries,
    countriesLoading,
    countriesError,
  }
}
