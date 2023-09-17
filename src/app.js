const http = require("http");
const fs = require("fs");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const params = url.searchParams;

  if (request.url === "/") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello, world!");
    response.end();

    return;
  } else if (request.url === "/?users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: appliction/json";
    response.write(getUsers());
    response.end();

    return;
  } else if (params.has("hello")) {
    const name = params.get("hello");
    if (name != "") {
      response.status = 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: text/plain";
      response.write(`Hello, ${name}!`);
      response.end();
    } else {
      response.status = 400;
      response.statusMessage = "Error Bad Request";
      response.header = "Content-Type: text/plain";
      response.write("Enter a name");
      response.end();
    }

    return;
  } else {
    response.status = 500;
    response.statusMessage = "Internal Server Error";
    response.header = "Content-Type: text/plain";
    response.end();

    return;
  }
});

server.listen(3003, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3003");
});
