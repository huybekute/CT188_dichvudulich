// B2303831 Dang Hoang Nghia
const contactForm = document.getElementById("contact__form");

contactForm.addEventListener("submit", (event) => {
    // Ngan khong cho form tu dong load lai trang
    event.preventDefault();
    // Lay gia tri cua form
    const userName = document.getElementById("contact__form--name").value;
    const userEmail = document.getElementById("contact__form--email").value;
    const userSelect = document.getElementById("contact__form--select").value;
    const userTextarea = document.getElementById("contact__form--textarea").value;

    // Neu gia tri ton tai (khac rong)
    if (userName && userEmail && userSelect && userTextarea) {
        // Hien thi thong bao
        alert(`Chào ${userName}, cảm ơn góp ý của bạn. Chúng tôi sẽ sớm phản hồi bạn thông qua email: ${userEmail}.`);
        // Reset form   
        contactForm.reset();
        window.location.href = "./gioithieu.html";
    } else {
        alert("Vui lòng điền đầy đủ thông tin.");
    }
});
