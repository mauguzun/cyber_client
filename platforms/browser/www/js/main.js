 new Vue({
    el: "#mainpage",
    data: {
      title: "Sdf",
      
    },
    methods: {
        load(arg){
              $('#page').load(`views/${arg}.html`);  
        }
    },  
   
  });