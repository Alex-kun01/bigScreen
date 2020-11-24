<template>
  <div>
    <div class="leftBox">
      <!-- 左边 -->
      <div class="box">
        <span>{{house}}栋</span>
        <div class="desc">
          <span>自住</span>
          <span>空置</span>
          <span>出租</span>
          <span>群租</span>
        </div>
      </div>
      <div class="buildings">
        <div :class="{'build': true, 'empty': item.房屋分类 === '空置', 'rate': item.房屋分类 === '出租', 'more': item.房屋分类 === '群租', 'active': home === item.ID}" v-for="item in leftData" :key="item.ID" @click="chaneHouse(item)">
          <span>{{item.房号}}</span>
        </div>
      </div>
    </div>
  <!-- 右边 -->
    <div class="rightBox">
      <div class="search">
        <span>楼层</span>
        <div class="parts">
          <el-select v-model="dong" placeholder="栋" size="mini" clearable>
            <el-option
              v-for="item in dongs"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <span>栋</span>
        </div>
        <div class="parts">
          <el-select v-model="unit" placeholder="单元" size="mini" clearable>
            <el-option
              v-for="item in units"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <span>单元</span>
        </div>
        <div class="parts">
          <el-select v-model="ceng" placeholder="层" size="mini" clearable>
            <el-option
              v-for="item in cengs"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <span>层</span>
        </div>
      </div>
      <div class="lists">
        <div class="list" v-for="item in lists" :key="item.key"
        @click="openPersonDetail(item)"
        >
          <img :src="item.pic" alt="">
          <div class="content">
            <div class="part1">
              <span>{{item.姓名}}</span>
              <span>{{item.性别}}</span>
              <span>{{item.年龄}}</span>
              <span>{{item.电话}}</span>
              <span>{{item.人员分类}}</span>
            </div>
            <div>{{item.身份证号}}</div>
            <div>{{item.门牌号}}</div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="isShowPersonDetailX">
        <ViewDetails @closeDetail="closeDetails" :personnelId="personnelId" />
    </template>>
  </div>
</template>
<script>
import bus from '../../api/bus.js'
import ViewDetails from '../components/ViewDetails'
export default {
  components:{
    ViewDetails
  },
  props: ['buildingId'],
  data() {
    return {
      isShowPersonDetailX: false,
      personnelId: '',
      house: 1, // 楼栋数
      leftData:[],
      building_id: null,
      home: 1,
      dong: 1,
      unit: 1,
      ceng: 1,
      dongs: [
        { value: 1, label: '11' },
        { value: 2, label: '22' },
        { value: 3, label: '33' },
        { value: 4, label: '44' },
      ],
      units: [
        { value: 1, label: '11' },
        { value: 2, label: '22' },
        { value: 3, label: '33' },
        { value: 4, label: '44' },
      ],
      cengs: [
        { value: 1, label: '11' },
        { value: 2, label: '22' },
        { value: 3, label: '33' },
        { value: 4, label: '44' },
      ],
      lists: [],
      total: 1,
    }
  },
  mounted() {
    this.building_id = this.buildingId;
    
    
    bus.$on("houseIdChange", (res) => {
      console.log('楼栋组件数据opopop',res)
      this.house =res
      this.getData(res)
    });
    
  },
  methods: {
    openPersonDetail(item){
      console.log('我又执行了', item)
      if(!item.personnel_id) return
      console.log('打开人员详情',item)
      this.personnelId = item.personnel_id // id
      this.isShowPersonDetailX = true
      
    },
    closeDetails(){
      this.isShowPersonDetailX = false
    },
    // 选中房屋id
    chaneHouse(item){
      this.home = item.ID
      this.getHouseDetail(item.ID)
    },
    getHouseDetail(id){
        this.$http.get(`${process.env.VUE_APP_1_URL}/person-list`,{params:{
          plot_id: 2,
          house_id: id,
          text: '',
          person_type: '',
          ridgepole:'',
          unit: '',
          floor: '',
          room_type: '',
          current:1,
          size: 30,
        }}).then(res =>{
          console.log('楼栋人员详情',res)
          if(res.status == 200){
            this.lists = res.data.records
          }
      })
    },
    getData(id){
      this.$http.get(`${process.env.VUE_APP_1_URL}/house-list`,{params:{
        plot_id: 2,
        room_type: '',
        house_address:'',
        ridgepole: id, //楼栋号
        current:1,
        size: 80,
      }}).then(res =>{
        console.log('楼栋详细数据',res)
        if(res.status == 200){
            this.leftData = res.data.records
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  .leftBox,
  .rightBox {
    width: 500px;
    height: 100%;
    background: rgba(3, 11, 34, 0.5);
    border-radius: 10px;
    position: absolute;    
    top: 20px;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    font-size: 14px;
    color: #ffffff;
  }
  .leftBox {
    padding: 20px;
    box-sizing: border-box;
    left: 20px;
    .box {
      height: 100px;
      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
      margin-bottom: 20px;
      > span {
        background-color: #539FFF;
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        width: 88px;
        height: 30px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .desc {
        position: absolute;
        right: 10px;
        display: grid;
        row-gap: 5px;
        > span {
          padding-left: 20px;
          position: relative;
          display: flex;
          align-items: center;
          &::before {
            position: absolute;
            content: '';
            width: 14px;
            height: 4px;
            background: #FFFFFF;
            left: 0;
          }
          &:nth-child(2) {
            &::before {
              background: #FFD9D9;              
            }
          }
          &:nth-child(3) {
            &::before {
              background: #D9FFFF;              
            }
          }
          &:nth-child(4) {
            &::before {
              background: #D4D1FC;              
            }
          }
        }
      }
    }
    .buildings {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: repeat(6, 1fr);
      row-gap: 1px;
      column-gap: 1px;
      .build {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        cursor: pointer;
        > span {
          color: #333333;
        }
        &.empty {
          background-color: #FFD9D9;
        }
        &.rate {
          background-color: #D9FFFF;
        }
        &.more {
          background-color: #D4D1FC;
        }
        &.active {
          background-color: #539FFF;
        }
      } 
    }
  }
  .rightBox {
    right: 20px;
    box-sizing: border-box;
    .search {
      display: grid;
      grid-auto-flow: column;
      column-gap: 20px;
      align-items: center;
      justify-content: flex-start;
      // padding-left: 20px;
      padding: 20px 20px 20px 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.22);
      .parts {
        display: grid;
        grid-auto-flow: column;
        column-gap: 5px;
        align-items: center;
        justify-content: center;
        > div {
          max-width: 60px;
        }
      }
    }
    .lists {
      padding: 20px;
      box-sizing: border-box;
      .list {
        display: grid;
        grid-auto-flow: column;
        column-gap: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.22);
        justify-content: flex-start;
        cursor: pointer;
        > img {
          width: 53px;
        }
        .content {
          min-height: 61px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .part1 {
            display: grid;
            grid-auto-flow: column;
            column-gap: 8px;
          }
        }
      }
    }
  }
</style>