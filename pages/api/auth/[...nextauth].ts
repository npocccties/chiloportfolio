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
        if (credentials.password != process.env.NEXTAUTH_PASSWORD) {
          console.log(`Credentials not valid`);
          return null;
        }
        const user = {
          id: '1',
          name: 'admin'
        }
        return user
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: maxAgeHour * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
  },
});
