<template>
<!-- 框-组件 -->
    <div class="itemBox">
         <slot></slot>
    </div>
</template>
<style lang="less" scoped>
.itemBox{
    width: 100%;
    height: 100%;
    border: 2px solid red;
}
</style>