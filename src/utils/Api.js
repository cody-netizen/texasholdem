// Sử dụng proxy path để tránh CORS
const BASE_URL = "/api";
const SECRET_KEY = "test-callback-secret-key-2024";
const BASIC_AUTH = btoa("agent000:1iLCL5IK");

// Tạo UUID tương thích với mọi môi trường
function generateUUID() {
  console.log("Debug crypto:", {
    hasCrypto: typeof crypto !== "undefined",
    hasRandomUUID: typeof crypto !== "undefined" && crypto.randomUUID,
    userAgent:
      typeof navigator !== "undefined" ? navigator.userAgent : "no navigator",
  });

  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    console.log("Using crypto.randomUUID()");
    return crypto.randomUUID();
  }

  console.log("Using fallback UUID generation");
  // Fallback cho môi trường không support crypto.randomUUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const userService = {
  async getBalance(username) {
    const response = await fetch(`${BASE_URL}/test-callback/balance`, {
      method: "POST",
      headers: {
        "secret-key": SECRET_KEY,
        "Content-type": `application/json`,
      },
      body: JSON.stringify({ username }),
    });
    return response.json();
  },

  async deposit(username, amount) {
    const txid = generateUUID();
    const response = await fetch(`${BASE_URL}/test-callback/credit`, {
      method: "POST",
      headers: {
        "secret-key": SECRET_KEY,
        "Content-type": `application/json`,
      },
      body: JSON.stringify({ username, amount, txid }),
    });
    return response.json();
  },

  async withdraw(username, amount) {
    const txid = generateUUID();
    const response = await fetch(`${BASE_URL}/test-callback/debit`, {
      method: "POST",
      headers: {
        "secret-key": SECRET_KEY,
        "Content-type": `application/json`,
      },
      body: JSON.stringify({ username, amount, txid }),
    });
    return response.json();
  },

  async startGame(username) {
    const response = await fetch(`${BASE_URL}/seamless/play`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${BASIC_AUTH}`,
      },
      body: JSON.stringify({ username }),
    });
    return response.json();
  },
};
