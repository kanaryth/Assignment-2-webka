import fetch from 'node-fetch';

export async function getRandomUserData() {
    const response = await fetch('https://randomuser.me/api/');

    if (!response.ok) {
    throw new Error('RandomUser API failed');
    }

    const data = await response.json();
    const user = data.results[0];

    return {
    firstName: user.name.first,
    lastName: user.name.last,
    gender: user.gender,
    age: user.dob.age,
    dob: user.dob.date,
    city: user.location.city,
    country: user.location.country,
    address: `${user.location.street.name} ${user.location.street.number}`,
    profilePicture: user.picture.large
    };
}
