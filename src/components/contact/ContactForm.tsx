'use client';

import './ContactForm.scss';
import { useState } from 'react';
import ContactInput from './ContactInput';
import validateEmail from '@/utils/validateEmail';
import debounce from 'lodash.debounce';

function ContactForm() {
  const [name, setName] = useState('');
  const [services, setServices] = useState('');
  const [message, setMessage] = useState('');

  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValidity] = useState(false);
  const [emailError, setEmailError] = useState('');

  // TODO: Add handle submit form

  const isButtonDisabled = !(
    isEmailValid &&
    name.length > 0 &&
    services.length > 0 &&
    message.length > 0
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

  const handleEmailChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setEmail(inputValue);

      try {
        const isValid = validateEmail(inputValue);
        setEmailValidity(isValid);
      } catch (error) {
        if (error instanceof Error) {
          setEmailValidity(false);
          setEmailError(error.message);
        }
      }
    },
    1000,
  );

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setServices(inputValue);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMessage(inputValue);
  };

  return (
    <section
      className="home-section contact"
      aria-labelledby="contact__title"
      id="contact-section"
    >
      <div className="contact__wrapper">
        <div className="contact__top">
          <h1 className="contact__title" id="contact__title">
            Let&apos;s connect!
          </h1>
          <img
            src="/profile.jpg"
            alt="Profile photo of portfolio subject"
            className="contact__img"
          />
        </div>
        <form action="" className="contact__form">
          <ContactInput
            id="cont--name"
            index={1}
            name="name"
            type="text"
            label="What's your name?"
            value={name}
            placeholder="John Apple"
            handleChange={handleNameChange}
            minLength={1}
            maxLength={240}
            isValid={name.length > 0}
            isRequired
          />
          <ContactInput
            id="cont--email"
            index={2}
            name="email"
            type="email"
            label="What's your email?"
            value={email}
            placeholder="johnapple@one.com"
            handleChange={handleEmailChange}
            minLength={1}
            isValid={isEmailValid}
            errorMessage={emailError}
            isRequired
          />
          <ContactInput
            id="cont--services"
            index={3}
            name="services"
            type="text"
            label="What services are you looking for?"
            value={services}
            placeholder="Design / Web Development"
            handleChange={handleServiceChange}
            minLength={1}
            isValid={services.length > 0}
            isRequired
          />
          <ContactInput
            id="cont--message"
            index={4}
            name="message"
            type="text"
            label="Your message"
            value={message}
            placeholder="Hey, can you help me with ..."
            handleChange={handleMessageChange}
            minLength={1}
            isValid={message.length > 0}
            isRequired
          />
          <button
            type="submit"
            className="contact__send"
            disabled={isButtonDisabled}
          >
            Send it!
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
