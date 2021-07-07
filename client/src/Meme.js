import { Col, Row, Container, Figure, Image } from "react-bootstrap";
import { useState, useEffect } from 'react';
import * as Icons from 'react-bootstrap-icons';
import img1 from './images/hermione.jpg';
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
            return <Figure as={Col} lg="2" md="3" key = {meme.id} align="center">
            <Image
              align="center"
              width={171}
              height={180}
              alt="171x180"
              src= {img1}
              thumbnail
            />
            <Figure.Caption align="center">
              {meme.title}
            </Figure.Caption>
            <Figure.Caption align="center">
              {meme.creator}
            </Figure.Caption>
          </Figure>
        })}
    </>
}

function ImagesManager(props) {
    return <>
        {props.loading && <span>Loading...</span>}
        {props.images.map((img) => {
            return <Figure as={Col} lg="2" md="3" key = {img} align="center" > 
            <Image
              align="center"
              width={171}
              height={180}
              src= {img}
              thumbnail
              onClick = {() => props.setImage(img)}
            />
          </Figure>
        })}
    </>
}

export { Meme, MemeManager, ImagesManager };

