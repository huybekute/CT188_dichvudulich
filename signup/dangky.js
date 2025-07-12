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


const form = document.getElementById("signupForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullname = form.fullname.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const password = form.password.value.trim();
        const confirmPassword = form.confirmPassword.value.trim();
        const address = form.address.value.trim();
        const checked = form.querySelectorAll('input[name="contact[]"]:checked');
        const storedUser = localStorage.getItem(`user_${email}`);

        // Kiểm tra bắt buộc
        if (!fullname || !email || !phone || !password) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không hợp lệ.");
            return;
        }

        if (storedUser) {
            alert("Email đã được đăng ký")
            return;
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^\d{9,11}$/;
        if (!phoneRegex.test(phone)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập từ 9 đến 10 chữ số.");
            return;
        }
        
        //check password
        if(password.length < 6){
            alert("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        if(password != confirmPassword){
            alert("Mật khẩu không khớp");
            return;
        }

        // Kiểm tra checkbox
        if (checked.length === 0) {
            alert("Vui lòng chọn ít nhất một hình thức liên hệ.");
            return;
        }

        // Lưu dữ liệu
        const contactMethods = Array.from(checked).map(cb => cb.value);
        const userData = {
            fullname,
            email,
            phone,
            password,
            address,
            contact: contactMethods
        };

        localStorage.setItem(`user_${email}`, JSON.stringify(userData));
        alert("Đăng ký thành công! Thông tin đã được lưu.");
        form.reset();

        window.location.href = "../signin/dangnhap.html";
    });
}

//hiển thị mật khẩu

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

const togglePasswordConfirm = document.getElementById("togglePasswordConfirm");
const confirmPasswordInput = document.getElementById("confirmPassword");

if(togglePasswordConfirm && confirmPasswordInput) {
    togglePasswordConfirm.addEventListener("click", function(){
        const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
        confirmPasswordInput.setAttribute("type", type);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    })
}