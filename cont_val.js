/* File Name: contact-val.js */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value;

    if (name === "" || !email.includes("@")) {
        alert("Error: Name and Valid Email required!");
    } else {
        alert("Success: Message sent!");
        this.reset();
    }
});