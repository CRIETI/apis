const cepInput = document.getElementById("cepInput");
const searchButtonCep = document.getElementById("searchButtonCep");
const loadingDotsCep = document.getElementById("loadingDotsCep");
const resultTableCep = document.getElementById("resultTableCep");

searchButtonCep.addEventListener("click", function () {
    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        return;
    }

    loadingDotsCep.classList.remove("gray-dots");
    loadingDotsCep.style.animation = "loading 2s linear infinite";

    setTimeout(function () {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
                loadingDotsCep.style.animation = "none";

                if (data.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                const tableContent = `
                        <tr>
                            <th>CEP</th>
                            <th>Logradouro</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                        </tr>
                        <tr>
                            <td>${data.cep}</td>
                            <td>${data.logradouro}</td>
                            <td>${data.bairro}</td>
                            <td>${data.localidade}</td>
                            <td>${data.uf}</td>
                        </tr>
                    `;

                resultTableCep.innerHTML = tableContent;
            })
            .catch((error) => {
                console.error("Erro ao buscar CEP:", error);
            });
    }, 2000);
});

const selectBook = document.getElementById("selectBook");
const searchButtonBook = document.getElementById("searchButtonBook");
const loadingDotsBook = document.getElementById("loadingDotsBook");
const resultTableBook = document.getElementById("resultTableBook");

searchButtonBook.addEventListener("click", function () {
    const isbn = selectBook.value;

    loadingDotsBook.classList.remove("gray-dots");
    loadingDotsBook.style.animation = "loading 2s linear infinite";

    setTimeout(function () {
        fetch(`https://brasilapi.com.br/api/ISBN/v1/${isbn}?providers=google-books,cbl`)
            .then((response) => response.json())
            .then((data) => {
                loadingDotsBook.style.animation = "none";

                if (data.erro) {
                    alert("ISBN não encontrado.");
                    return;
                }

                const tableContent = `
                        <tr>
                            <th>Título</th>
                            <th>Editora</th>
                            <th>Sinopse</th>
                        </tr>
                        <tr>
                            <td>${data.title}</td>
                            <td>${data.publisher}</td>
                            <td>${data.synopsis ? `${data.synopsis.substring(0, 80)} ...` : "Não informado"}</td>
                        </tr>
                    `;

                resultTableBook.innerHTML = tableContent;
            })
            .catch((error) => {
                console.error("Erro ao buscar Livro:", error);
            });
    }, 2000);
});

const selectPoke = document.getElementById("selectPoke");
const searchButtonPoke = document.getElementById("searchButtonPoke");
const loadingDotsPoke = document.getElementById("loadingDotsPoke");
const resultTablePoke = document.getElementById("resultTablePoke");

searchButtonPoke.addEventListener("click", function () {
    const poke = selectPoke.value;

    loadingDotsPoke.classList.remove("gray-dots");
    loadingDotsPoke.style.animation = "loading 2s linear infinite";

    setTimeout(function () {
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
            .then((response) => response.json())
            .then((data) => {
                loadingDotsPoke.style.animation = "none";

                if (data.erro) {
                    alert("Pokemón não encontrado.");
                    return;
                }

                const tableContent = `
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Imagem</th>
                        </tr>
                        <tr>
                            <td>${data.name}</td>
                            <td>${data.types[0].type.name}</td>
                            <td><img src="${data.sprites.front_default}"/></td>
                        </tr>
                    `;

                resultTablePoke.innerHTML = tableContent;
            })
            .catch((error) => {
                console.error("Erro ao buscar Pokemón:", error);
            });
    }, 2000);
});
