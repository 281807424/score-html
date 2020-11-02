<template>
  <div>
    <el-form :inline="true">
      <el-form :inline="true">
        <el-form-item label="x起始">
          <el-input v-model="x_start"></el-input>
        </el-form-item>
        <el-form-item label="y起始">
          <el-input v-model="y_start"></el-input>
        </el-form-item>
      </el-form>
      <el-form-item label="x间隔">
        <el-input v-model="x_interval"></el-input>
      </el-form-item>
      <el-form-item label="y间隔">
        <el-input v-model="y_interval"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item label="每个毫秒">
        <el-input v-model="ms_per"></el-input>
      </el-form-item>
      <el-form-item label="等分">
        <el-input v-model="sep"></el-input>
      </el-form-item>
    </el-form>

    <el-tabs v-model="sourceType" >
      <el-tab-pane label="分离统一录入" name="1">

        <el-form>
          <el-form-item label="音">
            <el-input type="textarea" v-model="y"></el-input>
          </el-form-item>
          <el-form-item label="音高">
            <el-input type="textarea" v-model="yg"></el-input>
          </el-form-item>
          <el-form-item label="音长">
            <el-input type="textarea" v-model="yc"></el-input>
          </el-form-item>
        </el-form>


      </el-tab-pane>
      <el-tab-pane label="单音符录入" name="2">
        <el-form>
          <el-form-item label="音">
            <el-input type="textarea" v-model="source"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-button type="primary" @click="onSubmit">转换为脚本</el-button>

    <el-form>
      <el-form-item label="结果">
        <el-input type="textarea" :rows="10" v-model="result" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
  import {post} from "./axios";
export default {
  name: 'App',
  data(){
    return{
      x_interval:200,
      y_interval:70,
      x_start:200,
      y_start:800,
      ms_per:400,
      sep:4,

      sourceType: '1',

      y:"",
      yg:"",
      yc:"",
      source:"",


      result:"",
    }
  },
  components: {
  },
  created() {

  },
  methods: {
    onSubmit() {
      console.log(this._data)
      post("api/convert", this._data).then(res=>{
        this.result = res.data.data;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
