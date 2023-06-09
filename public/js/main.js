// (console.log("Successfully linked."))()

// const navBar = document.querySelector('.headerBar');
// const navLinks = document.querySelector('.links');
// const signupBtn = document.querySelector('.')

// navBar.addEventListener('click', () => {
//    navBar.classList.toggle('active');
//   navList.classList.toggle('active');
// });

// const aboutUs = document.getElementById(".aboutUs");

// aboutUs.addEventListener('click', function(event){
//   event.preventDefault();
//   location.assign = '/home';
// });
// window.onload = function() {
//   var statusCode = window.location.search.split('=')[1];
//   if (statusCode === '404') {

//     document.getElementById('error-message').innerHTML = 'Whoopsie!! You are barking up the wrong tree.';
//   }
// };

const logoutBtn = document.getElementById("LogoutBtn");

const handleLogout = async () => {
  const res = await fetch(`/api/user/logout`, {
    method: "POST",
  });

  if (res.ok) {
    alert("Successfully logged out.");
    location.assign("/");
  } else {
    alert("Error logging out, sorry!");
    location.reload();
  }
};

logoutBtn.addEventListener('click', handleLogout)