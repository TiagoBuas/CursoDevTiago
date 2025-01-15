/** nothing for now **/
const { exec } = require("node:child_process");

function checkDB() {
  exec("docker exec postgresDev pg_isready --host localhost", (err, stdout) => {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkDB();
      return;
    }
    console.log("\n🟢 db initialized");
  });
}
process.stdout.write("🔴 initiaziling db");
checkDB();
