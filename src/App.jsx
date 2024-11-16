import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/default/DefaultComponent'
import Footer from './pages/FooterPage/Footer'

export default function App() {

  return (
    <Router>
      <div className="bg-gradient-to-r from-green-200 via-blue-200 to-white h-100">
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <div className='container'>
                    <Page />
                  </div>
                </Layout>
              } />
            )
          })}
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}
