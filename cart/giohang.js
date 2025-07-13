// B2303831 Dang Hoang Nghia

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateTourCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayTourCart() {
    let total = 0;

    const cartContainer = document.getElementById("cartItem");
    const totalPrice = document.getElementById("totalPrice");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `<span class="cart__alert">Giỏ hàng đang trống</span>`;
        totalPrice.textContent = "💰Tổng tiền: 0đ";
    }

    cart.forEach((tour, index) => {
        total += tour.price;
        cartContainer.innerHTML += `
        <div class="cart__tour">
            <h4 class="cart__tour--name">${tour.name}</h4>
            <p class="cart__tour--price">Giá: ${tour.price.toLocaleString()}đ</p>
            <button onclick="removeTourFromCart(${index})" class="cart__tour--delete">Xóa tour</button>
        </div>
        `;
        totalPrice.textContent = `💰Tổng tiền: ${total.toLocaleString()}đ`;
    });
}

function addTourToCart(event) {
    const button = event.target;

    const tour = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseInt(button.dataset.price),
    };

    const isTourExisting = cart.find(tours => tours.id === tour.id);

    if (isTourExisting) {
        alert(`${tour.name} đã có sẵn trong giỏ hàng!`);
    }
    else {
        cart.push(tour);
        updateTourCart();
        displayTourCart();
        alert(`${tour.name} đã được thêm vào giỏ hàng!`);
    }
}

function removeTourFromCart(index) {
    const tourName = cart[index].name;

    cart.splice(index, 1);

    updateTourCart();
    displayTourCart();

    alert(`${tourName} đã được xóa khỏi giỏ hàng!`);
}

function checkOutTour() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống, vui lòng thêm tour!");
    }
    else {
        alert("Thanh toán tour thành công, chúc bạn có chuyến đi vui vẻ!");
    }
    cart = [];

    updateTourCart();
    displayTourCart();
}

document.addEventListener("DOMContentLoaded", () => {
    displayTourCart();

    document.querySelectorAll(".tour__button").forEach(button => {
        button.addEventListener("click", addTourToCart);
    });

    document.getElementById("checkOutButton").addEventListener("click", () => {
        if (confirm("Xác nhận thanh toán?")) {
            checkOutTour();
        }
    });
});