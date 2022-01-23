import AccountMovement from '../src/components/AccountMovement'
import Layout from '../src/components/Layout'

const Home = () => {
  return (
    <Layout>
      <main className="min-h-full flex flex-col justify-center items-center py-16">
        <AccountMovement />
      </main>
    </Layout>
  )
}

export default Home
