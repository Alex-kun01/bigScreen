<template>
  <div>
    <el-dialog
      title="房屋详情"
      :visible.sync="visible"
      width="70%"
      center
      modal
      @close="onclose"
    >
      <div class="container">
        <div class="search">
          <el-select v-model="plot_id" placeholder="请选择小区" size="small">
            <el-option
              v-for="item in options"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
              </el-option>
          </el-select>
          <el-select v-model="room_type" placeholder="房屋分类" size="small">
            <el-option
              v-for="item in houseOptions"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-input
            placeholder="请输入内容"
            size="small"
            v-model="no">
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
            prop="房间号"
            label="房间号"
          >           
          </el-table-column>        
          <el-table-column
            prop="所属小区"
            label="所属小区">
          </el-table-column>
          <el-table-column
            prop="房屋分类"
            label="房屋分类"
          >
          </el-table-column>
          <el-table-column
            prop="入住人数"
            label="入住人数">
          </el-table-column>
          <el-table-column
            prop="更新时间"
            label="更新时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="showImg(scope.row)" type="text">查看</el-button>
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
<!--       
        <span slot="footer" class="dialog-footer">
          <el-button @click="onclose">取 消</el-button>
        </span> -->
      </div>
    </el-dialog>    
    <!-- 密码确认 -->
        <template v-if="confrimShow">
            <ConfirmComp @isConfrim='isConfrim' @closethis='closethis' />
        </template>
  </div>
</template>
<script>
import ConfirmComp from '../components/ConfirmComp' //确认弹框
  export default {
    components:{
      ConfirmComp
    },
    props: ['houseType', 'community'],
    data() {
      return {
        confrimShow: false,
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
        options: [
          { value: 2, label: '香槟国际' },
          { value: 1, label: '锦屏佳苑' }
        ],
        houseOptions: [
          { value: 0, label: '房屋总数' },
          { value: 1, label: '自住' },
          { value: 2, label: '空置房' },
          { value: 3, label: '出租房' },
        ],        
        item: {}
      }
    },
    mounted() {
      this.plot_id = this.community;
      this.room_type = this.houseType;
      console.log(this.plot_id, this.room_type)
      this.getHouseList();
    },
    methods: {
      getHouseList() {
        const datas = {
          plot_id: this.plot_id,
          room_type: this.room_type === 0 ? '' : this.room_type,
          house_address: this.house_address,
          ridgepole: this.ridgepole,
          current: this.current,
          size: this.size,
        }
        this.$http.get(`${process.env.VUE_APP_1_URL}/house-list`, {
          params: datas
        }).then((res) => {
          console.log('查看房屋列表',res)
          let newHouseData = res.data.records.map(item =>{
            let num = 0
            if(item.房屋分类 == '空置'){
              return {
                ID: item.ID,
                personnel_id: item.personnel_i,
                入住人数: 0,
                房号: item.房号,
                房屋分类: item.房屋分类,
                房间号: item.房间号,
                所属小区: item.所属小区,
                更新时间: item.更新时间,
              }
            }else{
              return {
                ...item
              }
            }
          })
          this.tableData = newHouseData;
          this.total = res.data.total; 
        });
      },
      // 关闭按钮
      onclose(){          
        this.$emit('onclose');
      },
      closethis(){
        this.confrimShow =false
      },
      isConfrim(res){
        if(res){
          this.gotoDetail()
          this.closethis()
        }
      },
      showImg(row) {
        this.confrimShow = true
        this.item = row
      },
      gotoDetail(){
        let target = {
          personnel_id: this.item.personnel_id
        }
        this.$emit('openHouse', target)
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
    max-height: 70vh;
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
