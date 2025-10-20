import mongoose from "mongoose";

const userSchema = new mongoose.Schema( 
    {

        name : {
            type: String,
            required: [true, 'Name is required'],
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        phone: {
            type: String,
            default:"Not given"
        },
        password : {
            type : String,
            required : true
        },
        role: {
            type: String,
            enum: ['Admin', 'Customer'],
            default: 'Customer',
            required: true
        },
        image: {
            type: String,
            default : "https://www.google.com/search?q=photo+product&sca_esv=b1f7e2cc7f09216f&sxsrf=AE3TifMh92fmnGMwKORE6Ui0zDB-RLjDsw%3A1760951320373&ei=GPz1aMHKFrmM4-EP5cHAqQc&ved=0ahUKEwjBtqvvtrKQAxU5xjgGHeUgMHUQ4dUDCBE&uact=5&oq=photo+product&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXBob3RvIHByb2R1Y3QyBRAAGIAEMgsQABiABBiRAhiKBTIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyCxAuGIAEGMcBGK8BMgUQABiABDIFEAAYgAQyBRAAGIAESOYZUJ0EWPwVcAF4AZABAJgBhAKgAcULqgEFMC42LjK4AQPIAQD4AQGYAgmgAu0LwgIKEAAYsAMY1gQYR8ICDRAAGIAEGLADGEMYigXCAgoQABiABBhDGIoFwgINEAAYgAQYsQMYQxiKBcICDRAAGIAEGEMYyQMYigXCAgsQABiABBiSAxiKBcICChAAGIAEGBQYhwLCAg4QABiABBiRAhjJAxiKBcICCBAAGIAEGJIDmAMAiAYBkAYKkgcFMS42LjKgB7M5sgcFMC42LjK4B-gLwgcFMC40LjXIBx4&sclient=gws-wiz-serp#vhid=oIKHxRHpbe9aQM&vssid=_IPz1aML2M6HaseMP3syl4QQ_56"
        }
    }
)

const User = mongoose.model("users",userSchema)


export default User;