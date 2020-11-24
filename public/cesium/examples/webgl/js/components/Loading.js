Vue.component('Loading', {
	template: `
		<div id='loadingbar' class="spinner" v-if='isShowLoadingBar'>
		    <div class="spinner-container container1">
		        <div class="circle1"></div>
		        <div class="circle2"></div>
		        <div class="circle3"></div>
		        <div class="circle4"></div>
		    </div>
		    <div class="spinner-container container2">
		        <div class="circle1"></div>
		        <div class="circle2"></div>
		        <div class="circle3"></div>
		        <div class="circle4"></div>
		    </div>
		    <div class="spinner-container container3">
		        <div class="circle1"></div>
		        <div class="circle2"></div>
		        <div class="circle3"></div>
		        <div class="circle4"></div>
		    </div>
		</div>
  `,
  props: {
    isShow: {
      default: true
    }
  },
  data() {
    return {
      isShowLoadingBar: this.isShow,
    }
  },
  methods: {
    hide() {
      this.isShowLoadingBar = false
    },
    show() {
      this.isShowLoadingBar = true;
    }
  }
})