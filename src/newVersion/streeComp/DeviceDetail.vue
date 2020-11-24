<template>
  <div>
    <el-dialog
      title="设备详情"
      :visible.sync="visible"
      width="70%"
      center
      modal
      @close="onclose"
    >
      <div class="container">
        <div class="search">
          <el-select v-model="devType" placeholder="设备类型" size="small">
            <el-option
              v-for="item in options"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
              </el-option>
          </el-select>
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model="seachValue">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
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
            prop="name"
            label="设备名称"
          >           
          </el-table-column>        
          <el-table-column
            prop="code"
            label="设备编码">
          </el-table-column>
          <el-table-column
            prop="type_name"
            label="设备类型"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="设备位置">
          </el-table-column>
          <el-table-column
            prop="floor_name"
            label="所在楼层"
            width="150px"
            >
          </el-table-column>
          <el-table-column
            prop="online"
            label="是否在线"
            width="100px"
            >
            <template slot-scope="scope">
              <span v-if="scope.row.online == 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="alarm"
            label="是否告警"
            width="100px"
            >
            <template slot-scope="scope">
              <span v-if="scope.row.alarm == 1">是</span>
              <span v-else>否</span>
            </template>
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
        seachValue: '', // 搜索内容
        devType: '',
        options: [
          { value: 999, label: '全部' },
          { value: 7, label: '自动报警' }, 
          { value: 8, label: '灭火救援' },
          { value: 11, label: '物联网设备' },
          { value: 10, label: '消防水源' },
        ]       
      }
    },
    mounted() {
      if(this.houseType){
        this.devType = this.houseType
      }
      this.plot_id = this.community;
      this.room_type = this.houseType;
      console.log(this.plot_id, this.room_type)
      this.getHouseList();
    },
    methods: {
      // 获取列表数据
      getHouseList() {
        const _this = this
        this.$http.post(`${process.env.VUE_APP_4_URL}/device/list`,{
          keyword: _this.seachValue,
          device_type_id: _this.devType == 999? 0: _this.devType,
          limit: _this.size,
          page: _this.current,
          order: []
        },{
          headers:{
            'shomes-user': 5
          }
        }).then(res =>{
          _this.tableData = res.data.data
          _this.total = res.data.page.total
        })
      },
      // 关闭按钮
      onclose(){          
        this.$emit('onclose');
      },
      showImg(row) {
        let target = {
          personnel_id: row.personnel_id
        }
        this.$emit('openHouse', target)
        console.log('Houserow',row)
      },
      handleCurrentChange() {
        this.getHouseList();
      },
      changeCommunity() {
        this.getHouseList();
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
