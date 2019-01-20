var trans = null;
app.isPhone = window.cordova.platformId == "browser" ? false : true;

document.addEventListener("deviceready", function() {

   

  Translate.LoadLang().then(result => {
    // yea ? 
    trans = result;

    ManageAccount.Load();

    if (Account.phone != null) {
      ManageAccount.ServerLogined().then(e => {
        if (e.action === true) {   
          console.log(e.user) 
          if(e.user.order != null){
             ManageOrder.LoadOrderByID(e.user.order);
          }else{
             Nav.Set("map");
          }
          return;
        }
        Nav.Set("login");
       
      });
    } 
    else {
        Nav.Set("login");
     
    }
   
  });
});
