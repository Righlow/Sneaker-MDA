// Run all JavaScript after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // SELL MODAL

  // Get references to modal elements and form inputs
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
    // Read the image file and show it in an <img> tag
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 8px;">`;
    };
    // Convert image to base64 format
    reader.readAsDataURL(file);
  });

  // When the Sell form is submitted
  sellForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Get all values from the form
    const itemName = itemNameInput.value.trim();
    const itemPrice = itemPriceInput.value.trim();
    const itemCondition = itemConditionSelect.value;
    const sizeUS = sizeUSInput.value.trim();
    const sizeUK = sizeUKInput.value.trim();
    const photoFile = itemPhotoInput.files[0];

    // Validate that all fields are filled
    if (!itemName || !itemPrice || !itemCondition || !sizeUS || !sizeUK || !photoFile) {
      alert('Please fill all required fields, including shoe sizes and photo.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }

    // Convert the price to a number and check it's valid
    const priceNumber = parseFloat(itemPrice);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Please enter a valid positive price.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }

    // Read the image file and send to server
    const reader = new FileReader();
    reader.onload = async (event) => {
      const photoDataURL = event.target.result; // Get the base64 image

      try {
        // Send data to server
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: itemName,
            price: priceNumber,
            condition_status: itemCondition,
            size_us: sizeUS,
            size_uk: sizeUK,
            image_data: photoDataURL,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          
          // Show success message
          alert(`🎉 Item submitted successfully!
Name: ${itemName}
Price: $${priceNumber}
Condition: ${itemCondition}
Size US: ${sizeUS}
Size UK: ${sizeUK}

Your item has been added to the database!`);

          // Clear form and close modal
          sellForm.reset();
          photoPreview.innerHTML = '';
          sellModal.style.display = 'none';
          
          // Optionally reload products to show the new item
          loadProducts();
        } else {
          throw new Error('Failed to submit item');
        }
      } catch (error) {
        console.error('Error submitting item:', error);
        alert('❌ Error submitting item. Please try again.');
      } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    };

    reader.readAsDataURL(photoFile); // Read the image file
  });

  // Function to load products from server
  async function loadProducts() {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const products = await response.json();
        console.log('Products loaded from server:', products);
        // You can update the UI here to show server products
        // For now, just log them to console
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  // Load products when page loads
  loadProducts();

  // DARK MODE TOGGLE 
  const darkModeBtn = document.getElementById("dark-mode-toggle");
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode"); // Toggle dark mode class
    // Update button icon based on mode
    darkModeBtn.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });

  // ======= CART FUNCTIONALITY =======
  let cart = []; // Stores cart items
  let cartCount = 0; // Tracks number of items in cart
  
  // Called when "Add to Cart" is clicked on a product
  window.addToCart = function (name, price) {
    cart.push({ name, price });
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    
    // Animate the cart icon for visual feedback
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartBtn.style.transform = 'scale(1)';
    }, 200);
  };
  
  // Show an alert with all cart items and total price
  window.showCart = function () {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    let cartItems = '🛒 Cart Items:\n';
    let total = 0;
    cart.forEach(item => {
      cartItems += `${item.name} - $${item.price}\n`;
      total += item.price;
    });
    cartItems += `\n💰 Total: $${total}`;
    alert(cartItems);
  };

  // AUTH MODAL 
  const authBtn = document.getElementById('auth-btn');
  const authModal = document.getElementById('auth-modal');
  const authForm = document.getElementById('auth-form');
  
  // Show login/signup modal
  authBtn.addEventListener('click', () => {
    authModal.style.display = 'block';
  });
  
  // Close modal function (shared by X button and outside click)
  window.closeModal = function () {
    authModal.style.display = 'none';
  };
  
  // Close modal if user clicks outside it
  window.addEventListener('click', (e) => {
    if (e.target === authModal) {
      closeModal();
    }
  });
  
  // Handle login form submission
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`👋 Welcome back, ${email}!`);
    closeModal();
  });

  // SEARCH BAR
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.item');
    
    // Show/hide items based on whether title or description includes the search term
    items.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      const description = item.querySelector('p').textContent.toLowerCase();
      item.style.display = title.includes(searchTerm) || description.includes(searchTerm)
        ? 'block'
        : 'none';
    });
  });

  // ======= CATEGORY FILTER FUNCTION =======
  // Filters products by a category name (like 'trending' or 'brands')
  window.filterProducts = function (category) {
    const items = document.querySelectorAll('.item');
    // Show all items by default when page loads
    items.forEach(item => {
      const categories = item.getAttribute('data-category');
      item.style.display = categories.includes(category) ? 'block' : 'none';
    });
  };

  // Show all items by default
  document.querySelectorAll('.item').forEach(item => {
    item.style.display = 'block';
  });

  // ======= IMAGE HOVER EFFECT ON PRODUCT IMAGES =======
  // Slight zoom effect when mouse hovers over a product image
  document.querySelectorAll('.item img, .featured-item img').forEach(img => {
    img.addEventListener('mouseover', () => {
      img.style.transform = 'scale(1.05)';
      img.style.transition = 'transform 0.3s ease';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
  
  // Smooth scroll field into view when focused
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('focus', () => {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 400); // Slightly longer for iOS keyboard delay
    });
  });
});