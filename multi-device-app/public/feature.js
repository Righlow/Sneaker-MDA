document.addEventListener('DOMContentLoaded', () => {
  // Modal Elements
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

  // Open Sell Modal
  sellBtn.addEventListener('click', () => {
    sellModal.style.display = 'block';
  });

  // Close Sell Modal
  sellClose.addEventListener('click', () => {
    sellModal.style.display = 'none';
    sellForm.reset();
    photoPreview.innerHTML = '';
  });

  // Close modal when clicking outside modal content
  window.addEventListener('click', (e) => {
    if (e.target === sellModal) {
      sellModal.style.display = 'none';
      sellForm.reset();
      photoPreview.innerHTML = '';
    }
  });

  // Preview Image when a file is selected
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

  // Handle form submission - unified and including shoe sizes
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

    // Convert price to a number
    const priceNumber = parseFloat(itemPrice);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Please enter a valid positive price.');
      return;
    }

    // Convert photo to base64 and then log all data or send to backend
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

      // Reset and close modal
      sellForm.reset();
      photoPreview.innerHTML = '';
      sellModal.style.display = 'none';
    };

    reader.readAsDataURL(photoFile);
  });

  // Your other existing code (dark mode, cart, auth, search, filter, hover effects) goes here...
  // For brevity, I omitted it here but you can keep it exactly as you had.
});

  // Your further handling here...


// Modal Elements
const sellModal = document.getElementById('sell-modal');
const sellBtn = document.getElementById('sell-now-btn');
const sellClose = document.getElementById('sell-close');
const sellForm = document.getElementById('sell-form');

const itemNameInput = document.getElementById('item-name');
const itemPriceInput = document.getElementById('item-price');
const itemConditionSelect = document.getElementById('item-condition');
const itemPhotoInput = document.getElementById('item-photo');
const photoPreview = document.getElementById('photo-preview');

// Open Sell Modal
sellBtn.addEventListener('click', () => {
  sellModal.style.display = 'block';
});

// Close Sell Modal
sellClose.addEventListener('click', () => {
  sellModal.style.display = 'none';
  sellForm.reset();
  photoPreview.innerHTML = '';
});

// Close modal when clicking outside modal content
window.addEventListener('click', (e) => {
  if (e.target === sellModal) {
    sellModal.style.display = 'none';
    sellForm.reset();
    photoPreview.innerHTML = '';
  }
});

// Preview Image when a file is selected
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

// Handle form submission
sellForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Collect form data
  const itemName = itemNameInput.value.trim();
  const itemPrice = parseFloat(itemPriceInput.value);
  const itemCondition = itemConditionSelect.value;
  const photoFile = itemPhotoInput.files[0];

  if (!itemName || !itemPrice || !itemCondition || !photoFile) {
    alert('Please fill all required fields.');
    return;
  }

  // Convert photo to base64 to display or send to server
  const reader = new FileReader();
  reader.onload = (event) => {
    const photoDataURL = event.target.result;

    // Example: Log collected data (replace this with your backend submission or UI update)
    console.log({
      itemName,
      itemPrice,
      itemCondition,
      photoDataURL,
    });

    alert('Item submitted successfully!');

    // Reset form and close modal
    sellForm.reset();
    photoPreview.innerHTML = '';
    sellModal.style.display = 'none';
  };

  reader.readAsDataURL(photoFile);
});

document.addEventListener('DOMContentLoaded', () => {
    // Your entire existing JS code goes here
    
    // Dark mode
    const darkModeBtn = document.getElementById("dark-mode-toggle");
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // Cart functionality
    let cart = [];
    let cartCount = 0;

    window.addToCart = function(name, price) {
        cart.push({ name, price });
        cartCount++;
        document.getElementById('cart-count').textContent = cartCount;
        
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }

    window.showCart = function() {
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

    window.closeModal = function() {
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
    window.filterProducts = function(category) {
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
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.style.display = 'block';
    });

    // Hover effects on images
    document.querySelectorAll('.item img, .featured-item img').forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.05)';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Sell Now modal functionality
    const sellNowBtn = document.getElementById('sell-now-btn');
    const sellModal = document.getElementById('sell-modal');
    const sellClose = document.getElementById('sell-close');
    const sellForm = document.getElementById('sell-form');

    sellNowBtn.addEventListener('click', () => {
        sellModal.style.display = 'block';
    });

    sellClose.addEventListener('click', () => {
        sellModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === sellModal) {
            sellModal.style.display = 'none';
        }
    });

    sellForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value;
        const itemPrice = document.getElementById('item-price').value;
        const itemCondition = document.getElementById('item-condition').value;

        alert(`Item submitted:\nName: ${itemName}\nPrice: $${itemPrice}\nCondition: ${itemCondition}`);

        sellModal.style.display = 'none';
        sellForm.reset();
    });

});
