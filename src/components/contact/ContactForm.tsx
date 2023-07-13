'use client';

import './ContactForm.scss';
import { useEffect, useRef, useState } from 'react';
import validateEmail from '@/utils/validateEmail';
import debounce from 'lodash.debounce';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import ContactInput from './ContactInput';
import SectionTitle from '../animations/SectionTitle';

function ContactForm() {
  const [name, setName] = useState('');
  const [services, setServices] = useState('');
  const [message, setMessage] = useState('');

  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValidity] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [formStatus, setFormStatus] = useState<{
    status: 'error' | 'success';
    message: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

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

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const userID = process.env.NEXT_PUBLIC_USER_ID as string;

    emailjs.sendForm(serviceID, templateID, formRef.current, userID).then(
      (result) => {
        console.log(result.text);

        // Send success message
        setFormStatus({
          status: 'success',
          message: 'Successfully sent email',
        });

        // Reset form
        setName('');
        setServices('');
        setEmail('');
        setMessage('');
        formRef.current && formRef.current.reset();
      },
      (error) => {
        console.error(error.message);

        // Send error message
        setFormStatus({
          status: 'error',
          message: 'Unable to send your email at this time',
        });
      },
    );
  };

  useEffect(() => {
    // Reset form status on submit
    if (formStatus === null) return;

    const resetFormStatus = setTimeout(() => {
      setFormStatus(null);
    }, 5000);

    return () => clearTimeout(resetFormStatus);
  }, [formStatus]);

  return (
    <section
      className="home-section contact"
      aria-labelledby="contact__title"
      id="contact"
    >
      <div className="contact__wrapper">
        <div className="contact__top">
          <SectionTitle
            className="contact__title"
            id="contact__title"
            title="Let's Connect"
          />

          <motion.img
            src="/memoji_2.png"
            alt="Memoji of portfolio subject"
            className="contact__img"
            initial={{ rotate: 12 }}
            whileHover={{ scale: 1.2, rotate: 0 }}
          />
        </div>
        <form
          action=""
          className="contact__form"
          ref={formRef}
          onSubmit={handleSendEmail}
        >
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
            errorMessage={
              name.length > 0 ? 'Name must not be empty' : undefined
            }
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
            errorMessage={
              services.length > 0 ? 'Services must not be empty' : undefined
            }
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
            errorMessage={
              message.length > 0 ? 'Message must not be empty' : undefined
            }
            isRequired
          />
          <input
            type="text"
            name="from_name"
            id="from_name_emailjs"
            value="Renchester Ramos"
            readOnly
            hidden
            aria-hidden
          />

          <motion.button
            type="submit"
            className="contact__send"
            disabled={isButtonDisabled}
            variants={{
              initial: {
                scale: 1,
                rotate: 0,
              },
              focus: {
                scale: 1.1,
                rotate: -15,
              },
              tap: {
                scale: 0.9,
                rotate: 0,
              },
            }}
            initial="initial"
            whileFocus="focus"
            whileHover="focus"
            whileTap="tap"
          >
            Send it!
          </motion.button>

          <AnimatePresence>
            {formStatus && (
              <motion.p
                key="contact-form-status"
                role="alert"
                className="contact__form-status"
                data-status={formStatus.status}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200, opacity: 0 }}
              >
                {formStatus.message}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
