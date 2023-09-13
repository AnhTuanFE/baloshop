import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            // required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        city: {
            type: String,
        },
        district: {
            type: String,
        },
        ward: {
            type: String,
        },
        address: {
            type: String,
        },
        image: {
            type: String,
        },
        disabled: {
            type: Boolean,
            require: true,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.matchPassword = async function (enterPassword) {
    console.log('enterPassword = ', enterPassword);
    console.log('this so sánh = ', this);
    console.log('this.password so sánh = ', this.password);
    const sosanhpass = await bcrypt.compare(enterPassword, this.password);
    console.log('sosanhpass = ', sosanhpass);
    return sosanhpass;
};

// Register
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(this.password, salt);
        this.password = newPass;
        return next();
    } catch (error) {
        return next(error);
    }
});

// quen mk
const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

const User = mongoose.model('User', userSchema);
export default User;
// module.export {User, validate}
