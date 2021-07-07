
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
            body: JSON.stringify({ title: meme.title, is_protected: meme.is_protected, creator: meme.creator, text1: meme.text1, text2: meme.text2, text3: meme.text3, date: meme.date }),
        })
        if (response.ok) {
            console.log(response.json())
        }
    } catch (e) {
        console.warn(e);
    }
}