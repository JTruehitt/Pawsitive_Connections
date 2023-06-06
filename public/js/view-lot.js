const bidSubmitForm = document.querySelector(".bid-submit");
const commentSubmitForm = document.querySelector(".comment-submit");
const deleteLotBtn = document.querySelector(".deleteLotBtn");
const deleteCommentBtns = document.querySelectorAll(".deleteCommentBtn");

async function handleBidSubmit(e) {
  e.preventDefault();
  const bidAmount = document.querySelector("#bidAmount").value.trim();
  const lot_id = document.querySelector(".bidSubmitBtn").dataset.lotid;

  if (!bidAmount) {
    alert("Please enter your bid.");
    return;
  }
  const response = await fetch(`/api/bid`, {
    method: "POST",
    body: JSON.stringify({ bidAmount, lot_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    alert("Bid submitted successfully!");
    location.reload();
  } else {
    alert("There was an issue posting your bid. Please try again soon.");
    location.reload();
  }
}

async function handleCommentSubmit(e) {
  e.preventDefault();
  const body = document.querySelector("#comment-message").value.trim();
  const lot_id = document.querySelector(".commentSubmitBtn").dataset.lotid;

  if (body.length < 5) {
    alert("Please be sure to add a good (longer) comment!");
    return;
  }
  const response = await fetch(`/api/comment/marketplace`, {
    method: "POST",
    body: JSON.stringify({ body, lot_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    location.reload();
  }
}

async function deleteLot(e) {
  let lotid = e.target.dataset.lotid;

  const response = await fetch(`/api/lot/${lotid}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Error deleting Lot. Please try again.");
    return;
  }

  alert("Lot successfully deleted.");
  location.assign("/marketplace");
}

async function handleDeleteComment(e) {
  let comment_id = e.target.dataset.comment_id;
  const response = await fetch(`/api/comment/marketplace/${comment_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Comment deleted successfully. Whew!");
    location.reload();
  } else {
    alert("Error deleting comment. Please try again soon.");
  }
}

bidSubmitForm.addEventListener("submit", handleBidSubmit);
commentSubmitForm.addEventListener("submit", handleCommentSubmit);

if (deleteLotBtn) {
  // editLotBtn.addEventListener("click", (e) => {
  //   location.assign(`/edit-community-post/${e.target.dataset.postid}`);
  // });
  deleteLotBtn.addEventListener("click", deleteLot);
}

deleteCommentBtns.forEach((btn) => {
  btn.addEventListener("click", handleDeleteComment);
});
