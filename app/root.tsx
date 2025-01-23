import '@tensorflow/tfjs-backend-webgl';
import notFoundLottie from './assets/not_found.json';
import { FirebaseAuth } from './config/firebase';
import { useNetworkStatusMonitor } from './hooks/useNetworkStatusMonitor';
import { useTheme } from './hooks/useTheme';
import { useLogoutMutation } from './routes/login/services/mutates';
import { policies } from './utils/constants/policies';
import { t, Trans } from '@lingui/macro';
import * as tf from '@tensorflow/tfjs';
import { onAuthStateChanged } from 'firebase/auth';
import Lottie from 'lottie-react';
import { Button } from 'primereact/button';
import { useIdleTimer } from 'react-idle-timer';
import { Outlet, useRouteError } from 'react-router-dom';

async function initializeBackend() {
  await tf.setBackend('webgl'); // Ensure the WebGL backend is explicitly set
  await tf.ready();
}

export default function Component() {
  initializeBackend();
  useTheme();
  useNetworkStatusMonitor();
  const navigate = useNavigate();
  const { mutate: Logout } = useLogoutMutation();

  useIdleTimer({
    debounce: 500,
    onIdle: async () => {
      showToast({
        detail: t`User is idle`,
        severity: 'warn',
        sticky: true,
        summary: t`Idle`,
      });

      try {
        // Get persistence type from localStorage
        const persistenceType = localStorage.getItem('persistenceType');

        // Perform logout only if the session is not persistent
        if (persistenceType === 'LOCAL') {
          Logout();
          showToast({
            detail: t`User signed out due to inactivity`,
            severity: 'success',
            sticky: true,
            summary: t`Idle`,
          });
        } else {
          showToast({
            detail: t`Session is persistent, user remains signed in.`,
            severity: 'info',
            summary: t`Idle`,
          });
        }
      } catch (error) {
        showToast({
          // @ts-expect-error fix-later
          detail: t`Error signing out: ${error.message}`,
          severity: 'error',
          sticky: true,
          summary: t`Idle`,
        });
      }
    },
    timeout: policies.UserLogoutTimeOut,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FirebaseAuth]);

  return (
    <>
      <title>OES - Online Examination System</title>
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const navigate = useNavigate();
  const { mutate: Logout } = useLogoutMutation();
  const error = useRouteError();

  const navigationButtons = (
    <div className="flex gap-5">
      <Button icon="pi pi-home" label={t`Home`} onClick={() => navigate('/')} />
      <Button
        icon="pi pi-power-off"
        label={t`Log out`}
        onClick={() => Logout()}
        severity="contrast"
      />
    </div>
  );

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {
        // @ts-expect-error no error typing
        error?.status === 404 ? (
          <div className="relative ">
            <Lottie animationData={notFoundLottie} className="w-70vw h-70vh" />
            <div className="absolute top-70% left-15%">{navigationButtons}</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <h3>
              <Trans>Something went wrong</Trans>
            </h3>
            {navigationButtons}
          </div>
        )
      }
    </div>
  );
}
