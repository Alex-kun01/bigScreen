<template>
  <div class="deviceBoxx">
    <div class="device_contetnt">
      <div class="device_title">设备详情</div>
      <img src="../../assets/images/close.png" class="close" @click="onclose" alt="">
      <div class="container">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="600px"  
        >
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="设备名称"
            label="设备名称"
          >           
          </el-table-column>        
          <el-table-column
            prop="设备值名称"
            label="设备值名称">
          </el-table-column>
          <el-table-column
            prop="设备值编码"
            label="设备值编码"
          >
          </el-table-column>
          <el-table-column
            prop="数值"
            label="数值">
          </el-table-column>
          <el-table-column
            prop="最大值"
            label="最大值">
          </el-table-column>
          <el-table-column
            prop="最小值"
            label="最小值">
          </el-table-column>
          <el-table-column
            prop="最小值"
            label="最小值">
          </el-table-column>
          <el-table-column
            prop="单位"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="精度"
            label="精度">
          </el-table-column>
          <el-table-column
            prop="是否警告"
            label="是否警告">
          </el-table-column>
          <el-table-column
            prop="上传时间"
            label="上传时间">
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
      </div>
    </div>
  </div>
</template>
<script>
  export default {
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
        visibles: true, 
      }
    },
    mounted() {
    },
    methods: {
      // 关闭按钮
      onclose(){          
        this.$emit('closethis');
        // this.visibles =false
      },
      handleCurrentChange() {
      },
      changeCommunity() {
      },
    }
  }
</script>


<style scoped lang='less'>
  * {
    box-sizing: border-box;
  }
  .deviceBoxx{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
  }
  .device_contetnt{
    width: 70%;
    height: 70%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background-color: #fff;
    // padding-top: 40px;
    .device_title{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .close{
      width: 25px;
      height: 25px;
      position: absolute;
      top: 10px;
      right: 10px;
    cursor: pointer;
    }
    .container{
      width: 100%;
      height: 100%;
    }
    .pagina{
      text-align: right;
      box-sizing: border-box;
      padding-right: 5%;

    }
  } 
</style>
