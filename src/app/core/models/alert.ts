export class Alert {
  constructor(
    public message?: string,
    public type: AlertType = AlertType.ERROR,
    public state: AlertState = AlertState.SHOW,
    public title?: string,
    public delay: number = 5000,
    public route?: string,
    public location?: AlertLocation,
    public mode?: AlertMode,
  ) {}
}

export enum AlertState {
  SHOW = 'show',
  HIDE = 'hide',
}

export enum AlertType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  DEFAULT = 'DEFAULT',
  SUCCESS_OUTLINED = 'SUCCESS_OUTLINED',
  ERROR_OUTLINED = 'ERROR_OUTLINED',
  WARNING_OUTLINED = 'WARNING_OUTLINED',
  INFO_OUTLINED = 'INFO_OUTLINED',
  DEFAULT_OUTLINED = 'DEFAULT_OUTLINED',
}

export enum AlertLocation {
  TOP = 'top',
  BOTTOM = 'bottom',
  CENTER = 'center',
}

export enum AlertMode {
  FIXED = 'FIXED',
  DISMISSIBLE = 'DISMISSIBLE',
  WITH_ICON = 'WITH_ICON',
  SIMPLE = 'SIMPLE',
  TOAST = 'TOAST',
}
