// Sample data representing the products (In a real scenario, this would come from the backend)
const products = [
    { id: 1, name: "Product 1", price: 140.00 },
    { id: 2, name: "Product 2", price: 110.00 },
    { id: 3, name: "Product 3", price: 70.00 }
];

let cart = [];

// Function to add items to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Function to remove items from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to update the cart
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>Ksh${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" 
                    onchange="changeQuantity(${item.id}, this.value)">
                </td>
                <td>Ksh${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    });

    document.getElementById('cart-total').innerText = `Ksh${total.toFixed(2)}`;
}

// Function to handle quantity change
function changeQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = parseInt(quantity);
        updateCart();
    }
}

// Example usage: addToCart(1); to add the first product to the cart
// Function to add a product to the cart
function addToCart(productId, productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        // Increase the quantity if the product is already in the cart
        existingProduct.quantity += 1;
    } else {
        // Add the new product to the cart
        let product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to the cart page
    window.location.href = 'cart.html';
}
// Function to display cart items
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let total = 0;

    cart.forEach(product => {
        total += product.price * product.quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: Ksh${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Subtotal: Ksh${product.price * product.quantity}</p>
                <button onclick="removeFromCart('${product.id}')">Remove</button>
            </div>
        `;
    });

    document.getElementById('cart-total').innerText = `Total: Ksh${total}`;
}

// Call the function when the cart page loads
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}
