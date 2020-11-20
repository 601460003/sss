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
        <Button type="primary" style="text-align: left" @click="showModel('add')">新增员工</Button>
        <Table border :columns="columns" :data="list"></Table>
    </div>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
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
			showModel(type, data) {
				if (type === 'add') {
					this.saveType = 'add'
					this.createUser = {}
				} else {
					this.saveType = 'upd'
					this.createUser = data
                    data.sex = data.sex+''
				}
				this.showInfo = true
			},
			save(data) {
				if (this.saveType === 'add') {
					data.id = 8
					axios.post('http://localhost:8080/person/add', data).then(res => {
						if (res.code == 100) {
							this.getList()
							this.$Message.success('添加成功')
							this.showInfo = false
						}
					})
				} else {
					axios.post('http://localhost:8080/person/upd', data).then(res => {
						if (res.data === 'ok') {
							this.getList()
							this.$Message.success('修改成功')
							this.showInfo = false
						}
					})
				}
			},
			getList() {
				axios.get('http://localhost:8080/person/list').then(res => {
					console.log(res);
					this.list = res.data
				}).catch(err => {
					console.log(err);
				})
			},
			deleteCard(data) {
				delete data._index
				delete data._rowKey
				delete data.nationality
				axios.post('http://localhost:8080/person/delete', {id: 11}).then(res => {
					if (res.data === 'ok') {
						this.getList()
						this.$Message.success('删除成功')
					}
				})
			}
		},
	}
</script>
