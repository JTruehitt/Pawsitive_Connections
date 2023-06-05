const postBtn = document.getElementById("post-btn");

//Event listener for the post button
postBtn.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("/api/post/routes", {
    method: "POST",
    body: JSON.stringify({
      title: "",
      body: "",
    }),
    headers: { "Content-Type": "application/json" },
  });
});
