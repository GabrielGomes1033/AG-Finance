const API_KEY = "SUA_API_KEY_AQUI";

const ativos = [
  { symbol: "PETR4.SA", preco: "preco-petr4", variacao: "var-petr4", volume: "vol-petr4" },
  { symbol: "VALE3.SA", preco: "preco-vale3", variacao: "var-vale3", volume: "vol-vale3" },
  { symbol: "ITUB4.SA", preco: "preco-itub4", variacao: "var-itub4", volume: "vol-itub4" },
  { symbol: "B3SA3.SA", preco: "preco-b3sa3", variacao: "var-b3sa3", volume: "vol-b3sa3" },
];

async function buscarAtivo(ativo) {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ativo.symbol}&apikey=${API_KEY}`
    );
    const data = await res.json();
    const q = data["Global Quote"];

    const preco = Number(q["05. price"]).toFixed(2);
    const variacao = parseFloat(q["10. change percent"]);
    const volume = Number(q["06. volume"]).toLocaleString("pt-BR");

    document.getElementById(ativo.preco).innerText = `R$ ${preco}`;
    document.getElementById(ativo.volume).innerText = volume;

    const varEl = document.getElementById(ativo.variacao);
    varEl.innerText = `${variacao.toFixed(2)}%`;
    varEl.className = variacao >= 0 ? "positive" : "negative";

  } catch {
    document.getElementById(ativo.preco).innerText = "Erro";
  }
}

ativos.forEach(buscarAtivo);

async function buscarIndice(symbol, id) {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await res.json();
    const variacao = parseFloat(data["Global Quote"]["10. change percent"]);

    const el = document.getElementById(id);
    el.innerText = `${variacao.toFixed(2)}%`;
    el.className = variacao >= 0 ? "positive" : "negative";
  } catch {
    document.getElementById(id).innerText = "--";
  }
}

buscarIndice("^BVSP", "ibov");
buscarIndice("^GSPC", "sp500");
buscarIndice("^IXIC", "nasdaq");

async function buscarDolar() {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=BRL&apikey=${API_KEY}`
    );
    const data = await res.json();
    const cot = Number(
      data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
    ).toFixed(2);

    document.getElementById("dolar").innerText = `R$ ${cot}`;
  } catch {
    document.getElementById("dolar").innerText = "--";
  }
}

buscarDolar();

// TradingView
new TradingView.widget({
  container_id: "tv_chart",
  autosize: true,
  symbol: "BINANCE:BTCBRL",
  interval: "D",
  theme: "dark",
  locale: "pt_BR"
});

// Ticker personalizado
const ticker = document.getElementById("tickerTrack");

const dados = [
  { nome: "IBOV", valor: "155.830", var: 1.46 },
  { nome: "VALE3", valor: "72,90", var: -0.03 },
  { nome: "ITUB4", valor: "40,26", var: 1.64 },
  { nome: "PETR4", valor: "30,31", var: 0.19 },
  { nome: "B3SA3", valor: "13,53", var: 2.19 },
  { nome: "BTC", valor: "479.328,00", var: 2.19 },
  { nome: "ETH", valor: "15.632,00", var: -3.12 },
  { nome: "USD", valor: "5,53", var: 0.00 },
  { nome: "EUR", valor: "6,52", var: 0.00 },
];

ticker.innerHTML = "";

dados.forEach(a => {
  const span = document.createElement("span");
  span.className = `item ${a.var >= 0 ? "positive" : "negative"}`;
  span.innerText = `${a.nome}: ${a.valor} ${a.var >= 0 ? "▲" : "▼"}${a.var}%`;
  ticker.appendChild(span);
});
