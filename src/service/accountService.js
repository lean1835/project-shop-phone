import http from "../libs/http";

class AccountService {
  async getAll() {
    return await http.get("/accounts");
  }
}

export default new AccountService();
