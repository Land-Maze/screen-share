import '../Styles/Footer.scss';

const Footer = () => {
    return(
        <footer className="footer">
            <hr/>
            <span className="footer-text">
                Created by Timur Jesur <span style={{fontSize: "0.8rem"}}>aka</span> <a href="https://www.github.com/Land-Maze" target="_blank" rel="noreferrer" className="footer-link">Land Maze</a>
            </span>
        </footer>
    )
}

export { Footer };