import './ContactInput.scss';

type ContactInputProps = {
  id: string;
  index: number;
  type: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  multiline?: boolean;
};

/** A numbered field on the inquiry sheet: annotation label, hairline rule. */
function ContactInput(props: ContactInputProps) {
  const {
    id,
    index,
    type,
    name,
    label,
    value,
    placeholder,
    handleChange,
    minLength,
    maxLength,
    isValid,
    errorMessage,
    isRequired,
    multiline,
  } = props;

  const showState = value.length > 0 && isValid !== undefined;
  const showError = Boolean(errorMessage) && !isValid && value.length > 0;

  const sharedProps = {
    id,
    name,
    className: 'field__input',
    onChange: handleChange,
    placeholder: placeholder || '',
    minLength: minLength || -1,
    maxLength: maxLength || -1,
    required: isRequired || false,
    'aria-invalid': showState ? !isValid : undefined,
    'aria-errormessage': showError ? `field-error--${name}` : undefined,
  };

  return (
    <div className="field" data-filled={value.length > 0}>
      <label htmlFor={id} className="field__head">
        <span className="field__index" aria-hidden>
          {String(index).padStart(2, '0')}
        </span>
        <span className="field__label">
          {label}
          {isRequired && (
            <abbr className="field__req" title="required">
              *
            </abbr>
          )}
        </span>
        {showState && (
          <span
            className="field__state"
            data-valid={isValid}
            aria-label={isValid ? `${name} is valid` : `${name} is invalid`}
          >
            {isValid ? 'ok' : 'rev'}
          </span>
        )}
      </label>

      {multiline ? (
        <textarea {...sharedProps} rows={4} />
      ) : (
        <input {...sharedProps} type={type} />
      )}

      {showError && (
        <p className="field__error" id={`field-error--${name}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
export default ContactInput;
