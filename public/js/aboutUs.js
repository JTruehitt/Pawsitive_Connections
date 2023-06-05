const goHomeBtn = document.getElementById("go-home-btn");

goHomeBtn.addEventListener('click', function(event){
  event.preventDefault();
  location.assign = '/';
});