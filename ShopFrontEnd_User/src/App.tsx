import './App.css'
import RouteComponent from "./Page/RouteComponent.tsx"
import 'react-horizontal-scrolling-menu/dist/styles.css';
import "./CSS/CardAnimation.css"
import "./CSS/ProductDescription.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
function App() {

    return (
        <div style={{minHeight:"100vh"}}>
            <RouteComponent  />
        </div>
    )
}

export default App
