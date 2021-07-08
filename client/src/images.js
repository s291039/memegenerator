

function Objects() {
    const a = new Array();
    for(let i=1; i<5; i++){
        let i1 = { name: i, src: `${process.env.PUBLIC_URL + '/images/' + i +'.jpg'}` };
        a.push(i1);
    }
    return a;
}

export default Objects;