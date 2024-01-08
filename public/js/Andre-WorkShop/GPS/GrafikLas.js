//untuk button
let abcdef = document.getElementById('abcdef');
let las1 = document.getElementById('las1');
let las2 = document.getElementById('las2');

abcdef.addEventListener('click', function(event) {
  event.preventDefault();
});
las1.addEventListener('click', function(event) {
  event.preventDefault();
});
las2.addEventListener('click', function(event) {
  event.preventDefault();
});
//untuk div
var kalenderlas1 = document.getElementById("kalenderlas1");
var kalenderlas2 = document.getElementById("kalenderlas2");

function Gantitap(jenis) {
  if (jenis == 'las1') {
    kalenderlas1.style.display = "block";
    kalenderlas2.style.display = "none";
    // drill11.classlist.add("active");

  } else if (jenis == 'las2') {
    kalenderlas1.style.display = "none";
    kalenderlas2.style.display = "block";
  }
}

function generateCalendar() {
  var monthInput = document.getElementById("month").value;
  var yearInput = document.getElementById("year").value;
  //las 1
  var tigasatuhari = document.getElementById("JenisBulan1");
  var tigapuluhhari = document.getElementById("JenisBulan2");
  var duasembilanhari = document.getElementById("JenisBulan3");
  var duadelapanhari = document.getElementById("JenisBulan4");
  //las 2
  var tigasatuharilas2 = document.getElementById("JenisBulan1las2");
  var tigapuluhharilas2 = document.getElementById("JenisBulan2las2");
  var duasembilanharilas2 = document.getElementById("JenisBulan3las2");
  var duadelapanharilas2 = document.getElementById("JenisBulan4las2");

  var daysInMonth = new Date(yearInput, monthInput, 0).getDate();
console.log(daysInMonth);
  if (daysInMonth == 31) {
    tigasatuhari.style.display = "block";
    tigapuluhhari.style.display = "none";
    duadelapanhari.style.display = "none";
    duasembilanhari.style.display = "none";

    tigasatuharilas2.style.display = "block";
    tigapuluhharilas2.style.display = "none";
    duadelapanharilas2.style.display = "none";
    duasembilanharilas2.style.display = "none";


console.log(tigasatuharilas2);
  } else if (daysInMonth == 30) {
    tigasatuhari.style.display = "none";
    tigapuluhhari.style.display = "block";
    duadelapanhari.style.display = "none";
    duasembilanhari.style.display = "none";

    tigasatuharilas2.style.display = "none";
    tigapuluhharilas2.style.display = "block";
    duadelapanharilas2.style.display = "none";
    duasembilanharilas2.style.display = "none";
  } else if (daysInMonth == 29) {
    tigasatuhari.style.display = "none";
    tigapuluhhari.style.display = "none";
    duadelapanhari.style.display = "none";
    duasembilanhari.style.display = "block";

    tigasatuharilas2.style.display = "none";
    tigapuluhharilas2.style.display = "none";
    duadelapanharilas2.style.display = "none";
    duasembilanharilas2.style.display = "block";
  } else if (daysInMonth == 28) {
    tigasatuhari.style.display = "none";
    tigapuluhhari.style.display = "none";
    duadelapanhari.style.display = "block";
    duasembilanhari.style.display = "none";

    tigasatuharilas2.style.display = "none";
    tigapuluhharilas2.style.display = "none";
    duadelapanharilas2.style.display = "block";
    duasembilanharilas2.style.display = "none";

  }
}
