const commentSubmitForm = document.querySelector(".comment-submit");
const deletePostBtn = document.querySelector(".deletePostBtn");
const deleteCommentBtns = document.querySelectorAll(".deleteCommentBtn");
const editPostBtn = document.querySelector(".editPostBtn");

async function handleCommentSubmit(e) {
  e.preventDefault();
  const body = document.querySelector("#comment-message").value.trim();
  const post_id = document.querySelector(".commentSubmitBtn").dataset.postid;

  if (body.length < 5) {
    alert("Please be sure to add a good (longer) comment!");
    return;
  }
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

async function deletePost(e) {
  let postid = e.target.dataset.postid;

  const response = await fetch(`/api/post/${postid}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Error deleting post. Please try again.");
    return;
  }

  alert("Post successfully deleted.");
  location.assign("/dashboard");
}

async function handleDeleteComment(e) {
  let comment_id = e.target.dataset.comment_id;
  const response = await fetch(`/api/comment/${comment_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    location.reload();
  } else {
    alert("Error deleting comment. Please try again soon.");
  }
}

async function submitEditedPost(e) {
  try {
    e.preventDefault();
    let title = document.querySelector("#post_title").value.trim();
    let description = document.querySelector("#post_body").value.trim();
    let url = location.pathname;

    const response = await fetch(`/api${url}`, {
      method: "PUT",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Post update successful.");
      location.assign("/dashboard");
    }
  } catch (err) {
    console.log(err);
  }
}

commentSubmitForm.addEventListener("submit", handleCommentSubmit);

if (deletePostBtn) {
  editPostBtn.addEventListener("click", (e) => {
    location.assign(`/edit-community-post/${e.target.dataset.postid}`);
  });
  deletePostBtn.addEventListener("click", deletePost);
}

deleteCommentBtns.forEach((btn) => {
  btn.addEventListener("click", handleDeleteComment);
});
