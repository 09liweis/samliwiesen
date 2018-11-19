import React from 'react';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import '../css/musicplayer.css';

export default class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topLists: []
        };
    }
    componentDidMount() {
        this.getTopList();
    }
    getTopList() {
        const topListApi = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472';
        axios({
            url: topListApi,
            adapter: jsonpAdapter
        }).then((res) => {
            console.log(res);
        });
    }
    convertHttps(url) {
        return url.replace('http', 'https');
    }
    render() {
        const {topLists} = this.state;
        return (
            <div className="musicplayer">
                <h2>MusicPlayer</h2>
                <div className="toplist">
                    {topLists.map((list, i) => 
                        <div className="topic" key={list.id}>
                            <img src={this.convertHttps(list.picUrl)} alt={list.topTitle} />
                            <div className="topic__info">
                                <h3>{list.topTitle}</h3>
                                {list.songList.map((song, i) =>
                                    <div key={i} className="topic__song">{song.songname} - {song.singername}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}