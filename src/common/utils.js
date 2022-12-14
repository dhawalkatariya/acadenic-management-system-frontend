const dateFomatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  weekday: "short",
  hour12: true,
  hour: "numeric",
  minute: "numeric",
});

export const formatDate = (date) => {
  return dateFomatter.format(new Date(date));
};

export const getName = ({ username, first_name, last_name }) => {
  if (first_name && last_name) return `${first_name} ${last_name}`;
  if (first_name) return first_name;
  return username;
};

export const validateEmail = (value) => {
  let error = "";
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z.]+\.[a-zA-Z]{2,4}$/;
  if (!value) error = "Enter your email address. ";
  else if (!re.test(value)) error = "Enter a valid email address.";
  return error;
};

export const validatePassword = (value) => {
  let error = "";
  if (!value) error = "Enter your password.";
  else if (value.length < 8)
    error = "Password must contain atleast 8 characters.";
  return error;
};
