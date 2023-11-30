import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Box, Checkbox, Button, Label, Input, Textarea } from "theme-ui";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";

import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";
import axios from "axios";

import FormWrapper from "../../components/forms/FormWrapper/FormWrapper";
/*
 * Note: the span role="alert" alerts get suppressed by the native browser
 * warnings when available. E.g. in Chrome, a popover on the field with:
 * "Please fill in this field." You can test this by removing required="true"
 * on all fields (removing on a single field does not work).
 */

const MainFields = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media screen and (min-width: 1000px) {
    flex-direction: row;
  }
`;

const FormBottom = styled.div`
  background-color: white;
  padding: 0 32px 8px 32px;
  margin: 0 8px;
  //box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px, hsl(36deg 4% 70%) 0px 1px 2px 0px;
`;

const ContactData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  padding: 32px;
  margin: 8px;
  //box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px, hsl(36deg 4% 70%) 0px 1px 2px 0px;

  h3 {
    margin: 0 0 24px 0;
  }
`;

const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  background-color: white;
  padding: 32px;
  margin: 8px;
  //box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px, hsl(36deg 4% 70%) 0px 1px 2px 0px;

  h3 {
    margin: 0 0 24px 0;
  }

  textarea {
    flex: 1;
  }
`;

const Success = styled.div`
  padding: 16px 36px;
`;

const Error = styled.div`
  padding: 16px 36px;
`;

const Temp = styled.div`
  padding: 16px 36px;
  margin: 16px 32px;
  border: 1px solid grey;
`;

const ContactFormSlice = ({ slice }) => {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
  const [token, setToken] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showCaptchaAlert, setShowCaptchaAlert] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();
  const captchaRef = useRef(null);

  const onExpire = () => {
    // Captcha resets on expiration
    console.log("hCaptcha Token Expired");
    setToken(false);
  };

  const onError = (err) => {
    console.log(`hCaptcha Error: ${err}`);

    setToken(false);
  };

  const onSubmit = (fieldData) => {
    // this reaches out to the hcaptcha library and runs the
    // execute function on it. you can use other functions as well
    // documented in the api:
    // https://docs.hcaptcha.com/configuration#jsapi
    //captchaRef.current.execute();

    setSubmitting(true);

    if (!token) {
      setShowCaptchaAlert(true);
      return false;
    }

    const data = {
      ...fieldData,
      captchaToken: token,
      pageUri: window.location.href,
      pageName: document.title,
    };

    axios
      .post("/api/processContactFormSubmission", data)
      .then(function (response) {
        console.log(response);
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
      });

    /*
     * From docs: NOTE: Make sure to reset the hCaptcha state when you
     * submit your form by calling the method .resetCaptcha on your
     * hCaptcha React Component! Passcodes are one-time use, so if your
     * user submits the same passcode twice then it will be rejected by the
     * server the second time.
     */
    captchaRef.resetCaptcha();
  };

  useEffect(() => {
    if (token) {
      console.log(`hCaptcha Token: ${token}`);
      if (showCaptchaAlert) {
        setShowCaptchaAlert(false);
      }
    }
  }, [token]);

  // disable while submit

  return (
    <MaxWidthContent>
      <Box
        style={{ width: "100%" }}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Contact Mode Elle"
      >
        <FormWrapper>
          <h2>Contact Mode Elle</h2>
          {!enabled && (
            <Temp>
              <p>
                Thank you for your interest in Mode Elle. This site has only
                recently been launched and we're experiencing a technical
                difficulty with this form.
              </p>
              <p>
                Please bear with us while we resolve this issue and feel free to
                contact us directly using the contact data above.
              </p>
            </Temp>
          )}
          {success && (
            <Success>
              Thank you for your application. We will be in touch soon. Have a
              nice day!
            </Success>
          )}
          {error && (
            <Error>
              There was a technical error while submitting your application. Our
              apologies for the inconvenience. Please try back again soon or we
              would be happy to assist you if you contact us directly.
            </Error>
          )}
          {enabled && !success && !error && (
            <>
              <MainFields>
                <ContactData>
                  <h3>Your contact data</h3>
                  <label htmlFor="firstName">First name: *</label>
                  <Input
                    {...register("firstName", { required: true })}
                    type="text"
                    id="firstName"
                    required="required"
                    aria-required="true"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    maxLength="80"
                    mb={3}
                  />
                  {errors.firstName && (
                    <span role="alert">Please fill in a first name.</span>
                  )}

                  <label htmlFor="lastName">Last name: *</label>
                  <Input
                    {...register("lastName", { required: true })}
                    type="text"
                    id="lastName"
                    required="required"
                    aria-required="true"
                    aria-invalid={errors.lastName ? "true" : "false"}
                    maxLength="80"
                    mb={3}
                  />
                  {errors.lastName && (
                    <span role="alert">Please fill in a last name.</span>
                  )}

                  <label htmlFor="email">Email address: *</label>
                  <Input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    required="required"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    maxLength="254"
                    mb={3}
                  />
                  {errors.email && (
                    <span role="alert">
                      Entering an email address is required.
                    </span>
                  )}

                  <label htmlFor="phoneNumber">Phone number: *</label>
                  <Input
                    {...register("phoneNumber", { required: true })}
                    type="tel"
                    id="phoneNumber"
                    required="required"
                    aria-required="true"
                    aria-invalid={errors.phoneNumber ? "true" : "false"}
                    maxLength="80"
                    mb={3}
                  />
                  {errors.phoneNumber && (
                    <span role="alert">
                      Entering a phone number is required.
                    </span>
                  )}
                </ContactData>

                <Ticket>
                  <h3>Your message</h3>
                  <label htmlFor="subject">Subject:</label>
                  <Input
                    {...register("subject")}
                    type="text"
                    id="subject"
                    maxLength="80"
                    mb={3}
                  />

                  <label htmlFor="message">Message:</label>
                  <Textarea
                    {...register("message")}
                    name="message"
                    id="message"
                    rows="6"
                    cols="65"
                    maxLength="2000"
                    mb={3}
                  />
                </Ticket>
              </MainFields>

              <FormBottom>
                <Label mb={3}>
                  <Checkbox {...register("communications")} />I would like to be
                  added to Mode Elle's mailing list to receive additional
                  information about the agency and academy.
                </Label>

                <HCaptcha
                  {...register("hcaptcha")}
                  // This is testing sitekey, will autopass
                  // Make sure to replace
                  //sitekey="10000000-ffff-ffff-ffff-000000000001"
                  sitekey={siteKey}
                  languageOverride="en"
                  //tabIndex={0}
                  //size="invisible"
                  onVerify={setToken}
                  onError={onError}
                  onExpire={onExpire}
                  ref={captchaRef}
                />
                {showCaptchaAlert && (
                  <span role="alert">
                    Please complete the captcha before submitting the form.
                  </span>
                )}

                <Button disabled={isSubmitting || isSubmitted} mt={3}>
                  {submitting && (
                    <span style={{ marginRight: 12 }}>
                      <BeatLoader size={8} margin={4} color="#fff" />
                    </span>
                  )}
                  Send message
                </Button>
              </FormBottom>
            </>
          )}
        </FormWrapper>
      </Box>
    </MaxWidthContent>
  );
};

export default ContactFormSlice;
