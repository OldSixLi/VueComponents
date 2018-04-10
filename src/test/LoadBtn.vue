<template>
  <div>
    <button class="btns btns--stripe">普通button</button>
    <a href="#" class="btns btns--stripe">Link 按钮</a>
    <button class="btns btns--stripe btns--radius">椭圆按钮</button>
    <button class="btns btns--stripe btns--large">圆角按钮</button>

    <div class="container-ripple">
      <a data-animation="ripple">Click Me</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loadbtns",
    props: {
      //对外获取的数据
    },
    data: function() {
      //组件内数据部分
      return {};
    },
    mounted: function() {
      //组件生成时调用

      const isMobile =
        window.navigator.userAgent.match(/Mobile/) &&
        window.navigator.userAgent.match(/Mobile/)[0] === "Mobile";
      const event = isMobile ? "touchstart" : "click";

      const button = document.querySelectorAll('*[data-animation="ripple"]'),
        container = document.querySelector(".container-ripple");

      for (var i = 0; i < button.length; i++) {
        const currentBtn = button[i];

        currentBtn.addEventListener(event, function(e) {
          e.preventDefault();
          const button = e.target,
            rect = button.getBoundingClientRect(),
            originalBtn = this,
            btnHeight = rect.height,
            btnWidth = rect.width;
          let posMouseX = 0,
            posMouseY = 0;

          if (isMobile) {
            posMouseX = e.changedTouches[0].pageX - rect.left;
            posMouseY = e.changedTouches[0].pageY - rect.top;
          } else {
            posMouseX = e.x - rect.left;
            posMouseY = e.y - rect.top;
          }

          const baseCSS = `position: absolute;
											width: ${btnWidth * 2}px;
											height: ${btnWidth * 2}px;
											transition: all linear 700ms;
											transition-timing-function:cubic-bezier(0.250, 0.460, 0.450, 0.940);
											border-radius: 50%;
											background: rgba(255, 255, 255, 0.8);
											top:${posMouseY - btnWidth}px;
											left:${posMouseX - btnWidth}px;
											pointer-events: none;
											transform:scale(0)`;

          var rippleEffect = document.createElement("span");
          rippleEffect.style.cssText = baseCSS;

          //prepare the dom
          currentBtn.style.overflow = "hidden";
          this.appendChild(rippleEffect);

          //start animation
          setTimeout(function() {
            rippleEffect.style.cssText =
              baseCSS + `transform:scale(1); opacity: 0;`;
          }, 5);

          setTimeout(function() {
            rippleEffect.remove();
            //window.location.href = currentBtn.href;
          }, 700);
        });
      }
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
  $color-span:rgba(255, 255, 255, 0.8);
  $color-grey: #666;
  $color-black: #000;
  $stripe-height: 7px;
  $btns-color: $color-grey;
  $btns-background: #fff;
  $btns-color-hover: #fff;
  $btns-background-hover: $color-grey;
  $border-color: $color-grey;
  $border-color-hover: $color-black;
  @mixin reset-button {
    overflow: visible;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    font: inherit;
    line-height: normal;
    cursor: pointer;
    -moz-user-select: text;
    &::-moz-focus-inner {
      padding: 0;
      border: 0;
    }
  }
  
  @keyframes stripe-slide {
    0% {
      background-position: 0% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
  
  // body {
  //   width: 100%;
  //   height: 100vh;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   flex-direction: column;
  //   font-family: sans-serif;
  // }  
  .btns {
    @include reset-button;
    display: block;
    outline: none;
    text-decoration: none;
    text-transform: uppercase;
    padding: 16px 36px 22px;
    background-color: $btns-background;
    color: $btns-color;
    border: 2px solid $border-color;
    border-radius: 6px;
    margin-bottom: 16px;
    transition: all 0.5s ease;
    &--stripe {
      overflow: hidden;
      position: relative;
      &:after {
        content: "";
        display: block;
        height: $stripe-height;
        width: 100%;
        background-image: repeating-linear-gradient( 45deg, $border-color, $border-color 1px, transparent 2px, transparent 5px);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-top: 1px solid $border-color;
        position: absolute;
        left: 0;
        bottom: 0;
        background-size: $stripe-height $stripe-height;
      }
      &:hover {
        background-color: $btns-background-hover;
        color: $btns-color-hover;
        border-color: $border-color-hover;
        &:after {
          background-image: repeating-linear-gradient( 45deg, $btns-color-hover, $btns-color-hover 1px, transparent 2px, transparent 5px);
          border-top: 1px solid $border-color-hover;
          animation: stripe-slide 12s infinite linear forwards;
        }
      }
    }
    &--large {
      width: 50%;
    }
    &--radius {
      border-radius: 36px;
    }
  }
  
   :root {
    /* if u want to change the color of
	 * the ripple change this value */
    --color-ripple: rgba(255, 255, 255, 0.8);
  }
  
  body {
    background: #36353c;
  }
  
  .container-ripple {
    border-radius: 5px;
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    height: 50px;
    width: 200px;
    margin: auto;
  }
  
  *[data-animation="ripple"] {
    border-radius: 5px;
    position: relative;
    /* Position relative is required */
    height: 100%;
    width: 100%;
    display: block;
    outline: none;
    padding: 20px;
    color: #fff;
    text-transform: uppercase;
    background: linear-gradient(135deg, #e570e7 0%, #79f1fc 100%);
    box-sizing: border-box;
    text-align: center;
    line-height: 14px;
    font-family: roboto, helvetica;
    font-weight: 200;
    letter-spacing: 1px;
    text-decoration: none;
    box-shadow: 0 5px 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    /* border-radius: 50px; */
    -webkit-tap-highlight-color: transparent;
  }
  
  *[data-animation="ripple"]:focus {
    outline: none;
  }
  
  *[data-animation="ripple"]::selection {
    background: transparent;
    pointer-events: none;
  }
</style>