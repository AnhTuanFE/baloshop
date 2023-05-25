import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
// import UserInFor from '../Models/userDetails.js';
import User from '../Models/UserModel.js';
import baseURL from '../baseURL/baseURL.js';

const forgotPassRouter = express.Router();

const JWT_SECRET1 = 'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

forgotPassRouter.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: 'Email chưa được đăng ký, vui lòng kiểm tra lại' });
        }
        const secret = JWT_SECRET1 + oldUser.password;
        const token1 = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: '30m',
        });
        // const link = `${baseURL.urlUser}/api/forgotPass/reset-password/${oldUser._id}/${token1}`;
        const link = `${baseURL.urlUser}/verify-reset-password/${oldUser._id}/${token1}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'balostore.owner@gmail.com',
                pass: 'ytmgtsqgkgtypwle',
            },
        });

        var mailOptions = {
            from: 'balostore.owner@gmail.com',
            to: oldUser.email,
            subject: 'BaloStore kính chào quý khách, quý khách hãy nhấp vào đường link bên dưới để đặt lại mật khẩu',
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json({ status: 'Link đặt lại mật khẩu đã được gửi qua email, vui lòng kiểm tra hòm thư của bạn' });
        console.log(link);
    } catch (error) {}
});

//   xác thực
forgotPassRouter.post('/verify-reset-password', async (req, res) => {
    // console.log('req.body = ', req?.body);

    const { id, token } = req?.body;

    const oldUser = await User.findOne({ _id: id });
    const email = oldUser.email;
    if (!oldUser) {
        return res.json({ status: 'User Not Exists!!' });
    }
    const secret = JWT_SECRET1 + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        console.log('verify = ', verify);
        // res.render('index', { email: verify.email, status: 'Verified Account' });
        return res.json({ status: 'Verified Account', id, token, email });
    } catch (error) {
        console.log(error);
        // res.send('not verified');
        res.json({ status: 'Not verified', error });
    }
});

// thay đổi mật khẩu
forgotPassRouter.post('/reset-password', async (req, res) => {
    // const { id, token } = req.params;
    console.log('req?.body = ', req?.body);
    const { newPassword, id, token } = req?.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: 'User Not Exists!!' });
    }
    const secret = JWT_SECRET1 + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            },
        );
        res.json({ status: 'Password updated' });
        // res.render('index', { email: verify.email, status: 'verified' });
    } catch (error) {
        console.log(error);
        res.json({ status: 'Something Went Wrong' });
    }
});

export default forgotPassRouter;
