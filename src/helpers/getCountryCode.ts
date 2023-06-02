import React from 'react'
import useCountry from '../components/hooks/useCountry'

export const getCountryCode = (countryCode: any) => {
  const { countryList } = useCountry()
  if (!countryCode) return ''
  console.log(countryList?.filter((b: any) => b.countryIso === countryCode)[0]?.country);

  return (countryList?.filter((b: any) => b?.countryIso === countryCode)[0]?.country) || ''

  // return result
}

// export default getCountryCode