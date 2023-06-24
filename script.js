function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
  
  function showMessage(message, color) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = color;
  }
  
  function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const user = {
      name: name,
      email: email,
      password: password,
      accessToken: generateAccessToken()
    };
    
    localStorage.setItem('user', JSON.stringify(user));
   
    showMessage('Signup successful!', 'green');
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('profile-page').style.display = 'block';
    displayUserDetails();
  }
  
  function displayUserDetails() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userDetails = document.getElementById('user-details');
    userDetails.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;
  }
  
  function handleLogout() {
    localStorage.removeItem('user');
    
    showMessage('Logout successful!', 'green');
    document.getElementById('signup-page').style.display = 'block';
    document.getElementById('profile-page').style.display = 'none';
  }
  
  function checkAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    const signupPage = document.getElementById('signup-page');
    const profilePage = document.getElementById('profile-page');
    
    if (user && user.accessToken) {
      signupPage.style.display = 'none';
      profilePage.style.display = 'block';
      displayUserDetails();
    } else {
      signupPage.style.display = 'block';
      profilePage.style.display = 'none';
    }
  }

  document.getElementById('signup-form').addEventListener('submit', handleSignup);
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  
  checkAccessToken();
  