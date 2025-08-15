import { Route, Routes } from 'react-router'
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function RoutesConfig() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default RoutesConfig;