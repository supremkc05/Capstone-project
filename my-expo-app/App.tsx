import './global.css'
import Index from 'Index';
import { store } from './redux/store/store';
import { Provider } from 'react-redux'


export default function App() {
  return (
    <>
    <Provider store={store}>
      <Index />
    </Provider>
    </>
  );
}
