import React from 'react';
import { Widget} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './Tchat.css';

const Chat = () => {
    return(
        <div className="Chat">
            <Widget title="Netflix Chat" subtitle={'Profiter'} senderPlaceHolder="ecrire un message" />
        </div>
    )
}

export default Chat;