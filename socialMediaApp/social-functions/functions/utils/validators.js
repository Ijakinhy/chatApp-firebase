const isEmail = (email) => {
  const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.match(Regex)) {
    return true;
  } else {
    return false;
  }
};
const isEmpty = (string) => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};

exports.validateSignupData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) {
    errors.password = "Must not be empty";
  }
  if (data.password !== data.confirmPassword) {
    errors.password = "Passwords do not match";
  }
  if (isEmpty(data.handle)) {
    errors.handle = "Must not be empty";
  }

  return {
    errors,
    valid: !!Object.keys(errors).length,
  };
};
