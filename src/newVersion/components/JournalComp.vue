<template>
<!-- 日志 -->
  <div>
    <el-dialog
      title="日志"
      :visible.sync="visible"
      width="70%"
      center
      modal
      @close="onclose"
    >
      <div class="container">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="500px"  
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="调阅人"
          >           
          </el-table-column>    
          <el-table-column
            prop="time"
            label="调阅日期"
          >           
          </el-table-column>        
          <el-table-column
            prop="content"
            label="调阅内容">
          </el-table-column>
          
        </el-table>
        <!-- <div class="pagina">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="current"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div> -->
      
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="onclose">取 消</el-button>
        </span> -->
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
        // const datas = {
        //   plot_id: this.plot_id,
        //   room_type: this.room_type === 0 ? '' : this.room_type,
        //   house_address: this.house_address,
        //   ridgepole: this.ridgepole,
        //   current: this.current,
        //   size: this.size,
        // }
        // this.$http.get(`${process.env.VUE_APP_1_URL}/house-list`, {
        //   params: datas
        // }).then((res) => {
        //   console.log('查看房屋列表',res)
        //   let newHouseData = res.data.records.map(item =>{
        //     let num = 0
        //     if(item.房屋分类 == '空置'){
        //       return {
        //         ID: item.ID,
        //         personnel_id: item.personnel_i,
        //         入住人数: 0,
        //         房号: item.房号,
        //         房屋分类: item.房屋分类,
        //         房间号: item.房间号,
        //         所属小区: item.所属小区,
        //         更新时间: item.更新时间,
        //       }
        //     }else{
        //       return {
        //         ...item
        //       }
        //     }
        //   })
        //   this.tableData = newHouseData;
        //   this.total = res.data.total; 
        // });
        this.$http.get(`${process.env.VUE_APP_1_URL}/person-view-log`).then(res =>{
          console.log('res', res)
          this.tableData = res.data
        })
      },
      // 关闭按钮
      onclose(){          
        this.$emit('closethis');
      },
      showImg(row) {
        // this.imgSrc = src
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
