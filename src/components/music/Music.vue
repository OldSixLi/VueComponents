<template>
  <div class="container"> 
    <transition name="userRouter" mode="">
      <keep-alive>
        <!-- 修改为可缓存的组件 -->
          <router-view v-if="$route.meta.keepAlive">
              <!-- 这里是会被缓存的视图组件，比如 Home！ -->
          </router-view>
      </keep-alive>
    </transition>
    <transition name="userRouter" mode="">
      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
      </router-view>
    </transition>
   </div>
</template>
<script>
  export default {
    name: "Music",
  };
</script>
<style scoped>
  /* 进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除； */
  
  .userRouter-enter-active {
    transform: scale(1);
    opacity: 1;
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    -webkit-transform-origin: 50% 0 0;
    transform-origin: 50% 0 0;
    transition: all 0.8s ease;
  }
  /* 进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除； */
  
  .userRouter-enter {
    opacity: 0;
    -webkit-transform: rotateY(-90deg) translateZ(0);
    transform: rotateY(-90deg) translateZ(0);
    -webkit-transform-origin: 50% 0 0;
    transform-origin: 50% 0 0;
  }
  /* 离开过渡的结束状态，元素被删除时生效，离开过渡完成之后被删除； */
  
  .userRouter-leave-active {
    opacity: 0;
    -webkit-transform: rotateY(-90deg);
    transform: rotateY(-90deg);
    -webkit-transform-origin: 50% 0 0;
    transform-origin: 50% 0 0;
    transition: all 0.3s ease;
  }
  /* 离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除； */
  
  .userRouter-leave {
    opacity: 1;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
</style>