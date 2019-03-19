<template>
    <tr class="visual">
        <!--<mu-col desktop="10">-->
        <!--    <mu-card>-->
        <!--        <mu-card-media title="" subTitle="">-->
        <!--            <img class="visual__poster" :src="v.poster" referrerpolicy ="never" />-->
        <!--        </mu-card-media>-->
        <!--    </mu-card>-->
        <!--</mu-col>-->
        <th class="visual__col title">
            <h3 class="visual__title">{{v.title}}</h3>
            <h3 class="visual__title" v-if="v.title != v.original_title">{{v.original_title}}</h3>
        </th>
        <th class="visual__col type">
            <span>{{v.visual_type}}</span>
        </th>
        <th class="visual__col status">
            <span class="visual__status">{{getStatus(v)}}</span>
        </th>
        <th class="visual__col ratings">
            <div class="visual__ratings">
                <a class="visual__rating link" v-bind:href="getLink(v, 'douban')" target="_blank">
                    <img class="visual__rating icon" src="https://img3.doubanio.com/f/talion/2f3c0bc0f35b031d4535fd993ae3936f4e40e6c8/pics/icon/dou32.png" alt="douban icon" />
                    <span class="visual__rating">{{v.douban_rating}}</span>
                </a>
                <a class="visual__rating link" v-if="v.imdb_id" v-bind:href="getLink(v, 'imdb')" target="_blank">
                    <img class="visual__rating icon" src="https://a4.mzstatic.com/us/r30/Purple71/v4/eb/6a/9d/eb6a9d94-4631-194c-3e24-852a06dc4ced/icon175x175.jpeg" alt="imdb icon" />
                    <span class="visual__rating">{{v.imdb_rating}}</span>
                </a>
                <a v-if="v.rotten_rating">
                    <img class="visual__rating icon" src="https://vignette.wikia.nocookie.net/greatest-movies/images/1/16/Rotten_Tomatoes_fresh_rating_icon.png/revision/latest?cb=20170918174417" alt="Rotten Tomatoes Icon" />
                    <span class="visual__rating">{{v.rotten_rating}}</span>
                </a>
            </div>
        </th>
        <th class="visual__col progress">
            <div class="visual__progress">
                <mu-linear-progress mode="determinate" :value="getProgress(v)"/>
            </div>
        </th>
        <th class="visual__col episodes">
            <span class="visual__progress-episodes">{{v.current_episode}} / {{v.episodes}}</span>
        </th>
        <th class="visual__col release_date">
            <span>{{v.release_date}}</span>
        </th>
        <th class="visual__col actions">
            <div class="visual__action">
                <router-link :to="{ name: 'edit', params: { id: v.id }}">Edit</router-link>
                <a class="visual__increaseepisode" v-if="v.episodes != v.current_episode" v-on:click="increaseEpisode(v)">+ 1 ep</a>
            </div>
        </th>
    </tr>
</template>
<script>
export default {
    props: ['v', 'getVisuals'],
    data() {
        return {
        };
    },
    methods: {
        increaseEpisode(v) {
            this.$http.get(this.$store.state.api.increaseEpisode + '?id=' + v.id).then(res => {
                v.current_episode = res.body.current_episode;
                this.getVisuals();
            });
        },
        getStatus(v) {
            if (v.current_episode == v.episodes) {
                return 'Done';
            } else if (v.current_episode == 0) {
                return 'Not Started';
            } else if (v.current_episode < v.episodes) {
                return 'In Progress';
            }
        },
        getLink(v, type) {
            if (type == 'douban') {
                return 'https://movie.douban.com/subject/' + v.douban_id;
            } else if (type == 'imdb') {
                if (v.imdb_id) {
                    return 'https://www.imdb.com/title/' + v.imdb_id;   
                }
            }
        },
        getProgress(v) {
            if (v.current_episode == v.episodes) {
                return 100;
            }
            return (v.current_episode/v.episodes) * 100;
        },
    }
};
</script>
<style>
.visual {
    border-top: 1px solid #bfbaba;
}
.visual__poster {
    border-radius: 4px;
}
.visual__title {
    margin: 0;
    text-align: left;
    font-family: 'ZCOOL KuaiLe';
    font-weight: lighter;
}
.visual__rating {
    display: inline-block;
    vertical-align: middle;
}
.visual__rating.link {
    margin-right: 5px;
}
.visual__rating.icon {
    width: 20px;
    height: 20px;
}
.visual__progress-episodes {
    color: #000000;
}
.mu-linear-progress-determinate {
    background: #57c263;
}
</style>