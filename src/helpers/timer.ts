export default class Timer { // создаем класс таймера
    
    /* пишем функцию, в нее передаем: 
        кол-во секунд 
        дом-элемент с секундами
        функцию таймера
    */
    static initTimerSelector(secunds:number, selector:string, initTimer: Function){
        var el = document.querySelector(selector); // в переменную получаем селектор с секундами

        /* callback -  в нее передаем секунды и функцию sec */
        this.initTimer(secunds,function(sec:number){
            // проверяем есть ли такой элемент на странице
            if(el) {
                var m = Math.floor(sec / 60); // получаем минуты (округляем вниз до ближайшего целого числа)
                var s = sec % 60; // % получаем целый остаток от деления левого числа на правое

                /* ? сокращенная запись условия - проверяем 
                    если секунд меньше 10, то добавляем 0,
                    если больше, то не добавляем и все это закидываем в переменную */
                var str = (s < 10? '0'+ s : s) + ' сек';

                // если минут больше 0, добавляем кол-во минут + значение в переменной str
                if(m > 0)
                    str = m + ' мин ' + str;
                el.innerHTML = str; // в элемент с минутам передваем знаечение str
            }
        }, initTimer)
    }

    // фнкция таймера
    static initTimer(secunds:number, callbackSecund:Function, end: Function) {

        var timer = setInterval(function () {
            secunds--;               

            callbackSecund(secunds);
            
            if(secunds===0) {
                if(end) {
                    end();                    
                    clearInterval(timer);
                    return;
                }
            }
        }, 1000);
        return timer;
    }
    
}