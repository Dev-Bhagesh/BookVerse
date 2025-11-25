let loginform = document.getElementById('LoginForm');
let registrationform = document.getElementById('RegistrationForm');

loginform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let username = document.getElementById('LoginUserName').value;
    let password = document.getElementById('LoginPassword').value;
    
    fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data =>{
        if (data.success) {
            // Redirect to homepage with username in URL
            // window.location.href = `/homepage.html?username=${encodeURIComponent(data.username)}`;
            window.location.href = `/homepage.html`;
        } else {
            alert(data.message);
        }
    })
    .catch(err => console.error(err));
})

registrationform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let username = document.getElementById('RegistrationUserName').value;
    let email = document.getElementById('RegistrationEmail').value;
    let password = document.getElementById('RegistrationPassword').value;
    
    fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.error(err));
})