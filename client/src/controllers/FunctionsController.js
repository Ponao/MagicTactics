export function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

export function setTitle(path, routeArray) {
    let pageTitle
    
	for (let i = 0; i < routeArray.length; i++) {
		if (routeArray[i].path === path) {
			pageTitle = routeArray[i].title
		}
    }
    
	document.title = (pageTitle) ? pageTitle : `404 - ${process.env.REACT_APP_NAME}`
}

export function setCustomTitle(title) {
	document.title = title
}

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function scrollChatToBottom() {
	let chat = document.getElementById("chat-messages");
	chat = !!chat ? chat.getElementsByClassName('simplebar-content-wrapper')[0] : false

	if(!!chat)
		setTimeout(() => {chat.scrollTop = chat.scrollHeight}, 0)
}

export function scrollChatToBottomIfBottom() {
	let chat = document.getElementById("chat-messages");
	chat = !!chat ? chat.getElementsByClassName('simplebar-content-wrapper')[0]: false
	
	if(!!chat) {
		if(chat.scrollTop === (chat.scrollHeight - chat.offsetHeight)) {
			setTimeout(() => {chat.scrollTop = chat.scrollHeight}, 0)
		}
	}
}

export function declension(n, text_forms) {  
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 === 1) { return text_forms[0]; }
    return text_forms[2];
}