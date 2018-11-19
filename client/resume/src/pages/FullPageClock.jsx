import React from 'react';

import '../css/fullPageClock.css';

export class FullPageClock extends React.Component {
    render() {
        return(
            <div id="wrap">
                <div id="container">
                    <h1 id="time_title">The current time is</h1>
                    
                    <div></div>
                    <div class="ticker">
                    <div class="current" id="cur_hour"></div>
                    </div>
                    
                    <div class="colon">:</div>
                    
                    <div class="ticker">
                    <div class="current" id="cur_min"></div>
                    </div>
                    
                    <div class="colon">:</div>
                    
                    <div class="ticker">
                    <div class="current" id="cur_sec"></div>
                    </div>
                    
                    <h1 id="color_title">The current color is</h1>
                    
                    <div class="ticker" id="color_ticker">
                    <div class="current" id="cur_color"></div>
                    </div>
                </div>
            </div>
        );
    }
}