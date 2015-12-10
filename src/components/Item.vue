<template>
    <li class="ui card bangumi-item">
        <div class="content">
            <div class="header">
                <span class="name">{{item.titleCN}}</span>
            </div>
            <div class="meta">
                <span class="showTimeCN">大陆: {{showTimeCN}}</span>
                <span class="showTimeJP">日本: {{showTimeJP}}</span>
            </div>
        </div>
        <div class="extra content">
            <a v-for="site in sites"
               class="on-air-site"
               href="{{site.url}}">{{site.name}}</a>
            <span v-if="sites.length === 0">暂无</span>
        </div>
        <div class="ui bottom attached buttons">
            <a class="ui button" target="_blank" href="http://bgm.tv/subject/{{item.bgmId}}">bgm.tv</a>
            <a class="ui button" target="_blank" href="{{item.officalSite}}">官网</a>
        </div>
    </li>
</template>
<script>
 import WeekDay from '../data/weekDay';
 import OnAirSite from '../data/onAirSite';

 export default {
     name: 'Item',
     props: {
         item: Object
     },
     computed: {
         showTimeJP(){
             return `${WeekDay[this.item.weekDayJP]} ${this.item.timeJP}`;
         },
         showTimeCN(){
             return `${WeekDay[this.item.weekDayCN]} ${this.item.timeCN || '(预计)'}`;
         },
         sites(){
             var sites = [],
                 siteNameRegexp = /^http:\/\/www\.(.*?)\..*?$/,
                 name;

             this.item.onAirSite.forEach((s) => {
                 name = s.match(siteNameRegexp);

                 if(name && name[1]){
                     sites.push({
                         url: s,
                         name: OnAirSite[name[1]]
                     });
                 }
             });

             return sites;
         }
     }
 };
</script>
<style>
 .on-air-site{
     margin: 0 10px 0 0;
 }
</style>
