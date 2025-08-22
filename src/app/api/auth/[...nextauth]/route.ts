
import NextAuth from 'next-auth';
import { authOptions } from '../../../../../authConfig'

// ✅ v5 syntax: NextAuth returns { GET, POST }
export const { GET, POST } = NextAuth(authOptions).handlers;