const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  switch (pathname) {
    case "/skaiciuok":
      const { num1, num2, veiksmas } = query;
      if (!num1 || !num2 || !veiksmas) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Neveikia, prasome nurodyti num1, num2, ir veiksmas.");
        break;
      }

      let result;
      switch (veiksmas) {
        case "plius":
          result = parseFloat(num1) + parseFloat(num2);
          break;
        case "minus":
          result = parseFloat(num1) - parseFloat(num2);
          break;
        case "daugyba":
          result = parseFloat(num1) * parseFloat(num2);
          break;
        case "dalyba":
          if (parseFloat(num2) === 0) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Cannot divide by zero.");
            break;
          }
          result = parseFloat(num1) / parseFloat(num2);
          break;
        default:
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Neveikia. Naudokite plius, minus, daugyba arba dalyba.");
          break;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result }));
      break;

    default:
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Skaiciuotuvas</h1>");
      break;
  }
});

server.listen(8000, "127.0.0.2", () => {
  console.log("Server listening on 8000 port");
});
