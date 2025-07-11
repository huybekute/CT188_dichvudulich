// TÀI KHOẢN NGƯỜI DÙNG
const defaultUsers = [
    {
        fullname: "Nguyễn Văn A",
        email: "nva@gmail.com",
        phone: "0123456789",
        password: "123456",
        address: "Cần Thơ",
        contact: ["Zalo"]
    },
    {
        fullname: "Trần Thị B",
        email: "ttb@gmail.com",
        phone: "0987654321",
        password: "abcdef",
        address: "Hà Nội",
        contact: ["Điện thoại"]
    }
];

// Lưu vào localStorage 
defaultUsers.forEach(user => {
    const key = `user_${user.email}`;
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(user));
    }
});

// KIỂM TRA NẾU ĐÃ ĐĂNG NHẬP
const currentUserEmail = localStorage.getItem("currentUser");
const currentUserData = JSON.parse(localStorage.getItem(`user_${currentUserEmail}`));

const form = document.getElementById("signinForm");

if (currentUserData) {
    // Ẩn form đăng nhập
    if (form) {
        form.style.display = "none";
    }

    // Hiển thị lời chào
    const main = document.querySelector(".about_signin");
    if (main) {
        const welcomeMsg = document.createElement("p");
        welcomeMsg.textContent = "Chào mừng quý khách hàng đang đến với dịch vụ du lịch Meandry";
        welcomeMsg.style.fontSize = "18px";
        welcomeMsg.style.color = "#2e8b57";
        welcomeMsg.style.fontWeight = "bold";
        welcomeMsg.style.marginTop = "20px";
        main.appendChild(welcomeMsg);
    }
} else {
    // XỬ LÝ FORM ĐĂNG NHẬP
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = form.email.value.trim();
            const password = form.password.value.trim();

            if (!email || !password) {
                alert("Vui lòng nhập đầy đủ email và mật khẩu.");
                return;
            }

            const storedUser = localStorage.getItem(`user_${email}`);

            if (!storedUser) {
                alert("Tài khoản không tồn tại.");
                return;
            }

            const userData = JSON.parse(storedUser);

            if (userData.password !== password) {
                alert("Mật khẩu không đúng.");
                return;
            }

            // Lưu trạng thái đăng nhập
            localStorage.setItem("currentUser", email);

            alert("Đăng nhập thành công!");

            // Hiển thị lời chào người dùng
            const welcomeEl = document.getElementById("welcomeUser");
            if (welcomeEl) {
                welcomeEl.textContent = `Xin chào, ${userData.fullname}!`;
                welcomeEl.style.color = "#2e8b57";
                welcomeEl.style.fontWeight = "bold";
                welcomeEl.style.marginBottom = "10px";
            }

            form.reset();
            window.location.href = "trangchu.html"; // Chuyển hướng sau khi đăng nhập
        });
    }
}

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });
}
  