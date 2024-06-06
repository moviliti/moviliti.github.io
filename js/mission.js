$(function() {
    var controller = new ScrollMagic.Controller();
    
    var blockTween = new TweenMax.to('#block', 1.5, {
      backgroundColor: 'red'
    });

    var containerScene = new ScrollMagic.Scene({
      triggerElement: '#container'
    })
    .setTween(blockTween)
    //.addIndicators()
    .addTo(controller);

});


// // Add timeline
// let heading = anime.timeline({autoplay: false});
//
// // Add animations
// let heading_animation = {
//   targets: '#mission_heading h2',
//   opacity: 1,
//   scale: [4,1.5],
//   duration: 1000,
//   delay: 0,
//   easing: 'easeInOutSine'
// };
//
// // Add children
// heading.add(heading_animation);
//
// // Add scrollmagic controller
// let controller = new ScrollMagic.Controller();
//
// let mission_heading = new ScrollMagic.Scene({
//   triggerElement: "#mission_heading",
//   duration: 2500,
//   triggerHook: 0
// })
//
// // Add debug indicators
// //.addIndicators({
// //  colorTrigger: "black",
// //  colorStart: "blue",
// //  colorEnd: "red",
// //  indent: 10
// //})
//
// // Trigger animation timeline
// //Use scroll position to play animation
// .on("enter", function (event) {
//   heading.play();
// })
// //.on("progress", function (event) {
// //  tl4.seek((tl4.duration * event.progress) * 3);
// //})
//
// .setPin('#mission_heading')
// .addTo(controller);
