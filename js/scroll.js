$(function() {
    var controller = new ScrollMagic.Controller();
    
    let tl2 = anime.timeline({autoplay: false});

    let s2a1 = {
      targets: '#title_container .scroll_title',
      //opacity: [0.3,1],
      scale: [2.2,1],
      duration: 200,
      delay: 0,
      easing: 'easeInOutSine'
    };

    tl2.add(s2a1)

    let scene2 = new ScrollMagic.Scene({
      triggerElement: "#title_scroll_trigger",
      duration: 400,
      triggerHook: 0,
    })

    // Add debug indicators
    // .addIndicators({
    //   colorTrigger: "black",
    //   colorStart: "blue",
    //   colorEnd: "red",
    //   indent: 10
    // })

    // Trigger animation timeline
    //Use scroll position to play animation
    .on("progress", function (event) {
      tl2.seek(tl2.duration * event.progress);
    })

    .setPin('#title_container')
    .addTo(controller);
    // var blockTween = new TweenMax.to(', 1.5, {
    //   backgroundColor: 'red'
    // });
    //
    // var containerScene = new ScrollMagic.Scene({
    //   triggerElement: '#container'
    // })
    // .setTween(blockTween)
    // //.addIndicators()
    // .addTo(controller);

});

