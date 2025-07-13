// cuon ve dau trang khi tai lai

window.onload = function () {
  window.scrollTo(0, 0);
};

window.onbeforeunload = function () {
  window.scrollTo(0, 0);  
};


const buttonAcc = document.getElementById("buttonAcc");
const buttonSignin = document.getElementById("buttonSignin");
const accountContent = document.getElementById("accountContent");
const buttonSignout = document.getElementById("buttonSignout");
const textTitle = document.getElementById("result1");
const textDesc = document.getElementById("result2");
const cartButton = document.getElementById("cartButton");
const email = localStorage.getItem("currentUser");



// Hiển thị ngày giờ hiện tại
function greetingTime() {
    const today = new Date();
    const hours = today.getHours();
    let greeting;   
    if (hours >= 5 && hours < 12) {
        greeting = "Good morning";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Good afternoon";
    } else if (hours >= 18 && hours < 22) {
        greeting = "Good evening";
    } else {
        greeting = "Good night";
    }
    return greeting;
}


const gtMessage = greetingTime();
const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const dayofweek = today.getDay();

buttonAcc.addEventListener("click", () =>{
    if(accountContent.classList.contains("header__hidden--none")){
        accountContent.classList.remove("header__hidden--none");
        accountContent.classList.add("block");
    }
    else{
        accountContent.classList.remove("block");
        accountContent.classList.add("header__hidden--none");
    }
});

// check đăng nhaapj

function isLogIn() {
    return localStorage.getItem("currentUser") !== null;
}

function checkLogin() {
  if (isLogIn()) {
    buttonSignin.style.display = "none";
    buttonAcc.style.display = "flex";
  } else {
    buttonSignin.style.display = "flex";
    buttonAcc.style.display = "none";
  }
}
checkLogin();

// dang xuat
buttonSignout.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../trangchu.html";
})


// lay fullName cua nguoi dung hien tai
let userData = null;
if (email) {
  const storedUser = localStorage.getItem(`user_${email}`);
  if (storedUser) {
    userData = JSON.parse(storedUser);
  }
}

//Hienthi thong bao cua tai khoan
function innerName() {
    textTitle.innerHTML = `Xin chào, ${userData.fullname}`;
    textDesc.innerHTML = `${gtMessage}, today is ${week[dayofweek]}, ${date}/${month}/${year}`;
}
if(userData){
  innerName();
}

function moveToCart() {
  window.location.href = "./cart/giohang.html";
}


// check neu ch dang nhap thi ko cho vao cart
cartButton.addEventListener("click", (event) => {
  if (!isLogIn()) {
    event.preventDefault();
    alert("Vui lòng đăng nhập để xem");
    window.location.href = "../signin/dangnhap.html";
  } else moveToCart();
});
