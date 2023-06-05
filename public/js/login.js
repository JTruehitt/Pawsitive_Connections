const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const user_name = document.getElementById("user_name").value.trim();
  const password = document.getElementById("password").value.trim();
  console.log(user_name);
  console.log(password);
  if (user_name === "" && password === "") {
    console.log("Youre logged in!");
  }
  fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({ user_name, password }),
    headers: { "Content-Type": "application/json" },
  }).then((data) => {
    if (data.ok) {
      location.assign("/dashboard");
    } else {
      alert("User not found. Please try again.");
    }
  });
});

const signupBtn = document.getElementById("signup-btn");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const first_name = document.getElementById("first_name").value.trim();
  const last_name = document.getElementById("last_name").value.trim();
  const user_name = document.getElementById("new_user_name").value.trim();
  const email = document.getElementById("new_email").value.trim();
  const password = document.getElementById("new_password").value.trim();

  fetch("/api/user/signup", {
    method: "post",
    body: JSON.stringify({
      first_name,
      last_name,
      user_name,
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((data) => {
    if (data.ok) {
      location.assign("/dashboard");
    } else
      alert(
        "Error creating an account with the information provided. Please check your input and try again."
      );
  });
});
