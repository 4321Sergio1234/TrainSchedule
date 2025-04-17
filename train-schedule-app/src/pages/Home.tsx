import ads from '../assets/ads.jpg'
import classes from './Home.module.css'

export default function Home(){
    return (
        <div className={classes.home}>
            <h1 className={classes.title}> Train Schedule Service </h1>
            <img src={ads} className={classes.adsImage}></img>
        </div>
    );
}