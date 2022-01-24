import '../styles/globals.css'
import { AppContextProvider } from '../src/utils/AppContext'

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp
