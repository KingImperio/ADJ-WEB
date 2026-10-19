import http from "node:http";
import next from "next";

const port = Number(process.env.PORT || 4173);
const hostname = "127.0.0.1";
const app = next({ dev: true, hostname, port });

app.prepare().then(() => {
  const handle = app.getRequestHandler();
  const upgrade = app.getUpgradeHandler();
  const server = http.createServer((req, res) => handle(req, res));
  server.on("upgrade", (req, socket, head) => upgrade(req, socket, head));
  server.listen(port, hostname, () => console.log(`ADJ preview: http://${hostname}:${port}`));
}).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
