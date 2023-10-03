document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {

    // session storage para salvar o tema escolhido
    sessionStorage.setItem("color", document.documentElement.classList.toggle('dark'));
  });

  // Retrieve the theme preference on page load
  if (sessionStorage.getItem("color") === 'true') {
    document.documentElement.classList.toggle('dark')
  }
});


// mudar telas dentro da pasta "telas"
function pesquisarTelasPath() {
  // Seleciona o elemento input
  var inputTela = document.getElementById("valorTela");


  switch (inputTela.value.toLowerCase()) {
    case "tela inicial":
      window.location.href = `../index.html`;
      break;

    case "desktops":
    case "computadores":
      window.location.href = `./computadores.html`;
      break;

    default:
      break;
  }
}
