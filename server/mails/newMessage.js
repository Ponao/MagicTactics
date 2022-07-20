const footer = require("./footer")
const header = require("./header")

module.exports = function getConfirmEmail(name, avatar, otherName, otherId) {
    return `
    ${header()}
    <div style="
        width: 600px;
        background: #fff;
        padding-top: 20px;
        margin: 0 auto;
    ">
    ${!!avatar.length ? `<img style="
    width: 238px;
    height: 238px;
    object-fit: cover;
    margin: 0 auto;
    display: block;
    border-radius: 8px;
" src="${avatar}" />` : `<img style="
    width: 60%;
    margin: 0 auto;
    display: block;
" src="${process.env.API_URL}/static/ConfirmImg.png" />`}

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
        ">You have new messages<br/>from ${otherName}</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 27px;
            text-align: center;
            margin-top: 40px;
            color: #000;
        ">In order to open messages,<br/>click on the button below</div>

        <a style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 26px;
            text-align: center;
            margin: 0 auto;
            padding: 18px 62px;
            text-decoration: none;
            width: 35%;
            color: #fff;
            margin-top: 40px;
            background: #6930C3;
            display: block;
        " href="${process.env.CLIENT_URL}/chats/${otherId}">
            OPEN CHAT
        </a>
        
        <img style="
            width: 25%;
            margin: 28px auto;
            display: block;
        " src="${process.env.API_URL}/static/ThanksImg.png" />
    </div>
    ${footer()}`
}