<style>
    li span {
        font-size: 1.2rem;
    }
</style>
<template>
    <div style="width:1000px;margin: 100px auto">
        <Modal
                width="350"
                v-model="showInfo"
                title="新增员工">
            <Form :model="createUser" autocomplete="off" ref="createUser" :label-width="80">
                <FormItem label="姓名：">
                    <Input v-model="createUser.name" style="width: 180px;"/>
                </FormItem>
                <FormItem label="年龄：">
                    <Input v-model="createUser.age" style="width: 180px;"/>
                </FormItem>
                <FormItem label="性别：">
                    <Select transfer style="width: 180px;" v-model="createUser.sex">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" :loading="loading" @click="save(createUser)">保存</Button>
                <Button type="default" size="large" @click="showInfo = false">返回</Button>
            </div>
        </Modal>
        <Button type="primary" style="text-align: right" @click="showModel('add')">新增员工</Button>
        <Input v-model="search" placeholder="请输入名字查询 " style="width: 200px"/>
        <Button style="text-align: left" @click="searchList">查询</Button>
        <Table border :columns="columns" :data="list"></Table>
        <input type="text" v-model="name">
        <BT ref="bt" @changeBT="changeBT" :name.sync="name" ></BT>
    </div>
</template>

<script>
    import BT from './button'
	import axios from 'axios'

	export default {
    	components:{
    		BT
        },
		data() {
			return {
				name:'22',
				search: '',
				loading: false,
				showInfo: false,
				createUser: {},
				columns: [
					{
						align: 'center',
						title: '名字',
						key: 'name'
					},
					{
						align: 'center',
						title: '年龄',
						key: 'age'
					},
					{
						title: '性别',
						key: 'sex',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('span', params.row.sex == 1 ? '男' : '女')
							])
						}
					},
					{
						title: '操作',
						align: 'center',
						key: 'action',
						width: 300,
						render: (h, param) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'default',
										size: 'small'
									},
									style: {
										margin: '5px'
									},
									on: {
										'click': () => {
											this.showModel('edit', Object.assign({}, param.row))
										}
									}
								}, '编辑'),
								h('Poptip', {
									props: {
										confirm: true,
										transfer: true,
										trigger: 'click',
										title: '确定要删除吗？',
										placement: 'top-end'
									},
									on: {
										'on-ok': () => {
											this.deleteCard(Object.assign({}, param.row))
										},
										'on-cancel': () => {
										}
									}
								}, [
									h('Button', {
										props: {
											size: 'small',
											type: 'error'
										},
										style: {
											margin: '5px'
										},
									}, '删除')
								])
							])
						}
					}
				],
				list: []
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			changeBT(a){
				console.log(a);
				console.log(this.$refs.bt);
				this.$refs.bt.name = 222
			},
			searchList() {
				axios.post('getListByParams', {name: this.search}).then(res => {
					if (res.data.code == 100) {
						//today
						this.list = res.data.data
					}
				})
			},
			showModel(type, data) {
				if (type === 'add') {
					this.saveType = 'add'
					this.createUser = {}
				} else {
					this.saveType = 'upd'
					this.createUser = data
					data.sex = data.sex + ''
				}
				this.showInfo = true
			},
			save(data) {
				if (this.saveType === 'add') {
					axios.post('person/add', data).then(res => {
						if (res.data.code == 100) {
							this.getList()
							this.$Message.success('添加成功')
							this.showInfo = false
						}else {
							this.$Message.success(res.data.msg)
                        }
					})
				} else {
					delete data._index
					delete data._rowKey
					delete data.nationality
					axios.post('person/upd', data).then(res => {
						console.log(res);
						if (res.data.code == 100) {
							this.getList()
							this.$Message.success('修改成功')
							this.showInfo = false
						}
					}).catch(err => {
						console.log(err);
					})
				}
			},
			getList() {
				axios.get('person/list').then(res => {
					if (res.data.code == 100) {
						this.list = res.data.data
					}
				}).catch(err => {
					console.log(err);
				})
			},
			deleteCard(data) {
				axios.post('person/delete', {id: data.id}).then(res => {
					console.log(res);
					if (res.data.code == 100) {
						this.getList()
						this.$Message.success('删除成功')
					}
				})
			}
		},
		watch: {
			search(val) {
				if (!val) {
					this.searchList()
				}
			}
		}
	}
</script>
