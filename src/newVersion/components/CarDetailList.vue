<template>
  <div>
    <el-dialog
      title="车辆详情"
      :visible.sync="visible"
      width="70%"
      center
      modal
      @close="closew"
    >
      <div class="container">
        <div class="search">
          <el-select v-model="plot_id" placeholder="请选择小区" size="small" clearable v-if="plot_id !== ''">
            <el-option
              v-for="item in options"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-select v-model="car_type" placeholder="车辆类型" clearable size="small">
            <el-option
              v-for="item in carTypes"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-input
            placeholder="请输入内容"
            clearable
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
            prop="照片"
            label="车辆照片"
            width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.照片.length < 10">暂无照片</span>
              <img v-else :src="scope.row.照片" class="imgs" />
            </template>
          </el-table-column>        
          <el-table-column
            prop="车牌号"
            label="车牌号">
          </el-table-column>
          <el-table-column
            prop="所属小区"
            label="所属小区"
          >
          </el-table-column>
          <el-table-column
            prop="车辆类型"
            label="车辆类型">
          </el-table-column>
          <el-table-column
            prop="车主"
            label="车主"
            width="80">
          </el-table-column>
          <el-table-column
            prop="门牌号"
            label="门牌号">
          </el-table-column>
          <el-table-column
            prop="登记时间"
            label="登记时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button @click="showDetail(scope.row)" type="text">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagina">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="closew">取 消</el-button>
        </span> -->
      </div>
    </el-dialog>
    <!-- 车辆是未实车辆时跳转 -->
    <template v-if="detailLists && detailLists.flag === true">
      <UsualCarLists :propLists="detailLists" @onClose="detailLists = false" />
    </template>
    <!-- 密码确认 -->
        <template v-if="confrimShow">
            <ConfirmComp @isConfrim='isConfrim' @closethis='closethis' />
        </template>
  </div>
</template>
<script>
  import UsualCarLists from '../components/UsualCarLists';
import ConfirmComp from '../components/ConfirmComp' //确认弹框
  export default {
    components: {
      UsualCarLists,
      ConfirmComp
    },
    props: ['community', 'carType'],
    data() {
      return {
        confrimShow: false,
        visible: true,
        page: 1,
        size: 10,
        total: 0,
        tableData: [],
        options:[
          { value: '2', label: '香槟国际' },
          { value: '1', label: '锦屏佳苑' }
        ],
        carTypes: [
          { value: 0, label: '车辆数' },
          { value: 1, label: '实有车辆' },
          { value: 2, label: '未实车辆' },
          { value: 3, label: '疆藏车辆' },
        ],
        plot_id: '',
        // 车辆类型
        car_type: '',
        no: '',
        detailLists: false,
        // 临时存放item
        item:{}
      }
    },
    mounted() {
      this.plot_id = this.community;
      this.car_type = this.carType;
      this.getCarList();
    },
    methods: {
      getCarList() {
        const datas = {
          plot_id: this.plot_id,
          type: this.car_type === 0 ? '' : this.car_type,
          user_name: '',
          no: this.no,
          current: this.page,
          size: this.size,
        }
        this.$http.get(`${process.env.VUE_APP_1_URL}/car-list`, {
          params: datas
        }).then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total; 
        });
      },
      handleCurrentChange() {
        this.getCarList();
      },
      changeCommunity() {
        this.getCarList();
      },      
      closew(){          
        this.$emit('onclose');
      },
      closethis(){
         this.confrimShow = false
      },
      // 是否确认成功
      isConfrim(res){
        if(res){
          this.gotoDetail()
          this.closethis()
        }
      },
      // 开启确认框
      showDetail(row) {
        console.log('row',row)
        this.confrimShow = true
        this.item = row
      },
      gotoDetail(){
          const flag = this.item.车主 === '' || this.item.车主 === '未知' || this.item.车主 == undefined; // 如果flag为true 是未实车辆 false - 正常车辆
          const target = {
            personnel_id: this.item.personnel_id,
            flag:flag
          }
          this.$emit('openViewDetail', target)
          this.detailLists = {
            flag: flag,
            msg: this.item
          }
      }
    }
  }
</script>

<style scoped lang='less'>
  * {
    box-sizing: border-box;
  }
  .container {
    max-height: 70vh;
    // overflow: auto;
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
