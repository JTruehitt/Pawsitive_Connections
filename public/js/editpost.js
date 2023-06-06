const editPostForm = document.querySelector(".editPost-form");

async function submitEditedPost(e) {
    try {
      e.preventDefault();
      const postid = e.target.dataset.postid;
      console.log(postid)
      let title = document.querySelector("#post_title").value.trim();
      let body = document.querySelector("#post_body").value.trim();
  
      const response = await fetch(`/api/post/${postid}`, {
        method: "PUT",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        alert("Post update successful.");
        location.assign(`/community-post/${postid}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  editPostForm.addEventListener("submit", submitEditedPost);