const fetch = require("node-fetch");

const EVERYTHING_URL = "https://newsapi.org/v2/everything?";
const COUNTRY_URL = "https://newsapi.org/v2/top-headlines?";

const headers = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
    },
}

let cachedData = {everything: {}, country: {}}
let cacheTime = {everything: {}, country: {}}
const maxChacheTime = 2 * 60 * 1000 // 2 minutes

exports.getResByQuery = async (req, res, next) => {
    // in memory cache
    var { q, page } = req.query;
    if(!q){
        return next({message: 'query is undefined'});
    } else if (cacheTime && cacheTime[q] && cacheTime[q] > Date.now() - maxChacheTime) {
        return res.json(cachedData);
    }
    try {
        const params = new URLSearchParams({
            q,
            language: "en",
            page,
            pageSize: 20,
        });

        const response = await fetch(`${EVERYTHING_URL}${params}`, headers)
        const data = await response.json()

        cachedData.everything[q] = data
        cacheTime[q] = Date.now();
        return res.json(data)
    } catch (error) {
        return next(error);
    }
};

exports.getResByCountry = async (req, res, next) => {
    var { country, page } = req.query;

    if(!country){
        return next({message: 'Country is undefined'});
    } else if (cacheTime && cacheTime.country[country] && cacheTime.country[country] > Date.now() - maxChacheTime) {
        cachedData.country[country].fromCache = true
        return res.json(cachedData.country[country]);
    }
    try {
        const params = new URLSearchParams({
            country,
            page,
            pageSize: 20,
        });

        const response = await fetch(`${COUNTRY_URL}${params}`, headers)
        const data = await response.json()

        cachedData.country[country] = data
        cacheTime.country[country] = Date.now();
        // data.fromCache = false
        return res.json(data)
    } catch (error) {
        return next(error);
    }
};
