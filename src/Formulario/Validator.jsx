
let ValidateAge = (edad) => {
    return edad >= 16 && edad <=99;
  }
  
  let ValidatePassword = (repass, pass) => {
    return pass === repass;
  }

  export { ValidateAge, ValidatePassword};