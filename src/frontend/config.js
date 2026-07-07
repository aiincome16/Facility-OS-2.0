/************************************************
 * Facility OS 2.0
 * config.js
 *
 * Zentrale Konfiguration
 ************************************************/

export const APP_CONFIG = {

  /* Allgemein */

  appName: "Facility OS",

  version: "2.0.0",

  build: "alpha",

  environment: "development",

  debug: true,

  language: "de",

  timezone: "Europe/Berlin",

  dateFormat: "DD.MM.YYYY",

  timeFormat: "24h",

  /* Organisation */

  defaultOrganizationId: "DEMO",

  multiTenant: true,

  /* Daten */

  useLocalJson: true,

  useGoogleSheets: false,

  useBackendApi: false,

  apiBaseUrl: "",

  googleScriptUrl: "",

  /* Sicherheit */

  loginRequired: true,

  sessionTimeoutMinutes: 480,

  autoLogout: false,

  /* QR */

  qrEnabled: true,

  gpsCheckEnabled: true,

  requireQrForShiftStart: true,

  requireQrForRooms: false,

  /* KI */

  aiEnabled: true,

  aiWarnings: true,

  aiAnalytics: true,

  aiSuggestions: true,

  /* Module */

  modules: {

    login: true,

    dashboard: true,

    objects: true,

    rooms: true,

    tasks: true,

    shifts: true,

    tickets: true,

    materials: true,

    mailbox: true,

    notifications: true,

    vacation: true,

    sick: true,

    replacement: true,

    objectInfo: true,

    analytics: true,

    accounting: true,

    admin: true,

    customerPortal: true

  },

  /* Upload */

  uploads: {

    photos: true,

    audio: true,

    documents: true,

    maxPhotoSizeMB: 10,

    maxAudioSizeMB: 20

  },

  /* UI */

  ui: {

    darkMode: false,

    animations: true,

    showLoadingSpinner: true,

    confirmDelete: true,

    toastDuration: 3000

  }

};

/************************************************
 * Rollen
 ************************************************/

export const USER_ROLES = {

  EMPLOYEE: "Mitarbeiter",

  MANAGER: "Objektleiter",

  ACCOUNTING: "Buchhaltung",

  ADMIN: "Admin",

  CUSTOMER: "Kunde"

};

/************************************************
 * Status
 ************************************************/

export const STATUS = {

  OPEN: "OFFEN",

  IN_PROGRESS: "IN_BEARBEITUNG",

  DONE: "ERLEDIGT",

  CANCELLED: "STORNIERT"

};

/************************************************
 * Prioritäten
 ************************************************/

export const PRIORITY = {

  LOW: "NIEDRIG",

  NORMAL: "NORMAL",

  HIGH: "HOCH",

  CRITICAL: "KRITISCH"

};