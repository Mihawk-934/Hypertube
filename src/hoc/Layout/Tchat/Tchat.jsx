import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import * as actions from '../../store/actions/index';
// import {Modal} from 'react-bootstrap'
import io from 'socket.io-client'
import {useDispatch, useSelector} from 'react-redux';
import { Widget,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';
import './Tchat.css';
//const socket = io("http://localhost:3000")

const Chat = () => {

    const [form,setForm] = useState()
    const [social,setSocial] = useState()
    const chatS = useSelector(state => state.auth.chatS)
    const chatF = useSelector(state => state.auth.chatF)
    
    useEffect (()=>{
        // socket.on('msg serveur:',msg=> {
        //     console.log('msggg recu du serveur--->',msg) 
        //     console.log(socket)
            //addResponseMessage(msg)
        //})     
    })

    const handleNewUserMessage = (newMessage) => {
        //socket.emit('msg envoyer :',localStorage.getItem('name') ,newMessage)
        console.log(`New message incoming! ${newMessage}`);
    };
      
    return(
        <div className="Chat">
            <Widget title="Netflix Chat" subtitle={'Profiter'} handleNewUserMessage={handleNewUserMessage}  senderPlaceHolder="ecrire un message" />
        </div>
    )
}

export default Chat;