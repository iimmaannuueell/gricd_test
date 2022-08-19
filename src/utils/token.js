

exports.generate = (tokenLenght) => {
    // const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters ='0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < tokenLenght; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
      return result;
}