import React from 'react';

export default class Recommend extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        const api = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472';
    }
}