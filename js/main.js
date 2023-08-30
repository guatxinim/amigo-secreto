const ul = document.getElementsByTagName("ul")[0];

const btDelete = document.createElement("button");
const btEdit = document.createElement("button");
const imgDelete = document.createElement("img");
const imgEdit = document.createElement("img");

imgDelete.setAttribute("src", "assets/mdi_delete.png");
imgEdit.setAttribute("src", "assets/mdi_edit.png");
imgDelete.setAttribute("alt", "Deletar");
imgEdit.setAttribute("alt", "Editar");
btEdit.setAttribute("onclick", "window.location.href='html/editar.html';");
btDelete.setAttribute("onclick", deletarParticipante());
btDelete.innerText = imgDelete;
btEdit.innerText = imgEdit;

let participantes = getObjectLocalStorage("participantes");

if (participantes === null) {
    participantes = [];
    setObjectLocalStorage("paricipantes", participantes);
}

window.addEventListener("load", () => {
    for (let participante of participantes){
        ul.appendChild(createLi(participante.nome, participante.email))
    }
})

const handleSubmit = () => {
    const nome = document.getElementsByName("nome")[0];
    const email = document.getElementsByName("email")[0];
    const participante = {
        nome: nome.value,
        email: email.value        
    }
    nome.value = "";
    email.value = "";

    participantes.push(participante);
    setObjectLocalStorage("participantes", participantes);

    ul.appendChild(createLi(participante.nome, participante.faltas));
}

const createLi = (nome, email) => {
    const li = document.createElement("li");
    const section = document.createElement("section");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");

    section.appendChild(h1);
    section.appendChild(btEdit);
    section.appendChild(btDelete);
    section.appendChild(p);
    li.appendChild(section);

    h1.innerText = nome;
    p.innerText = email;

    return li;
}

function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

const mostraHome = () => {
    if (participantes.length == 0) {
        document.getElementById("semParticipante").style.display = "";
        document.getElementById("comParticipante").style.display = "null";
        document.getElementById("sortear").style.display = "null";
    } else if (participantes.length >= 3) {
        document.getElementById("semParticipante").style.display = "null";
        document.getElementById("comParticipante").style.display = "";
        document.getElementById("sortear").style.display = "";
    } else {
        document.getElementById("semParticipante").style.display = "null";
        document.getElementById("comParticipante").style.display = "";
        document.getElementById("sortear").style.display = "null";
    }
}