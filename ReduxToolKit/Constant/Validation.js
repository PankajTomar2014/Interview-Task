export const validateEmail = email => {
  var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z_\-\.]+)\.([a-zA-Z]{2,5})$/;
  email = email.trim();

  if (email == '' || email == undefined || email == null) {
    return {status: false, error: 'Please enter email'};
  } else if (!emailRegex.test(email)) {
    return {status: false, error: 'Email is not valid'};
  } else {
    return {status: true, error: ''};
  }
};

export const validatePassword = Password => {
  var PasswordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{5,}$/;
  Password = Password.trim();

  if (Password == '' || Password == undefined || Password == null) {
    return {status: false, error: 'Please enter Password'};
  } else if (!PasswordRegex.test(Password)) {
    return {status: false, error: 'Please enter valid Password'};
  } else if (Password.length < 8) {
    return {status: false, error: 'Please enter at least 8 character'};
  } else {
    return {status: true, error: ''};
  }
};
export const LoginPassword = loginPassword => {
  loginPassword = loginPassword.trim();
  if (
    loginPassword == '' ||
    loginPassword == undefined ||
    loginPassword == null
  ) {
    return {status: false, error: 'Please enter Password'};
  } else {
    return {status: true, error: ''};
  }
};

export const validateSwiftCode = name => {
  name = name.trim();

  if (name == '' || name == undefined || name == null) {
    return {status: false, error: 'Please swift name'};
  } else {
    return {status: true, error: ''};
  }
};

export const validateCityCode = name => {
  name = name.trim();

  if (name == '' || name == undefined || name == null) {
    return {status: false, error: 'Please city name'};
  } else {
    return {status: true, error: ''};
  }
};

export const validatePostalCode = name => {
  name = name.trim();

  if (name == '' || name == undefined || name == null) {
    return {status: false, error: 'Please city name'};
  } else {
    return {status: true, error: ''};
  }
};

export const validateName = name => {
  var newName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  name = name.trim();
  if (name == '' || name == undefined || name == null) {
    return {status: false, error: 'Please enter name'};
  } else if (!newName.test(name)) {
    return {status: false, error: 'Name is not valid'};
  } else {
    return {status: true, error: ''};
  }
};

export const validatePhoneNo = no => {
  var phoneno = /^\d{10}$/;
  no = no.trim();
  if (no == '' || no == undefined || no == null) {
    return {status: false, error: 'Please enter phone number'};
  } else if (!phoneno.test(no)) {
    return {status: false, error: 'Phone number is not valid'};
  } else {
    return {status: true, error: ''};
  }
};

export const validateOTP = OTP => {
  var OtpRegex = /^\d{1}$/;
};

export const validateAccountNumber = name => {
  // var regex = /^(?:[0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/;
  var regex = /^\d{9,18}$/;
  name = name.trim();
  if (name == '' || name == undefined || name == null) {
    return {status: false, error: 'Enter account number'};
  } else if (!regex.test(name)) {
    return {status: false, error: 'Enter valid account number'};
  } else {
    return {status: true, error: ''};
  }
};

export const validateCARD = CARD => {
  var Card = /\(?\d{4}\)?-? *\d{4}-? *-?\d{4}-? *-?\d{4}$/;
  CARD = CARD.trim();
  if (CARD == '' || CARD == undefined || CARD == null) {
    return {status: false, error: 'Please enter card Number'};
  } else if (!Card.test(CARD)) {
    return {status: false, error: 'Please enter valid card Number'};
  } else {
    return {status: true, error: ''};
  }
};

export const validateMMYY = Year => {
  var MMYY = /^[0-9]{3, 4}$/;
  Year = Year.trim();
  if (Year == '' || Year == undefined || Year == null) {
    return {status: false, error: 'Please enter MM/YY'};
  } else if (!MMYY.test(Year)) {
    return {status: false, error: 'Please enter MM/YY'};
  } else {
    return {status: true, error: ''};
  }
};

export const validateCVV = Cvv => {
  var CVV = /^[0-9]{3, 4}$/;
  Cvv = Cvv.trim();
  if (Cvv == '' || Cvv == undefined || Cvv == null) {
    return {status: false, error: 'Please enter CVV Number'};
  } else if (!CVV.test(Cvv)) {
    return {status: false, error: 'Please enter CVV Number'};
  } else {
    return {status: true, error: ''};
  }
};
