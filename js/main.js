const ul = document.getElementsByTagName("ul")[0];

let participantes = getObjectLocalStorage("participantes");

if (participantes === null) {
    participantes = [];
    setObjectLocalStorage("participantes", participantes);
}

window.addEventListener("load", () => {
    for (let participante of participantes){
        ul.appendChild(createLi(participante.nome, participante.email))
    }
})

window.addEventListener("load", () => {
    let quantidade = participantes.length;
    if (quantidade == 0) {
        document.getElementById("semParticipante").style.display = "";
        document.getElementById("comParticipante").style.display = "none";
        document.getElementById("sortear").style.display = "none";
    } else if (quantidade < 3) {
        document.getElementById("semParticipante").style.display = "none";
        document.getElementById("comParticipante").style.display = "";
        document.getElementById("sortear").style.display = "none";
    } else {
        document.getElementById("semParticipante").style.display = "none";
        document.getElementById("comParticipante").style.display = "";
        document.getElementById("sortear").style.display = "";
    }
});

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
    const btDelete = document.createElement("button");
    const btEdit = document.createElement("button");
    const imgDelete = document.createElement("img");
    const imgEdit = document.createElement("img");

    imgDelete.setAttribute("src", "/assets/deletar.png");
    imgEdit.setAttribute("src", "/assets/editar.png");
    imgDelete.setAttribute("alt", "Deletar");
    imgEdit.setAttribute("alt", "Editar");
    btEdit.setAttribute("onclick", "window.location.href='/html/editar.html';");
    btDelete.setAttribute("onclick", "deletarParticipante(event)");
    btDelete.appendChild(imgDelete);
    btEdit.appendChild(imgEdit);
    li.setAttribute("id", nome);
    btDelete.setAttribute("id", nome);

    section.appendChild(h1);
    section.appendChild(btEdit);
    section.appendChild(btDelete);
    section.appendChild(p);
    li.appendChild(section);

    h1.innerText = nome;
    p.innerText = email;

    return li;
}

const deletarParticipante = (event) => {
    let idBt = event.target.id;
    console.log(idBt);
    console.log(participantes);
    participantes.forEach(element => {
        if (element[0] == idBt) {
            participantes.splice(element);
        }
    });
    
    document.getElementById(idBt).remove();
}

function setObjectLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}
