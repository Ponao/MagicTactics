const footer = require("./footer")
const header = require("./header")

function getTimezoneOffset() {
    function z(n){return (n<10? '0' : '') + n}
    let offset = new Date().getTimezoneOffset();
    let sign = offset < 0? '+' : '-';
    offset = Math.abs(offset);
    return sign + z(offset/60 | 0);
}

module.exports = function getConfirmEmail(name, avatar, lesson, user) {
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
        ">Just a quick email to let you<br/>know your lesson</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 41px;
            text-align: center;
            color: #000;
            margin-top: 40px;
        ">LESSON</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 42px;
            text-align: center;
            color: #6930C3;
        ">${lesson.subject.title}</div>
        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 36px;
            text-align: center;
            color: #6C6C6C;
            margin-top: 5px;
        ">will in one Hour!</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 36px;
            text-align: center;
            color: #6C6C6C;
            margin-top: 50px;
        ">The Lesson will start on</div>

        <div style="
            margin: 0 auto;
            width: max-content;
            margin-top: 10px;
        ">
            <div style="
                display: inline-block;
                border: 1px dashed #000000;
                width: 244px;
                margin-right: 7px;
                border-radius: 6px;
                padding: 10px 12px;
            ">
                <div style="
                    font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 31px;
                    text-align: center;
                    color: #6C6C6C;
                ">Date</div>
                <div style="
                    font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 42px;
                    text-align: center;
                    color: #6930C3;
                ">${new Date(lesson.startTime + ((Number(getTimezoneOffset()) - Number(user.gmt)) * 1000 * 60 * 60)).toLocaleDateString()}</div>
            </div>
            <div style="
                display: inline-block;
                border: 1px dashed #000000;
                width: 244px;
                margin-left: 7px;
                border-radius: 6px;
                padding: 10px 12px;
            ">
                <div style="
                    font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 31px;
                    text-align: center;
                    color: #6C6C6C;
                ">Time</div>
                <div style="
                    font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 42px;
                    text-align: center;
                    color: #6930C3;
                ">${new Date(lesson.startTime + ((Number(getTimezoneOffset()) - Number(user.gmt)) * 1000 * 60 * 60)).toLocaleTimeString()}</div>
            </div>
        </div>

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
        " href="${process.env.CLIENT_URL}/my-lessons">
            MY LESSONS
        </a>
        
        <img style="
            width: 25%;
            margin: 28px auto;
            display: block;
        " src="${process.env.API_URL}/static/ThanksImg.png" />
    </div>
    ${footer()}`
}