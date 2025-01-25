document.getElementById('restaurant-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const cuisine = document.getElementById('cuisine').value;
    const imageInput = document.getElementById('image');
    
    const file = imageInput.files[0];
    const reader = new FileReader();
    
    reader.onloadend = function() {
        addRestaurant(name, location, cuisine, reader.result);
        document.getElementById('restaurant-form').reset();
    }
    
    if (file) {
        reader.readAsDataURL(file); // Convert the image file to a base64 URL
    }
});

function addRestaurant(name, location, cuisine, image) {
    const restaurantList = document.getElementById('restaurant-list');
    const restaurantCard = document.createElement('div');
    restaurantCard.classList.add('restaurant-card');

    restaurantCard.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Cuisine:</strong> ${cuisine}</p>
        <img src="${image}" alt="${name}">
        <button class="delete-button" onclick="deleteRestaurant(this)">Delete</button>
    `;

    restaurantList.appendChild(restaurantCard);
}

function deleteRestaurant(button) {
    const restaurantCard = button.parentElement;
    restaurantCard.remove();
}
