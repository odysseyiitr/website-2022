import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}backend/api/github/`)

const settings = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      
      return session
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, settings)