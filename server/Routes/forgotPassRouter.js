import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
// import UserInFor from '../Models/userDetails.js';
import User from '../models/UserModel.js';

const forgotPassRouter = express.Router();

const JWT_SECRET1 = 'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

forgotPassRouter.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res
                .status(404)
                .json({ status: 'failed', message: 'Email chưa được đăng ký, vui lòng kiểm tra lại' });
        }
        const secret = JWT_SECRET1 + oldUser.password;
        const token1 = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: '30m',
        });
        const link = `${process.env.CLIENT_URL}/reset-password/${oldUser._id}/${token1}/${oldUser.email}`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'balostore.owner@gmail.com',
                pass: 'ytmgtsqgkgtypwle',
            },
        });

        let mailOptions = {
            from: 'balostore.owner@gmail.com',
            to: oldUser.email,
            subject: 'BaloShop kính chào quý khách, quý khách hãy nhấp vào đường link bên dưới để đặt lại mật khẩu',
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                // console.log(error);
            } else {
                // console.log('Email sent: ' + info.response);
            }
        });
        res.json({
            status: 'success',
            message: 'Link đặt lại mật khẩu đã được gửi qua email, vui lòng kiểm tra hòm thư của bạn',
        });
        console.log(link);
    } catch (error) {}
});

// thay đổi mật khẩu
forgotPassRouter.post('/reset-password', async (req, res) => {
    const { newPassword, id, token, newConfirmPassword } = req?.body;
    if (newPassword != newConfirmPassword) {
        res.status(404).json({ status: 'Mật khẩu và xác nhận mật khẩu không trùng khớp!!' });
    }

    try {
        if (id && token && newPassword) {
            const oldUser = await User.findOne({ _id: id });
            if (!oldUser) {
                return res.status(404).json({ status: 'User Not Exists!!' });
            }
            const secret = JWT_SECRET1 + oldUser.password;
            try {
                const verify = jwt.verify(token, secret);
                if (verify.id == id) {
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
                    res.json({ status: 'success', message: 'Đã cập nhập mật khẩu thành công' });
                } else {
                    res.status(404).json({ status: 'success', message: 'Lỗi xác thực token' });
                }
            } catch (err) {
                res.status(404).json({
                    status: 'success',
                    message: 'Lỗi xác thực, mỗi link xác thực chỉ có thể dặt lại mật khẩu 1 lần',
                });
            }
        } else {
            res.status(404).json({
                status: 'failed',
                message: 'Không thể xác thực tài khoản, vui lòng kiểm tra lại link đặt lại mật khẩu',
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: 'Không thể xác thực tài khoản, vui lòng kiểm tra lại link đặt lại mật khẩu',
        });
    }
});

export default forgotPassRouter;
