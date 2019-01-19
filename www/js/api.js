const Api = {
  address: "http://localhost/cyber_project/api/",

  async PostData(url, data = null) {
    console.log(data);

    if (data == null) {
      data = {};
    }

    data.lang = Translate.GetCurrentCode();

    if (Account.phone && Account.code) {
      data["phone"] = Account.phone;
      data["code"] = Account.code;
    }
    console.log(data);
    return await $.post(this.address + url, data);
  }
};
