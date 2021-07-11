import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Image, Button } from "react-bootstrap"
import './App.css';
import MyNavbar from './MyNavbar'
import MySidebar from './MySidebar'
import MainContent from './MainContent'
import { MyForm, MyPreviewForm } from './MyForm'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import * as Icons from 'react-bootstrap-icons';
import * as API from './API';
import { Helmet } from 'react-helmet';
import './meme.css';
import './rainbowText.css'
import Objects from './images'




function App() {

  const [formState, setFormState] = useState('create');

  const [activeFilter, setActiveFilter] = useState("All");
  const [publicMemes, setPublicMemes] = useState([]);
  const [templates, setTemplates] = useState(Objects().map((ob) => { return ob }));

  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleShow = (bool) => setShow(bool);

  const [showPreviewForm, setShowPreviewForm] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState({});

  const handleSelectedPreview = (preview) => {
    setSelectedPreview(preview);
    setFormState('preview');
    setShowPreviewForm(true);
  }

  const handleFormState = (state) => {
    setFormState(state);
  }

  useEffect(() => {
    API.getMemes(activeFilter, setPublicMemes, setLoading);
  }, [activeFilter]);

  const addMeme = (meme) => {
    setPublicMemes(oldMemes => [...oldMemes, meme]);
    API.addMeme(meme)
  }

  const setFilter = (filter) => {
    setActiveFilter(filter);
  }

  return (
    <Router>
      <Switch>

        {/* -------- Main ---------- */}
        <Route path='/main' render={() =>
          <>
            <MyNavbar />
            <Row>
              <Col xs={3} className="d-none d-sm-block">
                <MySidebar activeFilter={activeFilter} setFilter={setFilter} logged={logged} />
              </Col>
              <Col>
                <MainContent
                  activeFilter={activeFilter}
                  memes={publicMemes}
                  handleSelectedPreview={handleSelectedPreview}
                  loading={loading}
                  handleShow={handleShow}
                  handleFormState={handleFormState}
                />

                <MyForm
                  addMeme={addMeme}
                  templates={templates}
                  handleShow={handleShow}
                  show={show}
                  formState={formState}
                  showPreviewForm={showPreviewForm}
                  selectedPreview={selectedPreview}
                />
                <hr />
              </Col>
            </Row>
            <Row className="d-flex justify-content-end px-4" >
              <Button variant="primary" style={{ width: "125px", height: "40px" }} onClick={
                () => {
                  handleShow(!show);
                  handleFormState('create');
                }}>
                <h7 className="rainbow-text2">New Meme</h7>
              </Button>
            </Row>
          </>}
        />

        {/* -------- Root ---------- */}
        <Route path='/' render={() => <>
          <Helmet>
            <style>{'body { background-color: #003366; }'}</style>
          </Helmet>
          <div className= "mt-5">
          <h1 className="rainbow-text"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "70px",
              fontFamily: 'Luckiest Guy',
            }}
            > Meme Generator</h1>
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
          </div>
        </>}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;