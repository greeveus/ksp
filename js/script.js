let cart = [];

const categoryFilter = document.querySelector("#category-filter");
const products = document.querySelectorAll(".product");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

const cartList = document.querySelector("#cart-list");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart");
const payButton = document.querySelector("#pay-button");

const calculateTotal = () => {
    let total = 0;

    cart.forEach((item) => {
        total += item.price;
    });

    return total;
};

const renderCart = () => {
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");

        li.textContent = item.name + " — " + item.price + " ₽ ";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Удалить";

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    cartTotal.textContent = "Итого: " + calculateTotal() + " ₽";
};

categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;

    products.forEach((product) => {
        const productCategory = product.dataset.category;

        if (selectedCategory === "all" || productCategory === selectedCategory) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
});

addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.closest(".product");

        const productData = {
            name: product.dataset.name,
            price: Number(product.dataset.price)
        };

        cart.push(productData);

        renderCart();
    });
});

clearCartButton.addEventListener("click", () => {
    cart = [];
    renderCart();
});

payButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");

        cart = [];
        renderCart();
    }
});

