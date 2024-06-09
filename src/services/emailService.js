require("dotenv").config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Địa chỉ email để gửi email
        pass: process.env.EMAIL_PASS  // Mật khẩu email hoặc mật khẩu ứng dụng
    }
});

// Hàm gửi email
const sendEmail = (to, subject, htmlContent) => {
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent // Sử dụng thuộc tính html thay vì text
  };

  return transporter.sendMail(mailOptions);
};

let getBodyHTMLEmail = (dataSend) => {
    let result = `
    <h3>Xin Chào ${dataSend.patienName}!</h3>
    <p>Bạn nhận được email này vì đã đặt bàn online trên Quang restaurent</p>
    <p>Thông tin đặt bàn:</p>
    <div><b>Thời gian:</b> ${dataSend.time}</div>
    <div><b>Họ và tên:</b> ${dataSend.patienName}</div>
    <div><b>Số điện thoại:</b> ${dataSend.phoneNumber}</div>
    <p>Vui lòng click vào đường link dưới đây để xác nhận thủ tục đặt bàn</p>
    <div><a href="${dataSend.redirectLink}" target="_blank">Click here</a></div>
    <div><b>Xin cảm ơn</b></div>`;
    return result;
  }


module.exports = {
    getBodyHTMLEmail:getBodyHTMLEmail,
    sendEmail:sendEmail,
}