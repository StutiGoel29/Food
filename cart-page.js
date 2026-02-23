function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let body = document.getElementById("cart-body");
  let total = 0;

  body.innerHTML = "";

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    body.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>
          <button onclick="changeQty(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQty(${index}, 1)">+</button>
        </td>
        <td>₹${itemTotal}</td>
        <td>
          <button onclick="removeItem(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("grand-total").innerText =
    "Grand Total: ₹" + total;
}

function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

window.onload = loadCart;