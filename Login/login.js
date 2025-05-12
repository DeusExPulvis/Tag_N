document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aqui você poderia fazer a validação do login (em breve com back-end)
    console.log(`Usuário: ${username}, Senha: ${password}`);

    alert('Login enviado (simulação)!');
});
