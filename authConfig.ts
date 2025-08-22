import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { Auth } from "@auth/core"
import WeChat from "@auth/core/providers/wechat"

export const authOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log('credentials=>',credentials);
                // if (!credentials?.email || !credentials.password) {
                //     throw new Error("Missing email or password");
                // }
                // const user = await User.findOne({ email: credentials?.email });
                // if (!user) {
                //     throw new Error("No user found with this email");
                // }
                // const isPasswordValid = await bcrypt.compare(credentials?.password as string, user.password);
                // if (!isPasswordValid) {
                //     throw new Error("Invalid password");
                // }
                // return { id: user._id.toString(), email: user.email, name: user.username };
                return null
            },
        }),

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),

        WeChat({
            clientId: process.env.AUTH_WECHAT_APP_ID,
            clientSecret: process.env.AUTH_WECHAT_APP_SECRET,
            platformType: "OfficialAccount",
    })
    ],
    callbacks: {
        //Invoked when a user logs in
        async signIn(props: any) {
            console.log("sign in props =>", props);
            return true
        },
        //Modify session object
        // async session({ session }) {
            
        // },
    },
   
    secret: process.env.NEXTAUTH_SECRET,
}