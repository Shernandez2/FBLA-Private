import { logOut, phoneFormat, socialSecurityFormat, logIn, confirmLogOut, switchToSignUp, switchToLogIn,createAccount, submitApplication, confirmSubmit} from "./fbla.js";
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('log-out').onclick = () => logOut();
  });


  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('confirm-log-out').onclick = () => confirmLogOut();
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-button').onclick = () => logIn();
  });


  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('switch-sign-up').onclick = () => switchToSignUp();
  });


  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signUp-button').onclick = () => createAccount();
  });


  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('switch-log-in').onclick = () => switchToLogIn();
  });


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-application-button-sigma').onclick = () => submitApplication();
  });
// import { socialSecurityFormat } from "./fbla.js";
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('socialSecurity-input');
    inputElement.oninput = function(event) {
      const formattedValue = socialSecurityFormat(event.target.value);
      event.target.value = formattedValue;
    };
  });

  document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('phoneNumber-input');
    inputElement.oninput = function(event) {
      const formattedValue = phoneFormat(event.target.value);
      event.target.value = formattedValue;
    };
  });


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('confirm-submit').onclick = () => confirmSubmit();
  });
