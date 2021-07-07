import img1 from './images/hermione.jpg';
import img2 from './images/messi.jpg';
import img3 from './images/spongebob.jpg';
import img4 from './images/guy.jpg';

function Objects() {
    let i1 = { name: "hermione", src: img1 };
    let i2 = { name: "messi", src: img2 };    
    let i3 = { name: "spongebob", src: img3 };
    let i4 = { name: "guy", src: img4 };
    const a = new Array();
    a.push(i1);
    a.push(i2);
    a.push(i3);
    a.push(i4);
    return a;
}

export default Objects;