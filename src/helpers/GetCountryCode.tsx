import React from 'react'
import useCountry from '../components/hooks/useCountry';


function GetCountryCode(countryCode: any) {
  const { countryList } = useCountry()
  if (!countryCode) return ''
  return (
    <>
      {
        countryList?.filter((b: any) => b?.countryIso === countryCode)[0]?.country ?? ""
    }</>
  )
}

export default GetCountryCode