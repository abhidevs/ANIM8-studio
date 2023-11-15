function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

init();


// Animations and transitions for hero section
const timeline1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero-section h1",
        scroller: "#main",
        markers: true,
        start: "top 27%",
        end: "top 0",
        scrub: 3,
    }
})

timeline1.to("#hero-section h1:first-child", {
    x: -100,
    duration: 1,
}, "anim")

timeline1.to("#hero-section h1:last-child", {
    x: 100,
    duration: 1,
}, "anim")

timeline1.to("#hero-section video", {
    width: "90%",
    duration: 1, 
}, "anim")


// Animations and transitions for about-us section
const timeline2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero-section h1",
        scroller: "#main",
        markers: true,
        start: "top -120%",
        end: "top 130%",
        scrub: 3,
    }
})

timeline2.to("#main", {
    backgroundColor: "#fff"
})