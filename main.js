var city = "Kiev";
var api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=29ac53b7596655152413141a6911d9b0`;
var api_url_2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=3&appid=29ac53b7596655152413141a6911d9b0`;

new Vue({
  el: "#app",
  data() {
    return {
      searchField: "",
      cityWeatherInfo: {
        coord: {},
        main: {},
        wind: {},
        weather: [{}],
      },
      forecast: {
        list: [
          {
            coord: {},
            main: {},
            wind: {},
            weather: [{}],
          },
          {
            coord: {},
            main: {},
            wind: {},
            weather: [{}],
          },
          {
            coord: {},
            main: {},
            wind: {},
            weather: [{}],
          },
        ],
      },

      city: "Kiev",

      icon_path: "",
    };
  },
  methods: {
    search: function () {
      console.log("click: ", this.searchField);
      api_url = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchField}&appid=29ac53b7596655152413141a6911d9b0`;
      api_url_2 = `https://api.openweathermap.org/data/2.5/forecast?q=${this.searchField}&cnt=3&appid=29ac53b7596655152413141a6911d9b0`;
      console.log(api_url);
      let self = this;
      axios
        .get(api_url)
        .then(function (response) {
          if (response.status !== 200) {
            return new Error(response);
          }

          self.cityWeatherInfo = response.data || {};

          axios.get(api_url_2).then(function (response1) {
            if (response1.status !== 200) {
              return new Error(response1);
            }

            self.forecast = response1.data || {};
            console.log(self.cityWeatherInfo.coord);
            console.log(self.forecast.city.coord);
            var l1, l2;
            l1 = self.forecast.city.coord.lat;
            l2 = self.forecast.city.coord.lon;
            console.log(l1);
            console.log(l2);

            console.log(self.forecast.list[0].main.temp);
          });
          function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
              center: { lat: -34.397, lng: 150.644 },
              zoom: 8,
            });
          }
          self.icon_path = `<img src="https://openweathermap.org/img/wn/${self.cityWeatherInfo.weather[0].icon}@2x.png">`;
          var img = document.createElement("img");
          img.src = `https://openweathermap.org/img/wn/${self.cityWeatherInfo.weather[0].icon}@2x.png`;
          var src = document.getElementById("x");
          src.appendChild(img);
          // <p><img src="https://openweathermap.org/img/wn/"+self.cityWeatherInfo.weather[0].icon+"@2x.png"></p>
          //self.loc = self.cityWeatherInfo.coord
        })
        .catch(function (err) {
          console.log("[error]", err);
        });
    },

    // timeConverter: function(UNIX_timesmtap){
    //   var a = new Date(UNIX_timestamp * 1000);
    //   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    //   var month = months[a.getMonth()];
    //   var date = a.getDate();
    //   var time = date + ' ' + month + ' ' ;
    //   return time;
    // }
  },
  mounted() {
    let self = this;
    axios
      .get(api_url)
      .then(function (response) {
        if (response.status !== 200) {
          return new Error(response);
        }

        self.cityWeatherInfo = response.data || {};

        axios.get(api_url_2).then(function (response1) {
          if (response1.status !== 200) {
            return new Error(response1);
          }

          self.forecast = response1.data || {};

          console.log(self.forecast.list[1].main.temp);
          console.log(self.forecast.list[2].weather[0]);
        });

        // <p><img src="https://openweathermap.org/img/wn/"+self.cityWeatherInfo.weather[0].icon+"@2x.png"></p>
        //self.loc = self.cityWeatherInfo.coord
      })
      .catch(function (err) {
        console.log("[error]", err);
      });
  },
});
console.log(5);
