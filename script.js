// let login_register_btn = document.querySelector(".Login-form .signup-btn");
// let login_btn = document.querySelector(".Login-btn");
// let forgot_btn = document.querySelector(".forgot-btn");

let login_btn_forgot = document.querySelector(".forgotPass-form .Login-btn");
const verifyButton = document.getElementById("opt_v");
document.addEventListener("DOMContentLoaded", () => {
  let input_otps = document.querySelectorAll(".otp_verify .otp-input");

  input_otps.forEach((input_otp, index1) => {
    input_otp.addEventListener("input", (event) => {
      const currentInput = event.target,
            nextInput = currentInput.nextElementSibling,
            prevInput = currentInput.previousElementSibling;

      // Handle backspace key press
      if (event.inputType === "deleteContentBackward") {
        if (currentInput.value === "" && prevInput) {
          prevInput.focus();
          // Disable subsequent inputs
          disableSubsequentInputs(prevInput);
        }
      } else {
        // Check if the value has more than one character, then clear it
        if (currentInput.value.length > 1) {
          currentInput.value = currentInput.value.slice(0, 1);
          return;
        }

        // Enable the next input and focus on it
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        } else if (currentInput.value !== "" && nextInput) { 
          nextInput.focus();
        }
      }

      // Check if the last input is filled
      if (!input_otps[input_otps.length - 1].disabled && input_otps[input_otps.length - 1].value !== "") {
        verifyButton.classList.add("active");
      } else {
        verifyButton.classList.remove("active");
      }
    });
  });

  function disableSubsequentInputs(currentInput) {
    let nextInput = currentInput.nextElementSibling;
    while (nextInput) {
      nextInput.setAttribute("disabled", true);
      nextInput.value = "";
      nextInput = nextInput.nextElementSibling;
    }
  }
});


let otp_val;
function sendOTP() {
  event.preventDefault(); // Prevent form submission

  const email = document.getElementById("emailsignup");
  const otpInput = document.querySelector(".otp_verify .otp-input");
  otp_val = Math.floor(1000 + Math.random() * 9000);
  let emailbody = `<h2>Your OTP is </h2>${otp_val}`;

  Email.send({
    SecureToken: "407248bd-fcaf-4ac5-9bb6-58dce7669734",
    To: email.value,
    From: "kamlasafdar23@gmail.com",
    Subject: "Email OTP verification",
    Body: emailbody,
  }).then(message => {
    if (message === "OK") {
      alert("OTP sent to your email " + email.value);
      // Focus the OTP input field
      otpInput.focus();
    }
  });
}

document.getElementById("opt_v").addEventListener("click", () => {
  const otpInputs = document.querySelectorAll(".otp_verify .otp-input");
  let otp_val_inp = ""; // Initialize an empty string to store the complete OTP

  // Concatenate the values of all input fields
  otpInputs.forEach(input => {
    otp_val_inp += input.value;
  });

  // Convert the concatenated OTP string to an integer
  otp_val_inp = parseInt(otp_val_inp);

  // Your OTP verification logic
  // Check if OTP entered matches the generated OTP
  if (otp_val === otp_val_inp) {
    console.log(otp_val);
    console.log(otp_val_inp);

    alert("Email address verified.");
  } else {
    alert("Invalid OTP. Please try again.");
    // Optionally, focus the first input field for the user to try again
    otpInputs[0].focus();
  }
});

 //focus the first input index is 0 on window load
window.addEventListener("load" , ()=>input_otp[0].focus());

document.addEventListener("DOMContentLoaded", function() {
  let signup_form = document.querySelector(".signup-form");
  let otp_verify_form = document.querySelector(".otp_verify");
  let form = document.querySelector(".Form-box");

  // Hide OTP verification form initially
  otp_verify_form.classList.add("hide");

  signup_form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Your signup form validation logic goes here
    // For demonstration, let's assume the signup is successful
    // Show the OTP verification form
    otp_verify_form.classList.remove("hide");
    form.classList.remove("change-form1", "change-form2", "change-form3"); // Remove other classes if present
    form.classList.add("change-form4");
  });
});



login_btn_forgot.addEventListener("click", () => {
  form.classList.remove("expanded");
  form.classList.remove("change-form3");
});

