import clientPromise from '@/lib/mongodb'
import { Typography } from '@mui/material'
import { GetServerSidePropsContext } from 'next'

export interface HomeProps {
  isConnected: Boolean
}

export default function Home({ isConnected }: HomeProps) {
  return (
    <>
      <Typography variant='h4' component='h1' gutterBottom>
        Welcome to Beyond Ripped
      </Typography>
      {isConnected && (
        <Typography variant='caption'>Connected to DB</Typography>
      )}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true }
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false }
    }
  }
}
