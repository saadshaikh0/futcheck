class WasmSquadBuilder {
  constructor() {
    this.worker = null;
    this.initialized = false;
    this.initPromise = null;
  }

  async initialize() {
    if (this.initialized) return;

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      try {
        this.worker = new Worker(new URL("./wasmWorker.js", import.meta.url), {
          type: "module",
        });

        const handleMessage = (event) => {
          const { type, success, error } = event.data;

          if (type === "initialized") {
            if (success) {
              this.initialized = true;
              console.log("WASM Squad Builder initialized in Web Worker");
              resolve();
            } else {
              reject(new Error(`Failed to initialize WASM: ${error}`));
            }
            this.worker.removeEventListener("message", handleMessage);
          }
        };

        this.worker.addEventListener("message", handleMessage);

        this.worker.postMessage({ type: "initialize" });

        setTimeout(() => {
          if (!this.initialized) {
            this.worker.removeEventListener("message", handleMessage);
            reject(new Error("WASM initialization timeout"));
          }
        }, 30000);
      } catch (error) {
        console.error("Failed to create Web Worker:", error);
        reject(error);
      }
    });

    return this.initPromise;
  }

  async findBestSquad(players, constraints) {
    await this.initialize();

    return new Promise((resolve, reject) => {
      try {
        const wasmPlayers = players.map((player) => ({
          id: player.id,
          base_id: player.base_id,
          name: player.name,
          rating: player.rating || player.overall,
          position: Array.isArray(player.position)
            ? player.position
            : [player.position],
          nation: player.nation,
          leagueid: player.leagueid,
          teamid: player.teamid,
          cost: player.cost || player.price || 0,
          rarity_id: player.rarity_id || 1,
        }));

        const handleMessage = (event) => {
          const { type, success, result, error } = event.data;

          if (type === "squadResult") {
            this.worker.removeEventListener("message", handleMessage);

            if (success) {
              resolve(result);
            } else {
              console.error("Squad generation failed:", error);
              reject(new Error(error || "Squad generation failed"));
            }
          }
        };

        this.worker.addEventListener("message", handleMessage);

        this.worker.postMessage({
          type: "findBestSquad",
          payload: {
            players: wasmPlayers,
            constraints,
          },
        });

        setTimeout(() => {
          this.worker.removeEventListener("message", handleMessage);
          reject(new Error("Squad generation timeout"));
        }, 120000);
      } catch (error) {
        console.error("Error in findBestSquad:", error);
        reject(error);
      }
    });
  }

  async findBestSquadWithProgress(players, constraints, onProgress) {
    await this.initialize();

    return new Promise((resolve, reject) => {
      try {
        // Transform players to WASM format
        const wasmPlayers = players.map((player) => ({
          id: player.id,
          base_id: player.base_id,
          name: player.name,
          rating: player.rating || player.overall,
          position: Array.isArray(player.position)
            ? player.position
            : [player.position],
          nation: player.nation,
          leagueid: player.leagueid,
          teamid: player.teamid,
          cost: player.cost || player.price || 0,
          rarity_id: player.rarity_id || 1,
        }));

        // Handle worker messages
        const handleMessage = (event) => {
          const { type, success, result, error, progress } = event.data;

          if (type === "progress") {
            if (onProgress) {
              onProgress(progress);
            }
          } else if (type === "squadResult") {
            this.worker.removeEventListener("message", handleMessage);

            if (success) {
              resolve(result);
            } else {
              console.error("Squad generation failed:", error);
              reject(new Error(error || "Squad generation failed"));
            }
          }
        };

        this.worker.addEventListener("message", handleMessage);

        // Send request to worker
        this.worker.postMessage({
          type: "findBestSquadWithProgress",
          payload: {
            players: wasmPlayers,
            constraints,
          },
        });

        // Timeout after 60 seconds
        setTimeout(() => {
          this.worker.removeEventListener("message", handleMessage);
          reject(new Error("Squad generation timeout"));
        }, 60000);
      } catch (error) {
        console.error("Error in findBestSquadWithProgress:", error);
        reject(error);
      }
    });
  }

  transformConstraints(formation, budgetInput, lockedPlayers, constraints) {
    const wasmConstraints = {
      formation,
      budget: budgetInput ? parseInt(budgetInput) : null,
      club_players: [],
      locked_players: [],

      // Initialize all possible constraint fields as null
      chemistry: null,
      rating: null,
      player_overall_rating_min: null,
      player_overall_rating_max: null,
      min_quality: null,
      max_quality: null,
      exactly_quality: null,
      rarity: null,
      rarity_group: null,
      nationality: null,
      nations: null,
      same_nations: null,
      league: null,
      leagues: null,
      same_leagues: null,
      teamid: null,
      clubs: null,
      same_clubs: null,
      player_chemistry: null,
      exactly_silver: null,
    };

    // Process constraints array and map to named properties
    if (constraints && Array.isArray(constraints)) {
      constraints.forEach((constraint) => {
        const { type, operation, value, key } = constraint;

        // Create ConstraintValue object in Rust format
        const constraintValue = {
          key: key
            ? Array.isArray(key)
              ? { Multiple: key }
              : { Single: parseInt(key) }
            : { Single: value },
          value: parseInt(value),
          operation: operation, // Should be "Min", "Max", or "Exactly"
        };

        // Map constraint types to the correct property names
        switch (type) {
          case "chemistry":
            wasmConstraints.chemistry = constraintValue;
            break;
          case "rating":
            wasmConstraints.rating = constraintValue;
            break;
          case "player_overall_rating_min":
            wasmConstraints.player_overall_rating_min = constraintValue;
            break;
          case "player_overall_rating_max":
            wasmConstraints.player_overall_rating_max = constraintValue;
            break;
          case "min_quality":
            wasmConstraints.min_quality = constraintValue;
            break;
          case "max_quality":
            wasmConstraints.max_quality = constraintValue;
            break;
          case "exactly_quality":
            wasmConstraints.exactly_quality = constraintValue;
            break;
          case "rarity":
            wasmConstraints.rarity = constraintValue;
            break;
          case "rarity_group":
            // Handle multiple rarity IDs
            if (key) {
              const rarityIds = Array.isArray(key)
                ? key
                : typeof key === "string"
                ? key.split(",").map((id) => parseInt(id.trim()))
                : [parseInt(key)];
              wasmConstraints.rarity_group = {
                key: { Multiple: rarityIds },
                value: parseInt(value),
                operation,
              };
            }
            break;
          case "nationality":
            // Handle multiple nation IDs
            if (key) {
              const nationIds = Array.isArray(key)
                ? key
                : typeof key === "string"
                ? key.split(",").map((id) => parseInt(id.trim()))
                : [parseInt(key)];
              wasmConstraints.nationality = {
                key:
                  nationIds.length === 1
                    ? { Single: nationIds[0] }
                    : { Multiple: nationIds },
                value: parseInt(value),
                operation,
              };
            }
            break;
          case "nations":
            wasmConstraints.nations = constraintValue;
            break;
          case "same_nations":
            wasmConstraints.same_nations = constraintValue;
            break;
          case "league":
            if (key) {
              wasmConstraints.league = {
                key: { Single: parseInt(key) },
                value: parseInt(value),
                operation,
              };
            }
            break;
          case "leagues":
            wasmConstraints.leagues = constraintValue;
            break;
          case "same_leagues":
            wasmConstraints.same_leagues = constraintValue;
            break;
          case "teamid":
            if (key) {
              wasmConstraints.teamid = {
                key: { Single: parseInt(key) },
                value: parseInt(value),
                operation,
              };
            }
            break;
          case "clubs":
            wasmConstraints.clubs = constraintValue;
            break;
          case "same_clubs":
            wasmConstraints.same_clubs = constraintValue;
            break;
          case "player_chemistry":
            wasmConstraints.player_chemistry = constraintValue;
            break;
          case "exactly_silver":
            wasmConstraints.exactly_silver = true;
            break;
        }
      });
    }

    // Process locked players if any
    if (lockedPlayers && lockedPlayers.length > 0) {
      wasmConstraints.locked_players = lockedPlayers.map((lp) => ({
        id: lp.player.id,
        position_index: lp.positionIndex,
        rating: lp.player.rating,
        base_id: lp.player.base_id,
        latest_price:
          lp.player.latest_price || lp.player.cost || lp.player.price || 0,
        teamid: lp.player.teamid,
        leagueid: lp.player.leagueid,
        nation: lp.player.nation,
        rarity_id: lp.player.rarity_id || lp.player.rarity || 0,
        position: Array.isArray(lp.player.position)
          ? lp.player.position
          : [lp.player.position],
        name: lp.player.name,
      }));
    }

    // Remove null values to clean up the constraints object
    Object.keys(wasmConstraints).forEach((key) => {
      if (wasmConstraints[key] === null) {
        delete wasmConstraints[key];
      }
    });

    console.log("Transformed constraints:", wasmConstraints);
    return wasmConstraints;
  }
  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.initialized = false;
      this.initPromise = null;
    }
  }
}

const wasmSquadBuilderInstance = new WasmSquadBuilder();
export default wasmSquadBuilderInstance;
