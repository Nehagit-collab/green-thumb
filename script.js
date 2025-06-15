
       let wishlist = [];
        let cart = [];

        
        function loadCart() {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                cart = JSON.parse(storedCart);
            } else {
                cart = [];
            }
            updateCart();
        }

        function saveCartToStorage() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function addToCart(itemId) {
            const item = allProducts.find(i => i.id === itemId);
            if (!item) {
                console.error('Item not found in allProducts:', itemId);
                return;
            }
            const found = cart.find(i => i.id === itemId);
            if (found) found.quantity++;
            else cart.push({ ...item, quantity: 1 });

            saveCartToStorage();
            updateCart();
        }

        function updateCart() {
            const cartList = document.getElementById('cart');
            const totalCostSpan = document.getElementById('totalCost');
            if (!cartList || !totalCostSpan) {
                console.error("Cart elements not found.");
                return;
            }
            cartList.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                total += item.price * item.quantity;
                const li = document.createElement('li');
                li.innerHTML = `<img src="${item.image}" alt="${item.name}"> ${item.name} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
                cartList.appendChild(li);
            });
            totalCostSpan.textContent = total.toFixed(2);
        }

        function toggleCart() {
            const cartContainer = document.getElementById('cartContainer');
            if (cartContainer) cartContainer.classList.toggle('active');
        }

        function buyItems() {
            if (cart.length > 0) {
                alert('Thank you for your purchase!');
                cart = [];
                saveCartToStorage();
                updateCart();
            } else {
                alert('Your cart is empty!');
            }
        }
           function loadWishlist() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
        wishlist = JSON.parse(storedWishlist);
    } else {
        wishlist = [];
    }
    updateWishlist(); // Make sure this calls the correct update function
}
function saveWishlistToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
       function addToWishlist(itemId) {
    const item = allProducts.find(item => item.id === itemId);
    if (!item) {
        console.error('Item not found in allProducts:', itemId);
        return;
    }
    const existingItem = wishlist.find(wishlistItem => wishlistItem.id === itemId);

    if (!existingItem) {
        wishlist.push({ ...item, quantity: 1 }); // Assuming quantity 1 for wishlist items
        saveWishlistToStorage(); // <--- ADD THIS LINE
        updateWishlist(); // <--- ADD THIS LINE
    } else {
        alert(`${item.name} is already in your wishlist!`);
    }
}
function updateWishlist() {
    const wishlistList = document.getElementById('wishlist');
    if (!wishlistList) {
        console.error("Wishlist element not found.");
        return;
    }
    wishlistList.innerHTML = '';
    
  wishlist.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<img src="${item.image}" alt="${item.name}"> ${item.name} - $${item.price} <button onclick="removeFromWishlist(${item.id})">Remove</button>`;
                wishlistList.appendChild(li);
            });
}

      function removeFromWishlist(itemId) {
    wishlist = wishlist.filter(item => item.id !== itemId);
    saveWishlistToStorage(); // <--- ADD THIS LINE
    updateWishlist(); // <--- ADD THIS LINE
}
        function toggleWishlist() {
            const wishlistContainer = document.getElementById('wishlistContainer');
            if (wishlistContainer) wishlistContainer.classList.toggle('active');
        }

        function clearWishlist() {
            wishlist = [];
            updateWishlist();
            alert('Your wishlist has been cleared!');
        }

        function showDetails(itemId) {
            const item = allProducts.find(item => item.id === itemId);
            if (!item) {
                console.error('Item not found for details:', itemId);
                return;
            }
            const detailsContainer = document.getElementById('detailsContainer');
            if (!detailsContainer) {
                console.error("Details container not found.");
                return;
            }
            detailsContainer.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <h3>Price: $${item.price}</h3>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
                <button onclick="buyNow(${item.id})">Buy Now</button>
                <button onclick="closeDetails()">Close</button>
                <button onclick="addToWishlist(${item.id})"><i class="fas fa-heart"></i></button>
                <h4>Some additional tips</h4>
                <ul>
                    ${Array.isArray(item.reviews) ? item.reviews.map(review => `<li>${review}</li>`).join('') : `<li>${item.reviews}</li>`}
                </ul>
            `;
            detailsContainer.style.display = 'block';
        }

        function closeDetails() {
            const detailsContainer = document.getElementById('detailsContainer');
            if (detailsContainer) detailsContainer.style.display = 'none';
        }

        function buyNow(itemId) {
            const item = allProducts.find(item => item.id === itemId);
            if (item) {
                alert(`Thank you for purchasing ${item.name}!`);
                closeDetails();
            }
        }

        let slideIndex = 1;

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");

            if (slides.length === 0) {
                return;
            }
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex - 1].style.display = "block";
        }

        function goToSellPage() {
            window.location.href = 'sell1.html';
        }

        function handleGlobalSearch(event) {
            if (event && event.type === 'keypress' && event.key !== 'Enter') {
                return;
            }

            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value.toLowerCase().trim();

            if (!query) {
                alert('Please enter a plant name to search.');
                return;
            }

            const foundProduct = allProducts.find(product =>
                product.name.toLowerCase().includes(query)
            );

            if (foundProduct) {
                // If found on current page (index.html), display it immediately
                if (foundProduct.page === 'index.html') {
                    displayProductsOnHomePage([foundProduct]);
                    const itemElement = document.querySelector(`.item h3[data-id="${foundProduct.id}"]`).closest('.item');
                    if (itemElement) {
                        itemElement.classList.add('highlight');
                        itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => {
                            itemElement.classList.remove('highlight');
                        }, 3000); // Remove highlight after 3 seconds
                    }
                } else {
                    // Redirect to the correct page with the search query as a URL parameter
                    window.location.href = `${foundProduct.page}?search=${encodeURIComponent(query)}`;
                }
            } else {
                const itemList = document.getElementById('itemList');
                const noResultsMessage = document.getElementById('noResultsMessage');
                if (itemList) itemList.innerHTML = '';
                if (noResultsMessage) noResultsMessage.style.display = 'block';
                alert('No product found with that name across all categories.');
            }
        }

        function displayProductsOnHomePage(productsToDisplay) {
            const itemList = document.getElementById('itemList');
            const noResultsMessage = document.getElementById('noResultsMessage');
            if (!itemList) {
                console.error("Error: 'itemList' element not found for displaying featured products.");
                return;
            }
            itemList.innerHTML = '';
            if (productsToDisplay.length > 0) {
                noResultsMessage.style.display = 'none';
                productsToDisplay.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'item';
                    li.innerHTML = `
                        ${item.tag ? `<h5>${item.tag}</h5>` : ''}
                        <img src="${item.image}" alt="${item.name}">
                        <h3 data-id="${item.id}">${item.name}</h3>
                        <h4>$${item.price}</h4>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <p class="small-text">free delivery</p>
                        <button onclick="showDetails(${item.id})">View Details</button>
                    `;
                    itemList.appendChild(li);
                });
            } else {
                noResultsMessage.style.display = 'block';
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            loadCart();
            loadWishlist();
            showSlides(slideIndex);

            // Handle search query from URL on page load (if redirected)
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if (searchQuery) {
                document.getElementById('searchInput').value = searchQuery;
                const foundProduct = allProducts.find(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (foundProduct) {
                    displayProductsOnHomePage([foundProduct]);
                    const itemElement = document.querySelector(`.item h3[data-id="${foundProduct.id}"]`).closest('.item');
                    if (itemElement) {
                        itemElement.classList.add('highlight');
                        itemElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => {
                            itemElement.classList.remove('highlight');
                        }, 3000);
                    }
                } else {
                    displayProductsOnHomePage([]); // Show no results
                }
            } else {
                // Display initial featured products when no search query
                const featuredProducts = allProducts.filter(p => p.category === 'indoor' || p.category === 'flower').slice(0, 8);
                displayProductsOnHomePage(featuredProducts);
            }
        });
    