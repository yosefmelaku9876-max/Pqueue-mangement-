/* File Name: register-val.js */
document.getElementById('regForm').addEventListener('submit', function(e) {
    const name = document.getElementById('fname').value.trim();
    const age = document.getElementById('age').value;

    if (name === "" || age === "") {
        e.stopImmediatePropagation();
        e.preventDefault();
        alert("Please enter Name and Age!");
    }
});