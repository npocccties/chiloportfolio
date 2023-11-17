import { loggerDebug, loggerInfo } from '@/components/util/Logger';
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const maxAgeHour = Number(process.env.SESSION_MAX_AGE_HOUR as string)

loggerInfo('************** start NextAuth **************')

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials: any, req) {
        const passArray = process.env.NEXTAUTH_PASSWORD?.split(',')
        for (var i = 0; passArray && i < passArray.length; i++) {
          const pass = passArray[i]
          if (credentials.password != pass) {
            console.log(`Credentials not valid`);
            return null;
          }
          const user = {
            id: `${i + 1}`,
            name: `admin${i + 1}`
          }
          return user
        }
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: maxAgeHour * 60 * 60,
  },
  pages: {
    signIn: '/portfolio/auth/signin',
  },
});
