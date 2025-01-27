//orchestrator.js
import retry from "async-retry";

async function wait_for_all_services() {
  await wait_for_web_services();

  async function wait_for_web_services() {
    return retry(wait_for_fetch_status, {
      retries: 100,
      maxTimeout: 100,
      minTimeout: 10,
    });
  }

  async function wait_for_fetch_status() {
    const response = await fetch("http://localhost:3000/api/v1/status");

    if (response.status !== 200) {
      throw Error();
    }
  }
}

const orchestrator = {
	wait_for_all_services,
};

export default orchestrator;
