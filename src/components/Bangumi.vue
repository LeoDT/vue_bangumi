<template>
    <a v-link="{ name: 'bangumi', params: { season: '1507' }}">2015-07</a>
    <a v-link="{ name: 'bangumi', params: { season: '1504' }}">2015-04</a>

    <div class="bangumi-list-wrapper">
        <div class="ui top attached tabular menu">
            <a v-for="tab in tabs"
               :class="['item', currentTab === $index ? 'active' : '']"
               @click="changeTab($index)">
                {{tab}}
            </a>
            <div class="right menu">
                <div class="item">
                    <div class="ui icon input">
                        <input v-model="search" type="text" placeholder="Search..." debounce="300">
                        <i class="search link icon"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui bottom attached segment">
            <ul class="ui cards link bangumi-list">
                <item
                    v-for="item in items"
                    :item="item"
                ></item>
            </ul>
        </div>
    </div>
</template>
<script>
 import DATA from '../data';
 import WeekDay from '../data/weekDay';
 import Item from './Item.vue';

 var tabs = [
     '全部'
 ].concat(WeekDay);

 export default {
     name: 'Bangumi',
     components: {
         Item
     },
     data(){
         return {
             tabs: tabs,
             currentTab: 0,
             search: '',
             notFilteredItems: []
         };
     },
     methods: {
         changeTab(i){
             if(this.search){
                 this.currentTab = 0;
             }
             else{
                 this.currentTab = i;
             }
         }
     },
     route: {
         data(){
             DATA.season(this.$route.params.season || '1510').then((d) => {
                 this.notFilteredItems = d;
             });
         }
     },
     computed: {
         items(){
             var regexp = new RegExp(this.search, 'i');

             return this.notFilteredItems.filter((v) => {
                 if(this.currentTab === 0){
                     return v.titleCN.search(regexp) !== -1;
                 }

                 return v.titleCN.search(regexp) !== -1 && v.weekDayCN + 1 === this.currentTab;
             });
         }
     }
 };
</script>
<style>
 .bangumi-list-wrapper{
     width: 933px;
     margin: 30px auto 0;
 }
 .bangumi-list{
     padding-left: 0;
 }
</style>
