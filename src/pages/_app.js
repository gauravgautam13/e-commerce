import '@/styles/globals.css';
import MyDataProvider from './api/context/context';

export default function App({ Component, pageProps }) {
  return <MyDataProvider> 
         <Component {...pageProps} />
         </MyDataProvider>
}
