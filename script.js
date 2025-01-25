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
        reader.readAsDataURL(file); 
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
        <button class="edit-button" onclick="editRestaurant(this)">Edit</button>
        <button class="delete-button" onclick="deleteRestaurant(this)">Delete</button>
    `;

    restaurantList.appendChild(restaurantCard);
}

function editRestaurant(button) {
    const restaurantCard = button.parentElement;
    const name = restaurantCard.querySelector('h3').innerText;
    const location = restaurantCard.querySelector('p:nth-of-type(1)').innerText.split(': ')[1];
    const cuisine = restaurantCard.querySelector('p:nth-of-type(2)').innerText.split(': ')[1];
    const image = restaurantCard.querySelector('img').src;

    document.getElementById('name').value = name;
    document.getElementById('location').value = location;
    document.getElementById('cuisine').value = cuisine;
    const imageInput = document.getElementById('image');
    imageInput.value = ''; 
    const img = new Image();
    img.src = image;
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function(blob) {
            const file = new File([blob], "image.png", { type: "image/png" });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            imageInput.files = dataTransfer.files;
        });
    };

    restaurantCard.remove();
}

function deleteRestaurant(button) {
    const restaurantCard = button.parentElement;
    restaurantCard.remove();
}
