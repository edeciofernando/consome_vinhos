const frmPalavra = document.querySelector("#formPalavra");
const frmPreco = document.querySelector("#formPreco");
const divResposta = document.querySelector("#resposta");

const url = "http://localhost:3000/vinhos/"

// faz a desestruturação dos elementos do objeto vinho, ao receber o parâmetro
const exibeVinho = ({marca, tipo, preco, foto}) => {
  const precoF = Number(preco).toLocaleString("pt-br", {minimumFractionDigits: 2});

  const html = `
  <div class="card mb-1">
    <div class="card-horizontal">
      <div>
        <img src="${foto}" alt="Garrafa do vinho ${marca}" class="img-card">
      </div>
      <div class="card-body">
        <h4 class="card-title"> ${marca} </h4>
        <p class="card-text"> ${tipo} </p>
        <p class="card-text"> R$: ${precoF} </p>
      </div>    
    </div>
  </div>`;
  divResposta.innerHTML += html;
}

frmPalavra.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita o envio do form

  divResposta.innerHTML = "";  // limpa o conteúdo exibido na div resposta (para não acumular)
  frmPreco.reset(); // limpa o form da pesquisa por preco

  const palavra = frmPalavra.palavra.value;

  const response = await fetch(url + "pesq/" + palavra, {method: "GET"});

  const vinhos = await response.json();

  if (response.status == 200) {
    if (vinhos.length == 0) {
      alert("Não há vinhos com a palavra informada...");
      return;
    }
    for (const vinho of vinhos) {
      exibeVinho(vinho);
    }
  } else {
    alert(`Erro: ${vinhos.msg}`);
  }
})

frmPreco.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita o envio do form

  divResposta.innerHTML = "";  // limpa o conteúdo exibido na div resposta (para não acumular)
  frmPalavra.reset(); // limpa o form da pesquisa por palavra

  const prMinimo = frmPreco.prMinimo.value;
  const prMaximo = frmPreco.prMaximo.value;  

  let urlPreco = url + "preco/" + prMinimo;
  if (prMaximo) {
    urlPreco += "/" + prMaximo;
  }

  const response = await fetch(urlPreco, {method: "GET"});

  const vinhos = await response.json();

  if (response.status == 200) {
    if (vinhos.length == 0) {
      alert("Não há vinhos para o(s) preço(s) informado(s)...");
      return;
    }
    for (const vinho of vinhos) {
      exibeVinho(vinho);
    }
  } else {
    alert(`Erro: ${vinhos.msg}`);
  }
})
