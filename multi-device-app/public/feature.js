 // Dark mode functionality
        const darkModeBtn = document.getElementById("dark-mode-toggle");
        darkModeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
        });

        // Cart functionality
        let cart = [];
        let cartCount = 0;

        function addToCart(name, price) {
            cart.push({ name, price });
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;
            
            // Add animation feedback
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
        }

        function showCart() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            let cartItems = 'Cart Items:\n';
            let total = 0;
            cart.forEach(item => {
                cartItems += `${item.name} - $${item.price}\n`;
                total += item.price;
            });
            cartItems += `\nTotal: $${total}`;
            alert(cartItems);
        }

        // Auth modal functionality
        const authBtn = document.getElementById('auth-btn');
        const authModal = document.getElementById('auth-modal');
        const authForm = document.getElementById('auth-form');

        authBtn.addEventListener('click', () => {
            authModal.style.display = 'block';
        });

        function closeModal() {
            authModal.style.display = 'none';
        }

        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                closeModal();
            }
        });

        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            alert(`Welcome back, ${email}!`);
            closeModal();
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.item');
            
            items.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Filter functionality
        function filterProducts(category) {
            const items = document.querySelectorAll('.item');
            
            items.forEach(item => {
                const categories = item.getAttribute('data-category');
                if (categories.includes(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Show all products by default
        document.addEventListener('DOMContentLoaded', () => {
            const items = document.querySelectorAll('.item');
            items.forEach(item => {
                item.style.display = 'block';
            });
        });

        // Add hover effects for images
        document.querySelectorAll('.item img, .featured-item img').forEach(img => {
            img.addEventListener('mouseover', () => {
                img.style.transform = 'scale(1.05)';
            });

            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });