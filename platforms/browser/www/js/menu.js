app.menu = function() {


  

  menuInFunction = new Vue({
    el: ".snap-drawers",
    data: {
      trans: trans,
      Account: Account,
      ManageOrder: ManageOrder,
      Order: Order,
     
    },
    methods: {
      userName() {
        return Account.name != null && Account.code  != null 
          ? Account.name
          : this.trans.menu.text.userName ;
      },
      change(event) {
        Nav.Set(event.target.getAttribute("data-link"));
        return false;
      },
      close_menu(){
        
        $(".snap-content").toggleClass("move-me");
    
      }
    }
  });
};
