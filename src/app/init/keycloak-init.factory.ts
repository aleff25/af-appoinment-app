import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) : () => Promise<any> {
    return (): Promise<any> => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          await keycloak.init({
            config: {
              url: 'http://localhost:8080/auth',
              realm: 'af-appointment-realm',
              clientId: 'af-appointment-app',
            },
            initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: true,
              silentCheckSsoRedirectUri:
                window.location.origin + '/assets/silent-check-sso.html'
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: ['']
          }).then((isInitialize) => {
            console.log("keycloak is initialized : ", isInitialize)
          })
          resolve();
        } catch (error) {
          console.log("error happened during Keycloak initialization : ", error)
          reject(error);
        }
      });
    };
}
