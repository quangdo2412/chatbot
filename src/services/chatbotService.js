import { response } from "express";
import request from "request";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED = 'http://bit.ly/eric-bot1';
const IMAGE_MENU1 = 'https://afamilycdn.com/fRhOWcbaG01Vd2ydvKbOwEYcba/Image/2015/11/bua-an-33-trieu-dong-khach-binh-than-rut-vi_20151116081951526.jpg';
const IMAGE_MENU2 = 'https://www.pos365.vn/storage/app/media/2020/2/xem_gio_mo_cua_hang/xemgiomocuahang-4.png';
const IMAGE_MENU3 = 'https://tknt.vn/images/2021/04/02/thiet-ke-nha-hang-1-tang-01.jpg';

const IMAGE_APPETIZERS='https://doanhnhanplus.vn/wp-content/uploads/2020/02/YummyBestDesserts-Main.jpg';
const IMAGE_FISH='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXsAO4iIHw4sxF0-q8nO2sq61ybTc4LqnBxX5WO9345w&s';
const IMAGE_SALAD='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSChqOEg1gi7lDVY_PfFCE3-5D5n8bD00ytdRPOPkqQWA&s';

const IMAGE_BACK_MAIN_MENU = 'http://bit.ly/eric-bot8'


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
                payload: "SHOW_ROOM",
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

let handleSendLunchMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try{
        let response1 = getLunchMenuTemplate();
        await callSendAPI(sender_psid,response1);
        resolve('done')
    }catch(e){
        reject(e);
    }
})
}

let getLunchMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Mon trang mieng",
            subtitle: "Nha hang co nhieu mon trang mieng hap dan",
            image_url: IMAGE_APPETIZERS ,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIET",
                payload: "VIEW_APPETIZERS",
              },
            ],
          },
          {
            title: "MON CA",
            subtitle: "MON CA AN RAT NGON",
            image_url: IMAGE_FISH ,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIET",
                payload: "VIEW_FISH",
              },
            ],
          },
          {
            title: "MON SALAD",
            subtitle: "NHA HANG CO SALAD RAT NGON DAM BAO CHAT LUONG",
            image_url: IMAGE_SALAD ,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIET",
                payload: "VIEW_SALAD",
              },
             
            ],
          },
          {
            title: "QUAY TRO LAI ",
            subtitle: "QUAY LAI MENU CHINH",
            image_url: IMAGE_BACK_MAIN_MENU ,
            buttons: [
              {
                type: "postback",
                title: "BACK",
                payload: "BACK_TO_MAIN_MENU",
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

let handleSendDinnerMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try{
        let response1 = getDinnerMenuTemplate();
        await callSendAPI(sender_psid,response1);
        resolve('done')
    }catch(e){
        reject(e);
    }
})
}

let getDinnerMenuTemplate = () => {
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
    handleSendLunchMenu : handleSendLunchMenu,
    handleSendDinnerMenu : handleSendDinnerMenu,
}