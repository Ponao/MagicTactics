const footer = require("./footer")
const header = require("./header")

module.exports = function getConfirmEmail(name, code) {
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
        ">Welcome to the<br/>TheTutor.Link</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 27px;
            text-align: center;
            margin-top: 40px;
            color: #000;
        ">We're thrilled you're here!</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 27px;
            text-align: center;
            margin-top: 40px;
            color: #000;
        ">To get started Please Copy & Paste<br/>this code to the registration Page</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 54px;
            text-align: center;
            margin: 0 auto;
            padding: 10px 62px;
            border: 2px solid #000000;
            border-radius: 12px;
            width: max-content;
            color: #663EC6;
            margin-top: 40px;
        ">
            ${code}
        </div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 27px;
            text-align: center;
            margin-top: 40px;
            color: #000;
        ">There you’ll be able to complete your profile<br/>and start using the platform</div>

        <img style="
            width: 25%;
            margin: 28px auto;
            display: block;
        " src="${process.env.API_URL}/static/ThanksImg.png" />
    </div>
    ${footer()}`
}