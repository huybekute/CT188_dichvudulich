const form = document.getElementById("signupForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullname = form.fullname.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const password = form.password.value.trim();
        const address = form.address.value.trim();
        const checked = form.querySelectorAll('input[name="contact[]"]:checked');

        // Kiểm tra bắt buộc
        if (!fullname || !email || !phone || !password) {
            alert("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không hợp lệ.");
            return;
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^\d{9,11}$/;
        if (!phoneRegex.test(phone)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập từ 9 đến 10 chữ số.");
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
    });
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