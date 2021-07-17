
exports.getMemes = async (activeFilter, setMemes, setLoading) => {
    const response = await fetch('/api/memes?filter=' + activeFilter);
    const responseBody = await response.json();
    if (response.ok) {
        setMemes(responseBody);
        setLoading(false);
    }
}

exports.addMeme = async (meme) => {
    try {
        const response = await fetch('/api/memes', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                title: meme.title,
                imgCode: meme.imgCode,
                is_protected: meme.is_protected,
                creator: meme.creator,
                text1: meme.text1,
                text2: meme.text2,
                text3: meme.text3,
                textColor: meme.textColor,
                textFont: meme.textFont,
                textSize: meme.textSize,
                textUppercase: meme.textUppercase,
                textBold: meme.textBold,
                textItalic: meme.textItalic,
                date: meme.date
            }),
        })
        if (response.ok) {
            console.log(response.json())
        }
    } catch (e) {
        console.warn(e);
    }
}

exports.logIn = async (credentials) => {
    let response = await fetch('api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user.name;
    }
    else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      }
      catch(err) {
        throw err;
      }
    }
  }
