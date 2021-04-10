const tbVinhos = document.querySelector(".table");

const url = "http://localhost:3000/vinhos/";

const inserirLinha = (...campos) => {
  const linha = tbVinhos.insertRow(-1);

  const estilos = ["text-center", "", "", "text-right", "text-center", "text-center"];

  campos.forEach((campo, i) => {
    const coluna = linha.insertCell(-1);
    coluna.innerHTML = campo;
    coluna.className = estilos[i];
  });
};

window.addEventListener("load", async () => {
  const response = await fetch(url, {
    method: "GET",
  });

  const vinhos = await response.json();

  if (response.status == 200) {
    const acoes =
      '<i class="fas fa-edit mr-2" title="Alterar"></i> <i class="fas fa-trash-alt" title="Excluir"></i>';

    for (const vinho of vinhos) {
      const foto = `<img src="${vinho.foto}" alt="Foto do vinho ${vinho.marca}" class="imgVinho">`;
      inserirLinha(
        vinho.id,
        vinho.marca,
        vinho.tipo,
        Number(vinho.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 }),
        foto,
        acoes
      );
    }
  } else {
    alert(`Erro: ${vinhos.msg}`);
  }
});

// adiciona um "ouvinte" de evento para o click na tabela
tbVinhos.addEventListener("click", async (e) => {
  if (e.target.classList.contains("fa-trash-alt")) {
    const marca = e.target.parentElement.parentElement.children[1].innerText;
    if (confirm(`Confirma exclusão do vinho "${marca}"?`)) {
      const id = e.target.parentElement.parentElement.children[0].innerText;

      const response = await fetch(url + id, {
        method: "delete",
      });

      if (response.status == 200) {
        e.target.parentElement.parentElement.remove(); // remove a linha do ícone clicado
      } else {
        const erro = await response.json();
        alert(`Erro: ${erro.msg}`);
      }
    }
  } else if (e.target.classList.contains("fa-edit")) {
    const marca = e.target.parentElement.parentElement.children[1].innerText;
    const novoValor = Number(prompt(`Qual o valor do vinho "${marca}"?`));

    if (novoValor == 0 || isNaN(novoValor)) {
      alert("Valor Inválido. Preço do Vinho não foi alterado");
      return;
    }

    const id = e.target.parentElement.parentElement.children[0].innerText;

    const response = await fetch(url + id, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ preco: novoValor }),
    });

    if (response.status == 200) {
      e.target.parentElement.parentElement.children[3].innerText = novoValor.toLocaleString(
        "pt-br",
        { minimumFractionDigits: 2 }
      );
    } else {
      const erro = await response.json();
      alert(`Erro: ${erro.msg}`);
    }
  }
});
