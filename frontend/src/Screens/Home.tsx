import '../Styles/Home.scss';
import { Nav } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import { StreamPlayer } from '../Components/StreamPlayer';
import { RoomContext } from '../Context/RoomContext';
import { useContext } from 'react';


// import screen_fullhd from '../Assets/windows7_fullhd.png';
// import screen_4_3 from '../Assets/windows7_4..3.jpg';

const Home = () => {

    const { stream } = useContext(RoomContext);

    // console.log(stream)

    return (
        <div id="home">
            <Nav></Nav>

            <div id="home-content">
                <StreamPlayer stream={stream}></StreamPlayer>

            </div>

            <Footer/>

        </div>
    );
}


export {
    Home
}