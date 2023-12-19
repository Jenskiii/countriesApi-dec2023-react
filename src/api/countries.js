import { baseApi } from "./base";

export function getCountries(options){
    return baseApi.get("all", options).then(res => res.data)
}

export function getCountry(ccn3,options){
    return baseApi.get(`alpha/${ccn3}`, options).then(res => res.data)
}