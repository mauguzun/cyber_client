const Order = {
  id: null,

  points: null,
  user: null,
  distance: null,
  polyline: null,
  driver_await: null,
  start: null,
  stop: null,
  duration: null,
  price: null,
  phone: null,

  status_id: null
};

const ManageOrder = {
  idnexname: "order",
  timer: null,

  CheckOrderStatus() {
    if (this.Finished()) {
      this.ClearTimer();
      this.ClearOrderData();
    } else {
      let request = Api.PostData("orderstatus", { id: Order.id });
      request.then(e => {
        if (e.action == true) {
          if (Order.status_id != e.message) {
            Order.status_id = e.message;
            this.Save();
            this.RedirectByStatus();
          }
        } else {
          console.log(e.message);
        }
      });
    }
  },

  RedirectByStatus() {
    if (Order.id == null) {
      Nav.Set("map");
      return;
    }

    switch (parseInt(Order.status_id)) {
      case 4:
        this.ClearTimer();
        this.ClearOrderData();
        Nav.Set("page|timeout"); // cam order new
        break;
      case 2:
        this.Timer();
        Nav.Set("page|driver_arrived");

        break;
      case 3:
        this.Timer();
        Nav.Set("page|trip");

        break;
      case 1:
        this.Timer();
        Nav.Set("page|already_have_order");

        break;
      case 6:
        Nav.Set("pay"); // cam order new
        this.ClearTimer();
        break;
      case 5:
        this.ClearTimer(); // cam order new
        Nav.Set("page|wrong_location");
        break;

      default:
        //0 , 7
        this.ClearTimer();
        this.ClearOrderData();
        Nav.Set("map");
        break;
    }
  },

  Finished() {
    if (Order.id != null && Order.status_id != 7) {
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

  OrderAssing(arg) {
    Order.id = arg.id;
    Order.status_id = arg.status_id;
    Order.start = arg.start;
    Order.stop = arg.stop;
    Order.points = arg.points;
    Order.price = arg.price;
    Order.distance = arg.distance;
    Order.duration = arg.duration;
    Order.phone = Account.phone;
    Order.polyline = arg.polyline;
  },

  Load() {
    let order = localStorage.getItem(this.IndexName);

    if (order !== null) {
      let foo = JSON.parse(order);
      console.log(foo.phone + "aaaaaaaaaaaaaaa" + Order.phone);
      if (Order.status_id != 7 && Order.phone == Account.phone) {
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

  LoadOrderByID(id) {
    Api.PostData("orderbyid", { id: id }).then(e => {
      if (e.action === true) {
        if (e.data.status_id != 7) {
          this.OrderAssing(e.data);
          this.Save();
          this.RedirectByStatus();
        } else {
          alert(e.message);
          this.ClearOrderData();
          Nav.Set("map");
        }
      }
    });
  },
  ClearTimer() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  CanShowMap() {
    if (Order.status_id != null) {
      if (Order.status_id > 3) {
        return true;
      }
      return false;
    }
    return true;
  },

  ClearOrderData() {
    for (key in Order) {
      if (Order.hasOwnProperty(key)) {
        Order[key] = null;
      }
    }

    localStorage.removeItem(this.indexname);
  }
};
