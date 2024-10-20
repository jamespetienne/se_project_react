const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };
function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(_checkResponse);
}

function addItems(name, imageUrl, weather) {
  const token = localStorage.getItem("jwt");
  console.log("Token:", token);
  const payload = {
    name,
    imageUrl,
    weather,
  };
  console.log("Payload:", payload);

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, ...headers },
    body: JSON.stringify(payload),
  }).then(_checkResponse);
}

function deleteItems(id) {
  const token = localStorage.getItem("jwt");
  console.log("ID:", id);
  console.log("Token:", token);
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`, ...headers },
  })
    .then(_checkResponse)
    .then(() => console.log("Card has been deleted"));
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
