import $ from 'jquery'
import './css/1.css'


$(function () {
    $('li:odd').css('backgroundColor', '#ccc')
    $('li:even').css('backgroundColor', 'red')
    class Person {
        constructor(name) {
            this.name = name;
        }
        sayHi() {
            console.log(`hello,${this.name}`);
        }
    }
    console.log(Person);
})
/**
|--------------------------------------------------
| vue
|--------------------------------------------------
*/
import Vue from 'vue';
import app from './components/app.vue'
const vm = new Vue({
    el: '#app',
    render: h => h(app)
})