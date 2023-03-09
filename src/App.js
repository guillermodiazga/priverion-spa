import { Provider } from 'react-redux';
import AppRouter from './appRouter';
import Navigation from './navigation';
import Stack from 'react-bootstrap/Stack';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Stack gap={2} className="col-md-7 mx-auto">
        <Navigation />
        <br/>
        <AppRouter />
      </Stack>
    </Provider>
  );
}

export default App;