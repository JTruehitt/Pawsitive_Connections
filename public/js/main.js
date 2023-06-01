(console.log("Successfully linked."))()

const menuToggle = document.querySelector('.headerBar');
const navLinks = document.querySelector('.links');


menuToggle.addEventListener('click', () => {
   menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

const aboutUs = document.getElementById(".aboutUs");

aboutUs.addEventListener('click', function(event){
  event.preventDefault();
  window.location.href = 'aboutus.html';
});
window.onload = function() {
  var statusCode = window.location.search.split('=')[1];
  if (statusCode === '404') {
  
    document.getElementById('error-message').innerHTML = 'Whoopsie!! You are barking up the wrong tree.';
  }
};
