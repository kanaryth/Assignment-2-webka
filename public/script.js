async function fetchUserData() {
    try {
    const response = await fetch('/api/user');

    if (!response.ok) {
    throw new Error('Request failed');
    }

    const data = await response.json();
    console.log(data);

    document.getElementById('avatar').src = data.profilePicture;
    document.getElementById('name').textContent = data.firstName + ' ' + data.lastName;
    document.getElementById('gender').textContent = data.gender;
    document.getElementById('age').textContent = data.age;
    document.getElementById('country').textContent = data.country;
    document.getElementById('city').textContent = data.city;
    document.getElementById('address').textContent = data.address;

    } catch (error) {
    console.error(error);
    alert('Error loading user');
    }
}
