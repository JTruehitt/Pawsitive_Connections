const newLotForm = document.querySelector(".newLot-form");
//Event listener for the post button
newLotForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const type = document.getElementById("lotType").value.split("-")[0];
  const image = document.getElementById("lotType").value.split("-")[1];
  const title = document.getElementById("lot_title").value.trim();
  const askingPrice = document.getElementById("askingPrice").value.trim();
  const body = document.getElementById("lot_body").value.trim();

  if (title && body && askingPrice) {
    const res = await fetch("/api/lot/", {
      method: "POST",
      body: JSON.stringify({ type, image, title, askingPrice, body}),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Your lot has been submitted, Woohoo!");
      location.assign('/marketplace');
      return;
    } else {
      alert("Error submitting lot. Please check your entries and try again.");
      return;
    }
  } else {
    alert("Error submitting lot. Please check your entries and try again.");
    return;
  }
});
