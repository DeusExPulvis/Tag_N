document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    console.log('Formulário submetido');

    //Pega o valor do usuario, retira os espaços antes e depois e converte para caixa-baixa.
    const username = document.getElementById('loginUsername').value.trim().toLowerCase();
    //Pega o valor da senha e retira os espaços antes e depois.
    const password = document.getElementById('loginPassword').value.trim();

    //Cria o array user com as informações do localStorage.
    const user = JSON.parse(localStorage.getItem('users')) || [];

    //Função para verficar se a conta existe.
    const loginVerificado = user.find(u => u.username === username && u.senha === password);

    //1.Verifica se o login está correto
    if(loginVerificado){
        alert('Bem-vindo ' + loginVerificado.username);
        const paginaAnterior = sessionStorage.getItem('paginaAnterior');
        //2.Verifica se tem algo armazenado na variavel de paginaAnterior e te rediciona caso for true.
        if(paginaAnterior){
            //Armazena a informação no sessionStorage de que o usuario foi logado.
            sessionStorage.setItem("usuarioLogado", loginVerificado.username);
            //Te redireciona para a pagina em que estava antes de clicar no icone de login.
            window.location.href = paginaAnterior;
        }
        //2.Se não tiver nada na variavel de paginaAnterior te redireciona para a pagina inicial.
        else{
            window.location.href = './PaginaInicial/paginicial.html'
        }
    //1
    }
    else{
        alert('Usuário ou senha incorretos');
    }
});
