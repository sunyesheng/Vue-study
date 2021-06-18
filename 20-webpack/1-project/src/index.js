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

