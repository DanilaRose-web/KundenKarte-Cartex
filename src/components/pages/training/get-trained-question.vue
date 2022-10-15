<template>
    <layout> 
        <section class="section-bg">
            <div class="activation-form">
                <default-header v-if="question">
                    Вопрос №{{ question.ID }}
                </default-header>
                
                <template v-if="question">
                    <h2 class="section-main-title activation-title answer-title">{{ question.Text }}</h2>
                </template>
                

                <ol class="answers" v-if="question">
                    <li class="answer" v-for="(item, index) in question.QuestionOptions" @click="changeQuestion(item)" :key="item.ID"><span><strong>{{ `${index + 1}` }}.</strong> {{item.Text}} </span></li>
                </ol>

                <div class="counter-wrap">
                    <h3 class="section--light-title">На ответ осталось: </h3>                
                    <div id="minutes">{{stringMinutes}}</div><strong>:</strong>
                    <div id="seconds">{{stringSecunds}}</div> 
                </div>
                
                <footer-fixed id="footer-fixed" >
                    <ui-link @on-click-back="$router.push({name: 'enter-in-profile'})"> Пропустить обучение</ui-link>
                </footer-fixed>
            </div> 
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Prop } from "vue-property-decorator";
    import Timer from "../../../helpers/timer"

    import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel"
    import TrainingResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TrainingService/TrainingResponse"
    import Question from "../../../api/motivation/dataSource/api/KKO/Motivation/Entities/Entities/Question/Question"
    import QuestionOption from "../../../api/motivation/dataSource/api/KKO/Motivation/Entities/Entities/Question/QuestionOption";
    import Answer from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TrainingService/AnswerRequest"
    import GetStatusCashier from "../../../api/motivation/dataSource/api/KKO/Motivation/Entities/Enums/TrainingStatus"
    import AddTransactionRequest from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TransactionService/AddTransactionRequest"
    import AnswerRequest from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TrainingService/AnswerRequest"

    @Component({name: 'get-trained-question'})
    export default class GetTrainedQuestionComponent extends Vue {
       
        load: boolean = false
        questions: TrainingResponse = null;
        question: Question = null;
        questionResult:Boolean[]=[]
        id: Answer = null
        answerRequest: AnswerRequest[] = []
        // QuestionID: number = 0
        // SelectedOptionID: number = 0

        timerWaiting?: NodeJS.Timeout = null;
        
        
        // questionOpt: QuestionOption = null
     
        i = 0

        isValid = true
        timerInterval = 90
        constructor() {
            super();    
        }

        secunds: number = this.timerInterval; // указываем количество секунд в первом таймере

        //  создаем вычисляемое поле - секунды
        get stringSecunds():string {
            var s = this.secunds % 60;
            var str = (s < 10? '0' + s : s) + ' мин';  
            return str;
        }

        //  создаем вычисляемое поле - минуты
        get stringMinutes():string {    
            return String(Math.floor(this.secunds / 60));
        }

        created() { 
            console.log('home');   
        }

        mounted() {
            this.load = true
            console.log(this.id);

            this.$api.TrainingService.GetTrainingEvent.once((response) => { 
                if(response.IsSuccess) {
                    this.load = false
                }  else {
                    this.load = false
                }
                this.questions = response.Value
                if (this.questions.Questions.length > 0) {
                    this.load = false
                    this.question = this.questions.Questions[this.i]
                } else {
                    this.load = false
                }
            })
            this.$api.TrainingService.GetTraining()

            this.onStartTimerActivation()
        }


        changeQuestion(value:any) { 
            
            /* в value приходит
                1. ID - id ответа
                2. IsRight - правильный/неправильный ответ
                3. QuestionID - id вопроса
                4. Text - текст ответа
                */
            if (!value.IsRight) { 
                this.isValid = false;
            }
            this.i++;
            this.question = this.questions.Questions[this.i]

            let qId = value.QuestionID
            let soId = value.ID
            
            let answer: AnswerRequest = {QuestionID: value.QuestionID, SelectedOptionID: value.ID};
            this.answerRequest.push(answer)
            console.log(answer);
            
            
            console.log(this.answerRequest);
            
            
            this.stopTimerWaiting()
            this.onStartTimerActivation()
                
            if (this.i >= this.questions.Questions.length && this.isValid) {
                this.$router.push({ name: 'trained-complete'})
                // здесь начисляем бонусы   
                this.stopTimerWaiting()
                this.sendAnswers()
            } else if (this.i >= this.questions.Questions.length && !this.isValid) {
                this.$router.push({ name: 'trained-failed'})
                this.sendAnswers()
            }

            if (this.i >= this.questions.Questions.length) {
                this.sendAnswers()
                // this.$api.TrainingService.SetCashierTrainingStatusEvent.once((response) => {
                //     if (response.IsSuccess) {}
                // })
                // this.$api.TrainingService.SetCashierTrainingStatus(this.isValid ? GetStatusCashier.Passed : GetStatusCashier.NotPassed)
            }
            // this.questionResult.push(value.IsRight)
        }

        stopTimerWaiting(){
            if(this.timerWaiting)
                clearInterval(this.timerWaiting)
        }

        addBonuses() {
            this.load = true
            this.$api.TransactionService.AddTransactionEvent.once((response) => {
                if (response.IsSuccess) {
                    this.load = false
                } else {
                    this.load = false
                }
            })
            this.$api.TransactionService.AddTransaction({
                PosCode: this.$posStore.getPosCode(),
                SumInBonuses: null,
                TransactionTypeID: null 
            })
        }

        onStartTimerActivation(){
            this.secunds=this.timerInterval
            var self = this;
            this.timerWaiting = Timer.initTimer(this.secunds, function(sec: number){
                self.secunds = sec;            
            }, () =>{
                this.secunds=this.timerInterval
                this.i++;
                this.question = this.questions.Questions[this.i]
                this.onStartTimerActivation()
                if (this.i >= this.questions.Questions.length && !this.isValid || this.i >= this.questions.Questions.length) {
                    this.$router.push({ name: 'trained-failed'})
                    // this.isValid = value.IsRight    
                    this.stopTimerWaiting()
                    if (this.i >= this.questions.Questions.length) {
                        this.sendAnswers()
                        // this.$api.TrainingService.SetCashierTrainingStatusEvent.once((response) => {
                        //     if (response.IsSuccess) {}
                        // })
                        // this.$api.TrainingService.SetCashierTrainingStatus(this.isValid ? GetStatusCashier.Passed : GetStatusCashier.NotPassed)
                    }
                }

            })
        }

        sendAnswers() {
            this.load = true
            this.$api.TrainingService.CheckAnswersEvent.once((response) => {
                if (response.IsSuccess) {
                    this.load = false
                } else {
                    this.load = false
                }
            })
            
            this.$api.TrainingService.CheckAnswers(this.answerRequest)
        }
    }

    /* СОКРАЩЕННАЯ ЗАПИСЬ УСЛОВИЯ 

        let result = условие ? значение1 : значение2;
    
    */

</script>

<style lang="css" scoped>

</style>