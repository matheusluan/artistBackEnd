import { app } from "./app";
import { getIPAddress } from "./utils/network.util";

const ip = getIPAddress();
const port = process.env.PORT || "3333";

const message = `
----------------------------------------------
  ★ ${require("../package.json").name}
  ✓ Server listening on ${ip}:${port}
----------------------------------------------
`;

app.listen(port, () => console.log(message));
