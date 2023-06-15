import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.API_ENDPOINT}/auth/signin`, {
                   
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });
                const token = await res.json();
                if (token.token) {
                    return token
                }
                else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log(token, user);
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token;
            
            return session
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
          },
    },
    pages: {
        signIn: '/signin',
    },
    secret:process.env.SECRET
    
});

export { handler as GET, handler as POST }