async function fetchUserData() {
const res = await fetch('/api/user');
const data = await res.json();

const u = data.user;
document.getElementById('user-card').innerHTML = `
    <img src="${u.profilePicture}" alt="Profile Picture">
    <h2>${u.firstName} ${u.lastName}</h2>
    <p><strong>Gender:</strong> ${u.gender}</p>
    <p><strong>Age:</strong> ${u.age}</p>
    <p><strong>Date of Birth:</strong> ${new Date(u.dateOfBirth).toLocaleDateString()}</p>
    <p><strong>City:</strong> ${u.city}</p>
    <p><strong>Country:</strong> ${u.country}</p>
    <p><strong>Full Address:</strong> ${u.fullAddress}</p>
`;

const c = data.country;
document.getElementById('country-card').innerHTML = `
    <h3>Country Info</h3>
    <img src="${c.flag}" alt="Flag" width="100">
    <p><strong>Name:</strong> ${c.name}</p>
    <p><strong>Capital:</strong> ${c.capital}</p>
    <p><strong>Languages:</strong> ${c.languages}</p>
    <p><strong>Currency:</strong> ${c.currency}</p>
`;

const ex = data.exchangeRates;
document.getElementById('exchange-card').innerHTML = `
    <h3>Exchange Rates</h3>
    <p>1 ${c.currency} = ${ex.USD} USD</p>
    <p>1 ${c.currency} = ${ex.KZT} KZT</p>
`;

const news = data.news;
let newsHTML = '<h3>Top News</h3>';
news.forEach(article => {
    newsHTML += `
        <div class="news-item">
        <h4>${article.title}</h4>
        ${article.image ? `<img src="${article.image}" width="200">` : ''}
        <p>${article.description || ''}</p>
        <a href="${article.url}" target="_blank">Read more</a>
        </div>
        <hr>
    `;
});
    document.getElementById('news-card').innerHTML = newsHTML;
}

document.getElementById('getUserBtn').addEventListener('click', fetchUserData);
