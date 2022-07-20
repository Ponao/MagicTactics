module.exports = function getFooterEmail() {
    return `<div style="
        height: max-content;
        width: 600px;
        background: #F7F7F7;
        padding: 30px 0;
        margin: 0 auto;
        text-align: center;
        color: #3F3E3E;
    ">
        <div style="
            width: max-content;
            margin: 0 auto;
            margin-bottom: 25px;
        ">
            <a style="
                display: inline-block;
                padding: 12px;
                background-color: #E4E4E4;
                border-radius: 50px;
                margin: 0 15px;
                box-sizing: border-box;
                height: 47px;
            " href="https://www.facebook.com/thetutordotlink">
                <img style="height: 23px;    width: 23px;
                object-fit: contain;" src="${process.env.API_URL}/static/FbImg.png" />
            </a>
            <a style="
                display: inline-block;
                padding: 12px;
                background-color: #E4E4E4;
                border-radius: 50px;
                margin: 0 15px;
                box-sizing: border-box;
                height: 47px;
            " href="https://www.instagram.com/thetutor.link/">
                <img style="height: 23px;    width: 23px;
                object-fit: contain;" src="${process.env.API_URL}/static/InstImg.png" />
            </a>
            <a style="
                display: inline-block;
                padding: 12px;
                background-color: #E4E4E4;
                border-radius: 50px;
                margin: 0 15px;
                box-sizing: border-box;
                height: 47px;
            " href="https://www.pinterest.co.uk/thetutorlink/">
                <img style="height: 23px;    width: 23px;
                object-fit: contain;" src="${process.env.API_URL}/static/PinterestImg.png" />
            </a>
            <a style="
                display: inline-block;
                padding: 12px;
                background-color: #E4E4E4;
                border-radius: 50px;
                margin: 0 15px;
                box-sizing: border-box;
                height: 47px;
            " href="https://twitter.com/TheTutorDotLink">
                <img style="height: 23px;    width: 23px;
                object-fit: contain;" src="${process.env.API_URL}/static/TwitterImg.png" />
            </a>
        </div>

        <a style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            text-transform: none;
            color: #3F3E3E;
            text-decoration: none;
            margin-right: 10px;
        " href="${process.env.CLIENT_URL}">Visit Website</a> 
        | 
        <a style="
            font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            text-transform: none;
            color: #3F3E3E;
            text-decoration: none;
            margin-left: 10px;
        " href="${process.env.CLIENT_URL}/privacy">Privacy Policy</a>
    </div>`
}