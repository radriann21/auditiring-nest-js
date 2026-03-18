import type { HeaderInfo } from '../interfaces/interfaces';

export const HEADERS_LIBRARY: Record<string, Record<string, HeaderInfo>> = {
  CrossOrigin: {
    'cross-origin-opener-policy': {
      secureValue: [
        'same-origin',
        'same-origin-allow-popups',
        'same-origin-plus-COEP',
        'report-to',
      ],
      purpose: 'cross-origin isolation',
      description:
        'Prevents other origins from opening the page in a browsing context that could read its contents.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy',
      severity: 'Medium',
    },
    'cross-origin-embedder-policy': {
      secureValue: 'require-corp',
      purpose: 'cross-origin embedding',
      description:
        'Prevents the page from loading resources from other origins unless they are explicitly allowed.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy',
      severity: 'Medium',
    },
    'cross-origin-resource-policy': {
      secureValue: 'same-origin',
      purpose: 'cross-origin resource policy',
      description:
        'Prevents the page from loading resources from other origins unless they are explicitly allowed.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy',
      severity: 'Medium',
    },
  },
  ContentRestriction: {
    'content-security-policy': {
      secureValue: "default-src 'self'",
      purpose: 'content security policy',
      description:
        'Prevents the page from loading resources from other origins unless they are explicitly allowed.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy',
      severity: 'High',
    },
    'x-frame-options': {
      secureValue: ['DENY', 'SAMEORIGIN'],
      purpose: 'frame options',
      description: 'Prevents the page from being embedded in an iframe.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options',
      severity: 'High',
    },
    'x-content-type-options': {
      secureValue: 'nosniff',
      purpose: 'content type options',
      description:
        'Prevents the page from being served with a wrong content type.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options',
      severity: 'Medium',
    },
  },
  Privacy: {
    'clear-site-data': {
      secureValue: 'cache, cookies, storage, executionContexts',
      purpose: 'clear site data',
      description: 'Clears all site data from the browser.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data',
      severity: 'Low',
    },
    'cache-control': {
      secureValue: 'no-cache, no-store, must-revalidate',
      purpose: 'cache control',
      description: 'Prevents the page from being cached.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control',
      severity: 'Medium',
    },
    'x-dns-prefetch-control': {
      secureValue: 'off',
      purpose: 'dns prefetch control',
      description: 'Prevents the browser from prefetching DNS records.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control',
      severity: 'Low',
    },
  },
  Connection: {
    'strict-transport-security': {
      secureValue: 'max-age=31536000; includeSubDomains; preload',
      purpose: 'strict transport security',
      description: 'Enforces the use of HTTPS for the page and its resources.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
      severity: 'High',
    },
    'referrer-policy': {
      secureValue: 'no-referrer',
      purpose: 'referrer policy',
      description:
        'Prevents the page from sending referrer information to other origins.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy',
      severity: 'Medium',
    },
    'expect-ct': {
      secureValue: 'enforce, max-age=86400',
      purpose: 'expect ct',
      description:
        'Enforces the use of Certificate Transparency for the page and its resources.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT',
      severity: 'Low',
    },
  },
  Permissions: {
    'permissions-policy': {
      secureValue: 'geolocation=(), microphone=(), camera=()',
      purpose: 'permissions policy',
      description: 'Prevents the page from using certain browser features.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy',
      severity: 'Medium',
    },
    'access-control-allow-origin': {
      secureValue: null,
      purpose: 'access control allow origin',
      description: 'Restricts which origins can access the resources via CORS.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin',
      severity: 'High',
    },
    'access-control-allow-methods': {
      secureValue: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      purpose: 'access control allow methods',
      description: 'Restricts which HTTP methods can be used with CORS.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods',
      severity: 'High',
    },
    'access-control-allow-headers': {
      secureValue: 'Content-Type, Authorization',
      purpose: 'access control allow headers',
      description: 'Restricts which headers can be sent with CORS requests.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers',
      severity: 'High',
    },
  },
  Info: {
    server: {
      secureValue: null,
      purpose: 'server information leakage',
      description:
        'Reveals the server software version, making it easier for attackers to find exploits.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server',
      severity: 'Low',
    },
    'x-powered-by': {
      secureValue: null,
      purpose: 'technology stack leakage',
      description: 'Reveals the underlying technology (e.g., Express, PHP).',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Powered-By',
      severity: 'Low',
    },
    'x-aspnet-version': {
      secureValue: null,
      purpose: 'asp.net version leakage',
      description: 'Reveals the specific version of ASP.NET being used.',
      infoUrl:
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Aspnet-Version',
      severity: 'Low',
    },
  },
};

export const FLAT_HEADERS_LIBRARY: Record<string, HeaderInfo> = Object.values(
  HEADERS_LIBRARY,
).reduce((acc, category) => {
  return { ...acc, ...category };
}, {});
