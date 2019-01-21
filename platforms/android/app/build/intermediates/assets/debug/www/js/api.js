const Api = {
  // address: "http://localhost/cyber_project/api/",
  address: "https://tricypolitain.com/api/",

  async PostData(url, data = null) {

    if (data == null) {
      data = {};
    }

    data.lang = Translate.GetCurrentCode();

    if (Account.phone && Account.code) {
      data.phone = Account.phone;
      data.code = Account.code;
    }
    return await $.post(this.address + url, data);
  }
};
