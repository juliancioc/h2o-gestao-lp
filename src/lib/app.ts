/**
 * O aplicativo H2O Gestão na loja.
 *
 * Só Android: o `eas.json` do app não tem submit de iOS, então prometer
 * "disponível para iPhone" na página seria mandar o visitante procurar o que
 * não existe. Quando houver build de iOS, entra aqui a URL da App Store e a
 * copy de `APP_PLATFORM_NOTE` muda junto.
 */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.h2ogestao.app";

export const APP_PLATFORM_NOTE = "Disponível para Android, na Google Play.";
