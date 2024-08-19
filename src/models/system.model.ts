export type InputChangeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>

export type ReactMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export enum InputType {
  Number = 'number',
  Checkbox = 'checkbox',
  Select = 'select-one',
}
