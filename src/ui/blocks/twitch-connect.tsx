import React, { useEffect, useState } from 'react';
import { Button } from '../components/button';

interface TwitchConnectProps {
  onAuthSuccess?: (token: string) => void;
}

interface TwitchTokenResponse {
  access_token: string;
  expires_in?: number;
  scope?: string[];
  token_type?: string;
}

const TwitchConnect: React.FC<TwitchConnectProps> = ({ onAuthSuccess }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cleanup = window.twitchAuth.onAuthResult((data: TwitchTokenResponse) => {
      setToken(data.access_token);
      setIsAuthenticating(false);

      if (onAuthSuccess) {
        onAuthSuccess(data.access_token);
      }
    });

    return cleanup
  }, [onAuthSuccess]);

  const handleLogin = () => {
    setIsAuthenticating(true);
    setError(null);

    try {
      window.twitchAuth.requestAuth();
    } catch (err) {
      setIsAuthenticating(false);
      setError('Failed to initiate auth process');
      console.error('Auth request error:', err);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Twitch Authentication</h2>

      {token ? (
        <div>
          <p>Authentication successful!</p>
          <p>Token: {token.substring(0, 10)}...</p>
          <Button
            onClick={() => setToken(null)}
            className="logout-button"
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div>
          <p>Please authenticate with your Twitch account to continue.</p>
          <Button
            onClick={handleLogin}
            disabled={isAuthenticating}
            className="login-button"
          >
            {isAuthenticating ? 'Authenticating...' : 'Login with Twitch'}
          </Button>
        </div>
      )}

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default TwitchConnect;
