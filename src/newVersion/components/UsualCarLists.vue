<template>
  <el-dialog
    :title="'未实车辆 -- ' + detail['车牌号']"
      :visible.sync="visible"     
      center
      modal
      @close="onClose"
    >
      <div class="container">
        <div class="left">
          <span>未实车辆</span>
          <div class="imgs">
            <img :src="detail['照片']" />
          </div>
          <div class="cols">
            <span>车牌：</span>
            <span>{{detail['车牌号']}}</span>
          </div>
          <div class="cols">
            <span>首次发现时间：</span>
            <span>{{detail['首次发现时间']}}</span>
          </div>
          <div class="cols">
            <span>15天出入小区：</span>
            <span>{{detail['出入次数15天'] + '次'}}</span>
          </div>
          <div class="cols">
            <span>30天出入小区：</span>
            <span>{{detail['出入次数30天'] + '次'}}</span>
          </div>
        </div>
        <div class="right">
          <div class="title">通行记录</div>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="500px"  
          >          
            <el-table-column
              prop="抓拍照"
              label="抓拍照"
              width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.照片.length < 10">暂无照片</span>
                <img style="width:80px;hieght:100px;" v-else :src="scope.row.照片" class="imgs" />
              </template>
            </el-table-column>
            <el-table-column
              prop="时间"
              label="通行日期"
              width="180">              
            </el-table-column>
            <el-table-column
              prop="通道"
              label="进/出"
              width="80">            
            </el-table-column>
            <el-table-column
              prop="小区"
              label="抓拍地"
            >            
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
        </div>  
      </div>      
    </el-dialog>
</template>

<script>
export default {
  props: ['propLists'],
  data() {
    return {
      visible: true,
      props: false,
      detail: {
        照片: '',
        车牌号: '',
        首次发现时间: '',
        出入次数15天: '',
        出入次数30天: '',
      },
      page: 1,
      size: 10,
      tableData: [],
      total: 0,
    }
  },
  mounted() {
    this.props = this.propLists;
    console.log('props', this.propLists);
    this.getUncheckView();
    this.getCarList();
  },
  methods: {
    getUncheckView() {
      const that = this;
      const datas = {
        id: this.props.msg.ID
      }
      this.$http.get(`${process.env.VUE_APP_1_URL}/home-car-uncheck-view`, {
        params: datas
      }).then((res) => {
        that.detail = res.data.length > 0 ? res.data[0] : {
          照片: '',
          车牌号: '',
          首次发现时间: '',
          出入次数15天: '',
          出入次数30天: '',
        };
      })
    },
    getCarList() {
      const that = this;
      const datas = {
        plot_id: '',         
        start_time: '',
        end_time: '',
        personnel_car_id: this.props.msg.ID,
        current: this.page,
        size: this.size,
      }
      this.$http.get(`${process.env.VUE_APP_1_URL}/home-car-in-list`, {
          params: datas
      }).then((res) => {
        console.log('查看未实车辆',res)
        that.tableData = res.data.records;
        that.total = res.data.total
      })
    },
    handleCurrentChange() {
      this.getCarList();
    },
    onClose() {
      this.$emit('onClose');
    },
  }
}
</script>

<style scoped lang='less'>
  .container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    font-size: 14px;
    color: #333333;
    column-gap: 10px;
    overflow: hidden;
    .left {
      display: flex;      
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      text-align: center;
      flex-direction: column;
      border-right: 1px solid #EAEAEA;
      > div {
        margin-top: 5px
      }     
      .imgs {
        margin: 10px 0;
        > img {
          max-width: 80%;;
        }
      }
      .cols {
        display: flex;
        width: 100%;
        padding-left: 45%;
        justify-content: flex-start;
      }
    }
    .right {
      padding: 0 20px;
      box-sizing: border-box;
      .title {
        background: url('../../assets/newver/icon.png') left center no-repeat;
        background-size: 11px 11px;
        padding-left: 26px;
        color: #38A2F7;
      }
    }
  }
</style>