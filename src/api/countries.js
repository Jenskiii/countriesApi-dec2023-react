import { baseApi } from "./base";

export function getCountries(options){
    return baseApi.get("all", options).then(res => res.data)
}

export function getCountry(countryCode,options){
    return baseApi.get(`alpha/${countryCode}`, options).then(res => res.data)
}

export function getBorderCountryName(borderCounrtry){
   return baseApi.get(`alpha/${borderCounrtry}?fields=name`).then(res => res.data)
}