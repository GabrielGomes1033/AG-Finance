document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  error.textContent = "";

  if (!email || !password) {
    error.textContent = "Preencha todos os campos.";
    return;
  }

  // Simulação de login
  if (email === "admin@email.com" && password === "123456") {
    window.location.href = "index.html"; // dashboard
  } else {
    error.textContent = "Email ou senha inválidos.";
  }
});
