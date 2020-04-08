# ReusableDrag

[![NPM version](https://img.shields.io/npm/v/reusable-drag.svg)](https://www.npmjs.com/package/reusable-drag)

~~~js
import reusableDrag from 'resusable-drag'
const touch_sliding_screen = new reusableDrag({
    data() {
        return {
            // Define state
            wrapper: this.el.querySelector('.wrapper'),
            pagination: this.el.querySelector('.pagination'),
            slidingDistance: 300,
            delay: 2000,
            //.....
        }
    },
    mounted() {
        // Define init
        this.el.style.background = 'rgba(0,0,0,.5)'
        //....
    },
    methods: {
      // Define methods
      setWidth :function () {
        //....
      }
    },
    touch: {
        // Define touch event
        start: function (ev) {
        },
        move: function (ev) {
        },
        end: function (ev) {
        }
    },
    /* mouse: {
        // Define mouse event
        down (ev) {},move (ev) {},up (ev) {}
    }, */
})

// create drag
touch_sliding_screen.create({
    el:document.querySelector('.mi-carousel'),
    slidingDistance: 300,
    delay: 1000,
    // mouseclasp:{down(r){},move(r){},up(r){}}, // mouseclasp
    // touchclasp:{start(r){},move(r){},end(r){}}  // touchclasp
})
~~~

