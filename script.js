document.addEventListener("DOMContentLoaded", function () {
    function searchRestaurants() {
        const input = document.getElementById('searchInput').value.trim();
        const resultDiv = document.getElementById('restaurantList');

        if (input === "") {
            resultDiv.innerHTML = '<p style="color: red;">Please enter a search term.</p>';
            return;
        }

        resultDiv.innerHTML = `<p>Searching for: <strong>${input}</strong>...</p>`;

        setTimeout(() => {
            resultDiv.innerHTML = `<p style="color: lightgreen;">Results for "<strong>${input}</strong>" will be displayed here.</p>`;
        }, 1000);
    }

    function handleBookingFormSubmit(event) {
        event.preventDefault();

        const restaurantName = document.getElementById('restaurantName').value.trim();
        const bookingDate = document.getElementById('bookingDate').value;
        const guestCount = document.getElementById('guestCount').value;
        const message = document.getElementById('bookingMessage');

        if (!restaurantName || !bookingDate || guestCount < 1) {
            message.innerHTML = '<p style="color: red;">Please fill in all fields correctly.</p>';
            return;
        }

        message.innerHTML = '<p style="color: lightgreen;">Table booked successfully!</p>';

        const bookingTable = document.getElementById('bookingTable');
        const newRow = bookingTable.insertRow();
        newRow.innerHTML = `
            <td>#${Math.floor(Math.random() * 1000)}</td>
            <td>John Doe</td>
            <td>${new Date(bookingDate).toLocaleDateString()}</td>
            <td>${new Date(bookingDate).toLocaleTimeString()}</td>
            <td>Table ${Math.ceil(Math.random() * 10)}</td>
            <td style="color: lightgreen;">Confirmed</td>
        `;

        setTimeout(() => {
            document.getElementById('bookingForm').reset();
            message.innerHTML = '';
        }, 3000);
    }

    
    function loadBookings() {
        const tableBody = document.getElementById("bookingTable");
        tableBody.innerHTML = "";

        bookings.forEach(booking => {
            let row = `<tr>
                <td>${booking.id}</td>
                <td>${booking.customer}</td>
                <td>${booking.date}</td>
                <td>${booking.time}</td>
                <td>${booking.table}</td>
                <td>${booking.status}</td>
                <td><button onclick="editBooking(${booking.id})">Edit</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }



    document.addEventListener("DOMContentLoaded", () => {
        const bookingForm = document.getElementById("bookingForm");
        const bookingTableBody = document.getElementById("bookingTableBody");
    
        let bookingID = 1; 
    
        bookingForm.addEventListener("submit", (event) => {
            event.preventDefault(); 
    
            const restaurantName = document.getElementById("restaurantName").value;
            const bookingDate = document.getElementById("bookingDate").value;
            const guestCount = document.getElementById("guestCount").value;
    
            if (restaurantName && bookingDate && guestCount) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${bookingID}</td>
                    <td>${restaurantName}</td>
                    <td>${new Date(bookingDate).toLocaleString()}</td>
                    <td>${guestCount}</td>
                    <td>
                        <button onclick="editBooking(${bookingID})">Edit</button>
                        <button onclick="deleteBooking(${bookingID})">Delete</button>
                    </td>
                `;
    
                bookingTableBody.appendChild(row);
                bookingID++; 
                bookingForm.reset();
                document.getElementById("bookingMessage").textContent = "Booking added successfully!";
                setTimeout(() => {
                    document.getElementById("bookingMessage").textContent = "";
                }, 2000); 
            }
        });
    });
    
    document.addEventListener("DOMContentLoaded", () => {
        const bookingForm = document.getElementById("bookingForm");
        const bookingTableBody = document.getElementById("bookingTableBody");
        const bookingMessage = document.getElementById("bookingMessage");
    
        let bookingID = 1; 
        bookingForm.addEventListener("submit", (event) => {
            event.preventDefault();  
            const restaurantName = document.getElementById("restaurantName").value.trim();
            const bookingDate = document.getElementById("bookingDate").value; 
            const guestCount = document.getElementById("guestCount").value;
    
            if (restaurantName && bookingDate && guestCount > 0) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${bookingID}</td>
                    <td>${restaurantName}</td>
                    <td>${new Date(bookingDate).toLocaleString()}</td>
                    <td>${guestCount}</td>
                    <td>
                        <button onclick="editBooking(${bookingID})">Edit</button>
                        <button onclick="deleteBooking(${bookingID}, this)">Delete</button>
                    </td>
                `;
    
                bookingTableBody.appendChild(row);
    
                bookingID++;
    
                bookingForm.reset();
    
                bookingMessage.textContent = "Booking added successfully!";
                setTimeout(() => {
                    bookingMessage.textContent = "";
                }, 2000);
            } else {
                bookingMessage.textContent = "Please fill in all fields correctly!";
                setTimeout(() => {
                    bookingMessage.textContent = "";
                }, 2000);
            }
        });
    });
    
    function deleteBooking(id, element) {
        const confirmDelete = confirm(`Are you sure you want to delete booking ID ${id}?`);
        if (confirmDelete) {
            const row = element.closest("tr");
            row.remove();
        }
    }
    
    function editBooking(id) {
        alert(`Editing booking with ID: ${id}`);
    }
    




    function editBooking(id) {
        const booking = bookings.find(b => b.id === id);

        document.getElementById("editBookingID").value = booking.id;
        document.getElementById("editCustomerName").value = booking.customer;
        document.getElementById("editBookingDate").value = booking.date;
        document.getElementById("editBookingTime").value = booking.time;
        document.getElementById("editBookingTable").value = booking.table;
        document.getElementById("editBookingStatus").value = booking.status;

        document.getElementById("editBookingModal").style.display = "block";
    }

    function closeModal() {
        document.getElementById("editBookingModal").style.display = "none";
    }

    function handleEditBookingSubmit(event) {
        event.preventDefault();

        let id = document.getElementById("editBookingID").value;
        let updatedBooking = {
            id: Number(id),
            customer: document.getElementById("editCustomerName").value,
            date: document.getElementById("editBookingDate").value,
            time: document.getElementById("editBookingTime").value,
            table: document.getElementById("editBookingTable").value,
            status: document.getElementById("editBookingStatus").value
        };

        let index = bookings.findIndex(b => b.id === updatedBooking.id);
        if (index !== -1) {
            bookings[index] = updatedBooking;
        }

        loadBookings();
        closeModal();
    }

    function handleLoginFormSubmit(event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const userType = document.getElementById("userType").value; 

        if (username.trim() !== "" && password.trim() !== "") {
            localStorage.setItem("loggedInUser", username);
            localStorage.setItem("userType", userType);

            window.location.href = "test.html";
        } else {
            document.getElementById("loginMessage").innerText = "Invalid credentials! Try again.";
        }
    }

    document.getElementById("bookingForm").addEventListener("submit", handleBookingFormSubmit);
    document.getElementById("editBookingForm").addEventListener("submit", handleEditBookingSubmit);
    document.getElementById("loginForm").addEventListener("submit", handleLoginFormSubmit);


    window.searchRestaurants = searchRestaurants;
    window.loadRestaurantData = loadRestaurantData;
    window.loadBookings = loadBookings;
});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const userType = document.getElementById("userType").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username.trim() !== "" && password.trim() !== "") {
                localStorage.setItem("loggedInUser", username);
                localStorage.setItem("userType", userType);
                
                document.getElementById("loginModal").style.display = "none";
                window.location.href = "test.html";  
            } else {
                document.getElementById("loginMessage").innerText = "Invalid credentials! Try again.";
            }
        });
    }

    window.onclick = function (event) {
        const modal = document.getElementById("loginModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    window.searchRestaurants = function () {
        const input = document.getElementById("searchInput").value.trim();
        const resultDiv = document.getElementById("restaurantList");

        if (input === "") {
            resultDiv.innerHTML = '<p style="color: red;">Please enter a search term.</p>';
            return;
        }

        resultDiv.innerHTML = `<p>Searching for: <strong>${input}</strong>...</p>`;

        setTimeout(() => {
            resultDiv.innerHTML = `<p style="color: lightgreen;">Results for "<strong>${input}</strong>" will be displayed here.</p>`;
        }, 1000);
    };


    window.loadRestaurantData = function () {
        const adminData = document.getElementById('adminData');
        adminData.innerHTML = '<p>Loading restaurant data...</p>';
        
        setTimeout(() => {
            adminData.innerHTML = '<p style="color: lightgreen;">Restaurant data loaded successfully!</p>';
        }, 1500);
    };
});    
    document.addEventListener("DOMContentLoaded", function () {
      
        function handleLoginFormSubmit(event) {
            event.preventDefault(); 
    
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const userType = document.getElementById("userType").value; 
    
           
            if (username.trim() !== "" && password.trim() !== "") {
                localStorage.setItem("loggedInUser", username);
                localStorage.setItem("userType", userType);
    
                window.location.href = "test.html";  
            } else {
                document.getElementById("loginMessage").innerText = "Invalid credentials! Try again.";
            }
        }
    
  
        document.getElementById("loginForm").addEventListener("submit", handleLoginFormSubmit);
    });

    function showp() {
        document.getElementById("profile").style.display = "block";
    }

  
    function hidep() {
        document.getElementById("profile").style.display = "none";
    }

         
            document.getElementById('editProfileButton').addEventListener('click', function() {
    
                document.getElementById('editProfileForm').style.display = 'block';
                document.getElementById('editProfileButton').style.display = 'none';
            });
    
   
            document.getElementById('profileForm').addEventListener('submit', function(event) {
                event.preventDefault();
    
         
                const updatedRestaurantName = document.getElementById('editRestaurantName').value;
                const updatedLocation = document.getElementById('editLocation').value;
                const updatedCuisine = document.getElementById('editCuisine').value;
                const updatedEmail = document.getElementById('editEmail').value;
                const updatedPhone = document.getElementById('editPhone').value;
                const updatedDescription = document.getElementById('editDescription').value;
    
       
                document.getElementById('restaurantName').innerText = updatedRestaurantName;
                document.getElementById('location').innerText = updatedLocation;
                document.getElementById('cuisine').innerText = updatedCuisine;
                document.getElementById('email').innerText = updatedEmail;
                document.getElementById('phone').innerText = updatedPhone;
                document.getElementById('description').innerText = updatedDescription;

                document.getElementById('editProfileForm').style.display = 'none';
                document.getElementById('editProfileButton').style.display = 'block';
            });
    
        document.addEventListener("DOMContentLoaded", function () {
            const loggedInUser = localStorage.getItem("loggedInUser");
            const userType = localStorage.getItem("userType");

            // You can use loggedInUser and userType as needed, e.g., for personalized content or access control
            if (loggedInUser && userType) {
                console.log(`${loggedInUser} logged in as ${userType}`);
            } else {
                // Redirect back to login if no user is logged in
                window.location.href = "login.html";
            }
        });

    
