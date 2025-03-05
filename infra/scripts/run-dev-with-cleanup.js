/** This calls the npm run dev:preparations and ALREADY STARTS THE NEXT DEV, but encapsulating it on this
 * spawn process, it also prepares the postdev to occour after the ctrl-c on shell */

const { spawn } = require("child_process");

const child = spawn("npm", ["run", "dev:run"], { stdio: "inherit" });

const cleanup = () => {
  spawn("npm", ["run", "postdev"], { stdio: "inherit" });
};

process.on("SIGINT", () => {
  cleanup();
  process.exit();
});

child.on("exit", cleanup);