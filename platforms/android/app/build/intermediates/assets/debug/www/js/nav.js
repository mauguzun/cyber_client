const Nav = {
  current: null,

  Set(newPage) {
    //todo check if page exist !!!
    $(".snap-content").removeClass("move-me");
    
    $(".full_size").fadeOut();

    if (newPage != null && this.current !== newPage) {
      if (newPage.indexOf("|") > 0) {
        let page = newPage.split("|")[1];

        Api.PostData("code", { page_name: page }).then(e => {

          $("#page").load(`views/about.html`,function() {
            document.getElementById("error-page").innerHTML = e.code;
          });
          
        });
        return;
      }

      switch (newPage) {
        case "pay":
          this.SetPage("pay");
          break;

        case "map":
          if (ManageOrder.CanShowMap()) {
            this.SetPage("map");
          }
          break;

        case "login":
          this.SetPage("login");
          break;

        case "logout":
          ManageAccount.Logout();
          break;

        case "exit":
          this.ExitApp();
          break;

        default:
          this.SetPage(newPage);
          break;
      }

      this.current = newPage;
    }
  },
  SetPage(arg) {
    for (key in app.pages) {
      console.log(key);
      if (Order.hasOwnProperty(key)) {
        app.pages[key].$destroy();
      }
    }

    $("#page").load(`views/${arg}.html`);
  },
  ExitApp() {
    if (navigator.app) {
      navigator.app.exitApp();
    } else if (navigator.device) {
      navigator.device.exitApp();
    } else {
      window.close();
    }
  }
};
