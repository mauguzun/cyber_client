const Nav = {
  current: null,

  Set(newPage) {
    //todo check if page exist !!!

    if (newPage != null && this.current !== newPage) {
      if (newPage.indexOf("|") > 0) {
        let page = newPage.split("|")[1];
        console.log(page);
        Api.PostData("code", { page_name: page }).then(e => {
          document.getElementById("page").innerHTML = e.code;
        });
        return;
      }

      switch (newPage) {
        case "pay":
          this.SetPage("pay");
          break;

        case "map":
          if(ManageOrder.CanShowMap() )
          this.SetPage("map");
         
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

        case "confirm":
          this.SetPage("confirm");
          break;
      }

      this.current = newPage;
    }
  },
  SetPage(arg) {
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
