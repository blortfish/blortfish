<div class="chat-window__wrapper">
    <div class="chat-window__content"></div>
    <div class="chat-window__input">
        <div class="chat-wrap input-wrap">
            <textarea id="chat-window__input--text"
                      placeholder="<?php echo (!isset($_SESSION["isAuth"])) ? "Please login to chat" : "" ?>"></textarea>
        </div>
        <div class="chat-wrap button-wrap">
            <div class="chat-window__submit button white">Send</div>
        </div>
    </div>
</div>