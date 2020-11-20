<template>
    <div class="bg_attend" style="overflow-x: hidden;">
        <el-dialog
                class="tongtongsuo"
                title="提示"
                :show-close="false"
                :modal-append-to-body='false'
                :close-on-click-modal="false"
                :visible.sync="showMsg"
                width="90%"
                @close="showMsg=false">
            <p class="news-content">确定要远程开锁吗?</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showMsg=false">否</el-button>
                <el-button type="primary"><span style="color: #fff">是</span></el-button>
              </span>
        </el-dialog>
        <div class="header_top" style="background: none;">
            <a class="iconfont icon-xiajiantou date_back"></a>
            <p class="dateHeader">锁管理</p>
        </div>
        <div class="suo-mgr">
            <el-form ref="userData" :model="userData" label-width="8rem">
                <el-row class="content">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">编号</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple" style="text-align: right">2000</div>
                    </el-col>
                </el-row>
                <el-row class="content">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">MACJID</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple" style="text-align: right">2123123</div>
                    </el-col>
                </el-row>
                <el-row class="content">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">电量</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple" style="text-align: right">100%</div>
                    </el-col>
                </el-row>
                <el-row class="content">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">名称</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple" style="text-align: right">XY-DEV</div>
                    </el-col>
                </el-row>
                <div style="position: absolute;bottom: 3rem;width: 100%">
                    <div class="footer">
                        <el-button type="primary" style="margin-right: 5rem"><span style="color: #fff">生成密码//</span>
                        </el-button>
                        <el-button @click="showMsg=true">远程开锁</el-button>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				showMsg: true,
				userData: {}
			}
		},
		methods: {}
	}
</script>
<style>
    .tongtongsuo .el-dialog__body {
        padding: 10px 20px;
    }
</style>
<style scoped>
    .content {
        margin: 0 20px;
        border-bottom: 1px solid #dcdfe6;
        padding-bottom: .6rem;
        padding-top: .6rem;
    }

    .grid-content {
        font-size: 1.3rem;
    }

    .suo-mgr {
        padding-top: 1rem;
        background: #fff;
        margin: 0 .6rem;
        height: 88vh;
        border-radius: .6rem
    }

    .footer {
        display: flex;
        justify-content: center;
    }
</style>
