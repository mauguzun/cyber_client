const Order ={
    id: null,

    points: null,
    user: null,
    distance: null,
    polyline: null,
    driver_await: null,
    start:null,
    stop:null,
    duration: null,
    price: null,
    phone: null,
    code : null,
    status_id: null 
}

const ManageOrder = {

      idnexname:'order',
      timer:null,
     
    
      CheckOrderStatus() {
        // if (!this.Finished()) {
        //   let send = { id: this.order.id };
        //   let request = app.api.PostData("orderstatus", send);
    
        //   request.then(e => {
        //     if (e.action == true) {
        //       if (this.order && this.order.status_id != e.message) {
        //         this.order.status_id = e.message;
        //         this.Save();
        //         this.RedirectByStatus();
        //       }
        //     } else {
        //       console.log(e.message);
        //     }
        //   });
        // }
      },
    
      RedirectByStatus() {
        if (Order.id == null) {
          Nav.Set("map");
          return;
        }
    
        switch (parseInt(Order.status_id)) {
          case 4:
            this.Clear();
            app.nav.SwithPage("page|timeout");
            break;
          case 2:
            app.nav.SwithPage("page|driver_arrived");
            break;
          case 3:
            app.nav.SwithPage("page|trip");
            break;
          case 1:
            app.nav.SwithPage("page|already_have_order");
            break;
          case 6:
            app.nav.SwithPage("pay");
            // this.Clear();
            break;
          case 5:
            this.Clear();
            app.nav.SwithPage("page|wrong_location");
            break;
    
          default:
            //0 , 7
            this.Clear();
            app.nav.SwithPage("map");
            break;
        }
      },
    
      Finished() {
        if (
          Order.id != null &&
          Order.status_id != "7"
        ) {
          return false;
        }
        return true;
      },
    
      Timer() {

        let self = this;
        this.timer = setInterval(function() {
          self.CheckOrderStatus();
        }, 1000 * 7);
      },
    
      // to create order !
      SendOnServer() {
     
        if (Order.distance === null) {
          return;
        }
    
        let send = Order.id === null ? Order : { id: Order.id };
    
        Api.PostData("order", send).then(result => {
          if (result.action === true) {
            if (Order.id === null) {
                Order.id = result.data.id;
            }
    
            Order.status_id = Order.status_id;
            this.Save();
          }
        });
      },
    
      Load() {
        let order = localStorage.getItem(this.IndexName);
    
        if (order !== null) {
          let foo = JSON.parse(order);
          console.log(foo.phone + "aaaaaaaaaaaaaaa" + Order.phone);
          if ( Order.status_id != 7 &&  Order.phone == Account.phone ) {
            Order = JSON.parse(order);
            this.Timer();
          }
        } else {
          // this.order = null;
          this.ClearOrderData();
        }
       
      },
      Save() {
        localStorage.setItem(this.indexname, JSON.stringify(Order));
      },

      LoadOrderByID(id)
      {
          Api.PostData("orderbyid",id).then(e=>{
              if(e.action === true){

              }else{

              }
          })
      },
      ClearTimer() {
        if (this.timer != null){
            clearInterval(this.timer);
        } 
      },

      ClearOrderData()
      {
         Order.id = null;
         Order.status_id = null;
         Order.sta = null;
         Order.id = null;
         Order.id = null;
         Order.id = null;
         Order.phone = null;
         Order.code = null;
         localStorage.removeItem(this.indexname);
      }
}