/**
 * O aplicativo H2O Gestão nas lojas: Android na Google Play e iPhone na App
 * Store. Os dois botões de baixar e a nota de plataforma saem daqui.
 */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.h2ogestao.app";

export const APP_STORE_URL =
  "https://apps.apple.com/br/app/h2o-gest%C3%A3o/id6825131751";

export type AppStore = "android" | "ios";

export const APP_STORE_URLS: Record<AppStore, string> = {
  android: PLAY_STORE_URL,
  ios: APP_STORE_URL,
};

export const APP_PLATFORM_NOTE =
  "Disponível para Android, na Google Play, e para iPhone, na App Store.";
