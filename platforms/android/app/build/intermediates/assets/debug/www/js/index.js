var trans = null;
app.isPhone = window.cordova.platformId == "browser" ? false : true;
app.pages = {};
app.menu = null;

document.addEventListener("deviceready", function() {
  Translate.LoadLang().then(result => {
    // yea ?
    
    
    trans = result;
    ManageAccount.Load();


    
    if (app.isPhone) {
      runBackground(cordova);
      setPush();
    }

    if (Account.phone != null) {
      ManageAccount.ServerLogined().then(e => {
        if (e.action === true) {
          if (e.user.order != null) {
            ManageOrder.LoadOrderByID(e.user.order);
          } else {
            Nav.Set("map");
            return;
          }
        }
        Nav.Set("login");
      });
    } else {
        Nav.Set("login");
    }
  });
});

function runBackground(cordova) {
  cordova.plugins.backgroundMode.setEnabled(true);
  cordova.plugins.backgroundMode.enable();
  cordova.plugins.backgroundMode.on("activate", function() {
    //cordova.plugins.backgroundMode.disableWebViewOptimizations()

    cordova.plugins.backgroundMode.setDefaults({
      title: trans.system.title,
      text: trans.system.desc,
      icon: "img/car.png", // this will look for icon.png in platforms/android/res/drawable|mipmap
      color: "F14F4D", // hex format like 'F14F4D'
      resume: true,
      hidden: false,
      bigText: trans.system.desc
    });
  });
}

function setPush() {
  console.log(window.cordova.platformId);

  switch (window.cordova.platformId) {
    case "android":
      window.plugins.PushbotsPlugin.initialize("5be967510540a37b5149a972", {
        android: { sender_id: "410097159682" }
      });
      break;
  }

  // Only with First time registration
  window.plugins.PushbotsPlugin.on("registered", function(token) {
    console.log("Registration Id:" + token);
  });

  //Get user registrationId/token and userId on PushBots, with evey launch of the app even launching with notification
  window.plugins.PushbotsPlugin.on("user:ids", function(data) {
    console.log("user:ids" + JSON.stringify(data));
  });
}

document.addEventListener("offline", onOffline, false);

function onOffline() {
  let reload = confirm(trans.system.offline);
  if (reload) {
    location.reload();
  } else {
    app.nav.ExitApp();
  }
}
