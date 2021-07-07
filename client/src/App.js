import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Image, Button } from "react-bootstrap"
import './App.css';
import MyNavbar from './MyNavbar'
import MySidebar from './MySidebar'
import MainContent from './MainContent'
import {MyForm, Example} from './MyForm'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import * as Icons from 'react-bootstrap-icons';
import * as API from './API';
import { Helmet } from 'react-helmet';
import './meme.css';
import Objects from './images'


function App() {

  const [activeFilter, setActiveFilter] = useState("All");
  const [memes, setMemes] = useState([]);
  const [images, setImages] = useState(Objects().map((ob) => { return ob.src }));

  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getMemes(activeFilter, setMemes, setLoading);
  }, [activeFilter]);

  const addMeme = (meme) => {
    setMemes(oldMemes => [...oldMemes, meme]);
    API.addMeme(meme)
  }

  const setFilter = (filter) => {
    setActiveFilter(filter);
  }

  return (
    <Router>
      <Switch>

        <Route path='/add' render={() =>
          <>
            <MyNavbar />
            <Container>
              <MyForm addMeme={addMeme} images={images} />
            </Container>
          </>

        } />

        <Route path='/main' render={() =>
          <>
            <MyNavbar />
            <Row>
              <Col xs={3}>
                <MySidebar activeFilter={activeFilter} setFilter={setFilter} logged={logged} />
              </Col>
              <Col>
                <MainContent activeFilter={activeFilter} memes={memes} loading={loading} />
                <MyForm addMeme={addMeme} images={images}/>
              </Col>
            </Row>
          </>}
        />

        <Route path='/' render={() => <>
          <Helmet>
            <style>{'body { background-color: #083464; }'}</style>
          </Helmet>
          <h1 style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 300,
            fontSize: "70px",
            color: "pink"
          }}> MEME GENERATOR</h1>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button
                style={{
                  width: "130px",
                  height: "50px",
                }} >LogIn</Button>
            </Col>
            <Col>
              <Link to="/main">
                <Button style={{ width: "150px", height: "50px" }}>Enter as guest</Button>
              </Link>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}>
            <Row>
              <Image src='https://media.giphy.com/media/VGuAZNdkPUpEY/giphy.gif' />
            </Row>
          </div>

        </>}>

        </Route>
      </Switch>
      <Row style={{ position: "absolute", bottom: "10px", right: "30px" }}>
        <Link to='/add'>
          <Icons.PlusCircle className="mx-2" size="2.6em" />
        </Link>
      </Row>
    </Router>
  );
}

export default App;