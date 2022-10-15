<template>
    <layout> 
        <section class="section-bg">
            <default-header>Пройдите обучение</default-header>

            <div class="scroll-wrapper">
                <div class="activation-section get-trained-section activation-no-height">
                    <div class="activation-titles">
                        <img src="assets/img/activation-error/warning.svg" alt="Код не активрован">
                        <h3 class="section--light-title get-trained-title"> <strong>Пройдите обучение по использованию POS.</strong> <br> Чтобы заработать свои первые баллы, вы должны посмотреть обучающее видео и ответить на вопросы анкеты.</h3>
                    </div>
                </div>
    
                <ui-button class="training-button training-button-mb modal-button" @on-click-do="openModal()">
                    <template slot="icon"><img src="assets/img/training2/video.svg" alt="video"></template> Посмотреть видео
                </ui-button>
            </div>
            
            <footer-fixed id="footer-fixed" >
                <ui-link @on-click-back="$router.push({name: 'enter-in-profile'})"> Пропустить обучение</ui-link>
            </footer-fixed>
        </section>

        <preloader v-if="load" />

        <div class="wrap-modal video-modal">
            <div class="modal-window video-modal-window">
                <section class="contact modal-contact video-modal-contact">
                    <div class="container-fluid modal-container">
                        <section class="training-video">
                            <div class="video" v-if="video">
                                <iframe width="100%" height="100%" :src="video.VideoUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </section> 
                    </div>
                    <button class="close-modal video-close-modal" @click="go()">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 0C8.07497 0 0 8.07497 0 18C0 27.925 8.07497 36 18 36C27.925 36 36 27.925 36 18C36 8.07497 27.925 0 18 0ZM25.2802 23.1591C25.5731 23.452 25.5731 23.9269 25.2802 24.2198L24.2198 25.2802C23.9269 25.573 23.4521 25.573 23.1591 25.2802L18 20.1211L12.8409 25.2802C12.5479 25.5731 12.0731 25.5731 11.7802 25.2802L10.7198 24.2198C10.4268 23.9269 10.4268 23.452 10.7198 23.1591L15.8789 17.9999L10.7198 12.8408C10.4268 12.548 10.4268 12.0731 10.7198 11.7802L11.7802 10.7197C12.0731 10.4269 12.5479 10.4269 12.8409 10.7197L18 15.8788L23.1591 10.7197C23.4521 10.4269 23.9269 10.4269 24.2198 10.7197L25.2802 11.7802C25.5732 12.073 25.5732 12.5479 25.2802 12.8408L20.1211 17.9999L25.2802 23.1591Z" /></svg>
                    </button>
                </section>
            </div>
            <div class="overlay-modal"></div>
        </div>
    </layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    import WsResponseModel from "../../../api/motivation/dataSource/api/SchemaBuilderServer/Models/WsResponseModel"
    import TrainingResponse from "../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/TrainingService/TrainingResponse";

    @Component({name: 'get-trained'})
    export default class GetTrainedComponent extends Vue {
    
        load: boolean = false
        video: TrainingResponse = null
        
        constructor() {
            super();    
        }
        created() { 
             
        }
        mounted() {
            this.load = true
            this.$api.TrainingService.GetTrainingEvent.once((response) => {
                if (response.IsSuccess) { 
                    this.load = false  
                    this.openModal()
                } else {
                    this.load = false
                }
                this.video = response.Value
            })
            this.$api.TrainingService.GetTraining()
        };

        next() {
            
        }

        openModal() {
            var overlayModal = document.querySelector('.overlay-modal');
            var modal = document.querySelector('.modal-window');
            var wrapModal = document.querySelector('.wrap-modal');
            var openModal = document.querySelectorAll('.modal-button');
            var closeModal = document.querySelector('.close-modal');

            for (let i = 0; i < openModal.length; i++) {
                openModal[i].addEventListener('click', open);
            }

            overlayModal.addEventListener('click', close);
            closeModal.addEventListener('click', close);

            function open() {
                modal.classList.add('show');
                overlayModal.classList.add('show');
                wrapModal.classList.add('show');
            }

            function close() {
                modal.classList.remove('show');
                overlayModal.classList.remove('show');
                wrapModal.classList.remove('show');
            }

            document.body.onkeydown = function (e) {
            if (e.keyCode == 27) {
                modal.classList.remove('show');
                overlayModal.classList.remove('show');
                wrapModal.classList.remove('show');
            }
        };

        }

    

    go() {
        this.$router.push({ name: 'get-trained-start' })
    }
}
</script>

<style lang="css" scoped>

.wrap-modal {
    padding: 40px 15px;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0);
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

.video-modal {
    padding: 0;
}

.wrap-modal.show {
    background-color: rgba(0, 0, 0, 0.8);
    visibility: visible;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
    overflow-y: auto;
}

.overlay-modal {
    width: 100%;
    height: 100%;
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

.overlay-modal.show {
    visibility: visible;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

.modal-window {
    margin: 0 auto;
    background-color: white;
    max-width: 1280px;
    width: 100%;
    position: relative;
    z-index: 3;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    visibility: hidden;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

.video-modal-window {
    max-width: 100%;
}

.modal-window.show {
    opacity: 1;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    visibility: visible;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
}

.modal-contact {
    margin: 0 auto;
    max-width: 1280px;
    position: relative;
}

.video-modal-contact {
    margin: 0 auto;
    max-width: 100%;
    position: relative;
    width: 100%;
}

.modal-container {
    padding: 0;
}

.close-modal {
    position: absolute;
    top: 14px;
    right: 10px;
    font-size: 22px;
    cursor: pointer;
    color: black;
    border: none;
    outline: none;
    background-color: transparent;
    -webkit-transition: -webkit-transform 0.2s;
    transition: -webkit-transform 0.2s;
    transition: transform 0.2s;
    transition: transform 0.2s, -webkit-transform 0.2s;
}

.close-modal svg {
    fill: white;
}

.close-modal:active {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
}

.video-close-modal {

    top: 45px;
    left: 15px;
    bottom: inherit;
    width: 30px;
}

@media all and (max-width: 560px) {
    .modal-container {
        padding: 0 15px;
    }
}

</style>