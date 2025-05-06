import { db } from "./firebaseConfig.js";
import {collection, addDoc, getDocs,getDoc, deleteDoc, doc, setDoc,} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

async function buscarPet() {
    const dadosBanco = await getDocs(collection(db, "pet"));
    console.log(dadosBanco);
    const pets = [];
    for (let pet of dadosBanco.docs) {
      pets.push({ id:pet.id, ...pet.data() });
    }
    console.log(pets);
    return pets;
  }
  
  let listaPetDiv = document.getElementById("listar-pets");

  function renderizarListaDePets(pets) {
    listaPetDiv.innerHTML = "";
  
    if (pets.length === 0) {
      listaPetDiv.innerHTML =
        "<p> Nenhum Funcionário cadastrado ainda ;( </p> ";
      return;
    }
    for (let pet of pets) {
      const petDiv = document.createElement("div");
      petDiv.innerHTML = `
              <strong> Nome: </strong> ${pet.nome} <br>
              <strong> Idade: </strong> ${pet.idade} <br>
              <strong> Raca: </strong> ${pet.raca} <br>
              <strong> Pelo: </strong> ${pet.pelo} <br>
              <button class="btnExcluir" data-id="${pet.id}"> Excluir </button>
              <button class="btn-Editar" data-id="${pet.id}"> Editar </button>
              <hr>
          `;
      listaPetDiv.appendChild(petDiv);
    }
    adicionarListenersDeAcao();
  }
  
  async function carregarListaDePets() {
    listaPetDiv.innerHTML =
      "<p> Carregando lista de pets... </p>";
    try {
      let pet = await buscarPet();
      console.log(pet);
      renderizarListaDePets(pet);
    } catch (error) {
      console.log("Erro ao carregar a lista de pets: ", error);
      listaPetDiv.innerHTML =
        "<p> Erro ao carregar a lista de pets... </p>";
    }
  }
  

  document.addEventListener("DOMContentLoaded", carregarListaDePets);
  


  async function excluirPet(idPet) {
    try {
      const documentoDeletar = doc(db, "pet", idPet);
      await deleteDoc(documentoDeletar);
      console.log("pet com ID" + idPet + "foi excluído.");
      return true;
    } catch (erro) {
      console.log("Erro ao excluir o pet", erro);
      alert("Ocorreu um erro ao excluir o pet. Tente novamente");
      return false;
    }
  }
  
  async function lidarClique(eventoDeClique) {
      const btnExcluir = eventoDeClique.target.closest(".btnExcluir");
      if (btnExcluir) {
          const certeza = confirm("tem cetza que deseja fazer essa exclusão: ");
          if (certeza) {
              if (btnExcluir){
              const idPet = btnExcluir.dataset.id;
              const exclusaoBemSucedida = await excluirPet(idPet);
  
                  if (exclusaoBemSucedida) {
                  carregarListaDePets();
                  alert("Pet excluído com sucesso!");
                  }
              } 
          } else {
              alert("Exclusão cancelada");
          }
      }
      const btnEditar = eventoDeClique.target.closest(".btn-Editar");
  
      if (btnEditar) {
        const idPet = btnEditar.dataset.id;
        const pet = await buscarUmPet(idPet);
  
        if (!pet) {
          alert("Pet não encontrado.");
          return;
        }
        const edicao = getValoresEditar();
  
        edicao.editarNome.value = pet.nome;
        edicao.editarIdade.value = pet.idade;
        edicao.editarRaca.value = pet.raca;
        edicao.editarPelo.value = pet.pelo;
        edicao.editarId.value = pet.id;
  
        edicao.formularioEdicao.style.display = "block";
      }
  }
  
  function getValoresEditar() {
    return {
      editarNome: document.getElementById("editar-nome"),
      editarIdade: document.getElementById("editar-idade"),
      editarRaca: document.getElementById("editar-raca"),
      editarPelo: document.getElementById("editar-pelo"),
      editarId: document.getElementById("editar-id"),
      formularioEdicao: document.getElementById("formularioEdicao"),
    };
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    listaPetDiv = document.getElementById("listar-pets");
    listaPetDiv.addEventListener("click", lidarClique);
    carregarListaDePets();
  });
  
  async function buscarUmPet(id) {
    try {
      const petDoc = doc(db, "pet", id);
      const dadosBanco = await getDoc(petDoc);
  
      if (dadosBanco.exists()) {
        return { id: dadosBanco.id, ...dadosBanco.data() };
      } else {
        console.log("Pet não encontrado com Id: " + id);
        return null;
      }
    } catch (erro) {
      console.log("Erro ao buscar petID: ", erro);
      alert("Erro ao buscar o pet para a edição");
      return null;
    }
  }

  document.getElementById("btn-Editar").addEventListener("click", async () =>{
    const edicao = getValoresEditar();
    const id = edicao.editarId.value;
    const novoDados = {
      nome: edicao.editarNome.value.trim(),
      idade: parseInt(edicao.editarIdade.value),
      raca: edicao.editarRaca.value.trim(),
      pelo: edicao.editarPelo.value.trim()
    };

    try{
      const ref = doc(db,"pet", id);
      await setDoc(ref,novoDados);
      alert("Cadastro atualizado com sucesso!");
      edicao.formularioEdicao.style.display = "none";
      carregarListaDePets();
    }catch (error){
      console.log("Erro ao salvar edição", error);
      alert("Erro ao atualizar.");
    }
  });

  document.getElementById("btn-Cancelar").addEventListener("click", () =>{
    document.getElementById("formularioEdicao").style.display = "none";
  });

  function adicionarListenersDeAcao(){
  listaPetDiv.addEventListener("click", lidarClique);
  }
  
  document.addEventListener("DOMContentLoaded", carregarListaDePets )



