<template>
	<div class="form">
		<div style="display:flex;">
			<div style="width:50%;">
				<div v-for="(v,k) in visual" :key="k">
					<div>{{k}}: {{v}} <a @click="editField(k)">Edit</a></div>
				</div>
			</div>
			<div class="input-form" style="width:50%;">
				<label>{{currentField}}</label>
				<input v-model="currentVal"/>
				<a @click="updateField(currentField)">Update</a>
			</div>
		</div>
		<!-- <mu-raised-button label="Add Image" class="demo-raised-button" primary v-on:click="gotoAddImage()" /> -->
		<!-- <input label="Title" v-model="visual.title" />
		<input label="Original Title" v-model="visual.original_title" />
		<input label="Douban Id" v-model="visual.douban_id" v-on:change="renderDouban" />
		<input label="Douban Rating" v-model="visual.douban_rating" />
		<mu-raised-button label="Get Douban Data" class="demo-raised-button" v-on:click="renderDouban" secondary/>
		<input label="IMDB ID" v-model="visual.imdb_id" v-on:change="renderIMDB" />
		<input label="IMDB Rating" v-model="visual.imdb_rating" />
		<input label="Episodes" v-model="visual.episodes" />
		<input label="Current Episode" v-model="visual.current_episode" />
		<mu-raised-button label="Get IMDB Data" class="demo-raised-button" v-on:click="renderIMDB" secondary/>
		<mu-select-field label="Release Date" readonly v-model="visual.release_date" full-width>
			<mu-menu-item v-for="release_date in release_dates" :key="release_date" :label="release_date" :value="release_date.substring(0, 10)" :title="release_date"></mu-menu-item>
		</mu-select-field>
		<input label="Poster" v-model="visual.poster" />
		<img class="form-poster" v-for="p in posters" :key="p" v-bind:src="p" v-on:click="visual.poster = p" />
		<input label="Website" v-model="visual.website" />
		<input v-model="visual.visual_type" label="Visual Type"/>
		<input label="Duration" v-model="visual.duration" />
		<div class="form-group">
			<input label="Summary" multiLine :rows="3" :rowsMax="6" v-model="visual.summary" />
		</div> -->
		<mu-raised-button label="Submit" class="demo-raised-button" primary v-on:click="handleSubmit" />
		
		<div class="songs">
			<mu-raised-button label="Add Song" class="demo-raised-button" primary v-on:click="gotoAddSong()" />
			<mu-list>
				<mu-list-item v-for="s in songs" v-bind:title="s.title" :key="s.id" v-on:click="editSong(s)">
					<mu-avatar v-bind:src="s.image" slot="rightAvatar"/>
				</mu-list-item>
			</mu-list>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentField:'douban_id',
			currentVal:'',
			posters: [],
			searchOpen: false,
			searchs: [],
			visual: {
				id: 0,
				title: '',
				original_title: '',
				douban_id: '',
				douban_rating: '0.0',
				imdb_id: '',
				imdb_rating: '0.0',
				rotten_id: '',
				rotten_rating: 0,
				rotten_audience_rating: 0,
				release_date: '',
				poster: '',
				summary: '',
				online_source: '',
				episodes: 1,
				current_episode: 0,
				visual_type: 'movie',
				website: '',
				languages:[],
				countries:[],
				duration:0,
			},
			release_dates: [],
			songs: []
		};
	},
	mounted() {
		const id = this.$route.params.id;
		if (typeof id != 'undefined') {
			this.getVisual(id);
			this.getSongs(id);
		}
	},
	methods: {
		editField(k){
			this.currentField = k;
			this.currentVal = this.visual[k];
		},
		updateField(k) {
			this.visual[k] = this.currentVal;
		},
		// toggleSearch() {
		// 	this.searchOpen = !this.searchOpen;
		// },
		gotoAddSong() {
			this.$router.push({path: '/' + this.$route.params.id + '/song/add'});
		},
		// gotoAddImage() {
		// 	this.$router.push({path: '/' + this.$route.params.id + '/image/add'});
		// },
		renderFromSearch(id) {
			this.toggleSearch();
			this.visual.douban_id = id;
			this.renderDouban();
		},
		handleSubmit() {
			const options = this.visual;
			this.$http.post(this.$store.state.api.visualSubmit, options).then(res => {
				if (res.status == 200) {
					if (res.body.code == 'exist') {
						alert('Douban Id exist');
					} else {
						this.$router.push({ path: '/' });
					}
				}
			});
		},
		getVisual(id) {
			this.$http.get(this.$store.state.api.visualDetail + id).then(res => {
				this.visual = res.body.result;
				if (this.visual.douban_id) {
					this.renderDouban();
				}
			});
		},
		// searchDouban(e) {
		// 	const val = e.target.value;
		// 	const api = '/api/visuals/search?keyword=' + val;
		// 	// 'https://api.douban.com/v2/movie/search?q=' + val + '&apikey=0df993c66c0c636e29ecbb5344252a4a'
		// 	this.$http.get(api).then(res => {
		// 		this.searchs = [];
		// 		if (res.status == 200) {
		// 			console.log(res.body);
		// 			this.searchs = res.body;
		// 		}
		// 	});
		// },
		renderDouban() {
			if (this.visual.douban_id == '') {
				alert('Empty douban id');
				return;
			}
			this.getImdbId();
			this.$http.jsonp('https://api.douban.com/v2/movie/subject/' + this.visual.douban_id + '?apikey=0df993c66c0c636e29ecbb5344252a4a').then(res => {
				const douban = res.body;
				if (this.visual.summary == '') {
					this.visual.summary = douban.summary;
				}
				this.release_dates = douban.pubdates;
				this.posters = [];
				
				this.visual.title = douban.title;
				this.visual.original_title = douban.original_title;
				this.visual.douban_rating = douban.rating.average;
				if (douban.episodes_count) {
					this.visual.episodes = douban.episodes_count;
					this.visual.visual_type = 'tv';
				}
				if (douban.countries) {
					this.visual.countries = douban.countries;
				}
				if (douban.languages) {
					this.visual.languages = douban.languages;
				}
				if (douban.durations && douban.durations.length > 0) {
					const duration = douban.durations[0];
					this.visual.duration = duration.slice(0,duration.length - 2);
				}
				this.visual.website = douban.website;
			}, res => {
				//error
			});
		},
		getImdbId() {
			const options = {
				params: {
					douban_id: this.visual.douban_id
				}
			};
			// const api = this.$store.state.api.visualImdb;
			const api = '/api/visuals/get_imdb_id';
			this.$http.get(api, options).then(res => {
				if (res.body.imdb_id) {
					this.visual.imdb_id = res.body.imdb_id;    
				}
				// this.release_dates = res.body.release_dates;
				this.renderIMDB();
			}, res => {
					
			});
		},
		renderIMDB() {
			if (this.visual.imdb_id == '') return;
				const options = {
				params: {
					i: this.visual.imdb_id,
					apikey: '6ad10fa5'
				}
			};
			this.$http.jsonp('https://www.omdbapi.com/', options).then(res => {
				if (res.body.Response != 'False') {
					if (res.body.Ratings[1] && res.body.Ratings[1].Source == 'Rotten Tomatoes') {
						this.visual.rotten_rating = res.body.Ratings[1].Value.replace('%', '');   
					}
					this.posters.push(res.body.Poster);
				}
			});
			const api = '/api/visuals/get_imdb_rating?imdb_id='+this.visual.imdb_id;
			// 'https://what-i-watched.herokuapp.com/api/get_imdb_detail?imdb_id='+this.visual.imdb_id
			this.$http.get(api).then(res => {
				if (res.status == 200) {
					if (res.body.imdb_rating) {
						this.visual.imdb_rating = res.body.imdb_rating;
					}
				}
			});
		},
		getSongs(visual_id) {
			this.$http.get(this.$store.state.api.songList + '?visual_id=' + visual_id).then((res) => {
				if (res.status == 200) {
					this.songs = res.body.results;
				}
			});
		},
		editSong(s) {
			let visual_id = this.$route.params.id;
			this.$router.push({ path: '/song/' + s.id + '/edit' });
		}
	}
};
</script>
<style scope>
.form-poster {
  width: 50%;
}
</style>