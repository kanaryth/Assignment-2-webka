import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    return {
    firstName: user.name.first,
    lastName: user.name.last,
    gender: user.gender,
    profilePicture: user.picture.large,
    age: user.dob.age,
    dateOfBirth: user.dob.date,
    city: user.location.city,
    country: user.location.country,
    fullAddress: `${user.location.street.number} ${user.location.street.name}`
    };
}

export async function getCountryData(countryName) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await res.json();
    const country = data[0];

return {
    name: country.name.common,
    capital: country.capital ? country.capital[0] : 'N/A',
    languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
    currency: country.currencies ? Object.keys(country.currencies)[0] : 'N/A',
    flag: country.flags ? country.flags.png : ''
};
}

export async function getExchangeRates(currency) {
    const apiKey = process.env.EXCHANGE_API_KEY;
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`);
    const data = await res.json();
    return {
    USD: data.conversion_rates.USD,
    KZT: data.conversion_rates.KZT
    };
}

export async function getNews(country) {
    const apiKey = process.env.NEWS_API_KEY;
    const res = await fetch(`https://newsapi.org/v2/everything?q=${country}&language=en&pageSize=5&apiKey=${apiKey}`);
    const data = await res.json();
    return data.articles.map(article => ({
    title: article.title,
    image: article.urlToImage,
    description: article.description,
    url: article.url
}));
}

export async function getFullUserData() {
    const user = await getRandomUser();
    const country = await getCountryData(user.country);
    const exchangeRates = await getExchangeRates(country.currency);
    const news = await getNews(user.country);

    return { user, country, exchangeRates, news };
}
