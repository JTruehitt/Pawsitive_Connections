const commentSubmitForm = document.querySelector(".comment-submit");

async function handleCommentSubmit(e) {
    e.preventDefault();
    const body = document.querySelector("#comment-message").value.trim();
    const post_id = document.querySelector(".commentSubmitBtn").dataset.postid;
  
    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ body, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      location.reload();
    }
  }

  commentSubmitForm.addEventListener("submit", handleCommentSubmit);
