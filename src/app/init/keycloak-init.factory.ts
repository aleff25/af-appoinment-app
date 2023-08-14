import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8090',
          realm: 'af-scheduler',
          clientId: 'af-scheduler-app',
        },
        initOptions: {
          onLoad: 'login-required', // redirects to the login page
          checkLoginIframe: true,
          checkLoginIframeInterval: 1000,
        },
        enableBearerInterceptor: true
      });
}
