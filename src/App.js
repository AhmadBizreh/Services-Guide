import { Switch, Route ,Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';


function App() {
  const isLogin = useSelector(state => state.auth.isAuth);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLogin && <Route path='/auth'>
          <AuthPage />
        </Route>}
        {isLogin && <Route path='/profile'>
          <UserProfile />
        </Route>}
        <Route path={'*'}>
            <Redirect to={'/'} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
