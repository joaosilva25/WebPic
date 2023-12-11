import Links from "../models/Links"


export const findAllTypes = async () => {
    return Links.find({})
}

export const findVaporwave = async (typeSearch: any) => {
    return Links.find({type:typeSearch})
}

export const findAnimals = async (typeSearch: any) => {
    return Links.find({type:typeSearch})
}

export const findLandscape = async (typeSearch: any) => {
    return Links.find({type:typeSearch})
}