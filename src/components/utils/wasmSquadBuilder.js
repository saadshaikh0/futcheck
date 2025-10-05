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

      // Initialize single constraints (Option<ConstraintValue>)
      chemistry: null,
      rating: null,
      exactly_silver: null,

      // Initialize array constraints (Vec<ConstraintValue>)
      player_overall_rating_min: [],
      player_overall_rating_max: [],
      min_quality: [],
      max_quality: [],
      exactly_quality: [],
      rarity: [],
      rarity_group: [],
      nationality: [],
      nations: [],
      same_nations: [],
      league: [],
      leagues: [],
      same_leagues: [],
      teamid: [],
      clubs: [],
      same_clubs: [],
      player_chemistry: [],
    };

    // Helper function to create ConstraintValue object
    const createConstraintValue = (key, value, operation) => {
      return {
        key: key
          ? Array.isArray(key)
            ? { Multiple: key.map((k) => parseInt(k)) }
            : { Single: parseInt(key) }
          : { Single: parseInt(value) },
        value: parseInt(value),
        operation: operation, // Should be "Min", "Max", or "Exactly"
      };
    };

    // Process constraints array
    if (constraints && Array.isArray(constraints)) {
      constraints.forEach((constraint) => {
        const { type, operation, value, key } = constraint;

        // Create ConstraintValue object
        const constraintValue = createConstraintValue(key, value, operation);

        // Map constraint types to the correct property names
        switch (type) {
          // Single constraints (remain as Option)
          case "chemistry":
            wasmConstraints.chemistry = constraintValue;
            break;
          case "rating":
            wasmConstraints.rating = constraintValue;
            break;
          case "exactly_silver":
            wasmConstraints.exactly_silver = true;
            break;

          // Array constraints (push to Vec)
          case "player_overall_rating_min":
            wasmConstraints.player_overall_rating_min.push(constraintValue);
            break;
          case "player_overall_rating_max":
            wasmConstraints.player_overall_rating_max.push(constraintValue);
            break;
          case "min_quality":
            wasmConstraints.min_quality.push(constraintValue);
            break;
          case "max_quality":
            wasmConstraints.max_quality.push(constraintValue);
            break;
          case "exactly_quality":
            wasmConstraints.exactly_quality.push(constraintValue);
            break;
          case "rarity":
            wasmConstraints.rarity.push(constraintValue);
            break;
          case "rarity_group":
            // Handle multiple rarity IDs
            if (key) {
              const rarityIds = Array.isArray(key)
                ? key.map((k) => parseInt(k))
                : typeof key === "string"
                ? key.split(",").map((id) => parseInt(id.trim()))
                : [parseInt(key)];
              wasmConstraints.rarity_group.push({
                key: { Multiple: rarityIds },
                value: parseInt(value),
                operation,
              });
            }
            break;
          case "nationality":
            // Handle multiple nation IDs
            if (key) {
              const nationIds = Array.isArray(key)
                ? key.map((k) => parseInt(k))
                : typeof key === "string"
                ? key.split(",").map((id) => parseInt(id.trim()))
                : [parseInt(key)];
              wasmConstraints.nationality.push({
                key:
                  nationIds.length === 1
                    ? { Single: nationIds[0] }
                    : { Multiple: nationIds },
                value: parseInt(value),
                operation,
              });
            }
            break;
          case "nations":
            wasmConstraints.nations.push(constraintValue);
            break;
          case "same_nations":
            wasmConstraints.same_nations.push(constraintValue);
            break;
          case "league":
            if (key) {
              const leagueIds = Array.isArray(key)
                ? key.map((k) => parseInt(k))
                : typeof key === "string"
                ? key.split(",").map((id) => parseInt(id.trim()))
                : [parseInt(key)];
              wasmConstraints.league.push({
                key:
                  leagueIds.length === 1
                    ? { Single: leagueIds[0] }
                    : { Multiple: leagueIds },
                value: parseInt(value),
                operation,
              });
            }
            break;
          case "leagues":
            wasmConstraints.leagues.push(constraintValue);
            break;
          case "same_leagues":
            wasmConstraints.same_leagues.push(constraintValue);
            break;
          case "teamid":
            if (key) {
              const teamIds = Array.isArray(key)
                ? key.map((k) => parseInt(k))
                : typeof key === "string"
                ? key.split(",").map((id) => parseInt(id.trim()))
                : [parseInt(key)];
              wasmConstraints.teamid.push({
                key:
                  teamIds.length === 1
                    ? { Single: teamIds[0] }
                    : { Multiple: teamIds },
                value: parseInt(value),
                operation,
              });
            }
            break;
          case "clubs":
            wasmConstraints.clubs.push(constraintValue);
            break;
          case "same_clubs":
            wasmConstraints.same_clubs.push(constraintValue);
            break;
          case "player_chemistry":
            wasmConstraints.player_chemistry.push(constraintValue);
            break;
          default:
            console.warn("Unknown constraint type:", type);
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

    // Clean up: Remove empty arrays and null values
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
