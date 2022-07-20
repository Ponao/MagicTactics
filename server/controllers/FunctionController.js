module.exports = {
    randomInteger: (min, max) => {
        let rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
    },
    randomString: (length) => {
        let result = []
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
        }
        return result.join('')
    },
    getRandomColor: () => {
        let colors = ["26, 188, 156",'46, 204, 113','52, 152, 219','155, 89, 182','233, 30, 99','241, 196, 15','230, 126, 34','231, 76, 60']
        
        let rand = 0 + Math.random() * (7 + 1 - 0)
        return colors[Math.floor(rand)]
    },
    checkIfDuplicateExists: (arr) => {
        return new Set(arr).size !== arr.length
    },
    shuffleArray: (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
}