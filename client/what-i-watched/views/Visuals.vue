<template>
    <div>
        <h2>I have watched {{total}}</h2>
        <mu-circular-progress :size="90" color="red" v-if="list.length == 0"/>
        <div class="filters">
            <mu-checkbox name="type" label="Movie" nativeValue="movie" class="demo-checkbox" v-model="filters" />
            <mu-checkbox name="type" label="Tv" nativeValue="tv" class="demo-checkbox" v-model="filters" />
            <mu-checkbox name="type" label="Not Start" nativeValue="not_start" class="demo-checkbox" v-model="filters" />
        </div>
        <table class="table">
            <tr class="table__head">
                <th>Poster</th>
                <th>Title</th>
                <th>Country</th>
                <th>Type</th>
                <th>Ratings</th>
                <th>Progress</th>
                <th>Release Date</th>
                <th>Actions</th>
            </tr>
            <tbody>
                <Visual v-for="v in resultVisuals" :key="v.id" v-bind:v="v" v-bind:getVisuals="getVisuals"></Visual>
            </tbody>
        </table>
        <transition-group v-if="list.length > 0" name="visual" class="" appear>
        </transition-group>
        <div class="paginations" v-if="total != 0">
            <router-link class="pagination__link" v-bind:class="{ active: page == p }" v-for="p in totalPages" :key="p" :to="{ name: 'page', params: { pageId: p }}">{{p}}</router-link>
        </div>
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
                total: 0,
                totalPages: 0,
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
            const pageId = this.$route.params.pageId;
            if (typeof pageId != 'undefined') {
                this.page = pageId;
            } else {
                this.page = 1;
            }
            this.getVisuals(this.page);
        },
        watch:{
            $route (to, from){
                this.page = to.params.pageId;
                this.getVisuals(this.page);
            }
        },
        methods: {
            gotoAdmin() {
                window.localStorage.setItem('admin', true);
                this.admin = true;
            },
            getVisuals(page = 1) {
                this.page = page;
                const params = {
                    page: this.page,
                    limit: this.limit
                };
                this.$http.get(this.$store.state.api.visualList, {params: params}).then(res => {
                    this.list = res.body.results;
                    this.total = res.body.total;
                    this.totalPages = Math.ceil(this.total/this.limit);
                    this.loading = false;
                });
            },
        }
    };
</script>
<style>
    .table {
        width: 100%;
        text-align: left;
        border-radius: 10px;
    }
    .table th {
        padding: 10px;
    }
    .table__head th {
        background:#36304a;
        color: #ffffff;
    }
    .table tbody tr {
        color: #808080;
    }
    .table tbody tr:nth-child(even) {
        background: #f5f5f5;
    }
    /* moving */
    .visual-move {
        transition: all 600ms ease-in-out 50ms;
    }
    
    /* appearing */
    .visual-enter-active {
        transition: all 300ms ease-out;
        transform: translateX(3%);
    }
    
    /* disappearing */
    .visual-leave-active {
        transition: all 200ms ease-in;
    }
    
    /* appear at / disappear to */
    .visual-enter,
    .visual-leave-to {
        opacity: 0;
        transform: translateX(-3%);
    }
    .pagination__link {
        display: inline-block;
        padding: 10px;
        margin-right: 5px;
        border: 1px solid #ff4081;
        cursor: pointer;
    }
    .pagination__link.active {
        background: #ff4081;
        color: #ffffff;
    }
</style>