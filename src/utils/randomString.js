const randomString = (stringLenght) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < stringLenght; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
      return result;
}

module.exports = {randomString};