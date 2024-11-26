import { baseUrl } from "../utils/constants";
const headers = { "Content-Type": "application/json" };

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function _getHeaders(token) {
  return {
    ...headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Fetch items
function getItems() {
  return fetch(`${baseUrl}/items`, { headers }).then(_checkResponse);
}

// Add an item
function addItems(name, imageUrl, weather) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: _getHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(_checkResponse);
}

// Delete an item
function deleteItems(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: _getHeaders(token),
  }).then(_checkResponse);
}

// Add like to a card
function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: _getHeaders(token),
  }).then(_checkResponse);
}

// Remove like from a card
function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: _getHeaders(token),
  }).then(_checkResponse);
}

export {
  getItems,
  addItems,
  deleteItems,
  _checkResponse,
  addCardLike,
  removeCardLike,
};
