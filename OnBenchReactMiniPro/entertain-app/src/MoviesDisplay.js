import Banner from './Banner';
import './MoviesDisplay.css';
import requests from './requests';
import Row from './Row';

function MoviesDisplay() {
    return (
        <div>
            <div>
                <Banner />
            </div>
            <div>
                <Row 
                    title="Netflix Original" 
                    fetchUrl={requests.fetchNetflexOriginals}
                    isLargeRow/>
                <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
                <Row title="Horrow Movies" fetchUrl={requests.fetchHorrowMovies}/>
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            </div>
        </div>
    )
}
export default MoviesDisplay
