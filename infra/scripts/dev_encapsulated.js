/** This calls the npm run dev:preparations and ALREADY STARTS THE NEXT DEV, but encapsulating it on this
 * spawn process, it also prepares the postdev to occour after the ctrl-c on shell */

const { spawn } = require("child_process");
const process_dev_encapsulated = spawn("npm", ["run", "dev:preparations"], {
  stdio: "inherit",
});
process.on("SIGINT", () => {
  process_dev_encapsulated.on("close", () => {
    const closing = spawn("npm", ["run", "postdev"], { stdio: "inherit" });
    closing.on("close", () => {
      console.log("\n 🔴 Dev environment and services stoped gracefully");
    });
  });
  process_dev_encapsulated.kill("SIGINT");
});
