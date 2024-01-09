const a = document.querySelector("#valor_a");
const b = document.querySelector("#valor_b");
const c = document.querySelector("#valor_c");
const x1 = document.querySelector("#valor_x1");
const x2 = document.querySelector("#valor_x2");
const modal = document.querySelector(".modal");
const mjx = document.querySelector("#math");
const erro = document.querySelector("#erro");
const btnCalcular = document.querySelector("#btnCalcular");
const outputexpressao = document.querySelector(".expressao-parent");

function OcultarExpressao(tipo = "none") {
  outputexpressao.style = "display:" + tipo;
}

OcultarExpressao("none");

const validar = () => {
  if (a.value === "" && b.value === "" && c.value === "") {
    OcultarExpressao("none");
  } else {
    OcultarExpressao("block");
  }
};

const Limpar = () => {
  a.value = "";
  b.value = "";
  c.value = "";

  x1.value = "";
  x2.value = "";

  validar();
};

btnCalcular.addEventListener("click", function () {
  Calcular();
});

const Delta = (a = 0, b = 0, c = 0) => {
  return Math.pow(b, 2) - 4 * a * c;
};

const Baskara = (delta = 0) => {
  if (delta < 0) {
    smsModal(
      "As raizes são complexas conjugadas, para esta equação ainda não temos o seu conjunto de solução.",
      "#6253e6"
    );
    x1.value = "";
    x2.value = "";

    return;
  } else {
    x1.value = (-b.value + Math.sqrt(delta)) / (2 * a.value);

    x2.value = (-b.value - Math.sqrt(delta)) / (2 * a.value);

    if (delta == 0) {
      //alert("Existe só mente uma raiz ");
    }
  }
};

const close = document
  .querySelector(".close")
  .addEventListener("click", function (event) {
    modal.style = "display:none";
  });

const smsModal = (sms = "", color = "") => {
  const modal = document.querySelector(".modal");
  modal.style = "display:flex;";
  const modal_content = document.querySelector(".modal-content");
  modal_content.style = "border:1px solid " + color + ";";
  modal_content.children[0].innerHTML = sms;
  a.blur();
  b.blur();
  c.blur();
};

const Calcular = () => {
  if (a.value === 0 || a.value == 0 || a.value === "") {
    x1.value = "";
    x2.value = "";

    erro.style = "display:block";
    setTimeout(() => {
      erro.style = "display:none";
    }, 8000);
    /*
    smsModal(
      "Para uma equação quadrática existir o valor de 'a' tem de ser diferente de zero.",
      "brown"
    );
*/
    return;
  }
  const delta = Delta(a.value, b.value, c.value);

  Baskara(delta);

};

function AtualizarExpressao() {
  validar();

  // Obter valores de a, b e c

  // Construir a expressão
  var expressao = `\\(${a.value === "" ? " " : a.value + "x^2"}  ${
    b.value === "" ? " " : "+(" + b.value + ")x"
  }  ${c.value === "" ? " " : "+(" + c.value + ")"} ${
    a.value || b.value || c.value != 0 ? "=0" : " "
  }\\)`;

  // Exibir a expressão usando MathJax
  document.getElementById("mjx").innerHTML = expressao.replace(/\*/g, "**");

  // Atualizar o processamento MathJax para garantir que a expressão seja renderizada corretamente
  MathJax.typeset();
}

a.addEventListener("input", AtualizarExpressao);
a.addEventListener("input",()=>erro.style = "display:none");
b.addEventListener("input", AtualizarExpressao);
c.addEventListener("input", AtualizarExpressao);
