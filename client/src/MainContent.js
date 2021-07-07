import {MemeManager} from './Meme'

function MainContent(props) {

    //const [memes, setMemes] = useState([]);
    
    return (
        <>
        {/*<h1 className="px-3">{props.activeFilter}</h1>*/}
        <br/>
        <MemeManager key = {"100"} activeFilter = {props.activeFilter} memes = {props.memes} loading = {props.loading}/>
        </>
    );
}

export default MainContent;