<template>
  <div>
    <el-dialog
      :title="usual ? '车辆异常通行记录' : '车辆通行记录'"
      :visible.sync="visible"
      width="70%"
      center
      modal
      @close="closew"
    >
      <div class="container">
        <div class="search">
          <el-select v-model="plot_id" @change="changeCommunity" size="small" clearable placeholder="请选择小区">
            <el-option
              v-for="item in options"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <!-- <el-select v-model="car_type" placeholder="车辆类型" size="small">
            <el-option
              v-for="item in carTypes"          
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select> -->
          <el-date-picker
            size="small"
            style="max-width: 350px"
            v-model="date"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="通行"
            end-placeholder="时间">
          </el-date-picker>          
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
            prop="抓拍照"
            label="抓拍照"
            width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.照片.length < 10">暂无照片</span>
              <img v-else :src="scope.row.照片" class="imgs" />
            </template>
          </el-table-column>
          <el-table-column
            prop="车主"
            label="车主"
            width="80">
          </el-table-column>
          <!-- <el-table-column
            prop="车主类型"
            label="车主类型">
          </el-table-column>      -->
          <el-table-column
            prop="车牌号"
            label="车牌号">
          </el-table-column>
          <!-- <el-table-column
            prop="车辆类型"
            label="车辆类型">
          </el-table-column> -->
          <el-table-column
            prop="小区"
            label="通行小区"
          >
            <template slot-scope="s">
              <span>{{s.row.小区}}{{s.row.房号}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="时间"
            label="通行时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="carDetail = scope.row" type="text">查看</el-button>
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="closew">取 消</el-button>
          <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
        </span>
      </div>
    </el-dialog>
    <el-dialog
      title="抓取图片"
      :visible.sync="carDetail"     
      center
      modal
      @close="carDetail = false"
    >
      <img :src="carDetail['照片']" />        
    </el-dialog>
  </div>
</template>
<script>
  
  export default {
    props: ['community', 'usualFlag'],
    data() {
      return {
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
        // 车辆类型
        car_type: '',
        plot_id: '',
        no: '',        
        date: '',
        carDetail: false,
        usual: false,// 是否是异常通行
      }
    },
    mounted() {
      this.plot_id = this.community;
      this.usual = this.usualFlag;     
      this.getCarList();
    },
    methods: {
      getCarList() {
        const datas = {
          plot_id: this.plot_id,
          // no: this.no,
          // car_type: this.car_type,
          start_time: (this.date && this.date.length > 0) ? this.date[0] : '',
          end_time: (this.date && this.date.length > 0) ? this.date[1] : '',
          personnel_car_id: '',
          current: this.page,
          size: this.size,
        }
        const url = this.usual ? '/home-car-unusual-io-list' : '/home-car-in-list';
        this.$http.get(`${process.env.VUE_APP_1_URL}${url}`, {
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
      // 关闭按钮
      closew(){          
        this.$emit('closew');
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
