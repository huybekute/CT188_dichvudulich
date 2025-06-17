function displayCart() {
  let currentUser = localStorage.getItem("currentUser");
  let cartKey = `cart_${currentUser}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML =
      "<p class='empty-cart'>Giỏ hàng của bạn đang trống.</p>";
    document.getElementById("hideButton").style.display = "none";
    return;
  }

  cart.forEach((product) => {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${product.image}" alt="${product.name}" />
                        <div>
                            <h4>${product.name}</h4>
                            <p>Diện tích: ${product.area}</p>
                            <p>Phong cách: ${product.style}</p>
                        </div>
                    </div>
                    <button class="remove-button" onclick="removeFromCart(${product.id})">Bỏ Thích</button>
                `;
    cartItems.appendChild(item);
  });

  document.getElementById("hideButton").style.display = "block";
}
function resetCart() {
  let currentUser = localStorage.getItem("currentUser");
  let cartKey = `cart_${currentUser}`;

  localStorage.setItem(cartKey, JSON.stringify([]));

  displayCart();
}



function removeFromCart(productId) {
  let currentUser = localStorage.getItem("currentUser");
  let cartKey = `cart_${currentUser}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  cart = cart.filter((p) => p.id !== productId);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  displayCart();
}

window.onload = displayCart;

// check đăng nhập
const buttonDangNhap = document.querySelector(".sign.nav__links");
const buttonAccount = document.querySelector(".account_link.nav__links");
const accountContent = document.querySelector("#drop-down");
const buttonSignOut = document.querySelector("#button-out");
const textTitle = document.querySelector("#result-1");
const textDecs = document.querySelector("#result-2");
let userArray = JSON.parse(localStorage.getItem("usersInfor")) || [];
const user = localStorage.getItem("currentUser");
const isLoggedIn = () => {
  return localStorage.getItem("currentUser") !== null;
};

const getGreetingBasedOnTime = () => {
  const today = new Date(); // Lấy đối tượng Date hiện tại
  const hours = today.getHours(); // Lấy giờ hiện tại (0 đến 23)

  let greeting;

  if (hours >= 5 && hours < 12) {
    greeting = "Good morning"; // Từ 5h sáng đến 11h59 sáng
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon"; // Từ 12h trưa đến 17h59
  } else {
    greeting = "Good night"; // Từ 18h tối trở đi
  }

  return greeting;
};
const greetingMessage = getGreetingBasedOnTime();
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfWeek = today.getDay();

buttonAccount.addEventListener("click", () => {
  if (accountContent.classList.contains("none")) {
    accountContent.classList.remove("none");
    accountContent.classList.add("block");
  } else {
    accountContent.classList.remove("block");
    accountContent.classList.add("none");
  }
});

const checkLogin = () => {
  if (isLoggedIn()) {
    buttonDangNhap.style.display = "none";
    buttonAccount.style.display = "flex";
  } else {
    buttonDangNhap.style.display = "flex";
    buttonAccount.style.display = "none";
  }
};
buttonSignOut.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  buttonSignOut.href = "../index.html";
});
checkLogin();
const innerUser = () => {
  textTitle.innerHTML = `Hello, ${user}`;
  textDecs.innerHTML = `${greetingMessage}! Today is ${weekdays[dayOfWeek]}, ${day}/${month}/${year}`;
};
innerUser();
// end check đăng nhập

// Modal - Submit

function errorMessage(elmt, message) {
  const formRow = elmt.parentElement;
  if (formRow.classList.contains("success")) {
    formRow.classList.remove("success");
    formRow.classList.add("error");
  } else {
    formRow.classList.add("error");
  }
  formRow.querySelector(".message").textContent = message;
}

function successMessage(elmt) {
  const formRow = elmt.parentElement;

  if (formRow.classList.contains("error")) {
    formRow.classList.add("success");
    formRow.classList.remove("error");
  } else {
    formRow.classList.add("success");
  }
}

function validateEmail(email) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mailformat.test(String(email).toLowerCase());
}

function checkEmail() {
  if (email.value === "") {
    errorMessage(email, "Bắt buộc !!!");
  } else if (!validateEmail(email.value)) {
    errorMessage(email, "Email không đúng !!!");
  } else {
    successMessage(email);
  }
}

function checkname() {
  if (fname.value === "") {
    errorMessage(fname, "Bắt buộc !!!");
  } else {
    successMessage(fname);
  }
}

function checkPhone() {
  if (nphone.value === "") {
    errorMessage(nphone, "Bắt buộc !!!");
  } else if (isNaN(nphone.value)) {
    errorMessage(nphone, "Số điện thoại không phải là chữ !");
    alert("Thông tin chưa đúng !");
  } else if (nphone.value.length === 10) {
    successMessage(nphone);
  } else if (nphone.value.length != 10) {
    errorMessage(nphone, "Số điện thoại không đúng !");
    alert("Thông tin chưa đúng !");
  } else {
    successMessage(nphone);
  }
}

function normal(elmt, elmt2, elmt3) {
  const formRow = elmt.parentElement;
  const formRow2 = elmt2.parentElement;
  const formRow3 = elmt3.parentElement;
  if (formRow.classList.contains("success")) {
    formRow.classList.remove("success");
  } else {
    formRow.classList.remove("success");
    formRow.classList.remove("error");
  }
  if (formRow2.classList.contains("success")) {
    formRow2.classList.remove("success");
  } else {
    formRow2.classList.remove("success");
    formRow2.classList.remove("error");
  }
  if (formRow3.classList.contains("success")) {
    formRow3.classList.remove("success");
  } else {
    formRow3.classList.remove("success");
    formRow3.classList.remove("error");
  }
}

const fname = document.getElementById("name");
const nphone = document.getElementById("phone");
const email = document.getElementById("email");

fname.addEventListener("blur", checkname, false);
nphone.addEventListener("blur", checkPhone, false);
email.addEventListener("blur", checkEmail, false);

const form1 = document.getElementById("form1");
const container = document.querySelector(".container-form");

form1.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formRows = document.querySelectorAll(".form-row");
  let arrFormrows = Array.from(formRows);
  arrFormrows.pop();
  let isValid = true;
  arrFormrows.forEach((arrFormrows) => {
    console.log(arrFormrows.classList.contains("success"));
    if (!arrFormrows.classList.contains("success")) isValid = false;
  });

  if (isValid) {
    container.classList.add("complete");
    alert(
      "Gửi thông tin thành công !! \nChúng tôi sẽ liên lạc với bạn sớm \nChúc bạn một ngày tốt lành ^^"
    );
    form1.reset();
    normal(fname, nphone, email);
    document.getElementById("modale1").classList.add("hide");
    document.getElementById("consultButton").addEventListener("click", resetCart());
  } else {
    container.classList.remove("complete");
  }
});

function toggle(e) {
  document.getElementById(`modale${e}`).classList.toggle("hide");
}

function exit(e) {
  document.getElementById(`modale${e}`).classList.add("hide");
}

