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

        for (let country of json) {
          if(resCountries.length >= 5) {
            break
          }

          resCountries.push({code: country["alpha2Code"], name: country["name"]})
        }

        // console.log(`useCountries :: Matching countries`)
        // console.log(resCountries)

        setCountries(resCountries)
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
