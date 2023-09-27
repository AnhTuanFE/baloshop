import generateToken from '../utils/generateToken.js';
import cloudinary from 'cloudinary';
import User from '../Models/UserModel.js';

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const information_admin = await User.findOne({ email: 'admin@gmail.com' });
    if (user?.disabled) {
        res.status(400);
        throw new Error('Tài khoản đã bạn đã bị khóa, vui lòng liên hệ shop để có thể lấy lại');
    }
    if (user && (await user.matchPassword(password)) && information_admin) {
        const data = {
            city: information_admin.city,
            district: information_admin.district,
            ward: information_admin.ward,
            address: information_admin.address,
            phone: information_admin.phone,
        };
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            createdAt: user.createdAt,
            city: user.city,
            district: user.district,
            ward: user.ward,
            address: user.address,
            image: user.image,
            disabled: user.disabled,
            address_shop: data,
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
};

const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('Tài khoản đã tồn tại');
    }

    const user = await User.create({
        name,
        email,
        phone,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            address: user.address,
            city: user.city,
            country: user.country,
            image: user.image,
            disabled: user.disabled,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
};

const getProfile = async (req, res) => {
    const user = req.user;
    const information_admin = await User.findOne({ email: 'admin@gmail.com' });

    if (user && information_admin) {
        const data = {
            city: information_admin.city,
            district: information_admin.district,
            ward: information_admin.ward,
            address: information_admin.address,
            phone: information_admin.phone,
        };
        res.json({
            _id: user._id,
            name: user.name,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            city: user.city,
            district: user.district,
            ward: user.ward,
            address: user.address,
            image: user.image,
            disabled: user.disabled,
            address_shop: data,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

const updateProfile = async (req, res) => {
    try {
        const imagePath = req?.file?.path;
        const { name, dateOfBirth, phone, city, district, ward, address, password, oldPassword } = req?.body;
        const user = req?.user;
        const information_admin = await User.findOne({ email: 'admin@gmail.com' });

        if (user && information_admin) {
            const data = {
                city: information_admin.city,
                district: information_admin.district,
                ward: information_admin.ward,
                address: information_admin.address,
                phone: information_admin.phone,
            };

            if (user?.disabled) {
                res.status(400);
                throw new Error('account lock up');
            }
            if (imagePath) {
                if (user?.image) {
                    let cutUrlImage = user?.image.split('/');
                    // let nameImage = cutUrlImage.slice(7).join('/').slice(0, -4);
                    // cloudinary.uploader.destroy(nameImage, function (error, result) {
                    //     try {
                    //         console.log('result = ', result, 'error = ', error);
                    //     } catch (err) {
                    //         console.log('lỗi = '.err);
                    //     }
                    // });
                }
                cloudinary.v2.uploader.upload(imagePath, { folder: 'baloshopAvatar' }, async function (err, result) {
                    if (err) {
                        req.json(err.message);
                    }
                    const imageURL = result.secure_url;
                    // const imageID = result.public_id;

                    const filter = { _id: user._id };
                    const update = {
                        $set: {
                            image: imageURL,
                        },
                    };
                    await User.updateOne(filter, update);
                    res.json({
                        _id: user._id,
                        name: name || user.name,
                        dateOfBirth: dateOfBirth || user?.dateOfBirth,
                        phone: phone || user.phone,
                        isAdmin: user.isAdmin,
                        createdAt: user.createdAt,
                        token: generateToken(user.id),
                        email: user.email,
                        city: city || user?.city,
                        district: district || user?.district,
                        ward: ward || user?.ward,
                        address: address || user?.address,
                        image: imageURL,
                        disabled: user.disabled,
                        address_shop: data,
                    });
                });
                return;
            }
            if (password) {
                console.log('chạy password password = ', password, 'oldPassword = ', oldPassword);
                try {
                    let dataUsserpass = await user.matchPassword(oldPassword);
                    console.log('dataUsserpass = ', dataUsserpass);
                } catch {}
                if (await user.matchPassword(oldPassword)) {
                    console.log('chạy password bên trong');
                    user.password = password;
                    const updatedPassword = await user.save();
                    res.status(201).json({
                        _id: user._id,
                        name: user.name,
                        dateOfBirth: user?.dateOfBirth,
                        email: user.email,
                        phone: user.phone,
                        isAdmin: user.isAdmin,
                        createdAt: user.createdAt,
                        token: generateToken(user._id),
                        city: user?.city,
                        district: user?.district,
                        ward: user?.ward,
                        address: user?.address,
                        image: user?.image,
                        disabled: user.disabled,
                        address_shop: data,
                    });
                } else {
                    res.status(404);
                    throw new Error('Old Password is not correct!');
                }
            } else {
                user.name = name || user.name;
                user.dateOfBirth = dateOfBirth || user?.dateOfBirth;
                user.phone = phone || user.phone;
                user.city = city || user?.city;
                user.district = district || user?.district;
                user.ward = ward || user?.ward;
                user.address = address || user?.address;

                const updatedUser = await user.save();
                res.json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    dateOfBirth: updatedUser?.dateOfBirth,
                    phone: updatedUser.phone,
                    city: updatedUser?.city,
                    district: updatedUser?.district,
                    ward: updatedUser?.ward,
                    address: updatedUser?.address,
                    email: user.email,
                    isAdmin: updatedUser.isAdmin,
                    createdAt: updatedUser.createdAt,
                    token: generateToken(updatedUser._id),
                    image: user?.image,
                    disabled: user.disabled,
                    address_shop: data,
                });
            }
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error(error);
    }
};
const updatePassword = async (req, res) => {
    const { password, oldPassword } = req.body;
    const user = req.user;
    if (user) {
        if (user?.disabled) {
            res.status(400);
            throw new Error('account lock up');
        }
        if (password && oldPassword) {
            if (await user.matchPassword(oldPassword)) {
                user.password = password;
                await user.save();
                res.json({ status: 'success', message: 'Cập nhập mật khẩu thành công!' });
            } else {
                res.status(404);
                throw new Error('Mật khẩu cũ không đúng!');
            }
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'Vui lòng nhập đủ thông tin của mật khẩu cũ và mật khẩu mới',
            });
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

const getAllUser = async (req, res) => {
    const users = await User.find({});
    res.json(users);
    // async (req, res) => {
    //     let allUser = [];
    //     const users = await User.find({});
    //     for (let i = 0; i < users.length; i++) {
    //         allUser.push({ _id: users[i]._id, image: users[i].image });
    //     }
    //     res.json(allUser);
    // }
};

const disableUser = async (req, res) => {
    const { disabled } = req.body;
    const { id } = req.params;
    const userClient = await User.findById(id);
    const userAdmin = req?.user;

    if (userClient.isAdmin) {
        res.status(400);
        throw new Error('Không thể khóa tài khoản admin !!!');
    }
    // if (userClient.disabled === true) {
    //     res.status(400).json({ message: 'Tài khoản đã bị khóa trước đó' });
    // }
    // userClient.disabled = disabled;
    // const retult = await userClient.save();
    // res.status(200).json(retult);

    if (disabled == userClient.disabled) {
        if (disabled == true) {
            res.status(400);
            throw new Error('Tài khoản đã bị khóa trước đó');
        } else {
            res.status(400);
            throw new Error('Tài khoản chưa bị khóa hoặc đã mở trước đó');
        }
    }
    if (userClient) {
        userClient.disabled = disabled;
        const retult = await userClient.save();
        res.status(201).json(retult);
    }
};

const userController = {
    userLogin,
    register,
    getProfile,
    updateProfile,
    updatePassword,
    getAllUser,
    disableUser,
};
export default userController;
