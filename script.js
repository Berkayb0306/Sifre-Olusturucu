const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".options input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "qwertyuıopğüişlkjhgfdsazxcvbnmöç",
    uppercase: "QWERTYUIOPĞÜİŞLKJHGFDSAZXCVBNMÖÇ",
    numbers: "0123456789",
    symbols: "!$%&[](){};:.,+-@<>|",
};

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach((option) => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += " ";
            } else {
                excludeDuplicate = true;
            }
        }
    });

    while (randomPassword.length < passLength) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            if (!randomPassword.includes(randomChar) || randomChar === " ") {
                randomPassword += randomChar;
            }
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
};

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    updatePassIndicator();
};

updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
