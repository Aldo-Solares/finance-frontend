// @/app/auth/login/page.tsx

import { LoginForm } from '@/modules/auth/components/login-form';
import { AuthPageLayout } from '@/shared/components/pages/auth-page-layout';

export default function LoginPage() {
  return (
    <AuthPageLayout variant="grey">
      <LoginForm />
    </AuthPageLayout>
  );
}