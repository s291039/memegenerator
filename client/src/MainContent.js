import { MemeManager } from './Meme'

function MainContent(props) {

    //const [memes, setMemes] = useState([]);

    return (
        <>
            {/*<h1 className="px-3">{props.activeFilter}</h1>*/}
            <br />
            <MemeManager key={"100"}
                activeFilter={props.activeFilter}
                handleSelectedPreview={props.handleSelectedPreview}
                memes={props.memes}
                loading={props.loading}
                handleShow={props.handleShow}
                handleFormState={props.handleFormState}
            />
        </>
    );
}

export default MainContent;