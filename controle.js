// cria um array com todos os elementos h5 da página
const h5 = document.querySelectorAll("h5");

window.addEventListener("load", async () => {
  const url = "http://localhost:3000/vinhos/total";

  const response = await fetch(url, { method: "GET" });

  const dados = await response.json();

  if (response.status == 200) {
    const {num, total, maior, media} = dados;
    h5[0].innerText = num;
    h5[1].innerText = Number(total).toLocaleString("pt-br", {minimumFractionDigits: 2});
    h5[2].innerText = Number(maior).toLocaleString("pt-br", {minimumFractionDigits: 2});
    h5[3].innerText = Number(media).toLocaleString("pt-br", {minimumFractionDigits: 2});
  } else {
    alert(`Erro: ${dados.msg}`);
  }
});
