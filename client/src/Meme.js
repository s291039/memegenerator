import { Col, Row, Container, Figure, Image } from "react-bootstrap";
import { useState, useEffect } from 'react';
import * as Icons from 'react-bootstrap-icons';
import './meme.css';


const dayjs = require('dayjs')

function Meme(props) {

    const [color, setColor] = useState("black");
    const blackRed = () => {
        if (color === "red")
            setColor("black");
        else
            setColor("red");
    }
    {/*
        <Row className="px-3">
            <Col className="user-select-none no-min-width text-left">
                {props.title}
            </Col>
            <Col xs="auto" className="text-center text-align-center">
                {props.is_protected ? <Icons.PersonFill color="black" /> : " "}
            </Col>
            <Col className="text-center text-truncate  d-none d-sm-block">
                {props.date}
            </Col>
            <Col xs="auto" className="text-right text-align-center">
                <Icons.PencilSquare color={color} className="mx-2" onClick={() => blackRed()} />
                <Icons.Trash color="red" />
            </Col>
        </Row>
        */}
    return (
        <>
            <div >
                {/*meme*/}
                <Row>
                </Row>
                {/*title*/}
                <Row>
                    {props.title}
                </Row>
                {/*creator*/}
                <Row>
                    {props.creator}
                </Row>
            </div>
        </>
    )
}

{/*
    {props.memes.map((meme) => {
            console.log(meme);
            return <Meme
                key={meme.id}
                title={meme.title}
                is_protected={meme.is_protected}
                creator={meme.creator}
                text1={meme.text1}
                text2={meme.text2}
                text3={meme.text3}
                date={dayjs(meme.date).format("ddd MM/DD/YYYY")} />
        })}

*/}

function MemeManager(props) {
    return <>
        {props.loading && <span>Loading...</span>}
        {props.memes.map((meme) => {
            return <>
                <Figure as={Col} xs = "6" sm = "5" md="4" lg="3" xl = "2"  align="center" key={meme.id}>
                    <div
                        className={"background_meme" + " text_image" + `${meme.imgCode}`}
                        style={{ backgroundImage: 'url(/images/' + meme.imgCode + '.jpg)' }}
                        as={Col}
                        lg="25"
                        md="25"
                        align="center"
                        onClick={() => {
                            props.handleSelectedPreview(meme);
                            props.handleFormState('clone');
                            props.handleShow(true);
                        }}>
                        
                        <div
                            style={{
                                color: `${meme.textColor}`,
                                fontFamily: `${meme.textFont}`,
                                fontSize: `${(meme.textSize)/2}px`,
                                textTransform: `${meme.textUppercase}`,
                                fontWeight: `${meme.textBold}`,
                                fontStyle: `${meme.textItalic}`
                            }}>
                            {meme.text1}
                        </div>
                        {meme.text2 == '' ? '' :
                            <div
                                style={{
                                    color: `${meme.textColor}`,
                                    fontFamily: `${meme.textFont}`,
                                    fontSize: `${(meme.textSize)/2}px`,
                                    textTransform: `${meme.textUppercase}`,
                                    fontWeight: `${meme.textBold}`,
                                    fontStyle: `${meme.textItalic}`
                                }}>
                                {meme.text2}
                            </div>
                        }
                        {meme.text3 == '' ? '' :
                            <div
                                style={{
                                    color: `${meme.textColor}`,
                                    fontFamily: `${meme.textFont}`,
                                    fontSize: `${(meme.textSize)/2}px`,
                                    textTransform: `${meme.textUppercase}`,
                                    fontWeight: `${meme.textBold}`,
                                    fontStyle: `${meme.textItalic}`
                                }}>
                                {meme.text3}
                            </div>
                        }
                    </div>
                    <Figure.Caption align="center">
                        {meme.title}
                    </Figure.Caption>
                    <Figure.Caption align="center">
                        {meme.creator != "" ? meme.creator : "---"}
                    </Figure.Caption>
                </Figure>
            </>
        })}
    </>
}

function ImagesManager(props) {
    return <>
        {props.loading && <span>Loading...</span>}
        {props.templates.map((img) => {
            return <Figure as={Col} lg="2" xs="4" key={img.key} align="center" >
                <Image
                    align="center"
                    width={171}
                    height={180}
                    src={img.src}
                    thumbnail
                    onClick={() => props.setImage(img)}
                />
            </Figure>
        })}
    </>
}

export { Meme, MemeManager, ImagesManager };

