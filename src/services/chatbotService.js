import { response } from "express";
import request from "request";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED = 'http://bit.ly/eric-bot1';
const IMAGE_MENU1 = 'https://afamilycdn.com/fRhOWcbaG01Vd2ydvKbOwEYcba/Image/2015/11/bua-an-33-trieu-dong-khach-binh-than-rut-vi_20151116081951526.jpg';
const IMAGE_MENU2 = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Frobata-an.com%2Fvi%2Fthong-bao-hoat-dong-tro-lai%2F&psig=AOvVaw1qv1H6K9TBy2UkfkG6wRUE&ust=1716919918894000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjzq6i3roYDFQAAAAAdAAAAABAE';
const IMAGE_MENU3 = 'https://khonggianxanh.com/wp-content/uploads/2021/03/thiet-ke-noi-that-nha-hang-5-sao.jpg';
let callSendAPI = (sender_psid,response) => {
// Construct the message body
    let request_body = {
        "recipient": {
        "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
        console.log('message sent!')
        } else {
        console.error("Unable to send message:" + err);
        }
    }); 
}

let getUserName =  (sender_psid) => {
   return new Promise((resolve,reject) => {
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        "method": "GET",
    }, (err, res, body) => {
        if (!err) {
            body = JSON.parse(body);  
            let username =  `${body.first_name} ${body.last_name}`     
            resolve(username);
        } else {
            console.error("Unable to send message:" + err);
            reject(err);
        }
    }); 
})
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let username = await getUserName(sender_psid);
            let response1 = {"text" : `xin chao ${username} den voi nha hang`}
            let response2 = getStartedTemplate();
            //send text message
            await callSendAPI(sender_psid,response1);
            //send generic template message
            await callSendAPI(sender_psid,response2);
            resolve('done')
        }catch(e){
            reject(e);
        }
    })
}

let getStartedTemplate = () => {
    let response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "Xin chao ban den voi nha hang cua quang",
                subtitle: "Duoi day la cac lua chon cua nha hang",
                image_url: IMAGE_GET_STARTED ,
                buttons: [
                  {
                    type: "postback",
                    title: "MENU CHINH",
                    payload: "MAIN_MENU",
                  },
                  {
                    type: "postback",
                    title: "DAT BAN",
                    payload: "RESERVE_TABLE",
                  },
                  {
                    type: "postback",
                    title: "HUONG DAN SU DUNG BOT",
                    payload: "GUITE_TO_USE",
                  },
                ],
              },
            ],
          },
        },
    }
    return response;
}

let handleSendMainMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try{
        let response1 = getMainMenuTemplate();
        await callSendAPI(sender_psid,response1);
        resolve('done')
    }catch(e){
        reject(e);
    }
})
}

let getMainMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "menu cua nha hang",
            subtitle: "chung toi han hanh mang den cho ban bua trua va bua toi",
            image_url: IMAGE_MENU1 ,
            buttons: [
              {
                type: "postback",
                title: "BUA TRUA",
                payload: "LUNCH_MENU",
              },
              {
                type: "postback",
                title: "BUA TOI",
                payload: "DINNER_MENU",
              },
            ],
          },
          {
            title: "GIO MO CUA",
            subtitle: "TU THU 2 DEN THU 7 - NGHI CN 10AM-11PM",
            image_url: IMAGE_MENU2 ,
            buttons: [
              {
                type: "postback",
                title: "DAT BAN",
                payload: "RESERVE_TABLE",
              },
            ],
          },
          {
            title: "KHONG GIAN NHA HANG",
            subtitle: "NHA HANG CO SUC CHUA LEN TOI 400 NGUOI",
            image_url: IMAGE_MENU3 ,
            buttons: [
              {
                type: "postback",
                title: "CHI TIET KHONG GIAN NHA HANG",
                payload: "SHOW_ROOM,",
              },
             
            ],
          }
          
          ,
        ],
      },
    },
}
return response;
}

module.exports = {
    handleGetStarted : handleGetStarted,
    handleSendMainMenu : handleSendMainMenu,
}