# ReusableDrag
## 滑屏 / 拖拽构建工具库
[![NPM version](https://img.shields.io/npm/v/reusable-drag.svg)](https://www.npmjs.com/package/reusable-drag)

~~~js
import reusableDrag from 'resusable-drag'
const touch_sliding_screen = new reusableDrag({
    data() {
        return {
            // 定义数据
            wrapper: this.el.querySelector('.wrapper'),
            pagination: this.el.querySelector('.pagination'),
            slidingDistance: 300,
            delay: 2000,
            //.....
        }
    },
    mounted() {
        // 定义初始化执行
        this.el.style.background = 'rgba(0,0,0,.5)'
        //....
    },
    methods: {
      // 定义行为方法
      setWidth :function () {
        //....
      }
    },
    // resusable-drag 会检测当前设备类型, 当检测到是移动设备时, 自动切换为touch等事件
    touch: {
        // 定义滑屏事件行为
        start: function (ev) {
        },
        move: function (ev) {
        },
        end: function (ev) {
        }
    },
    // resusable-drag 会检测当前设备类型, 当检测到是PC设备时, 自动切换为mouse等事件
    /* mouse: {
        // 或定义PC端拖拽事件行为
        down (ev) {},move (ev) {},up (ev) {}
    }, */
})

// 创建一个拖拽
touch_sliding_screen.create({
    el:document.querySelector('.mi-carousel'),
    slidingDistance: 300,
    delay: 1000,
    // mouseclasp:{down(r){},move(r){},up(r){}}, // mouseclasp
    // touchclasp:{start(r){},move(r){},end(r){}}  // touchclasp
})
~~~

