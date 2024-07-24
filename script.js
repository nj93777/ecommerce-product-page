document.getElementById("menu-btn").addEventListener("click", function () {
  document.querySelector(".menu-links").classList.add("menu-open");
  document.querySelector(".overlay").classList.add("open");
  document.getElementById("menu-btn").style.display = "none"; // hide menu button
});

document
  .getElementById("close-menu-btn")
  .addEventListener("click", function () {
    document.querySelector(".menu-links").classList.remove("menu-open");
    document.querySelector(".overlay").classList.remove("open");
    document.getElementById("menu-btn").style.display = "inline"; // show menu button
  });

/*Model*/
document.querySelector(".cart-button").addEventListener("click", function () {
  const cartContainer = document.querySelector(".cart-container");
  if (
    cartContainer.style.display === "none" ||
    cartContainer.style.display === ""
  ) {
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
});

/*MENU SHOW*/

document.getElementById("menu-btn").addEventListener("click", function () {
  document.querySelector(".menu-links").classList.add("menu-open");
  document.querySelector(".overlay").classList.add("open");
});

document
  .getElementById("close-menu-btn")
  .addEventListener("click", function () {
    document.querySelector(".menu-links").classList.remove("menu-open");
    document.querySelector(".overlay").classList.remove("open");
  });

document.querySelector(".overlay").addEventListener("click", function () {
  document.querySelector(".menu-links").classList.remove("menu-open");
  document.querySelector(".overlay").classList.remove("open");
});

/*Image sliders*/

let currentIndex = 0;
const images = document.querySelectorAll(".product-image");

function showImage(index) {
  images.forEach((image, i) => {
    image.classList.toggle("active", i === index);
  });
}

function prevImage() {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  showImage(currentIndex);
}

function nextImage() {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  showImage(currentIndex);
}

// Show first picture
showImage(currentIndex);

// Quantity
document.addEventListener("DOMContentLoaded", () => {
  const minusButton = document.getElementById("minus-button");
  const plusButton = document.getElementById("plus-button");
  const quantityElement = document.getElementById("quantity");
  const addToCartButton = document.getElementById("ad");
  const cartCountElement = document.querySelector(".cart-count");
  const cartContainer = document.querySelector(".cart-container");
  const cartContent = document.querySelector(".cart-content");
  const emptyCartMessage = document.querySelector(".empty-cart");
  const currentPriceElement = document.querySelector(".current-price");
  const productNameElement = document.getElementById("product-name");
  const activeProductImage = document.querySelector(".product-image.active");
  const checkoutButton = document.getElementById("checkout-button");
  const cartItemTemplate = document.getElementById("cart-item-template");

  if (
    !minusButton ||
    !plusButton ||
    !quantityElement ||
    !addToCartButton ||
    !cartCountElement ||
    !cartContainer ||
    !cartContent ||
    !emptyCartMessage ||
    !currentPriceElement ||
    !productNameElement ||
    !activeProductImage ||
    !checkoutButton ||
    !cartItemTemplate
  ) {
    console.error("Elementtiä ei löydy. Tarkista HTML id-arvot.");
    return;
  }

  let quantity = 0;
  let cartCount = 0;

  cartCountElement.style.display = "none";

  minusButton.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      quantityElement.textContent = quantity;
    }
  });

  plusButton.addEventListener("click", () => {
    quantity++;
    quantityElement.textContent = quantity;
  });

  addToCartButton.addEventListener("click", () => {
    const price = parseFloat(currentPriceElement.textContent.replace("$", ""));
    const productName = productNameElement.textContent;
    const productImageSrc = activeProductImage.src;

    if (quantity === 0) return;

    let cartItem = cartContent.querySelector(
      `.cart-item[data-product-name="${productName}"]`
    );

    if (cartItem) {
      const itemQuantity = cartItem.querySelector(".item-quantity");
      const cartItemTotalPrice = cartItem.querySelector(
        ".cart-item-total-price"
      );
      let currentQuantity = parseInt(itemQuantity.textContent);
      currentQuantity += quantity;
      itemQuantity.textContent = currentQuantity;
      cartItemTotalPrice.textContent = `$${(price * currentQuantity).toFixed(
        2
      )}`;
    } else {
      const cartItemClone = cartItemTemplate.content.cloneNode(true);
      const cartItemElement = cartItemClone.querySelector(".cart-item");
      const cartItemImage = cartItemClone.querySelector(".cart-item-image");
      const cartItemName = cartItemClone.querySelector(".cart-item-name");
      const itemPrice = cartItemClone.querySelector(".item-price");
      const itemQuantity = cartItemClone.querySelector(".item-quantity");
      const cartItemTotalPrice = cartItemClone.querySelector(
        ".cart-item-total-price"
      );
      const deleteButton = cartItemClone.querySelector(".img-delete img");

      cartItemElement.setAttribute("data-product-name", productName);

      cartItemImage.src = productImageSrc;
      cartItemImage.alt = productName;
      cartItemName.textContent = productName;
      itemPrice.textContent = `$${price.toFixed(2)}`;
      itemQuantity.textContent = quantity;
      cartItemTotalPrice.textContent = `$${(price * quantity).toFixed(2)}`;

      deleteButton.addEventListener("click", () => {
        const itemQuantityElement =
          cartItemElement.querySelector(".item-quantity");
        if (itemQuantityElement) {
          const quantityToRemove = parseInt(itemQuantityElement.textContent);
          cartContent.removeChild(cartItemElement);
          cartCount -= quantityToRemove;
          if (cartCount <= 0) {
            cartCountElement.style.display = "none";
            checkoutButton.style.display = "none";
            emptyCartMessage.style.display = "block";
            cartCount = 0;
          } else {
            cartCountElement.textContent = cartCount;
          }
        }
      });

      cartContent.appendChild(cartItemClone);
      emptyCartMessage.style.display = "none";
    }

    cartCount += quantity;

    if (cartCount > 0) {
      cartCountElement.textContent = cartCount;
      cartCountElement.style.display = "flex";
      checkoutButton.style.display = "flex";
    } else {
      cartCountElement.style.display = "none";
      checkoutButton.style.display = "none";
    }

    quantity = 0;
    quantityElement.textContent = quantity;
  });
});

// Thumbnail gallery

document.addEventListener("DOMContentLoaded", function() {
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImage = document.getElementById('main-image');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
     
      thumbnails.forEach(img => img.classList.remove('active'));

      this.classList.add('active');

      mainImage.src = this.getAttribute('data-fullsize');
    });
  });
});
