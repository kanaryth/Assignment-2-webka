require("dotenv").config()
const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.static("public"))

app.get("/api/user", async (req, res) => {
    try {
        const userRes = await axios.get("https://randomuser.me/api/")
        const user = userRes.data.results[0]

        const userData = {
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            age: user.dob.age,
            dob: user.dob.date.split("T")[0],
            city: user.location.city,
            country: user.location.country,
            address: `${user.location.street.number} ${user.location.street.name}`,
            picture: user.picture.large
        }

        const countryRes = await axios.get(
            `https://restcountries.com/v3.1/name/${userData.country}`
        )
        const country = countryRes.data[0]

        const countryData = {
            name: country.name.common,
            capital: country.capital[0],
            languages: Object.values(country.languages).join(", "),
            currency: Object.keys(country.currencies)[0],
            flag: country.flags.png
        }

        const exchangeRes = await axios.get(
            `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${countryData.currency}`
        )

        const rates = exchangeRes.data.conversion_rates

        const exchange = {
            usd: rates["USD"],
            kzt: rates["KZT"]
        }

        const newsRes = await axios.get(
            `https://newsapi.org/v2/everything?q=${countryData.name}&language=en&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
        )

        const news = newsRes.data.articles.map(n => ({
            title: n.title,
            image: n.urlToImage,
            description: n.description,
            url: n.url
        }))

        res.json({
            user: userData,
            country: countryData,
            exchange,
            news
        })

    } catch (error) {
        res.status(500).json({ error: "API error" })
    }
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})