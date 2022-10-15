<template>
    
</template>

<script lang="ts">
    import KeyboardSettings from "src/plugins/PosStore/Models/KeyboardSettings";
    import Vue from "vue";
    import { Component, Prop, Ref, Watch } from "vue-property-decorator";

    import InfoShortResponse from "../../../../api/motivation/dataSource/api/KKO/Motivation/POS/Interfaces/Models/InfoService/InfoShortResponse";

    @Component({name: 'profile-news-item'})
    export default class ProfileNewsItemComponent extends Vue {
        newsItem: Array<InfoShortResponse> = null;

        mounted() {
            this.$api.InfoService.GetInfosEvent.once((response) => {
            if (response.IsSuccess) {
               
            }
            this.newsItem = response.Value
            })
            this.$api.InfoService.GetInfos()
        }

    }
</script>

<style scoped>
</style>