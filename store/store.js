const quantityInputs = document.querySelectorAll('.item-quantity input');
const subtotalElements = document.querySelectorAll('.item-subtotal p');
const totalElement = document.querySelector('.cart-summary h3 span');

quantityInputs.forEach((input, index) => {
    const updateSubtotal = () => {
        const quantity = parseInt(input.value);
        const price = parseFloat(subtotalElements[index].textContent.replace('Ksh', '')) / quantity;
        const newSubtotal = (quantity * price).toFixed(2);
        subtotalElements[index].textContent = `Ksh${newSubtotal}`;
        updateTotal();
    };

    input.addEventListener('change', updateSubtotal);
    document.querySelectorAll('.item-quantity button')[index * 2].addEventListener('click', () => {
        input.value = Math.max(1, parseInt(input.value) - 1);
        updateSubtotal();
    });
    document.querySelectorAll('.item-quantity button')[index * 2 + 1].addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
        updateSubtotal();
    });
});

const updateTotal = () => {
    let total = 0;
    subtotalElements.forEach(subtotal => {
        total += parseFloat(subtotal.textContent.replace('Ksh', ''));
    });
    totalElement.textContent = `Ksh${total.toFixed(2)}`;
};

// Fetch products from the server
fetch('/products')
    .then(response => response.json())
    .then(data => {
        // Display products on the page
        console.log(data);
    });

// Add to cart
function addToCart(productId) {
    fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId })
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show a message that the product was added
    });
}

// Fetch cart contents
fetch('/cart')
    .then(response => response.json())
    .then(data => {
        // Display cart items on the page
        console.log(data);
    });


