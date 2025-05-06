import { db, app, auth } from "./firebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

//cadastro
const emailCadastroInput = document.getElementById("emailCadastro");
const senhaCadastroInput = document.getElementById("senhaCadastro");
const btnCadastro = document.getElementById("btnCadastro");
const mensagemCadastro = document.getElementById("mensagemCadastro");

async function cadastrarUsuario(email, senha) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao cadastrar:", error.code, error.message);
    let mensagemErro = "Ocorreu um erro ao cadastrar. Tente novamente:";
    switch (error.code) {
      case "auth/email-already-in-use":
        mensagemErro = "Este email ja esta em uso.";
        break;

      case "auth/invalid-email":
        mensagemErro = "formato de email inválido.";
        break;

      case "auth/invalid-password":
        mensagemErro = "A senha deve ter pelo menos 6 caracteres";
        break;
    }
    throw { message: mensagemErro };
  }
}

if (btnCadastro) {
  btnCadastro.addEventListener("click", async function () {
    const email = emailCadastroInput.value;
    const senha = senhaCadastroInput.value;
    mensagemCadastro.textContent = "";

    if (!email || !senha) {
      mensagemCadastro.textContent = "Por favor, preencha todos os campos";
      return;
    }

    try {
      const user = await cadastrarUsuario(email, senha);
      console.log("Usuário cadastro:", user);
      mensagemCadastro.textContent = "Cadastro realizada com sucesso!:";
      setTimeout(function () {
        window.location.href = "./login.html";
      }, 3000);
    } catch (error) {
      mensagemCadastro.textContent = `Erro no cadastro: +  ${error.message}`;
    }
  });
}

//login
const emailLoginInput = document.getElementById("emailLogin");
const senhaLoginInput = document.getElementById("senhaLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
const btnEntrar = document.getElementById("btnEntrar");

async function loginUsuario(emailLoginInput, senhaLoginInput){
  try {
    const userCredential = await signInWithEmailAndPassword(auth,emailLoginInput,senhaLoginInput);
    console.log(userCredential);
    return userCredential.user;
  } catch (error) {
    console.error("Ocorreu erro ao logar:", error.code, error.message);
    let mensagemErro = "Tente logar novamente";

    switch (error.code) {
      case "auth/invalid-credential":
        mensagemErro = "O email ou senha informados são inválidos.";
        break;
      case "auth/user-not-found":
        mensagemErro = "O email informado não foi encontrado.";
        break;
      case "auth/wrong-password":
        mensagemErro = "A senha informada não confere.";
        break;
      case "auth/user-disable":
        mensagemErro = "Esta conta esta desativa";
        break;
    }
    throw{
      message:mensagemErro
    }
  }
}

if (btnEntrar) {
  btnEntrar.addEventListener("click", async function () {
    const emailLogin = emailLoginInput.value;
    const senhaLogin = senhaLoginInput.value;
    mensagemLogin.textContent = "";

    if (!emailLogin || !senhaLogin) {
      mensagemLogin.textContent = "Por favor preencher ambos";
      return;
    }

    try {
      const user = await loginUsuario(emailLogin, senhaLogin);
      console.log("Usuario logado:", emailLogin,senhaLogin);
      mensagemLogin.textContent = "Logado com sucesso";
      window.location.href = "index.html";
    } catch (error) {
      mensagemLogin.textContent = "Erro ao insirir email ou senha.";
    }
  });
}
