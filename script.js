// Toast function (your code)
function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.className = "show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2000);
}


//Add to cart logic
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");

  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes("add")) {
      btn.addEventListener("click", () => {
        const card = btn.parentElement;

        const name = card.querySelector("p").innerText;
        const priceText = card.querySelectorAll("p")[1].innerText;
        const price = parseInt(priceText.replace("₹", ""));

        addToCart(name, price);
      });
    }
  });
});


function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // toast instead of alert
  showToast(name + " added to cart 🛒");
}