import { baseApi } from "./base";

export function getCountries( filter,options){
    return baseApi.get(filter, options).then(res => res.data)
}

export function getCountry(countryCode,options){
    return baseApi.get(`alpha/${countryCode}`, options).then(res => res.data)
}

export function getBorderCountryName(borderCounrtry){
   return baseApi.get(`alpha/${borderCounrtry}?fields=name`).then(res => res.data)
}