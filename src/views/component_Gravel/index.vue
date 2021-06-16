<template>
    <div class="">
        111
        <gravel-star platform="dp" :score="score" :show-score-text="true"></gravel-star>
        <gravel-star platform="mt" :score="score" :show-score-text="true"></gravel-star>

        22
        <portal-star size="16px" :score="1" :show-score="true" platform="dp"></portal-star>
        <portal-star size="16px" :score="2" :show-score="true" platform="dp"></portal-star>
        <portal-star size="16px" :score="3.5" :show-score="true" platform="dp"></portal-star>
        <portal-star size="16px" :score="4.5" :show-score="true" platform="dp"></portal-star>
        <portal-star size="16px" :score="4.8" :show-score="true" platform="dp"></portal-star>
       
        <portal-star size="16px" :score="1" :show-score="true" platform="mt"></portal-star>
        <portal-star size="16px" :score="2" :show-score="true" platform="mt"></portal-star>
        <portal-star size="16px" :score="3.5" :show-score="true" platform="mt"></portal-star>
        <portal-star size="16px" :score="4.5" :show-score="true" platform="mt"></portal-star>
        <portal-star size="16px" :score="4.8" :show-score="true" platform="mt"></portal-star>
    </div>
</template>

<script>
// import {GravelStar} from '@gfe/gravel';
import portalStar from '@cube/portal-star/src/index.vue';
export default {
    name: 'components_Gravel',
    components:{
        'portal-star': portalStar 
    },
    data() {
        return {
            score: 3.6,
            platform: 'mt'
        }
    }
}
</script>