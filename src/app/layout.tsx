import AuthContext from '@/components/app/AuthContext';
import Root from '@/components/app/Root';
import { getServerSession } from 'next-auth';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head />
      <AuthContext session={session}>
        <Root>
          {children}
        </Root>
      </AuthContext>
    </html>
  )
}
