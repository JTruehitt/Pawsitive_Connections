const postBtn = document.getElementById("post-btn");
const postCards = document.querySelectorAll('.post-card')

//Event listener for the post button
postBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const title = document.getElementById("new-user-post-title").value.trim();
  const body = document.getElementById("new-user-post-body").value.trim();

  if (title && body) {
    const res = await fetch("/api/post/", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Your post has been submitted, Woohoo!");
      location.reload();
      return;
    } else {
      alert("Error submitting post. Please check your entries and try again.");
      return;
    }
  } else {
    alert("Error submitting post. Please check your entries and try again.");
    return;
  }
});

postCards.forEach((card) => {
  card.addEventListener('click', (e) => { 
    e.preventDefault();
    const postid = e.currentTarget.dataset.id;
    location.assign(`/community-post/${postid}`)})
})
