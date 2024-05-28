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

const IMAGE_BACK_MAIN_MENU = 'https://i.pinimg.com/736x/44/c9/94/44c9947e11ff63b178641296a8d09556.jpg';

const IMAGE_VIEW_APPTIZER1='https://img.lovepik.com/free-png/20220107/lovepik-hand-painted-summer-cute-cat-watermelon-pool-spa-png-image_401199731_wh860.png';
const IMAGE_VIEW_APPTIZER2='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSUpSmFm9i_G1go0xZzbehSDWqokdD2-b4DlINFX50A&s';
const IMAGE_VIEW_APPTIZER3='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg1SXC82toG3rCKsWB7NcnyQl0m6ZJDi0NV4gAfgzfjg&s';

const IMAGE_VIEW_FISH1='https://banner2.cleanpng.com/20180601/kzz/kisspng-salmon-as-food-salmon-as-food-clip-art-fish-scales-5b10fdcde7df07.6852989015278402059498.jpg';
const IMAGE_VIEW_FISH2='https://png.pngtree.com/png-clipart/20210316/ourlarge/pngtree-cute-cartoon-blue-whale-sea-creature-ocean-png-image_3067140.jpg';
const IMAGE_VIEW_FISH3='https://gcs.tripi.vn/public-tripi/tripi-feed/img/475223QRE/anh-mo-ta.png';

const IMAGE_VIEW_SALAD1='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw85vD50LsQ_k4tWO1OFH33ahuZAgebsDGSaNMoSl25A&s';
const IMAGE_VIEW_SALAD2='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKOUblL-E8YJHTsJFlaZY_M1k2RcN9ReXiS41C88wOQ&s';
const IMAGE_VIEW_SALAD3='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ov_26z8hUkIa8zKZfyGYigjeh9eoexAA41YfRE6EZA&s';

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

let handleBackToMainMenu = async (sender_psid) => {
  await handleSendMainMenu(sender_psid);
}

let handleViewAppetizers = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try{
        let response1 = getViewAppetizersTemplate();
        await callSendAPI(sender_psid,response1);
        resolve('done')
    }catch(e){
        reject(e);
    }
})
}

let getViewAppetizersTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "DUA HAU",
            subtitle: "20K/1 DIA",
            image_url: IMAGE_VIEW_APPTIZER1 ,
          },
          {
            title: "XOAI",
            subtitle: "20K / 1 DIA",
            image_url: IMAGE_VIEW_APPTIZER2 ,
          },
          {
            title: "TAO",
            subtitle: "500K 1 / QUA",
            image_url: IMAGE_VIEW_APPTIZER3 ,
          },
          {
            title: "QUAY TRO LAI",
            subtitle: "QUAY TRO LAI MAIN MENU",
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

let handleViewFish = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try{
        let response1 = getViewFishTemplate();
        await callSendAPI(sender_psid,response1);
        resolve('done')
    }catch(e){
        reject(e);
    }
})
}

let getViewFishTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "CA HOI",
            subtitle: "50$$",
            image_url: IMAGE_VIEW_FISH1 ,
          },
          {
            title: "CA MAP",
            subtitle: "500$$",
            image_url: IMAGE_VIEW_FISH2 ,
          },
          {
            title: "CA HEO",
            subtitle: "6000$$",
            image_url: IMAGE_VIEW_FISH3 ,
          },
          {
            title: "QUAY TRO LAI",
            subtitle: "QUAY TRO LAI MAIN MENU",
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

let handleViewSaLad = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try{
        let response1 = getViewSaLadTemplate();
        await callSendAPI(sender_psid,response1);
        resolve('done')
    }catch(e){
        reject(e);
    }
})
}

let getViewSaLadTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "SALAD GA",
            subtitle: "20$$",
            image_url: IMAGE_VIEW_SALAD1 ,
          },
          {
            title: "SALAD KHOAI",
            subtitle: "200$$",
            image_url: IMAGE_VIEW_SALAD2 ,
          },
          {
            title: "SALAD BO",
            subtitle: "100$",
            image_url: IMAGE_VIEW_SALAD3 ,
          },
          {
            title: "QUAY TRO LAI",
            subtitle: "QUAY TRO LAI MAIN MENU",
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

module.exports = {
    handleGetStarted : handleGetStarted,
    handleSendMainMenu : handleSendMainMenu,
    handleSendLunchMenu : handleSendLunchMenu,
    handleSendDinnerMenu : handleSendDinnerMenu,
    handleBackToMainMenu: handleBackToMainMenu,
    handleViewAppetizers: handleViewAppetizers,
    handleViewFish: handleViewFish,
    handleViewSaLad:handleViewSaLad
}