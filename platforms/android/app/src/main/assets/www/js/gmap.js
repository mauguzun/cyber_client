let _gmap = null;
class Gmap {

    /* Point  start , point stop ,inputData*/
    get PointStart() {

        if (this.points.start.location !== undefined) {
            return this.points.start;
        }
        return { address: "Paris", location: { lat: 48.864716, lng: 2.349014 } };
    }



    SetAddress(key, val) {

        this.points[key].address = val;
        $(selector.map.txt[key]).val(val)

    }

    constructor() {


        if (!_gmap) {
            _gmap = this;
            this.points = {};
            this.points.start = {};
            this.points.stop = {};
            this.marker = {};
            this.marker.start = {};
            this.marker.stop = {};
            this.drivers = [];

            this.distance = 0;
            this.duration = 0;
            this.polyline = 0;

            _gmap = this;
        }
        else {
            return _gmap;
        }
    }


    InitMap() {
        /*from constrcuctor*/
        this.map = new google.maps.Map(selector.map.div.map, {
            center: this.PointStart.location,
            zoom: 15,
            disableDefaultUI: true
        });
        this.InitMarker();
        this.SetupAutocomeplete(selector.map.txt.start, true);
        this.SetupAutocomeplete(selector.map.txt.stop, false);
        this.LocationByMarker('start');
        this.SetDriverOnMap();
    }

    SetDriverOnMap() {


        for (var i = 0; this.drivers[i]; i++) {
            this.drivers[i].setMap(null);
        }
        // clear old driver
        app.api.PostData("/driver", this.points.start.location).then(e => {
            if (e.action === true) {
                e.points.forEach(element => {
                    let driver = new google.maps.Marker({
                        map: this.map,
                        position: element,
                        icon: 'img/car.png'
                    });
                    this.drivers.push(driver);
                });
            }
        })
    }

    InitMarker() {
        this.marker.start = new google.maps.Marker({
            map: this.map,
            position: this.PointStart.location,
            draggable: true,
            icon: 'img/marker.png'
        });
        this.marker.stop = new google.maps.Marker({
            map: this.map, draggable: true, icon: 'img/marker.png'
        });
        let self = this;
        for (const key in this.marker) {
            google.maps.event.addListener(this.marker[key], "dragend", function (event) {
                let location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
                self.points[key].location = location;
                self.LocationByMarker(key);
            });
        }
        this.map.setCenter(this.PointStart.location);

    }
    
    SetupAutocomeplete(argInput, start = true) {

        argInput.addEventListener("click", (e) => {
            if (this.points[e.target.id].location) {
                this.map.setCenter(this.points[e.target.id].location)
            }
        });

        argInput.addEventListener("change", (e) => {
            if (e.target.innerHTML.trim() == "") {
                this.points[e.target.id].address = null;
                this.points[e.target.id].location = null;
                selector.map.div.order_div.hide();
            }

        });

        var autocomplete = new google.maps.places.Autocomplete(argInput);
        autocomplete.bindTo('bounds', this.map);
        autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

        var self = this;
        autocomplete.addListener('place_changed', function () {


            var place = autocomplete.getPlace();
            if (!place.geometry)
                return;

            if (place.geometry.viewport)
                self.map.fitBounds(place.geometry.viewport);
            else
                self.map.setCenter(place.geometry.location);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            let argument = start === true ? 'start' : 'stop';

            self.points[argument] = {
                address: `${address} ${place.name}`,
                location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
            };
            self.SetMarker(start === true);

        });
        // save 
    }

    LocationByMarker(key) {

        let self = this;
        this.geocoder = this.geocoder || new google.maps.Geocoder;
        this.geocoder.geocode({ 'location': self.points[key].location }, function (results, status) {
            if (status === 'OK' && results[0]) {
                self.SetAddress(key, results[0].formatted_address);
            }
        });

    }



    GetDirections() {


      
        var self = this;
        let directionsService = new google.maps.DirectionsService;

      

        directionsService.route({
            origin: `${this.points.start.location.lat},${this.points.start.location.lng}`,
            destination: `${this.points.stop.location.lat},${this.points.stop.location.lng}`,
            travelMode: 'DRIVING', //BICYCLING
            drivingOptions: {
                departureTime: new Date(/* now, or future date */),
                trafficModel: 'optimistic'
            },
        }, function (response, status) {

            if (status === 'OK') {
               
                self.distance = 0;
                self.duration = 0;
                self.polyline = response.routes[0].overview_polyline;



                const legs = response.routes[0].legs;
                for (var i = 0; i < legs.length; ++i) {
                    self.distance += legs[i].distance.value;
                    self.duration += legs[i].duration.value;
                }
                const sendData = {
                    distance: self.distance,
                    duration: self.duration,
                    start:self.points.start
                }


                app.api.PostData("price", sendData).
                    then(result => {
                        if (result.action === true) {

                            if (app.order.order == null){
                                app.order.order = app.order.EmptyOrder();
                            }
                            app.order.order.points =
                             self.points;
   
                            app.order.order.distance = self.distance;
                            app.order.order.polyline = self.polyline;
                            app.order.order.period = self.duration;
                            // from server
                            app.order.order.price = result.data.price;
                            app.order.order.driver_await = result.data.driver_await;
                            //app.order.Timer();

                            orderVue.order = app.order.order;


                            app.nav.SwithPage("order");
                        } else {
                            selector.map.link.order_btn.text(trans.gmap.texts.error);
                        }
                    })
            }
            else {
      
                selector.map.link.order_btn.text(trans.gmap.texts.error);
            }
        });

    }


    SetMarker(start = true) {
        if (start === true) {
            this.marker.start.setPosition(this.points.start.location);
            this.SetDriverOnMap();
        } else {
            this.marker.stop.setPosition(this.points.stop.location);
        }


        if (this.points.start.location !== undefined && this.points.stop.location !== undefined) {
            $(selector.map.div.order_div).show();
        }


    }
}
