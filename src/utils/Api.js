const BASE_URL = "https://pangpang.abb1901.com/api";
const SECRET_KEY = "test-callback-secret-key-2024";
const BASIC_AUTH = btoa("agent000:1iLCL5IK");

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
    const txid = crypto.randomUUID();
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
    const txid = crypto.randomUUID();
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
        "Authorization": `Basic ${BASIC_AUTH}`,
      },
      body: JSON.stringify({ username }),
    });
    return response.json();
  },
};
