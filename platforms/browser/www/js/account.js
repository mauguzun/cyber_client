const Account = {
  name: null,
  phone: null,
  code: null,
  email: null
};

const ManageAccount = {
  idnexname: "user",
  ServerLogined() {
    return Api.PostData("login", Account);
  },
  Register(data) {
    return Api.PostData("register", data);
  },
  Save() {
    localStorage.setItem(this.idnexname, JSON.stringify(Account));
  },
  Load() {
    if (localStorage.getItem(this.idnexname) !== null) {
      Object.assign(Account,JSON.parse(localStorage.getItem(this.idnexname)));
    }
  },

  Logout() {
    localStorage.removeItem(this.idnexname);
    this.Clear();
  },
  Clear() {
    Account.code = null;
    Account.name = null;
    Account.phone = null;
    Account.email = null;
  }

};
