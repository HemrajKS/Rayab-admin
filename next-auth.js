// next-auth.js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form (e.g., "Email Address")
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: {  label: 'Password',  type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          // Make a POST request to your external login API with credentials
          const response = await fetch('https://your-backend-api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const user = await response.json();
            // Return user data or null if authentication fails
            return Promise.resolve(user);
          } else {
            // Return null if authentication fails
            return Promise.resolve(null);
          }
        } catch (error) {
          // Handle network or other errors
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    // Add any required callbacks here
  },
  session: {
    jwt: false,
  },
});
