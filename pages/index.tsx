import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NextLink from 'next/link';
import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Upload from '../components/upload'
import UsersTable from '../components/usersTable'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/usersTable">Users Table</Link>
                </li>
                <li>
                  <Link to="/upload">Upload File</Link>
                </li>
                <li>
                  <NextLink href="/settings">Settings</NextLink>
                </li>
              </ul>

              <Routes>
                <Route path="/usersTable" element={<UsersTable/>} />
              </Routes>
              <Routes>
                <Route path="/upload" element={<Upload/>} />
              </Routes>
            </div>
          </Router>
        </Container>
      </Layout>
    </>
  )
}