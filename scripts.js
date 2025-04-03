document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.querySelector('.cart-total');
    const cartToggle = document.getElementById('cart-toggle');
    const cartElement = document.getElementById('cart');
    const checkoutButton = document.getElementById('checkout');
    const clearCartButton = document.getElementById('clear-cart');
    const notification = document.getElementById('notification');
    const productCarousel = document.getElementById('product-carousel');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Function to update cart display
    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>Rp ${item.price.toLocaleString()}</span>
            `;
            cartItemsDiv.appendChild(itemDiv);
            total += parseInt(item.price);
        });

        cartTotalDiv.innerHTML = `Total: Rp ${total.toLocaleString()}`;
    }

    // Function to add item to cart
    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
        showNotification();
    }

    // Function to show notification
    function showNotification() {
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    // Event listener for adding items to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            addToCart(name, price);
        });
    });

    // Event listener for toggling cart visibility
    cartToggle.addEventListener('click', () => {
        cartElement.style.display = cartElement.style.display === 'block' ? 'none' : 'block';
    });

    // Event listener for clearing cart
    clearCartButton.addEventListener('click', () => {
        cart.length = 0;
        updateCart();
    });

    // Event listener for checkout (basic alert for now)
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your purchase!');
            cart.length = 0;
            updateCart();
        }
    });

    // Carousel navigation
    let scrollAmount = 0;
    const scrollStep = 200; // Adjust this value to change scroll distance

    nextButton.addEventListener('click', () => {
        scrollAmount += scrollStep;
        productCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });

    prevButton.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        productCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
});
