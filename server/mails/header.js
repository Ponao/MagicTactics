module.exports = function getHeaderEmail() {
    return `<div style="
        height: 50px;
        width: 600px;
        background: #F7F7F7;
        padding-top: 50px;
        border-bottom: 4px solid #8462EF;
        margin: 0 auto;
    ">
        <img style="
            width: 35%;
            margin: 0 auto;
            display: block;
        " src="${process.env.API_URL}/static/Logo.png" />
    </div>`
}