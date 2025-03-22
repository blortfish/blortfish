<div class="score-board">
    <div class="player1-score">
        <span class="name"></span>
        <span class="score"></span>
    </div><div class="player2-score">
        <span class="name"></span>
        <span class="score"></span>
    </div>
    <div class="turn-message"><span class="message"></span></div>
</div>

<div class="game-board__wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="490px">
        <defs>
            <radialGradient id="player2" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
                <stop offset="0%" style="stop-color:rgb(155,155,155);stop-opacity:0".5/>
                <stop offset="100%" style="stop-color:rgb(0,0,155);stop-opacity:1"/>
            </radialGradient>
            <radialGradient id="player1" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
                <stop offset="0%" style="stop-color:rgb(155,155,155);stop-opacity:0.5"/>
                <stop offset="100%" style="stop-color:rgb(155,0,0);stop-opacity:1"/>
            </radialGradient>
        </defs>
        <rect id="background" x="0px" y="0px" width="100%" height="100%" fill="#e9e9e9"></rect>
        <g id="board-spaces"></g>
    </svg>
</div>