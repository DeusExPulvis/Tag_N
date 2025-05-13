const form = document.getElementById('cadastroForm');

//Cria um array user com as informações contidas no localStorage do navegador ou caso esteja nulo inicia o array vazio.
let user = JSON.parse(localStorage.getItem('users')) || [];


form.addEventListener('submit', function(event) {
    event.preventDefault();
    //Pega o valor do usuario a ser cadastrado retira os espaços antes e depois e transforma tudo em caixa-baixa;
    const novoUsername = document.getElementById('username').value.trim().toLowerCase();
    //Pega o valor da senha a ser cadastrada e retira os espaços antes e depois.
    const novaSenha = document.getElementById('password').value.trim();
    //Pega o valor da confirmação de senha e retira os espaços antes e depois.
    const confirmarSenha = document.getElementById('confirmPassword').value.trim();
    //Pega o valor do email a ser cadastrado e retira os espaços antes e depois.
    const novoEmail = document.getElementById('email').value.trim();

    //Função para checar se o usuario a ser cadastrado já está sendo utilizado.
    const usuarioExistente = user.some(u => u.username === novoUsername);
    //Função para checar se o email a ser cadastrado já está sendo utilizado.
    const emailExistente = user.some(e => e.email === novoEmail);

    //1.Verifica se todos os campos estão preenchidos com valores.
    if(novaSenha && novoUsername && confirmarSenha && novoEmail){
        //2.Verifica se o usuario a ser cadastrado já está cadastrado.
        if(usuarioExistente == false){
            //3.Verifica se a senha a ser cadastrada é igual a confirmação.
            if(confirmarSenha === novaSenha){
                //4.Verifica se o email a ser cadastrado já está cadastrado.
                if(emailExistente == false){
                    //adiciona um novo registro no array user. Contendo os campos username, senha e email.
                    user.push({username: novoUsername, senha: novaSenha, email: novoEmail});
                    //Converte o array em JSON e armazena no localStorage.
                    localStorage.setItem('users', JSON.stringify(user));
                    //Cria um favoritos para o usuario
                    localStorage.setItem(`favoritos_${novoUsername}`, JSON.stringify([])); 
                    //Cria um carrinho para o usuario
                    localStorage.setItem(`carrinho_${novoUsername}`, JSON.stringify([]));
                    alert('cadastro realizado com sucesso');
                    //Limpa o username
                    document.getElementById('username').value = "";
                    //Limpa o password
                    document.getElementById('password').value = "";
                    //Limpa a confimação de password.
                    document.getElementById('confirmPassword').value = "";
                    //Limpa o email
                    document.getElementById('email').value = "";
                }
                //4
                else{
                    alert('Email já em uso!!!')
                }
            //3    
            }
            else{
                alert('As senhas não batem!!!');
            }
        //2    
        }
        else{
           alert('Nome de usuario indisponivel!!!');
        }
    //1    
    }
    else{
        alert('Preencha todos os campos!!!');
    }
});