document.getElementById("btn").addEventListener("click", async () => {
    const res = await fetch("/api/user")
    const data = await res.json()

    document.getElementById("user").innerHTML = `
        <h2>${data.user.firstName} ${data.user.lastName}</h2>
        <img src="${data.user.picture}" width="150">
        <p>Gender: ${data.user.gender}</p>
        <p>Age: ${data.user.age}</p>
        <p>DOB: ${data.user.dob}</p>
        <p>City: ${data.user.city}</p>
        <p>Address: ${data.user.address}</p>
    `

    document.getElementById("country").innerHTML = `
        <h2>${data.country.name}</h2>
        <img src="${data.country.flag}" width="100">
        <p>Capital: ${data.country.capital}</p>
        <p>Languages: ${data.country.languages}</p>
        <p>Currency: ${data.country.currency}</p>
    `

    document.getElementById("exchange").innerHTML = `
        <h3>Exchange Rates</h3>
        <p>1 ${data.country.currency} = ${data.exchange.usd} USD</p>
        <p>1 ${data.country.currency} = ${data.exchange.kzt} KZT</p>
    `

    document.getElementById("news").innerHTML = data.news.map(n => `
        <div class="card">
            <h4>${n.title}</h4>
            <img src="${n.image}" width="200">
            <p>${n.description}</p>
            <a href="${n.url}" target="_blank">Read more</a>
        </div>
    `).join("")
})