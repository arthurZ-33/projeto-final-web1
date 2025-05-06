import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

//salvar dados no banco

function getInputs() {
  return {
    nome: document.getElementById("nome"),
    idade: document.getElementById("idade"),
    raca: document.getElementById("raca"),
    pelo: document.getElementById("pelo"),
  };
}

function getValores({ nome, idade, raca, pelo }) {
  return {
    nome: nome.value.trim(),
    idade: parseInt(idade.value),
    raca: raca.value.trim(),
    pelo: pelo.value.trim(),
  };
}

function limpar({ nome, idade, raca, pelo }) {
  nome.value = "";
  idade.value = "";
  raca.value = "";
  pelo.value = "";
}

document
  .getElementById("btnEnviar")
  .addEventListener("click", async function () {
    const Inputs = getInputs();
    const dados = getValores(Inputs);

    console.log("Inputs:", Inputs);
    console.log("Dados", dados);
    if (!dados.nome || !dados.idade || !dados.pelo || !dados.raca) {
      alert("prencha todos os campos");
    }
    try {
      const ref = await addDoc(collection(db, "pet"), dados);
      limpar(Inputs);
      alert("Pet cadastrado com sucesso");
    } catch (e) {
      console.log("Erro: ", e);
    }
  });
