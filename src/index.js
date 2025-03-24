document.addEventListener("DOMContentLoaded", () => {
  fetchToys(); // Load all toys when the page loads
  addNewToyListener(); // Add event listener to the toy form
});

/** ✅ 1️⃣ Fetch All Toys from API and Render Them */
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((toys) => {
      toys.forEach((toy) => renderToy(toy));
    });
}

/** ✅ 2️⃣ Render Each Toy to the DOM */
function renderToy(toy) {
  const toyCollection = document.getElementById("toy-collection");

  // Create toy card
  const toyCard = document.createElement("div");
  toyCard.className = "card";

  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;

  // Add like event listener
  toyCard.querySelector(".like-btn").addEventListener("click", () => {
    increaseLikes(toy);
  });

  toyCollection.appendChild(toyCard);
}

/** ✅ 3️⃣ Add a New Toy (POST Request) */
function addNewToyListener() {
  const toyForm = document.querySelector(".add-toy-form");

  toyForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;

    const newToy = {
      name: toyName,
      image: toyImage,
      likes: 0,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((toy) => {
        renderToy(toy);
        event.target.reset(); // Clear form fields
      });
  });
}

/** ✅ 4️⃣ Increase Toy Likes (PATCH Request) */
function increaseLikes(toy) {
  const newLikes = toy.likes + 1;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes: newLikes }),
  })
    .then((res) => res.json())
    .then((updatedToy) => {
      document.getElementById(updatedToy.id).previousElementSibling.innerText =
        `${updatedToy.likes} Likes`;
    });
}
