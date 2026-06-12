'use client';

import './ContactForm.scss';
import { useEffect, useRef, useState } from 'react';
import validateEmail from '@/utils/validateEmail';
import debounce from 'lodash.debounce';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import ContactInput from './ContactInput';
import SectionTitle from '../animations/SectionTitle';
import Reveal from '../animations/Reveal';
import { AUTHOR_QUERYResult } from '@/sanity/types';

type FieldChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function ContactForm({ author }: { author: AUTHOR_QUERYResult }) {
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
  const [isSending, setSending] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const isButtonDisabled =
    isSending ||
    !(isEmailValid && name.length > 0 && services.length > 0 && message.length > 0);

  const handleNameChange = (e: FieldChange) => setName(e.target.value);
  const handleServiceChange = (e: FieldChange) => setServices(e.target.value);
  const handleMessageChange = (e: FieldChange) => setMessage(e.target.value);

  const handleEmailChange = debounce((e: FieldChange) => {
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
  }, 1000);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const userID = process.env.NEXT_PUBLIC_USER_ID as string;

    setSending(true);
    emailjs.sendForm(serviceID, templateID, formRef.current, userID).then(
      () => {
        setFormStatus({
          status: 'success',
          message: 'Inquiry received — expect a reply within two days',
        });
        setSending(false);

        setName('');
        setServices('');
        setEmail('');
        setMessage('');
        formRef.current && formRef.current.reset();
      },
      (error) => {
        console.error(error.message);
        setSending(false);
        setFormStatus({
          status: 'error',
          message: 'Transmission failed — please email directly instead',
        });
      },
    );
  };

  useEffect(() => {
    if (formStatus === null) return;

    const resetFormStatus = setTimeout(() => {
      setFormStatus(null);
    }, 6000);

    return () => clearTimeout(resetFormStatus);
  }, [formStatus]);

  return (
    <section
      className="home-section contact"
      aria-labelledby="contact__title"
      id="contact"
    >
      <div className="contact__wrapper">
        <SectionTitle
          className="contact__title"
          id="contact__title"
          title="Start a project"
          index="05"
        />

        <div className="contact__columns">
          <Reveal className="contact__brief">
            <p className="contact__invitation">
              Have a product to build, a system to untangle, or a site that
              deserves better bones? Send a short brief&thinsp;—&thinsp;scope,
              timeline, and what success looks like.
            </p>

            <dl className="contact__channels">
              <div className="contact__channel">
                <dt>Direct line</dt>
                <dd>
                  <a
                    className="u-underline"
                    href={`mailto:${author?.email ?? 'renchesterjramos@gmail.com'}`}
                  >
                    {author?.email ?? 'renchesterjramos@gmail.com'}
                  </a>
                </dd>
              </div>
              <div className="contact__channel">
                <dt>Response time</dt>
                <dd>Within 48 hours, usually sooner</dd>
              </div>
              <div className="contact__channel">
                <dt>Currently</dt>
                <dd>Open to freelance &amp; collaboration</dd>
              </div>
            </dl>
          </Reveal>

          <form
            className="contact__form"
            ref={formRef}
            onSubmit={handleSendEmail}
            aria-label="Project inquiry form"
          >
            <p className="contact__form-label" aria-hidden>
              Project inquiry
            </p>
            <ContactInput
              id="cont--name"
              index={1}
              name="name"
              type="text"
              label="Name"
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
              label="Email"
              value={email}
              placeholder="john@studio.com"
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
              label="Scope of work"
              value={services}
              placeholder="Design / web development / consulting"
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
              label="The brief"
              value={message}
              placeholder="What are we building, for whom, and by when?"
              handleChange={handleMessageChange}
              minLength={1}
              isValid={message.length > 0}
              isRequired
              multiline
            />
            <input
              type="text"
              name="from_name"
              id="from_name_emailjs"
              value={
                author
                  ? `${author?.firstName} ${author?.lastName}`
                  : 'Renchester Jardiel'
              }
              readOnly
              hidden
              aria-hidden
            />

            <button
              type="submit"
              className="contact__send"
              disabled={isButtonDisabled}
            >
              {isSending ? 'Transmitting…' : 'Submit inquiry'}
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <path d="M7 7l9.2 9.2M17 7v10H7" transform="rotate(-90 12 12)" />
              </svg>
            </button>

            <AnimatePresence>
              {formStatus && (
                <motion.p
                  key="contact-form-status"
                  role="alert"
                  className="contact__form-status"
                  data-status={formStatus.status}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {formStatus.message}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
