import { fetchFullPlayersDatabase } from "../../api/apiService";

const DB_NAME = "FutCheckDB";
const DB_VERSION = 1;
const STORE_NAME = "players";
const CACHE_KEY = "allPlayers";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

class PlayerCache {
  constructor() {
    this.cachedPlayers = null; // In-memory cache for current session
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "key" });
        }
      };
    });
  }

  async getPlayers() {
    // Check in-memory cache first
    if (this.cachedPlayers) {
      return this.cachedPlayers;
    }

    const db = await this.initDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(CACHE_KEY);
      request.onsuccess = () => {
        const data = request.result;
        if (data && Date.now() - data.timestamp < CACHE_EXPIRY) {
          this.cachedPlayers = data.players; // Store in memory for session
          resolve(data.players);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async savePlayers(players) {
    const db = await this.initDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.put({
        key: CACHE_KEY,
        players,
        timestamp: Date.now(),
      });
      request.onsuccess = () => {
        this.cachedPlayers = players; // Update in-memory cache
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async fetchAndCachePlayers() {
    try {
      // Check cache first
      const cachedPlayers = await this.getPlayers();
      if (cachedPlayers) {
        return cachedPlayers;
      }

      // Fetch from API
      const players = await fetchFullPlayersDatabase();

      // Save to cache
      await this.savePlayers(players);

      return players;
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  }

  async ensurePlayersLoaded() {
    // Just ensure players are in cache, don't return them
    await this.fetchAndCachePlayers();
    return true;
  }
}

export default new PlayerCache();
