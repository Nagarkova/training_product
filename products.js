
class ProductDisplay {
    constructor(products) {
        this.products = products;
        this.filteredProducts = [...products];
        this.currentCategory = 'all';
        this.currentSort = 'name-asc';
        this.productsContainer = document.getElementById('products-list');
        this.productTemplate = document.getElementById('product-template');

        this.initializeFilters();
        this.displayProducts();
    }

    initializeFilters() {
        // Category filters
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                // Filter products by category
                this.currentCategory = button.dataset.category;
                this.filterProducts();
            });
        });

        // Sort options
        const sortSelect = document.getElementById('sort');
        sortSelect.addEventListener('change', () => {
            this.currentSort = sortSelect.value;
            this.sortProducts();
        });
    }

    filterProducts() {
        const currentCategory = this.currentCategory;
        this.filteredProducts = (currentCategory === "all") ? this.products : this.products.filter(({category}) => currentCategory === category);
        return this.displayProducts()
    }

    sortProducts() {
        const[field,direction] = (this.currentSort.split("-"))
        this.filteredProducts = customSort(this.filteredProducts,field,direction)
        return this.displayProducts()
    }

    displayProducts() {
        // Clear the container
        this.productsContainer.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            const noProducts = document.createElement('p');
            noProducts.textContent = 'No products found';
            noProducts.classList.add('no-products');
            this.productsContainer.appendChild(noProducts);
            return;
        }

        // Add each product to the container
        this.filteredProducts.forEach(product => {
            const productCard = this.productTemplate.content.cloneNode(true);

            // Set product details
            productCard.querySelector('.product-name').textContent = product.name;
            productCard.querySelector('.product-category').textContent = `Category: ${product.category}`;
            productCard.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
            productCard.querySelector('.product-image img').src = product.image;
            productCard.querySelector('.product-image img').alt = product.name;

            // Add event listener to the add to cart button
            const addButton = productCard.querySelector('.add-to-cart');
            addButton.addEventListener('click', () => {
                // The cart.js file will handle this event
                const addToCartEvent = new CustomEvent('add-to-cart', {
                    detail: { product }
                });
                document.dispatchEvent(addToCartEvent);
            });

            this.productsContainer.appendChild(productCard);
        });
    }
}

// Initialize the product display when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductDisplay(productData);
});