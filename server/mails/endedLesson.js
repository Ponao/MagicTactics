const footer = require("./footer")
const header = require("./header")

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
        ">Thank you very much for<br/>participating in the lesson<br/>today.</div>

        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 36px;
            text-align: center;
            color: #6C6C6C;
            margin-top: 60px;
        ">Please Click the below Link to Review your Student</div>

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
        " href="${process.env.CLIENT_URL}/leave-review?lessonId=${lesson._id}">
            REVIEW YOUR ${lesson.student._id === user._id ? 'TUTOR' : 'STUDENT'}
        </a>
        
        <div style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 36px;
            text-align: center;
            color: #6C6C6C;
            margin-top: 60px;
        ">Remember every review<br/>counts<br/>Every Decision to book a<br/>lesson may be based on your<br/>review!</div>
        
        <img style="
            width: 25%;
            margin: 28px auto;
            display: block;
        " src="${process.env.API_URL}/static/ThanksImg.png" />
    </div>
    ${footer()}`
}