<template>
    <layout> 
        <section class="activation-error section-bg">
            <default-header>Пройдите обучение</default-header>

            <div class="scroll-wrapper">
                <div class="activation-section get-trained-section activation-no-height">
                    <div class="activation-titles">
                        <img src="/assets/img/training2/icon.svg" alt="Код не активрован">
                        <h3 class="section--light-title get-trained-title get-trained-title-two"> <strong>Вы посмотрели обущающий ролик!</strong> <br> теперь вам необходимо ответить на вопросы анкеты и получить баллы.</h3>
                    </div>
                </div>
    
                <ui-button class="training-button training-button-mb " @on-click-do="$router.push({name: 'get-trained-question'})">
                    <template slot="icon"><img src="assets/img/training2/answer.svg" alt="Ответы"></template> Ответить на вопросы
                </ui-button>
            </div>
            
            <footer-fixed id="footer-fixed" >
                <ui-link @on-click-back="$router.push({name: 'enter-in-profile'})"> Пропустить обучение</ui-link>
            </footer-fixed>
        </section>

        <preloader v-if="load" />
    </layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    import WsREsponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel"
    import TrainingResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TrainingService/TrainingResponse"
    // import Question from "../../../api/motivation/dataSource/api/KKO/Motivation/Entities/Entities/Question/Question"

    @Component({name: 'get-trained-start'})
    export default class GetTrainedStartComponent extends Vue {

        laod: boolean = false
    
        questions: TrainingResponse = null
        // currentQuestion: Question = null;
        i = 0

        constructor() {
            super();    
        }

        created() { 
            console.log('home');   
        }

        mounted() {
            
        }
    }
</script>