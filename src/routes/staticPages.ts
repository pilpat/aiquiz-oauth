// src/routes/staticPages.ts - Static Page Handlers
import { renderPublicHomePage } from '../views';

/**
 * Handle root path (/) with subdomain-aware routing
 * - panel.aiquiz.pl: Serve public home page (login/registration)
 * - api.aiquiz.pl: Show API status page
 */
export async function handleRootPath(request: Request): Promise<Response | null> {
  const url = new URL(request.url);

  // Only handle root path
  if (url.pathname !== '/' && url.pathname !== '') {
    return null;
  }

  const hostname = request.headers.get('host') || '';

  // Dashboard subdomain - serve public home page (login/registration)
  if (hostname.includes('panel.aiquiz.pl')) {
    return new Response(renderPublicHomePage(), {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // API subdomain - show API status page
  if (hostname.includes('api.aiquiz.pl')) {
    return new Response(JSON.stringify({
      service: 'AI Quiz OAuth Provider',
      status: 'operational',
      version: '1.0.0',
      endpoints: {
        oauth_authorize: '/oauth/authorize',
        oauth_token: '/oauth/token',
        oauth_userinfo: '/oauth/userinfo',
        oauth_revoke: '/oauth/revoke',
        well_known: '/.well-known/oauth-authorization-server'
      },
      documentation: 'https://aiquiz.pl/docs'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Unknown subdomain - return null to allow 404 handling
  return null;
}

/**
 * Handle privacy policy page (/privacy)
 */
export async function handlePrivacyPolicy(): Promise<Response> {
  const html = await fetch('https://panel.aiquiz.pl/legal/privacy-policy.html')
    .then(r => r.text())
    .catch(() => `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Polityka Prywatności - AI Quiz</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    h1 { color: #667eea; margin-bottom: 20px; }
    .back-link {
      display: inline-block;
      margin-top: 30px;
      padding: 12px 24px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 8px;
    }
    .back-link:hover { background: #764ba2; }
    .info { color: #666; margin: 20px 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Polityka Prywatności</h1>
    <p class="info">
      Pełna Polityka Prywatności jest obecnie przygotowywana.<br><br>
      W międzyczasie prosimy o kontakt: <a href="mailto:support@aiquiz.pl" style="color: #667eea;">support@aiquiz.pl</a>
    </p>
    <a href="https://panel.aiquiz.pl" class="back-link">← Wróć do panelu</a>
  </div>
</body>
</html>
    `);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

/**
 * Handle terms of service page (/terms)
 */
export async function handleTermsOfService(): Promise<Response> {
  const html = await fetch('https://panel.aiquiz.pl/legal/terms-of-service.html')
    .then(r => r.text())
    .catch(() => `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Regulamin - AI Quiz</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    h1 { color: #667eea; margin-bottom: 20px; }
    .back-link {
      display: inline-block;
      margin-top: 30px;
      padding: 12px 24px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 8px;
    }
    .back-link:hover { background: #764ba2; }
    .info { color: #666; margin: 20px 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Regulamin Świadczenia Usług</h1>
    <p class="info">
      Pełny Regulamin jest obecnie przygotowywany.<br><br>
      W międzyczasie prosimy o kontakt: <a href="mailto:support@aiquiz.pl" style="color: #667eea;">support@aiquiz.pl</a>
    </p>
    <a href="https://panel.aiquiz.pl" class="back-link">← Wróć do panelu</a>
  </div>
</body>
</html>
    `);

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
