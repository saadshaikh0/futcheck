/* eslint-disable no-restricted-globals */
// Web Worker for running WASM squad builder in background

let wasmModule = null;
let initialized = false;

async function initializeWasm() {
  if (!initialized) {
    try {
      console.log("Worker: Starting WASM initialization...");

      const wasmPkg = await import("../../wasm/squad_builder.js");
      console.log("Worker: WASM module imported");

      await wasmPkg.default();
      console.log("Worker: WASM initialized");

      wasmModule = wasmPkg;
      initialized = true;

      self.postMessage({
        type: "initialized",
        success: true,
      });
    } catch (error) {
      console.error("Worker: Failed to initialize WASM:", error);
      self.postMessage({
        type: "initialized",
        success: false,
        error: error.message || String(error),
      });
    }
  }
}

self.addEventListener("message", async (event) => {
  const { type, payload } = event.data;
  console.log(`Worker: Received message type: ${type}`);

  switch (type) {
    case "initialize":
      await initializeWasm();
      break;

    case "findBestSquad":
      try {
        if (!initialized) {
          console.log("Worker: Not initialized, initializing now...");
          await initializeWasm();
        }

        const { players, constraints } = payload;
        console.log("Worker: Processing squad with", players.length, "players");

        const resultJson = wasmModule.find_best_squad_wasm(
          JSON.stringify(players),
          JSON.stringify(constraints)
        );

        const result = JSON.parse(resultJson);
        console.log("Worker: Squad generated successfully");

        self.postMessage({
          type: "squadResult",
          success: true,
          result,
        });
      } catch (error) {
        console.error("Worker: Error in findBestSquad:", error);
        self.postMessage({
          type: "squadResult",
          success: false,
          error: error.message || String(error),
        });
      }
      break;

    case "findBestSquadWithProgress":
      try {
        if (!initialized) {
          console.log("Worker: Not initialized, initializing now...");
          await initializeWasm();
        }

        const { players, constraints } = payload;
        console.log("Worker: Processing squad with progress...");

        const resultJson = wasmModule.find_best_squad_with_progress(
          JSON.stringify(players),
          JSON.stringify(constraints),
          (progress) => {
            self.postMessage({
              type: "progress",
              progress,
            });
          }
        );

        const result = JSON.parse(resultJson);
        console.log("Worker: Squad generated successfully with progress");

        self.postMessage({
          type: "squadResult",
          success: true,
          result,
        });
      } catch (error) {
        console.error("Worker: Error in findBestSquadWithProgress:", error);
        self.postMessage({
          type: "squadResult",
          success: false,
          error: error.message || String(error),
        });
      }
      break;

    default:
      console.warn(`Worker: Unknown message type: ${type}`);
      break;
  }
});

console.log("Worker: WASM Worker loaded and ready");
