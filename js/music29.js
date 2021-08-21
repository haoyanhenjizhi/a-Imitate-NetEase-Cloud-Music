window.addEventListener('load', function () {
  let ubtniadd = document.querySelector('.kaiguan29');
  let audio = document.querySelector('.audio29');
  console.log(ubtniadd);
  // console.log(audio);

  ubtniadd.addEventListener('click', function () {

    console.log(audio.paused);
    if (audio.paused == true) {
      audio.play();
    } else {
      audio.pause();
    }
  });
});