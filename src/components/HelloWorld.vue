<template>
  <div class="hello">
    <h2>News List</h2>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="newsid"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="newstitle"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="newsimg"
        label="地址">
      </el-table-column>
    </el-table>

    <el-table
      :data="tableData2"
      style="width: 100%">
      <el-table-column
        prop="bg_pic"
        label="图片"
        width="180"
        > 
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.bg_pic" alt="pic">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="comment"
        label="留言"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="地址">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.content" :key="index">
            <h3>{{item.album_title}}</h3>
            <h4>{{item.author}}</h4>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tableData: [],
      tableData2: []
    }
  },
  mounted() {
    console.log('mounted')
    this.$store.dispatch('GetList').then(res=>{
      this.tableData = res.data
    }).catch(err=>{
      console.log(err)
    })
    this.$store.dispatch('GetGameList').then(res=>{
      console.log(res)
      this.tableData2 = res.data.result
      console.log(this.tableData2)
    }).catch(err=>{
      console.log(err)
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
