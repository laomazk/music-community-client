<template>
    <div id="ChatCard">
        <header>
            <img class="avatar" v-bind:src="user.avator" v-bind:alt="user.name">
            <p class="name">{{user.username}}</p>
        </header>
        <footer>
<!--            <input s class="search" type="text" v-model="unameorphone" placeholder="输入用户名或手机号添加好友">-->
            <el-input suffix-icon="el-icon-search" class="search" type="primary" size="small" v-model="unameorphone" placeholder="用户名或手机号添加好友"
                @keydown.native.enter="showSearchFriendDialog"
            ></el-input>
        </footer>


        <el-dialog
                title="添加好友"
                :visible.sync="dialogVisible"
                width="500px" >
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="username"
                        label="用户名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phoneNum"
                        label="手机号码"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="addFriend(scope.row)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>


</template>

<script>
import {Message} from "element-ui";
export default {
  name: 'card',
  data() {
    return {
      tableData: [],
      user: JSON.parse(window.sessionStorage.getItem("user")),
      unameorphone:'',
      dialogVisible:false  // 好友查询框
    }
  },
  methods:{
    addFriend(data){
      this.postRequest('/friend/',data)
    },
    showSearchFriendDialog(){
      console.log(this.unameorphone)
      if(this.unameorphone==''){
        Message.error("你输入的信息为空")
      }else{
        this.getRequest('/friend/nameorphone/'+this.unameorphone).then(resp=>{
          this.tableData = resp
          this.dialogVisible = true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    #ChatCard {
        padding: 12px;

        .avatar {
            width: 40px;
            height: 40px;
            vertical-align: middle; /*这个是图片和文字居中对齐*/
        }

        .name {
            display: inline-block;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 16px;
        }

        .search {
            background: #26292E;
            width: 205px;
            height: 30px;
            line-height: 30px;
            padding: 0 2px;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            outline: none; /*鼠标点击后不会出现蓝色边框*/
            color: #FFF;
        }
    }
</style>
