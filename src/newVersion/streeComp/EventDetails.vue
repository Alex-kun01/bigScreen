<template>
  <div>
    <el-dialog
      title="处置事件详情"
      :visible.sync="visible"
      width="70%"
      center
      modal
      @close="onclose"
    >
      <div class="container">
        <div class="search">
          <el-select v-model="devType" placeholder="所属社区" size="small">
            <el-option
              v-for="item in options"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
              </el-option>
          </el-select>
        
        <el-select v-model="eventTypeVal" placeholder="事件类型" size="small">
            <el-option
              v-for="item in eventTypes"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
              </el-option>
          </el-select>

          <el-select v-model="eventLevelVal" placeholder="事件等级" size="small">
            <el-option
              v-for="item in eventLevels"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
              </el-option>
          </el-select>

          <el-date-picker
            v-model="eventDate"
            size="small"
            type="date"
            placeholder="选择日期">
            </el-date-picker>

          <el-button type="primary" icon="el-icon-search" size="small" @click="changeCommunity">搜索</el-button>

        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="500px"  
        >
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="类型"
            label="事件类型"
          >           
          <template slot-scope="scope">
            {{eventTypes[scope.row['类型'] - 1].label}}
          </template>
          </el-table-column>        
          <el-table-column
            prop="名称"
            label="事件"> 
          </el-table-column>
          <el-table-column
            prop="等级"
            label="事件等级"
          >
          <template slot-scope="scope">
            {{eventLevels[scope.row['等级'] - 1].label}}
          </template>
          </el-table-column>
          <el-table-column
            prop="时间"
            label="事件时间">
          </el-table-column>
          <el-table-column
            prop="所属社区"
            label="所属社区"
            >
          </el-table-column>
          <el-table-column
            prop="处置情况"
            label="处置情况"
            >
          </el-table-column>
          <el-table-column
            prop="备注"
            label="备注"
            width="100px"
            >
          </el-table-column>
        </el-table>
        <div class="pagina">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="current"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-dialog>    
  </div>
</template>
<script>
  export default {
    props: ['houseType', 'community'],
    data() {
      return {
        plot_id: '',
        room_type: '',
        house_address: '',
        ridgepole: '',
        no: '',
        current: 1,
        size: 10,
        tableData: [],
        total: 0,
        visible: true,
        // 所属社区
        devType: '',
        options: [
          { value: "", label: '全部' },
          { value: 510129001001, label: '东街社区' }, 
          { value: 510129001002, label: '南街社区' },
          { value: 510129001003, label: '西街社区' },
          { value: 510129001004, label: '北街社区' },
          { value: 510129001007, label: '南苑社区' },
          { value: 510129001009, label: '官渡社区' },
          { value: 510129001013, label: '斜江社区' },
          { value: 510129001018, label: '建华社区' },
          { value: 510129001019, label: '桃源社区' },
          { value: 510129001020, label: '岳江社区' },
          { value: 510129001025, label: '莲兴社区' },
          { value: 510129001232, label: '坪域村' },
          { value: 510129001249, label: '华三村' },
          { value: 510129001250, label: '马王村' },
          { value: 510129001253, label: '金龙村' },
          { value: 510129001233, label: '梁坪村' },
          { value: 510129001200, label: '清江村' },
          { value: 510129001240, label: '凤凰村' },
          { value: 510129001255, label: '友谊村' },
          { value: 510129001256, label: '新乐村' },
          { value: 510129001236, label: '五童村' },
          { value: 510129101225, label: '黄土村' },
          { value: 510129101226, label: '义兴村' },
        ],
        // 事件类型
        eventTypeVal: '',
        eventTypes: [
            {value: 1, label: '未实人员发现'},
            {value: 2, label: '未实车辆发现'},
            {value: 3, label: '房屋空置'},
            {value: 4, label: '重点人群发现'},
            {value: 5, label: '消防报警'}
        ],
        // 事件等级
        eventLevelVal: '',
        eventLevels: [
            {value: 1, label: 'Ⅰ级'},
            {value: 2, label: 'Ⅱ级'},
            {value: 3, label: 'Ⅲ级'},
            {value: 4, label: 'Ⅳ级'},
        ], 
        // 事件时间
        eventDate: ''
      }
    },
    mounted() {
      if(this.houseType){
        this.devType = this.houseType
      }
      this.plot_id = this.community;
      this.room_type = this.houseType;
      console.log(this.plot_id, this.room_type)
      this.getDataList()
    },
    methods: {
      // 获取列表数据
      getDataList(){
        this.$http.get(`${process.env.VUE_APP_5_URL}/event-list`,{params:{
          社区ID: this.devType,
          类型: this.eventTypeVal,
          等级: this.eventLevelVal,
          日期: this.eventDate
        }}).then(res =>{
          this.total = res.data.total
          this.tableData = res.data.records
        })
      },
      // 关闭按钮
      onclose(){          
        this.$emit('closethis');
      },
      showImg(row) {
        let target = {
          personnel_id: row.personnel_id
        }
        this.$emit('openHouse', target)
        console.log('Houserow',row)
      },
      handleCurrentChange() {
        this.getDataList();
      },
      /**
       * 搜索
       */
      changeCommunity() {
        this.getDataList();
      },
    }
  }
</script>


<style scoped lang='less'>
  * {
    box-sizing: border-box;
  }
  .container {
    max-height: 65vh;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    overflow: hidden;
    row-gap: 10px;
  }
  .search {
    padding: 10px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
    justify-content: flex-start;
    > div {
      max-width: 150px;
    }
  }
  .pagina {
    display: flex;
    justify-content: flex-end;
  }
  .imgs {
    max-width: 60px;    
  }
</style>
