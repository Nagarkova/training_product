// Shopping Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.cartElement = document.getElementById('shopping-cart');
        this.cartItemsElement = document.getElementById('cart-items');
        this.cartTotalElement = document.getElementById('cart-total-amount');
        this.cartCountElement = document.querySelector('.cart-count');
        this.cartToggleButton = document.getElementById('cart-toggle');
        this.checkoutButton = document.getElementById('checkout-btn');
        this.clearCartButton = document.getElementById('clear-cart');
        this.cartItemTemplate = document.getElementById('cart-item-template');

        this.initializeCart();
    }

    initializeCart() {
        // Load cart from local storage if available
        this.loadCart();

        // Toggle cart visibility
        this.cartToggleButton.addEventListener('click', () => {
            this.cartElement.classList.toggle('active');
        });

        // Listen for add to cart events
        document.addEventListener('add-to-cart', (event) => {
            this.addItem(event.detail.product);
        });

        // Clear cart button
        this.clearCartButton.addEventListener('click', () => {
            this.clearCart();
        });

        // Checkout button
        this.checkoutButton.addEventListener('click', () => {
            if (this.items.length === 0) {
                alert('Your cart is empty');
                return;
            }

            alert('Thank you for your purchase!');
            this.clearCart();
        });

        // Initial render
        this.renderCart();
    }

    loadCart() {
     //TODO
    }

    saveCart() {
        //TODO
    }

    addItem(product) {
        // Check if item already exists in cart
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.renderCart();

        // Show cart after adding item
        this.cartElement.classList.add('active');

        // Visual feedback
        this.cartToggleButton.classList.add('pulse');
        setTimeout(() => {
            this.cartToggleButton.classList.remove('pulse');
        }, 300);
    }

    removeItem(productId) {
        //TODO
    }

    clearCart() {
      // TODO
    }

    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    renderCart() {
        // Clear current cart display
        this.cartItemsElement.innerHTML = '';

        // Update cart count
        const totalItems = this.items.reduce((count, item) => count + item.quantity, 0);
        this.cartCountElement.textContent = totalItems;

        // Render each item
        this.items.forEach(item => {
            const cartItem = this.cartItemTemplate.content.cloneNode(true);

            cartItem.querySelector('.item-name').textContent = `${item.name} x${item.quantity}`;
            cartItem.querySelector('.item-price').textContent = `$${(item.price * item.quantity).toFixed(2)}`;

            const removeButton = cartItem.querySelector('.remove-item');
            removeButton.addEventListener('click', () => {
                this.removeItem(item.id);
            });

            this.cartItemsElement.appendChild(cartItem);
        });

        // Update total
        const total = this.calculateTotal();
        this.cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Initialize the shopping cart when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});