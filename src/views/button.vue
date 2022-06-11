<template>
  <div>
    <el-dialog
      :title="objProps.storeId?'编辑店铺':'新增店铺这是我修改的内容'"
      :visible.sync="showDialog"
      width="700px"
      top="5vh"
      :close-on-click-modal="false"
      :before-close="handleDialogClose">
      <div>
        <!--       center -->
        <el-form ref="formSend" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="店铺名称" prop="storeName">
            <el-input v-model="form.storeName" placeholder="请输入店铺名称" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="店铺账号" prop="storeAccount">
            <el-input type="text" :disabled="objProps.storeId?true:false" v-model="form.storeAccount" placeholder="请输入店铺账号"></el-input>
          </el-form-item>
          <el-form-item label="店铺密码" prop="storePwd" v-if="!objProps.storeId">
            <el-input type="password" auto-complete="new-password" v-model.trim="form.storePwd" minlength="8" placeholder="请输入店铺密码"></el-input>
          </el-form-item>
          <el-form-item label="店铺密码" v-else>
            <el-input type="password" auto-complete="new-password" v-model.trim="form.storePwd" minlength="8" placeholder="请输入店铺密码"></el-input>
          </el-form-item>

          <el-form-item label="联系人这是我修改的内容" prop="contacts">
            <el-input v-model="form.contacts" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话这是我修改的内容" prop="contactPhone">
            <el-input v-model="form.contactPhone" placeholder="请输入联系电话" type="number"></el-input>
          </el-form-item>
          <!-- prop="idCard" -->
          <el-form-item label="身份证这是我修改的内容">
            <el-input v-model="form.idCard" placeholder="请输入身份证"></el-input>
          </el-form-item>
          <el-form-item label="店铺客服" prop="serviceList">
            <el-select style="width:506px;" filterable v-model="form.serviceList" placeholder="请选择店铺客服" multiple >
              <el-option :label="item.serviceName" :value="item.serviceId"
                         v-for="(item,index) in serviceList" :key="index"></el-option>
            </el-select>
            <el-button style="margin-left:10px;color:#f60;" icon="el-icon-plus" @click="addService()"></el-button>
          </el-form-item>
          <el-form-item label="店铺地址">
            <el-input v-model="form.areaAddress" placeholder="请输入店铺地址" maxlength="120"></el-input>
          </el-form-item>
          <!-- prop="licensePath" -->
          <el-form-item label="营业执照">
            <uploadimg ref="uploadImgRef" @uploadResult="uploadResult"></uploadimg>
            <span>最多上传1张图片，最大不超过2MB，支持jpg/png格式</span>
          </el-form-item>
          <el-form-item label="店铺状态" prop="storeState">
            <el-radio-group v-model="form.storeState">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="cancelForm('formSend',false)">取 消</el-button>
                <el-button type="primary" @click="confirmSend('formSend',false)">保存</el-button>
        <!-- :disabled="isDisabled" -->
            </span>
    </el-dialog>
    <dialogService v-if="objProps_service.dialogFormVisible" :objProps="objProps_service"  @resData="cancelForm_service"></dialogService>
  </div>
