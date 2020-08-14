const fetch = require("node-fetch");
exports.getResByQuery = (req, res) => {
    var { q, page } = req.query;
    return fetch(
        `https://newsapi.org/v2/everything?q=${q}&language=en&page=${page}&pageSize=20`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
            },
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => console.log(err));
};

exports.getResByCountry = (req, res) => {
    var { country } = req.query;
    return (
        fetch(`https://newsapi.org/v2/top-headlines?country=${country}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => res.json(data))
            .catch((err) => console.log(err))
    );
};
