import os from "os";

const nets = os.networkInterfaces();

export function getIPAddress() {
  let ip = "";

  for (const key in nets) {
    if (key === "Ethernet" || key === "Wi-Fi") {
      const connection = nets[key];

      if (!connection) {
        break;
      }

      for (const net of connection) {
        if (net.family === "IPv4" || net.family === "IPv6") {
          ip = net.address;
        }
      }
    }
  }

  return !ip ? 'localhost' : ip;
}
