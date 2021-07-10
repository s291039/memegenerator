

function Objects() {
    const a = new Array();
        let i1 = { key: 1, src: `${process.env.PUBLIC_URL + '/images/1.jpg'}`, textNum: 1 };
        let i2 = { key: 2, src: `${process.env.PUBLIC_URL + '/images/2.jpg'}`, textNum: 2 };
        let i3 = { key: 3, src: `${process.env.PUBLIC_URL + '/images/3.jpg'}`, textNum: 2 };
        let i4 = { key: 4, src: `${process.env.PUBLIC_URL + '/images/4.jpg'}`, textNum: 2 };
        let i5 = { key: 5, src: `${process.env.PUBLIC_URL + '/images/5.jpg'}`, textNum: 2 };
        let i6 = { key: 6, src: `${process.env.PUBLIC_URL + '/images/6.jpg'}`, textNum: 3 };
        a.push(i1);
        a.push(i2);
        a.push(i3);
        a.push(i4);
        a.push(i5);
        a.push(i6);
    return a;
}

export default Objects;