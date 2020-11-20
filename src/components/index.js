import Vue from 'vue'
import Button from '../components/button/button';

const Components = {
	Button
}

Object.keys(Components).forEach(name => {
	Vue.component(name, Components[name]);
});

export default Components