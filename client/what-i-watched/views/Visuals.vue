<template>
    <div>
        <h2>I have watched {{list.length}}</h2>
        <mu-circular-progress :size="90" color="red" v-if="list.length == 0"/>
        <div class="filters">
            <mu-checkbox name="type" label="Movie" nativeValue="movie" class="demo-checkbox" v-model="filters" />
            <mu-checkbox name="type" label="Tv" nativeValue="tv" class="demo-checkbox" v-model="filters" />
            <mu-checkbox name="type" label="Not Start" nativeValue="not_start" class="demo-checkbox" v-model="filters" />
        </div>
        <transition-group v-if="list.length > 0" name="visual" class="" appear>
            <div class="visual" v-for="v in resultVisuals" :key="v.id">
                <Visual v-bind:v="v" v-bind:getVisuals="getVisuals"></Visual>
            </div>
        </transition-group>
    </div>
</template>
<script>
    import Visual from '../components/Visual.vue';
    export default {
        components: {
            Visual,
        },
        data() {
            return {
                limit: 20,
                page: 1,
                list: [],
                filters: [],
                loading: true,
                admin: window.localStorage.getItem('admin') || false
            };
        },
        computed: {
            resultVisuals() {
                if (this.filters.length != 0) {
                    return this.list.filter((v) => {
                        if (this.filters.indexOf('not_start') != -1) {
                            return v.current_episode == 0;
                        } else {
                            return this.filters.indexOf(v.visual_type) != -1;
                        }
                    });
                } else {
                    return this.list;   
                }
            }
        },
        mounted() {
            this.getVisuals();
        },
        methods: {
            gotoAdmin() {
                window.localStorage.setItem('admin', true);
                this.admin = true;
            },
            getVisuals() {
                const params = {
                    page: this.page,
                    limit: this.limit
                };
                this.$http.get(this.$store.state.api.visualList, {params: params}).then(res => {
                    this.list = res.body.results;
                    this.loading = false;
                });
            },
        }
    };
</script>
<style>
    /* moving */
    .visual-move {
        transition: all 600ms ease-in-out 50ms;
    }
    
    /* appearing */
    .visual-enter-active {
        transition: all 300ms ease-out;
        transform: translateX(20%);
    }
    
    /* disappearing */
    .visual-leave-active {
        transition: all 200ms ease-in;
    }
    
    /* appear at / disappear to */
    .visual-enter,
    .visual-leave-to {
        opacity: 0;
        transform: translateX(-20%);
    }
</style>