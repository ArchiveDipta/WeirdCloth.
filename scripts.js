document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.querySelector('.cart-total');
    const cartToggle = document.getElementById('cart-toggle');
    const checkoutButton = document.getElementById('checkout');
    const clearCartButton = document.getElementById('clear-cart');
    const sizePopup = document.getElementById('size-popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const sizeSelect = document.getElementById('size-select');
    const addToCartConfirm = document.getElementById('add-to-cart-confirm');
    const closePopup = document.getElementById('close-popup');

    // Function to update cart display
    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <span>${item.name} (Size: ${item.size})</span>
                <span>Rp ${item.price.toLocaleString()}</span>
            `;
            cartItemsDiv.appendChild(itemDiv);
            total += parseInt(item.price);
        });

        cartTotalDiv.innerHTML = `Total: Rp ${total.toLocaleString()}`;
    }

    // Function to add item to cart
    function addToCart(name, price, size) {
        cart.push({ name, price, size });
        updateCart();
        showNotification();
    }

    // Function to show notification
    function showNotification() {
        const notification = document.getElementById('notification');
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
            // Show the size selection popup
            sizePopup.style.display = 'block';
            popupOverlay.style.display = 'block';

            // Set up the confirm button to add to cart
            addToCartConfirm.onclick = () => {
                const selectedSize = sizeSelect.value;
                addToCart(name, price, selectedSize);
                sizePopup.style.display = 'none';
                popupOverlay.style.display = 'none';
            };
        });
    });

    // Event listener for closing the popup
    closePopup.onclick = () => {
        sizePopup.style.display = 'none';
        popupOverlay.style.display = 'none';
    };

    // Event listener for toggling cart visibility
    cartToggle.addEventListener('click', () => {
        const cartElement = document.getElementById('cart');
        cartElement.style.display = cartElement.style.display === 'block' ? 'none' : 'block';
    });

    // Event listener for clearing cart
    clearCartButton.addEventListener('click', () => {
        cart.length = 0;
        updateCart();
    });

    // Event listener for checkout
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            const message = createWhatsAppMessage();
            const whatsappUrl = `https://api.whatsapp.com/send?phone=6287853153781&text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            cart.length = 0; // Clear the cart after sending the message
            updateCart();
        }
    });

    // Function to create WhatsApp message
    function createWhatsAppMessage() {
        let message = "Order Details:\n";
        cart.forEach(item => {
            message += `${item.name} (Size: ${item.size}): Rp ${item.price.toLocaleString()}\n`;
        });
        const total = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
        message += `Total: Rp ${total.toLocaleString()}`;
        return message;
    }
});
