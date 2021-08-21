window.addEventListener('load', function () {
  let ubtniadd = document.querySelector('.kaiguan1');
  let audio = document.querySelector('.audio1');
  let flagctrl = document.querySelector('.crl');
  let fhide = document.querySelector('.f-hide');
  // console.log(audio);
  flagctrl.addEventListener('click', function () {
    fhide.style.display = 'block ';
  });
  ubtniadd.addEventListener('click', function () {
    console.log(audio.paused);
    if (audio.paused == true) {
      audio.play();
    } else {
      audio.pause();
    }
  });
});