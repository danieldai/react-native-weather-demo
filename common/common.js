export default class Common{
  static icon(code) {
    var map = {
        '01d': '\uf00d', // clear sky
        '02d': '\uf002', // few clouds
        '03d': '\uf041', // scattered clouds
        '04d': '\uf013', // broken clouds
        '09d': '\uf019', // shower rain
        '10d': '\uf008', // rain
        '11d': '\uf016', // thunderstorm
        '13d': '\uf064', // snow
        '50d': '\uf014', // mist
        '01n': '\uf077',
        '02n': '\uf086',
        '03n': '\uf041',
        '04n': '\uf031',
        '09n': '\uf028',
        '10n': '\uf028',
        '11n': '\uf016',
        '13n': '\uf016',
        '50n': '\uf014'
    };
    return map[code] || '\uf03e';
  }

  static day(index) {
    var map = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
    return map[index];
  }

  static week(list) {
    var arr = []
    var obj = {};
    list.forEach(function (current) {
      var t = Common.today(current.dt * 1000);
      var id = t[2];

      if (!obj[id]) return obj[id] = {
        min: Common.f2c(current.main.temp_min),
        max: Common.f2c(current.main.temp_max),
        iconUp: Common.icon(current.weather[0].icon),
        iconDown: Common.icon(current.weather[0].icon),
        week: Common.day(t[3]),
        date: t[1] + '/' + t[2]
      };

      obj[id].min = Math.min(Common.f2c(current.main.temp_min), obj[id].min);
      obj[id].max = Math.max(Common.f2c(current.main.temp_max), obj[id].max);
      obj[id].iconDown = Common.icon(current.weather[0].icon);
    });

    Object.keys(obj).sort(function (a, b) {
      return a - b;
    }).forEach(function (id) {
      arr.push(obj[id]);
    });

    return arr;
  }

  static f2c(temp) {
    return parseInt(temp - 273.15);
  }

  static today(str) {
    var d = new Date(str);
    return [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getDay()]
  }
}
