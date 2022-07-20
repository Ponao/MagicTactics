const footer = require("./footer")
const header = require("./header")

module.exports = function getResetEmail(name, token) {
    return `
    ${header()}
    <div style="
        width: 600px;
        background: #fff;
        padding-top: 20px;
        margin: 0 auto;
    ">
        <img style="
            width: 60%;
            margin: 0 auto;
            display: block;
        " src="${process.env.API_URL}/static/ConfirmImg.png" />

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 63px;
            text-align: center;
            color: #000;
        ">Hey ${name}</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 36px;
            text-align: center;
            color: #000;
        ">Looks like you need a<br/>New Password</div>


        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 22px;
            text-align: center;
            margin-top: 90px;
            color: #3F3E3E;
        ">Click here to reset Password</div>

        <a style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 26px;
            text-align: center;
            margin: 0 auto;
            padding: 18px 62px;
            text-decoration: none;
            width: 45%;
            color: #fff;
            margin-top: 40px;
            background: #6930C3;
            display: block;
        " href="${process.env.CLIENT_URL}/reset?token=${token}">
            RESET PASSWORD
        </a>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 22px;
            text-align: center;
            margin-top: 40px;
            color: #3F3E3E;
        ">If you did not request a password reset<br/>then please ignore this email</div>

        <img style="
            width: 25%;
            margin: 28px auto;
            display: block;
        " src="${process.env.API_URL}/static/ThanksImg.png" />
    </div>
    ${footer()}`
}