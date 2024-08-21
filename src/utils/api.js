// const baseUrl = "http://localhost:3001";

// export const getItems = () => {
//   return fetch(`${baseUrl}/items`).then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   });
// };

// export const addItem = (name, imageUrl, weather) => {
//   return fetch(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name,
//       imageUrl,
//       weather,
//     }),
//   }).then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   });
// };

// export const deleteItem = (id) => {
//   return fetch(`${baseUrl}/items/${id}`, {
//     method: "DELETE",
//   }).then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   });
// };

// src/utils/api.js

// const baseUrl = "http://localhost:3001";

// // GET /items - Fetch all clothing items
// export const getItems = () => {
//   return fetch(`${baseUrl}/items`).then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json(); // Parse the response body as JSON
//   });
// };

// // POST /items - Add a new clothing item
// export const addItem = (name, imageUrl, weather) => {
//   return fetch(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // Include the Content-Type header
//     },
//     body: JSON.stringify({
//       name,
//       imageUrl,
//       weather,
//     }),
//   }).then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json(); // Parse the response body as JSON
//   });
// };

// // DELETE /items/:id - Delete a clothing item
// export const deleteItem = (id) => {
//   return fetch(`${baseUrl}/items/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json", // Include the Content-Type header
//     },
//   }).then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json(); // Optional: Parse the response body as JSON
//   });
// };

const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${baseUrl}/items`);
}

export function postItem(formData) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      imageUrl: formData.imageUrl,
      weather: formData.weather,
    }),
  });
}

export function deleteItem(item) {
  return request(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
  });
}
