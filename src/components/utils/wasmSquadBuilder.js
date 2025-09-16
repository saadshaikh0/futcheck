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

      // Basic constraints
      min_chemistry: null,
      min_rating: null,
      budget: budgetInput ? parseInt(budgetInput) : null,

      // Rarity constraints
      min_rarity: null,
      min_quality: null,
      max_quality: null,
      exactly_quality: null,
      min_level: null,
      exactly_level: null,
      max_level: null,
      min_rarity_group: null,
      exactly_rarity_group: null,

      // Nationality constraints
      min_nationality: null,
      min_nations: null,
      max_nations: null,
      exactly_nations: null,
      min_same_nations: null,
      max_same_nations: null,

      // League constraints
      min_league: null,
      min_leagues: null,
      max_leagues: null,
      exactly_leagues: null,
      min_same_leagues: null,
      max_same_leagues: null,

      // Club constraints
      min_teamid: null,
      min_clubs: null,
      max_clubs: null,
      exactly_clubs: null,
      min_same_clubs: null,
      max_same_clubs: null,

      // Rating constraints
      min_high_rating: null,
      exactly_silver: null,

      // Chemistry constraints
      min_player_chemistry: null,

      club_players: [],
      locked_players: [],
    };

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

    // Process constraints from Redux state
    constraints.forEach((c) => {
      const { type, operation, value, key } = c;

      switch (type) {
        // Basic constraints
        case "rating":
          if (operation === "min") wasmConstraints.min_rating = value;
          break;

        case "chemistry":
          if (operation === "min") wasmConstraints.min_chemistry = value;
          break;

        case "player_chemistry":
          if (operation === "min") wasmConstraints.min_player_chemistry = value;
          break;

        // Nation constraints
        case "nations":
          if (operation === "min") wasmConstraints.min_nations = value;
          else if (operation === "max") wasmConstraints.max_nations = value;
          else if (operation === "exactly")
            wasmConstraints.exactly_nations = value;
          break;

        case "min_same_nations":
          wasmConstraints.min_same_nations = value;
          break;

        case "max_same_nations":
          wasmConstraints.max_same_nations = value;
          break;

        case "min_nationality":
          // Handle comma-separated nation IDs
          const nationIds = key
            ? typeof key === "string"
              ? key
                  .split(",")
                  .map((id) => parseInt(id.trim()))
                  .filter((id) => !isNaN(id))
              : [parseInt(key)]
            : [];
          if (nationIds.length > 0) {
            wasmConstraints.min_nationality = {
              key: nationIds.length === 1 ? nationIds[0] : nationIds,
              value,
            };
          }
          break;

        // League constraints
        case "leagues":
          if (operation === "min") wasmConstraints.min_leagues = value;
          else if (operation === "max") wasmConstraints.max_leagues = value;
          else if (operation === "exactly")
            wasmConstraints.exactly_leagues = value;
          break;

        case "min_same_leagues":
          wasmConstraints.min_same_leagues = value;
          break;

        case "max_same_leagues":
          wasmConstraints.max_same_leagues = value;
          break;

        case "min_league":
          const leagueId = key ? parseInt(key) : null;
          if (leagueId) {
            wasmConstraints.min_league = {
              key: leagueId,
              value,
            };
          }
          break;

        // Club constraints
        case "clubs":
          if (operation === "min") wasmConstraints.min_clubs = value;
          else if (operation === "max") wasmConstraints.max_clubs = value;
          else if (operation === "exactly")
            wasmConstraints.exactly_clubs = value;
          break;

        case "min_same_clubs":
          wasmConstraints.min_same_clubs = value;
          break;

        case "max_same_clubs":
          wasmConstraints.max_same_clubs = value;
          break;

        case "min_teamid":
          const teamId = key ? parseInt(key) : null;
          if (teamId) {
            wasmConstraints.min_teamid = {
              key: teamId,
              value,
            };
          }
          break;

        // Quality/Rating constraints
        case "quality":
          // Map rating to quality level (1=bronze, 2=silver, 3=gold)
          const qualityKey = value < 65 ? 1 : value < 75 ? 2 : 3;
          if (operation === "min") {
            wasmConstraints.min_quality = {
              key: qualityKey,
              value: 11,
            };
          } else if (operation === "max") {
            wasmConstraints.max_quality = {
              key: qualityKey,
              value: 11,
            };
          } else if (operation === "exactly") {
            wasmConstraints.exactly_quality = {
              key: qualityKey,
              value: 11,
            };
          }
          break;

        case "min_rarity":
          // Expects key=rarity_id, value=count
          if (key) {
            wasmConstraints.min_rarity = {
              key: parseInt(key),
              value,
            };
          }
          break;

        case "level":
          // Level constraints for specific rarity counts
          const levelKey = key ? parseInt(key) : null;
          if (levelKey) {
            if (operation === "min") {
              wasmConstraints.min_level = {
                key: levelKey,
                value,
              };
            } else if (operation === "exactly") {
              wasmConstraints.exactly_level = {
                key: levelKey,
                value,
              };
            } else if (operation === "max") {
              wasmConstraints.max_level = {
                key: levelKey,
                value,
              };
            }
          }
          break;

        case "rarity_group":
          // For multiple rarities combined
          const rarityIds = key
            ? typeof key === "string"
              ? key
                  .split(",")
                  .map((id) => parseInt(id.trim()))
                  .filter((id) => !isNaN(id))
              : Array.isArray(key)
              ? key
              : [parseInt(key)]
            : [];
          if (rarityIds.length > 0) {
            if (operation === "min") {
              wasmConstraints.min_rarity_group = {
                key: rarityIds,
                value,
              };
            } else if (operation === "exactly") {
              wasmConstraints.exactly_rarity_group = {
                key: rarityIds,
                value,
              };
            }
          }
          break;

        case "high_rating":
          wasmConstraints.min_high_rating = {
            key: key || 85,
            value,
          };
          break;

        case "exactly_silver":
          wasmConstraints.exactly_silver = true;
          break;

        default:
          console.warn(`Unknown constraint type: ${type}`);
      }
    });

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
