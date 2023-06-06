const postCards = document.querySelectorAll('.post-card')

postCards.forEach((card) => {
    card.addEventListener('click', (e) => { 
      e.preventDefault();
      const lotid = e.currentTarget.dataset.id;
      location.assign(`/marketplace/lot/${lotid}`)})
  })