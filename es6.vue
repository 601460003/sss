<script>
	// 箭头函数写法 单行不需要return
	let result1 = values.map((a, b) => +item);
	let result2 = values.sort((a, b) => a - b);
	//函数参数解构
	add({firstName, lastName})
	{
		console.log(firstName);
		console.log(lastName);
	}
	clear()
	{
		let obj = {firstName: 'sd', lastName: '33'}
		this.add(obj)
	}
	//封装Class类的使用
    //如果模块只有一个输出值，就使用export default。一般用于组件
	//如果模块有多个输出值，就使用export ；用于类的封装
    //export default与普通的export不要同时使用。
	export class Queue {
		constructor(contents = []) {
			this._queue = [...contents];
		}
		pop() {
			this._queue.splice(0, 1);
			const value = this._queue[0];
			return value;
		}
	}
	import {Queue} from './sss'

	let qq = new Queue([1, 2, 3])
	console.log(qq.pop());
</script>
