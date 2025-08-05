// Updated feature.js - Now with dynamic product loading
document.addEventListener('DOMContentLoaded', () => {
  
  // ======= DYNAMIC PRODUCT LOADING =======
  function loadProducts() {
    const productListings = document.getElementById('product-listings');
    
    // Clear existing hardcoded products
    productListings.innerHTML = '';
    
    // Generate products from products.js
    products.forEach(product => {
      const productHTML = `
        <div class="item" data-category="${product.category}">
          <img src="${product.imageUrl}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price">$${product.price}</div>
          <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price})">
            Add to Cart
          </button>
        </div>
      `;
      productListings.innerHTML += productHTML;
    });
    
    // Reapply image hover effects to new products
    document.querySelectorAll('.item img').forEach(img => {
      img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.05)';
      });
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    });
  }

  // Load products when page loads
  loadProducts();

  // SELL MODAL
  const sellModal = document.getElementById('sell-modal');
  const sellBtn = document.getElementById('sell-now-btn');
  const sellClose = document.getElementById('sell-close');
  const sellForm = document.getElementById('sell-form');
  const itemNameInput = document.getElementById('item-name');
  const itemPriceInput = document.getElementById('item-price');
  const itemConditionSelect = document.getElementById('item-condition');
  const sizeUSInput = document.getElementById('size-us');
  const sizeUKInput = document.getElementById('size-uk');
  const itemPhotoInput = document.getElementById('item-photo');
  const photoPreview = document.getElementById('photo-preview');

  // Show the Sell modal
  sellBtn.addEventListener('click', () => {
    sellModal.style.display = 'block';
  });

  // Close the Sell modal with X button
  sellClose.addEventListener('click', () => {
    sellModal.style.display = 'none';
    sellForm.reset();
    photoPreview.innerHTML = '';
  });

  // Close modal when clicking outside the modal
  window.addEventListener('click', (e) => {
    if (e.target === sellModal) {
      sellModal.style.display = 'none';
      sellForm.reset();
      photoPreview.innerHTML = '';
    }
  });

  // When a user selects an image file, show a preview in the modal
  itemPhotoInput.addEventListener('change', () => {
    const file = itemPhotoInput.files[0];
    if (!file) {
      photoPreview.innerHTML = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px;">`;
    };
    reader.readAsDataURL(file);
  });

  // When the Sell form is submitted
  sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = itemNameInput.value.trim();
    const itemPrice = itemPriceInput.value.trim();
    const itemCondition = itemConditionSelect.value;
    const sizeUS = sizeUSInput.value.trim();
    const sizeUK = sizeUKInput.value.trim();
    const photoFile = itemPhotoInput.files[0];

    if (!itemName || !itemPrice || !itemCondition || !sizeUS || !sizeUK || !photoFile) {
      alert('Please fill all required fields, including shoe sizes and photo.');
      return;
    }

    const priceNumber = parseFloat(itemPrice);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Please enter a valid positive price.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const photoDataURL = event.target.result;
      
      console.log({
        itemName,
        itemPrice: priceNumber,
        itemCondition,
        sizeUS,
        sizeUK,
        photoDataURL,
      });

      alert(`Item submitted successfully!
Name: ${itemName}
Price: $${priceNumber}
Condition: ${itemCondition}
Size US: ${sizeUS}
Size UK: ${sizeUK}`);
      
      sellForm.reset();
      photoPreview.innerHTML = '';
      sellModal.style.display = 'none';
    };

    reader.readAsDataURL(photoFile);
  });

  // DARK MODE TOGGLE 
  const darkModeBtn = document.getElementById("dark-mode-toggle");
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeBtn.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });

  // ======= CART FUNCTIONALITY =======
  let cart = [];
  let cartCount = 0;

  window.addToCart = function (name, price) {
    cart.push({ name, price });
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartBtn.style.transform = 'scale(1)';
    }, 200);
  };

  window.showCart = function () {
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
  };

  // AUTH MODAL 
  const authBtn = document.getElementById('auth-btn');
  const authModal = document.getElementById('auth-modal');
  const authForm = document.getElementById('auth-form');

  authBtn.addEventListener('click', () => {
    authModal.style.display = 'block';
  });

  window.closeModal = function () {
    authModal.style.display = 'none';
  };

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

  // SEARCH BAR
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      const description = item.querySelector('p').textContent.toLowerCase();
      item.style.display = title.includes(searchTerm) || description.includes(searchTerm)
        ? 'block'
        : 'none';
    });
  });

  // ======= CATEGORY FILTER FUNCTION =======
  window.filterProducts = function (category) {
    const items = document.querySelectorAll('.item');
    
    if (category === 'all') {
      items.forEach(item => {
        item.style.display = 'block';
      });
      return;
    }

    items.forEach(item => {
      const categories = item.getAttribute('data-category');
      item.style.display = categories && categories.includes(category) ? 'block' : 'none';
    });
  };

  // Show all items by default
  document.querySelectorAll('.item').forEach(item => {
    item.style.display = 'block';
  });

  // Smooth scroll field into view when focused
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('focus', () => {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400);
    });
  });
});