let register_btn = document.querySelector(".signup-btn");
let login_btn = document.querySelector(".Login-btn");
let forgot_btn = document.querySelector(".forgot-btn");
const submitBtnLogin = document.querySelector(".Login-form .submit-btn");

let form = document.querySelector(".Form-box");
let login_form_check = document.querySelector(".Login-form");
let signup_form_check=document.querySelector(".signup-form");
let forgotPass_form_check=document.querySelector(".forgotPass-form");



submitBtnLogin.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById("emaillogin").value;
  const password = document.getElementById("loginPass").value;

  if (username.trim() !== '' && password.trim() !== '') {
      window.location.href = "home.html";
  } else {
      alert("Please fill in both username and password fields.");
  }
});

register_btn.addEventListener("click", () => {
  form.classList.remove("change-form2", "change-form3"); // Remove other classes if present
  form.classList.add("change-form1");
  form.classList.add("expanded");
});

login_btn.addEventListener("click", () => {
  form.classList.remove("change-form1", "change-form3"); // Remove other classes if present
  form.classList.add("change-form2");
  form.classList.remove("expanded");
});

forgot_btn.addEventListener("click", () => {
  form.classList.remove("change-form1", "change-form2"); // Remove other classes if present
  form.classList.add("change-form3");
});

const newPassInput = document.getElementById("newPass");
const cnfrmPassInput = document.getElementById("cnfrmPass");

// forgot_btn.addEventListener("click", () => {
//   const newPassword = newPassInput.value;
//   const confirmPassword = cnfrmPassInput.value;

//   if (newPassword === confirmPassword) {
//       // If passwords match, show success alert
//       alert("Password successfully reset!");
      
//       // Transition forms
//       form.classList.remove("change-form1", "change-form2");
//       form.classList.add("change-form3");
//   } else {
//       // If passwords don't match, display an error message
//       alert("Passwords do not match. Please try again.");
//   }
// });

function validatePassword(password) {
    var specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    // Check if password length is at least 5 characters and contains at least one special character
    if (password.length < 5 || !specialCharacterRegex.test(password)) {
        return false;
    }

    return true;
}

login_form_check.addEventListener("submit", function(event) {
    var passwordInput = login_form_check.querySelector('input[type="password"]');
    var password = passwordInput.value;
    if (!validatePassword(password)) {
        event.preventDefault();
        alert("Password must be at least 5 characters long and contain at least one special character.");
    }
});

forgotPass_form_check.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  var passwordInput = forgotPass_form_check.querySelector('input[type="password"]');
  var password = passwordInput.value;
  const newPassword = newPassInput.value;
  const confirmPassword = cnfrmPassInput.value;
  if (!validatePassword(password)) {
      event.preventDefault();
      alert("Password must be at least 5 characters long and contain at least one special character.");
  }
  else if(newPassword === confirmPassword) {
    // If passwords match, show success alert
    alert("Password successfully reset!");
    
    // Transition forms
    form.classList.remove("change-form1", "change-form2");
    form.classList.add("change-form3");
} 
else {
    // If passwords don't match, display an error message
    alert("Passwords do not match. Please try again.");
}
});

signup_form_check.addEventListener("submit", function(event) {
  var passwordInput = signup_form_check.querySelector('input[type="password"]');
  var password = passwordInput.value;
  
  if (!validatePassword(password)) {
      event.preventDefault();
      alert("Password must be at least 5 characters long and contain at least one special character.");
  }


});

login_form_check.addEventListener("submit", function(event) {
    var email_login = document.getElementById("emaillogin").value;
    if (!validate_email(email_login)) {
        event.preventDefault();
        alert("Email must end with @gmail.com");
    }
});

signup_form_check.addEventListener("submit", function(event) {
  var email_signup = document.getElementById("emailsignup").value;
  if (!validate_email(email_signup)) {
      event.preventDefault();
      alert("Email must end with @gmail.com");
  }
});

function validate_email(email){
    var emailregex = /@gmail.com$/;
    return emailregex.test(email);
}

function validate_phone(phone_no){
  var phoneregix=/^\d{11}/;
  return phoneregix.test(phone_no);
}

signup_form_check.addEventListener("submit" , function(event){
  var temp_phone = document.getElementById("pn").value;
  if (!validate_phone(temp_phone)) {
    event.preventDefault();
    alert("Your phone number is not in right format.Your phone number should have exactly 12 digits");
}

})