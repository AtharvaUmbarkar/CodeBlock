import AuthContext from '@/components/app/AuthContext';
import Root from '@/components/app/Root';
import MUIThemeProvider from '@/styles/mui/MUIThemeProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';

import '@/styles/base.css'
import '@/styles/globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head />
      <AuthContext session={session}>
        <MUIThemeProvider>
          <Root>
            {children}
          </Root>
        </MUIThemeProvider>
      </AuthContext>
    </html>
  )
}
