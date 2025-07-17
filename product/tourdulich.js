/* Hứa Yến Nhi  B2305599 */
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function updateFavoriteTour() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
let currentUser = localStorage.getItem("currentUser");


const cartButton2 = document.querySelector(".tour__section--button");
function isLogIn2() {
    return localStorage.getItem("currentUser") !== null;
}


function moveToCart2() {
  window.location.href = "../cart/giohang.html";
}


// check neu ch dang nhap thi ko cho vao cart
// cartButton2.addEventListener("click", (event) => {
//   if (!isLogIn2()) {
//     event.preventDefault();
//     alert("Vui lòng đăng nhập để xem");
//   } else moveToCart2();
// });

if (cartButton2) {
    cartButton2.addEventListener("click", (event) => {
        if (!isLogIn2()) {
            event.preventDefault();
            alert("Vui lòng đăng nhập để xem");
        } else {
            moveToCart2();
        }
    });
}


//them tour vào giỏ hàng
function addFavoriteTour(event) {
    if(!currentUser){
        alert("Vui lòng đăng nhập để thêm sản phẩm vào yêu thích");
        return;
    }

    const button = event.target;

    const favorite = {
        id: button.dataset.id
    };

    const isFavoriteTourExisting = favorites.find(favoriteTour => favoriteTour.id === favorite.id);

    if (isFavoriteTourExisting) {
        alert("Tour du lịch đã có sẵn trong danh sách yêu thích!");
    } else {
        favorites.push(favorite);
        updateFavoriteTour();
        alert("Tour du lịch đã được thêm vào danh sách yêu thích!");
    }
}

//xóa tour

function removeFavoriteTour(event) {
    const button = event.target;
    const id = button.dataset.id;
    const index = favorites.find(favorite => favorite.id === id);
    
    favorites.splice(index, 1);
    updateFavoriteTour();
    
    // alert("Tour du lịch đã được loại bỏ khỏi danh sách yêu thích!");
    location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    updateFavoriteTour();

    document.querySelectorAll(".tour__favorite--button").forEach(button => {
        button.addEventListener("click", event => addFavoriteTour(event));
    });

    document.querySelectorAll(".tour__unfavorite--button").forEach(button => {
        button.addEventListener("click", event => removeFavoriteTour(event));
    });
});


