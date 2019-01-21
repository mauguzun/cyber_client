app.menu = function() {
  menuInFunction = new Vue({
    el: "#menu",
    data: {
      trans: trans,
      Account: Account,
      ManageOrder: ManageOrder,
      Order: Order,
     
    },
    methods: {
      userName() {
        return Account.name == null
          ? this.trans.menu.text.userName
          : Account.name;
      },
      change(event) {
        Nav.Set(event.target.getAttribute("data-link"));
        return false;
      }
    }
  });
};
