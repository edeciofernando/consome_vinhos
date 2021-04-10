const frm = document.querySelector("form");
const divAlert = document.querySelector(".alert");

frm.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que o form seja enviado automaticamente

  const url = "http://localhost:3000/vinhos";

  const formData = new FormData();

  formData.append("marca", frm.marca.value);
  formData.append("tipo", frm.tipo.value);
  formData.append("preco", frm.preco.value);
  formData.append("foto", frm.foto.files[0]);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const dados = await response.json();

  if (response.status == 201) {
    divAlert.className = "alert alert-success mt-3";
    divAlert.innerText = `Ok! Vinho ${frm.marca.value} cadastrado com sucesso. Código: ${dados.id}`;
  } else {
    divAlert.className = "alert alert-danger mt-3";
    divAlert.innerText = `Erro: ${dados.msg}`;
  }
  frm.reset();
  frm.marca.focus();
});

// blur: ocorre quando o campo perde o foco
frm.marca.addEventListener("blur", () => {
  divAlert.className = "alert";
  divAlert.innerText = "";
});
