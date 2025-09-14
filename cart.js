// Shopping Cart System for Teamz Adore
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartUI();
        this.bindEvents();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const savedCart = localStorage.getItem('teamzAdoreCart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('teamzAdoreCart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.imageUrl,
                category: product.category,
                quantity: 1,
                stock: product.stock || 0
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showAddToCartNotification(product.name);
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = Math.min(quantity, item.stock || 999);
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }

    // Get total items count
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get total price
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Update cart UI elements
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
            cartCount.style.display = this.getTotalItems() > 0 ? 'block' : 'none';
        }
        
        if (cartTotal) {
            cartTotal.textContent = `₦${this.getTotalPrice().toLocaleString()}`;
        }
        
        if (cartItemsContainer) {
            this.renderCartItems(cartItemsContainer);
        }
    }

    // Render cart items in the sidebar
    renderCartItems(container) {
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="shop.html" class="btn">Start Shopping</a>
                </div>
            `;
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${this.getProductImage(item.image)}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-category">${item.category}</p>
                    <p class="cart-item-price">₦${item.price.toLocaleString()}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="cart.removeItem('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Get product image with fallback
    getProductImage(imageUrl) {
        if (!imageUrl) {
            return 'https://via.placeholder.com/100x100/ff69b4/ffffff?text=No+Image';
        }
        
        if (imageUrl.startsWith('data:image/')) {
            return imageUrl;
        } else if (imageUrl.startsWith('https://via.placeholder.com/')) {
            return imageUrl;
        } else {
            return 'https://via.placeholder.com/100x100/ff69b4/ffffff?text=No+Image';
        }
    }

    // Show add to cart notification
    showAddToCartNotification(productName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart!</span>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    // Generate WhatsApp message for checkout
    generateWhatsAppMessage() {
        if (this.items.length === 0) {
            return '';
        }

        // Generate order ID
        const orderId = this.generateOrderId();
        
        // Create order details URL
        const orderDetailsUrl = `${window.location.origin}/order-details.html?orderId=${orderId}`;
        
        let message = `Hello Teamz Adore Business Hub! 👋\n\nI would like to place an order:\n\n`;
        message += `📋 Order ID: ${orderId}\n\n`;
        
        this.items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Quantity: ${item.quantity}\n`;
            message += `   Price: ₦${item.price.toLocaleString()} each\n`;
            message += `   Subtotal: ₦${(item.price * item.quantity).toLocaleString()}\n\n`;
        });
        
        message += `Total Items: ${this.getTotalItems()}\n`;
        message += `Total Amount: ₦${this.getTotalPrice().toLocaleString()}\n\n`;
        message += `📄 For detailed order information, please visit:\n${orderDetailsUrl}\n\n`;
        message += `Please provide me with:\n`;
        message += `- Available sizes for each item\n`;
        message += `- Delivery information\n`;
        message += `- Payment options\n\n`;
        message += `Thank you! 😊`;
        
        return message;
    }

    // Generate order ID
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 5);
        return `TA${timestamp.toString().slice(-6)}${random.toUpperCase()}`;
    }

    // Redirect to detailed checkout
    checkout() {
        // Redirect to detailed checkout page
        window.location.href = 'checkout.html';
    }
    
    // Save order to Firebase
    async saveOrderToFirebase() {
        try {
            if (!firebase || !firebase.firestore) {
                console.error('Firebase not available');
                return;
            }
            
            const db = firebase.firestore();
            const orderId = this.generateOrderId();
            
            const orderData = {
                orderId: orderId,
                items: this.items,
                totalAmount: this.getTotalPrice(),
                totalItems: this.getTotalItems(),
                status: 'pending',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            // Save to Firebase
            await db.collection('orders').add(orderData);
            console.log('Order saved to Firebase:', orderId);
            
        } catch (error) {
            console.error('Error saving order to Firebase:', error);
        }
    }

    // Bind event listeners
    bindEvents() {
        // Cart toggle
        const cartToggle = document.getElementById('cart-toggle');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        if (cartToggle && cartSidebar) {
            cartToggle.addEventListener('click', () => {
                cartSidebar.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close cart sidebar
        const closeCart = document.getElementById('close-cart');
        if (closeCart) {
            closeCart.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.checkout();
            });
        }
        
        // Clear cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear your cart?')) {
                    this.clearCart();
                }
            });
        }
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cart = new ShoppingCart();
});

// Global function to add product to cart
function addToCart(product) {
    if (window.cart) {
        window.cart.addItem(product);
    }
}

// Global function to open cart
function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (!window.cart) {
        window.cart = new ShoppingCart();
        console.log('Cart initialized globally');
    }
});
