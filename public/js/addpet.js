const petForm = document.getElementById("petForm");

async function handleNewPet(e) {
  e.preventDefault();

  const formData = new FormData(petForm);

  const newPetInfo = {
    name: formData.get("name"),
    age: formData.get("age"),
    type: formData.get("type"),
    gender: formData.get("gender"),
    description: formData.get("description"),
    needsHome: formData.get("needsHome"),
    goodWithKids: formData.get("goodWithKids"),
    image: formData.get("image"),
  };

  console.log(newPetInfo);

  try {
    const response = await fetch("/api/pets/", {
      method: "POST",
      body: JSON.stringify(newPetInfo),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

petForm.addEventListener("submit", handleNewPet);
