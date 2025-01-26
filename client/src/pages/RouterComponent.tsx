import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import { ErrorPage } from './ErrorPage/ErrorPage';
import { ServiceDetailsPage } from './ServiceDetailsPage/ServiceDetailsPage';
import { Home } from './Home/Home';
import { Rankings } from './Rankings/Rankings';
import HeadToHead from './HeadToHead/HeadToHead';
import Layout from '../components/Layout/Layout';
import { HeadToHeadSelectionModeContextProvider } from '../context/HeadToHeadSelectionModeContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../assets/routerTransitions/routerTransitions.css'

export const RouterComponent = () => {

  return (
      <>
        <Router>
          <HeadToHeadSelectionModeContextProvider>
            <Layout>
              <AnimatedRouter/>
            </Layout>
          </HeadToHeadSelectionModeContextProvider>
        </Router>
      </>
  );
};

const AnimatedRouter = () =>{

  let location = useLocation()

  return(
      <>
        <TransitionGroup>
          <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={300}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                  path="/service/:serviceID"
                  element={<ServiceDetailsPage />}
              />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/head-to-head" element={<HeadToHead />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </>
  )
}