import './ContactInput.scss';

type ContactInputProps = {
  id: string;
  index: number;
  type: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
  isValid?: boolean;
  errorMessage?: string;
};

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
  } = props;

  return (
    <div className="contact-input__wrapper">
      <span className="contact-input__index">{index}</span>
      <label htmlFor={id} className="contact-input__label" data-valid={isValid}>
        {label} {isRequired && <abbr title="required">*</abbr>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className="contact-input__input"
        onChange={handleChange}
        placeholder={placeholder || ''}
        minLength={minLength || -1}
        maxLength={maxLength || -1}
        required={isRequired || false}
        aria-errormessage={`contact-input-error--${name}`}
      />

      {value.length > 0 &&
        isValid !== undefined &&
        (isValid ? (
          <div
            className="contact-input__validation"
            aria-label={`${name} is valid`}
            data-valid="true"
          >
            <svg
              className="contact-input__icon contact-input__valid-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        ) : (
          <div
            className="contact-input__validation"
            aria-label={`${name} is invalid`}
            data-valid="false"
          >
            <svg
              className="contact-input__icon contact-input__invalid-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        ))}

      {errorMessage && !isValid && value.length > 0 && (
        <p className="contact-input__error" id={`contact-input-error--${name}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
export default ContactInput;
