// B2303831 Dang Hoang Nghia

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function updateFavoriteTour() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addFavoriteTour(event) {
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

function removeFavoriteTour(event) {
    const button = event.target;
    const id = button.dataset.id;
    const index = favorites.find(favorite => favorite.id === id);
    
    favorites.splice(index, 1);
    updateFavoriteTour();
    
    alert("Tour du lịch đã được loại bỏ khỏi danh sách yêu thích!");
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