// B2303831 Dang Hoang Nghia

// lấy dữ liệu từ giỏ hàng, nếu chưa có gì thì tạo một mảng rỗng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// hàm cập nhật giỏ hàng vào localStorage
function updateTourCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// hàm hiển thị giỏ hàng ra màn hình
function displayTourCart() {
    let total = 0;

    const cartContainer = document.getElementById("cartItem");
    const totalPrice = document.getElementById("totalPrice");

    const buttonDelete = document.getElementById("deleteButton");

    cartContainer.innerHTML = "";

    // nút xóa tour khỏi giỏ hàng, nếu độ dài mảng = 0 thì ẩn nút và ngược lại
    if (buttonDelete) {
        buttonDelete.style.display = cart.length === 0 ? "none" : "inline-block";
    }

    // nếu độ dài mảng = 0, hiển thị giỏ hàng đang trống
    if (cart.length === 0) {
        cartContainer.innerHTML = `<span class="cart__alert">Giỏ hàng đang trống</span>`;
        totalPrice.textContent = "💰Tổng tiền: 0đ";
        return;
    }

    // duyệt qua từng tour trong giỏ hàng, hiển thị tên tour,
    // tính toán số tiền mỗi tour = số lượng khách * giá tour và hiển thị ra màn hình
    // đồng thời hiển thị nút thao tác xóa tour, tăng giảm số khách của tour
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

// hàm thêm tour vào giỏ hàng
function addTourToCart(event) {
    // lấy nút mà người dùng vừa click để xử lý tiếp
    const button = event.target;

    // tạo một object chứa thông tin tour du lịch
    const tour = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseInt(button.dataset.price),
        quantity: 1
    };

    // tìm kiếm trong giỏ hàng id tour giống với tour vừa tạo
    const existingTour = cart.find(t => t.id === tour.id);

    // nếu tour đã tồn tại
    if (existingTour) {
        // tăng số lượng khách lên 1
        existingTour.quantity += 1;
    } else {
        // ngược lại thêm tour vào giỏ hàng
        cart.push(tour);
    }
    updateTourCart();
    displayTourCart();
}

// hàm xóa tour theo chỉ số trong mảng (giỏ hàng)
function removeTourFromCart(index) {
    // xóa phần tử tại ví trí index trong mảng, số lượng cần xóa là 1
    cart.splice(index, 1);

    updateTourCart();
    displayTourCart();
}

// hàm thanh toán tour
function checkOutTour() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống, vui lòng thêm tour!");
    }
    else {
        alert("Thanh toán tour thành công, chúc bạn có chuyến đi vui vẻ!");
    }
    // reset giỏ hàng
    cart = [];

    updateTourCart();
    displayTourCart();
}

// hàm tăng số lượng khách trong tour
function changeQty(idx, dt) {
    cart[idx].quantity += dt;
    if (cart[idx].quantity <= 0) {
        cart.splice(idx, 1);
    }
    updateTourCart();
    displayTourCart();
}

// hàm hiển thị tour yêu thích
function displayFavoriteTours() {
    let tourGrid = document.getElementById("tour__grid");
    // lấy mảng các tour yêu thích, nếu trống sẽ tạo 1 mảng rỗng
    const favorites = localStorage.getItem("favorites") || [];

    tourGrid.innerHTML = "";

    if (favorites.length === 0) {
        tourGrid.innerHTML = "<p>Danh sách yêu thích hiện đang trống</p>";
        return;
    }

    let favoriteTourContent = "";

    // nếu phần tử có id tương ứng với id trong mảng, hiển thị ra màn hình
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
                <span>Giá: 1.150.000<sup>đ</sup></span>
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
    if (favorites.includes(7)) {
        favoriteTourContent += `
        <div class="tour__item">
            <img src="../Image/product/nhaco.jpg" alt="Nhà Cổ Bình Thủy">
                <h2>Nhà Cổ Bình Thủy</h2>
                <p class="tour__price">
                    <span class="label-price">Giá: 1.050.000<sup>đ</sup></span>
                </p>
                <ul class="tour__details">
                    <li><strong>📍 Khởi hành:</strong> Thành phố Cần Thơ</li>
                    <li><strong>⏱️ Thời gian:</strong> 1 ngày</li>
                    <li><strong>🚌 Phương tiện:</strong> Xe</li>
                </ul>
                <button class="tour__button" data-id="7" data-name="Nhà Cổ Bình Thủy"
                    data-price="1050000">Đặt tour</button>
                <button class="tour__unfavorite--button" data-id="7">Bỏ yêu thích</button>
                </div>`;
    }

    if (favorites.includes(8)) {
        favoriteTourContent += `
                <div class="tour__item">
                    <img src="../Image/product/conson.jpg" alt="Cồn Sơn">
                    <h2>Cồn Sơn</h2>
                    <p class="tour__price">
                        <span class="label-price">Giá: 1.550.000<sup>đ</sup></span>
                    </p>    
                    <ul class="tour__details">
                        <li><strong>📍 Khởi hành:</strong> Thành phố Cần Thơ</li>
                        <li><strong>⏱️ Thời gian:</strong> 1 ngày</li>
                        <li><strong>🚌 Phương tiện:</strong> Thuyền</li>
                    </ul>
                    <button class="tour__button" data-id="8" data-name="Cồn Sơn"
                        data-price="1550000">Đặt tour</button>
                    <button class="tour__unfavorite--button" data-id="8">Bỏ yêu thích</button>
                </div>`;
    }

    tourGrid.innerHTML = favoriteTourContent;
}

// khi load trang
document.addEventListener("DOMContentLoaded", () => {
    displayTourCart();
    displayFavoriteTours();

    // chọn lấy các nút đặt tour và gán cho nút chức năng thêm tour vào giỏ hàng
    document.querySelectorAll(".tour__button").forEach(button => {
        button.addEventListener("click", addTourToCart);
    });

    // chọn lấy nút thanh toán và gán cho nút chức năng thanh toán giỏ hàng
    document.getElementById("checkOutButton").addEventListener("click", () => {
        if (confirm("Xác nhận thanh toán?")) {
            checkOutTour();
        }
    });


    // chọn lấy nút xóa tất cả tour và cho nút thực hiện chức năng xóa tất cả tour khỏi giỏ hàng
    // thực hiện gán mảng = rỗng, nếu mảng không có phần tử thì thực hiện thông báo
    document.getElementById("deleteButton").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống");
            return;
        }
        if (confirm("Bạn có muốn xóa toàn bộ tour")) {
            cart = [];
            updateTourCart();
            displayTourCart();
        }
    });
});




