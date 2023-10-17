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

const searchButtonTax = document.getElementById("searchButtonTax");
const loadingDotsTax = document.getElementById("loadingDotsTax");
const resultTableTax = document.getElementById("resultTableTax");

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

searchButtonTax.addEventListener("click", async function () {
    loadingDotsTax.classList.remove("gray-dots");
    loadingDotsTax.style.animation = "loading 2s linear infinite";
    let valuesCurrencyResponse = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
    let valuesCurrency = await valuesCurrencyResponse.json();

    setTimeout(function () {
        fetch(`https://brasilapi.com.br/api/taxas/v1`)
            .then((response) => response.json())
            .then((data) => {
                loadingDotsTax.style.animation = "none";

                const tableContent = `
                        <tr>
                            <th>Selic</th>
                            <th>CDI</th>
                            <th>IPCA</th>
                            <th>$ Dólar</th>
                            <th>€ Euro</th>
                            <th>₿ Bitcoin</th>
                        </tr>
                        <tr>
                            <td>${data[0].valor.toString().replace(".", ",")} %</td>
                            <td>${data[1].valor.toString().replace(".", ",")} %</td>
                            <td>${data[2].valor.toString().replace(".", ",")} %</td>
                            <td>${currencyFormatter.format(valuesCurrency.USDBRL.bid)}</td>
                            <td>${currencyFormatter.format(valuesCurrency.EURBRL.bid)}</td>
                            <td>${currencyFormatter.format(valuesCurrency.BTCBRL.bid)}</td>
                        </tr>
                    `;

                resultTableTax.innerHTML = tableContent;
            })
            .catch((error) => {
                console.error("Erro ao buscar taxas:", error);
            });
    }, 2000);
});
