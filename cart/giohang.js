// B2303831 Dang Hoang Nghia

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateTourCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayTourCart() {
    let total = 0;

    const cartContainer = document.getElementById("cartItem");
    const totalPrice = document.getElementById("totalPrice");

    // update delete all button
    const buttonDelete = document.getElementById("deleteButton");


    cartContainer.innerHTML = "";

    
    if (buttonDelete) {
        buttonDelete.style.display = cart.length === 0 ? "none" : "inline-block";
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = `<span class="cart__alert">Giỏ hàng đang trống</span>`;
        totalPrice.textContent = "💰Tổng tiền: 0đ";
        return;
    }

    cart.forEach((tour, index) => {
        const stotal = tour.price * tour.quantity;
        total += stotal;
        cartContainer.innerHTML += `
        <div class="cart__tour">
            <h4 class="cart__tour--name">${tour.name}</h4>
            <p class="cart__tour--price">Giá: ${tour.price.toLocaleString()}đ</p>
            <div class = "cart__tour--qty">
                <p>Số khách</p>
                <button onclick="changeQty(${index}, -1)" class="buttonChange">-</button>
                <span class="quantityChange">${tour.quantity}</span>
                <button onclick="changeQty(${index},  1)" class="buttonChange">+</button>
            </div>
            <div class="cart__tour--action">
                <button onclick="removeTourFromCart(${index})" class="cart__tour--delete">Xóa tour</button>
            </div>
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
        quantity: 1
    };

    const existingTour = cart.find(t => t.id === tour.id);

    if (existingTour) {
        existingTour.quantity += 1;
    } else {
        cart.push(tour);
        alert(`${tour.name} đã được thêm vào giỏ hàng!`);
    }
    updateTourCart();
    displayTourCart();
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

function changeQty(idx, dt){
    cart[idx].quantity += dt;
    if(cart[idx].quantity <= 0){
        cart.splice(idx, 1);
    }
    updateTourCart();
    displayTourCart();
}

function displayFavoriteTours() {
    let tourGrid = document.getElementById("tour__grid");
    const favorites = localStorage.getItem("favorites") || [];

    tourGrid.innerHTML = "";

    if (favorites.length === 0) {
        tourGrid.innerHTML = "<p>Danh sách yêu thích hiện đang trống</p>";
        return;
    }

    let favoriteTourContent = "";

    if (favorites.includes(1)) {
        favoriteTourContent += `
         <div class="tour__item">
            <img src="../Image/product/choco.jpg" alt="Chợ cổ Cần Thơ">
            <h2>Chợ Cổ Cần Thơ</h2>
            <p class="tour__price">
                <span>Giá: 850.000<sup>đ</sup></span>
            </p>

            <ul class="tour__details">
                <li><strong>📍 Khởi hành:</strong> Thành phố Cần Thơ</li>
                <li><strong>⏱️ Thời gian:</strong> 1 ngày</li>
                <li><strong>🚌 Phương tiện:</strong> Xe </li>
            </ul>
            <button class="tour__button" data-id="1" data-name="Chợ Cổ Cần Thơ" data-price="850000">Đặt tour</button>
            <button class="tour__unfavorite--button" data-id="1" >Bỏ yêu thích</button>
        </div>
        `;
    }

    if (favorites.includes(2)) {
        favoriteTourContent += `
        <div class="tour__item">
                <img src="../Image/product/chonoi.jpg" alt="Chợ nổi Cái Răng">
                <h2>Chợ Nổi Cái Răng</h2>
                <p class="tour__price">
                    <span>Giá: 1.050.000<sup>đ</sup></span>
                </p>
                <ul class="tour__details">
                    <li><strong>📍 Khởi hành:</strong> Thành phố Cần Thơ</li>
                    <li><strong>⏱️ Thời gian:</strong> 1 ngày</li>
                    <li><strong>🚌 Phương tiện:</strong> Thuyền </li>
                </ul>
                <button class="tour__button" data-id="2" data-name="Chợ Nổi Cái Răng" data-price="1050000">Đặt
                    tour</button>
                <button class="tour__unfavorite--button" data-id="2">Bỏ yêu thích</button>
            </div>
        `;
    }

    if (favorites.includes(3)) {
        favoriteTourContent += `
        <div class="tour__item">
            <img src="../Image/product/ninhkieu.jpg" alt="Bến Ninh Kiều">
            <h2>Bến Ninh Kiều</h2>
            <p class="tour__price">
                <span>Giá: 850.000<sup>đ</sup></span>
            </p>
            <ul class="tour__details">
                <li><strong>📍 Khởi hành:</strong> Thành phố Cần Thơ</li>
                <li><strong>⏱️ Thời gian:</strong> 1 ngày</li>
                <li><strong>🚌 Phương tiện:</strong> Du thuyền </li>
            </ul>
            <button class="tour__button" data-id="3" data-name="Bến Ninh Kiều" data-price="850000">Đặt
                tour</button>
            <button class="tour__unfavorite--button" data-id="3">Bỏ yêu thích</button>
        </div>
        `;
    }

    if (favorites.includes(4)) {
        favoriteTourContent += `
        <div class="tour__item">
            <img src="../Image/product/mykhanh.jpg" alt="Vườn Mỹ Khánh">
            <h2>Khu Du Lịch Mỹ Khánh</h2>
            <p class="tour__price">
                <span>Giá: 1.150.000<sup>đ</sup></span>
            </p>

            <ul class="tour__details">
                <li><strong>📍 Khởi hành:</strong> Thành phố Cần Thơ</li>
                <li><strong>⏱️ Thời gian:</strong> 1 ngày</li>
                <li><strong>🚌 Phương tiện:</strong> Xe </li>
            </ul>
            <button class="tour__button" data-id="4" data-name="Khu Du Lịch Mỹ Khánh" data-price="1150000">Đặt tour</button>
            <button class="tour__unfavorite--button" data-id="4">Bỏ yêu thích</button>
        </div>
        `;
    }

    if (favorites.includes(5)) {
        favoriteTourContent += `
        <div class="tour__item">
            <img src="../Image/product/vuonco.jpg" alt="Vườn cò Bằng Lăng">
            <h2>Vườn Cò Bằng Lăng</h2>
            <p class="tour__price">
                <span>Giá: 1.150.000<sup>đ</span>
            </p>
            <ul class="tour__details">
                <li><strong>📍 Khởi hành:</strong> Thành phố Cần Thơ</li>
                <li><strong>⏱️ Thời gian:</strong> 1 ngày</li>
                <li><strong>🚌 Phương tiện:</strong> Xe </li>
            </ul>
            <button class="tour__button" data-id="5" data-name="Vườn Cò Bằng Lăng" data-price="1150000">Đặt
                tour</button>
            <button class="tour__unfavorite--button" data-id="5">Bỏ yêu thích</button>
        </div>
        `;
    }

    if (favorites.includes(6)) {
        favoriteTourContent += `
        <div class="tour__item">
            <img src="../Image/product/truclam.jpg" alt="Thiền Viện Trúc Lâm Phương Nam">
            <h2>Thiền Viện Trúc Lâm Phương Nam</h2>
            <p class="tour__price">
                <span class="label-price">Giá: 950.000<sup>đ</sup></span>
            </p>

            <ul class="tour__details">
                <li><strong>📍 Khởi hành:</strong> Thành phố Cần Thơ</li>
                <li><strong>⏱️ Thời gian:</strong> 1 ngày</li>
                <li><strong>🚌 Phương tiện:</strong> Xe</li>
            </ul>
            <button class="tour__button" data-id="6" data-name="Thiền Viện Trúc Lâm Phương Nam"
                data-price="950000">Đặt tour</button>
            <button class="tour__unfavorite--button" data-id="6">Bỏ yêu thích</button>
        </div>`;
    }

    tourGrid.innerHTML = favoriteTourContent;
}

document.addEventListener("DOMContentLoaded", () => {
    displayTourCart();
    displayFavoriteTours();

    document.querySelectorAll(".tour__button").forEach(button => {
        button.addEventListener("click", addTourToCart);
    });

    document.getElementById("checkOutButton").addEventListener("click", () => {
        if (confirm("Xác nhận thanh toán?")) {
            checkOutTour();
        }
    });

    
    // update check delete all tour
    document.getElementById("deleteButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống");
        return;
    }
    if (confirm("Bạn có muốn xóa toàn bộ tour")) {
        cart = [];
        updateTourCart();
        displayTourCart();
        alert("Đã xóa toàn bộ tour");
    }
});
});