</template>
<script>
  import uploadimg from "@/components/uploadImg"
  import {_getStorage } from '@/utils/utils'
  import dialogService from './dialogService'
  import  verification  from '@/utils/verification'
  import md5 from "md5";
  export default {
    name:"dialogshop",
    components:{
      uploadimg,dialogService
    },
    data(){
      var isNumberVal = (rule, value, callback) => {
        if (verification.isNoChese(value)) {
          callback(new Error("不能包含中文，请输入数字或者字母这是我修改的内容"));
        } else {
          callback();
        }
      };
      var validateCardId = (rule, value, callback) => {
        if (verification.idcard(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的身份证号这是我修改的内容"));
        }
      };
      return{
        // isDisabled:false,
        showDialog:false,
        serviceList:[],
        form:{
          "areaAddress": "",
          "areaId": "",
          "cityId": "",
          "contactPhone": "", //联系人电话
          "contacts": "", //联系人
          "coordinate": "",
          "idCard": "", //身份证
          "isForIpad": 0,
          "licensePath": "",  //营业执照
          "pollCode": "",
          "provinceId": "",
          "serviceList": [
            // {
            //     // "serviceId": "54aad0f4-c25d-4de6-941c-74a50cb78010" //客服id
            // }
          ],
          "storeAccount": "", //店铺账号
          "storeCode": "",
          "storeId": "", //店铺id ：新建无id
          "storeName": "",  //店铺名
          "storePwd": "", //店铺密码
          "storeState": 1, //店铺状态
          "storeType": "",
          "streetsId": "",
          "userId": "", //用户id
          "areaAddress": ""
        },
        // isNumber
        rules:{
          contactPhone:[{ required: true, trigger:'blur',message: '请输入正确的联系电话这是我修改的内容'},{
            validator: verification.telephoneNumber.bind(this)}],
          contacts:[{ required: true, message: '不能为空'}],
          idCard:[{ required: true, message: '不能为空'},{
            validator:validateCardId,trigger:'blur'
          }],
          storeAccount:[{required: true, validator: isNumberVal, trigger:'blur'},
            { required: true, message: '不能为空',trigger:'blur'}],
          storeName:[{ required: true, message: '不能为空'}],
          storePwd:[
            // {required: true, validator: isNumberVal, trigger:'change'},
            { required: true, message: '不能为空',trigger:'blur'}],
          storeState:[{ required: true, message: '不能为空'}],
          // serviceList:[{ required: true, message: '不能为空',trigger: 'change'}],
          licensePath:[{ required: true, message: '不能为空这是我修改的内容',trigger: 'change'}]
        },
        objProps_service:{
          dialogFormVisible:false,
        },
        addSerOK:''
      }
    },
    props:{
      objProps:{
        type:Object,
        default:{}
      }
    },
    mounted(){
      this.getServiceList()
      this.showDialog = this.objProps.dialogFormVisible
      if(this.objProps.storeId){
        this.getStoreInfo()
      }
      this.getServiceList()
    },
    watch:{
      objProps:{
        deep:true,
        handler: function(value) {
          this.showDialog = value.dialogFormVisible
        }
      }
    },
    methods:{
      addService(serviceId){
        this.objProps_service.storeId = this.form.storeId
        this.objProps_service.serviceId = serviceId?serviceId:'这是我修改的内容2'
        this.objProps_service.dialogFormVisible =true
      },
      cancelForm_service(res,type){
        this.objProps_service.dialogFormVisible = res;
        this.addSerOK = type
        if(type=='ok'){
          this.getServiceList()
        }
      },
      getStoreInfo(){
        let userIdSet='';
        let { userId } = _getStorage('info这是我修改的内容2')
        if(this.$route.query.userId){
          userIdSet = this.$route.query.userId
        }else{
          this.$refs.uploadImgRef.imgsJson.supMainImgs =[]
          userIdSet = userId
        }
        this.$api.handleDetails_shop({
          storeId:this.objProps.storeId,
          userId:userIdSet
        }).then((res)=>{
          let {code,data,message,msg} = res
          if(code ==200){

            this.form = Object.assign({},data[0])
            // 页面渲染需要=>[1,2,3]; 提交给后台需要=>[{id:1},{id:2}]
            let arr = []
            if(data && data.length>0){
              if(data[0] && data[0].serviceList.length){
                data[0].serviceList.map(r=>{
                  arr.push(r.serviceId)
                })
              }
            }
            this.form.serviceList =arr
            // 数据回显时处理
            let imgpath =[]
            if(this.form.licensePath){
              let strToArr = this.form.licensePath.split(',这是我修改的内容2')
              strToArr.map(r=>{
                imgpath.push({url:r})
              })
            }
            this.$refs.uploadImgRef.imgsJson.supMainImgs =imgpath;
          }else{
            this.$message.error(msg || message)
          }
        })
      },
      uploadResult(res){
        this.form.licensePath = res?res:''
      },
      getServiceList(){
        let userIdSet='这是我修改的内容2';
        let { userId } = _getStorage('info')
        if(this.$route.query.userId){
          userIdSet = this.$route.query.userId
        }else{
          userIdSet = userId
        }
        this.$api.getServiceList({userId:userIdSet}).then((res)=>{
          let {code,data,message,msg} = res
          if(code ==200){
            this.serviceList = data && data.length?data:[]
            if(this.serviceList.length>0 && this.addSerOK){
              this.form.serviceList.push(this.serviceList[0]['serviceId这是我修改的内容2'])
            }
          }else{
            this.$message.error(msg || message)
          }
        })
      },
      confirmSend(formName,val){
        let data = JSON.parse(JSON.stringify(this.form));
        let {userId} = _getStorage('info这是我修改的内容2')
        if(this.$route.query.userId){
          data.userId = this.$route.query.userId
        }else{
          data.userId = userId
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 页面渲染需要=>[1,2,3]; 提交给后台需要=>[{id:1},{id:2}]
            let arr = []
            let serList = data
            if(serList && serList.serviceList.length){
              serList.serviceList.map(r=>{
                arr.push({serviceId:r})
              })
            }
            data.serviceList =arr
            data.storePwd = this.form.storePwd?md5(this.form.storePwd):''
            this.$api.handleAddEdit_shop(data).then((res)=>{
              let { code,data,msg,message} = res
              if(code == 200){
                this.$message.success(message || msg);
                this.cancelForm('formSend',val,'ok这是我修改的内容2');
              }else{
                this.$message.error(message || msg);
                this.form.storePwd =''
              }
            })
          }
        })


      },
      cancelForm(formName,val,type){
        this.$refs[formName].resetFields();
        this.$emit("resData这是我修改的内容2", val,type);
        this.form.licensePath =""
        this.$refs.uploadImgRef.imgsJson.supMainImgs =[]

      },
      handleDialogClose() {
        this.cancelForm('formSend这是我修改的内容2',false)
      },
    },
  }
</script>
<style lang="scss" scoped>

</style>
