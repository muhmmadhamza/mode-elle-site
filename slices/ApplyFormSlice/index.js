import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FormProvider, useForm, Controller } from "react-hook-form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Box, Checkbox, Button, Label, Input, Select } from "theme-ui";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";

import MaxWidthContent from "../../components/MaxWidthContent/MaxWidthContent";
import axios from "axios";

import FormWrapper from "../../components/forms/FormWrapper/FormWrapper";
import Dropzone from "../../components/forms/Dropzone/Dropzone";

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

const PostalCodeAndCountry = styled.div`
  display: flex;

  .postal-code {
    flex: 1;
    margin-right: 16px;
  }

  .country {
    flex: 2;
  }
`;

const InterestedIn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin-bottom: 16px;
`;

const InterestedInOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 13px;
  margin: 8px 0 16px 0;

  label {
    display: flex;
    align-items: center;
  }
`;

const DateOfBirth = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 16px;

  .input-day,
  .input-year {
    margin: 5px 0 0 0;
  }
  .select-month:invalid {
    color: grey;
  }
`;

const DateOfBirthFields = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  grid-gap: 8px;
`;

const GenderAndParentInfo = styled.div`
  display: flex;

  .gender {
    flex: 2;
  }

  .parentName {
    flex: 3;
  }

  .note-small {
    font-size: 11px;
  }

  .gender {
    margin-right: 16px;
  }
`;

const PhotoSubmission = styled.div`
  padding: 16px 32px;
  margin: 0 8px;
`;

const PhotoSubmissionErrors = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropzoneWrapper = styled.div`
  display: flex;
`;

const FormBottom = styled.div`
  background-color: white;
  padding: 48px 32px 8px 32px;
  margin: 0 8px;
  //box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px, hsl(36deg 4% 70%) 0px 1px 2px 0px;

  .communicationsText {
    max-width: 550px;
    margin-bottom: 8px;
  }
`;

const ContactData = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  padding: 16px 32px;
  margin: 8px;
  //box-shadow: hsl(36deg 4% 96%) 0px 1px 15px 0px, hsl(36deg 4% 70%) 0px 1px 2px 0px;

  h3 {
    margin: 0 0 24px 0;
  }

  /*.fill-to-bottom {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }*/
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

const ApplyFormSlice = ({ slice }) => {
  const router = useRouter();
  const { enableForm } = router.query;

  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
  const [token, setToken] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showCaptchaAlert, setShowCaptchaAlert] = useState(null);
  const methods = useForm();
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

  const onSubmit = async (fieldData) => {
    // this reaches out to the hcaptcha library and runs the
    // execute function on it. you can use other functions as well
    // documented in the api:
    // https://docs.hcaptcha.com/configuration#jsapi
    //captchaRef.current.execute();

    console.log(fieldData);
    setSubmitting(true);

    if (!token) {
      setShowCaptchaAlert(true);
      return false;
    }

    const { photo1, photo2 } = fieldData;

    const data = {
      ...fieldData,
      photo1: photo1.type,
      photo2: photo2.type,
      captchaToken: token,
      pageUri: window.location.href,
      pageName: document.title,
    };

    axios
      .post("/api/processApplyFormSubmission", data)
      .then(async function (response) {
        console.log("RESPONSE", response);

        const { uploadData } = await response.data;

        for (const key in uploadData) {
          console.log("FILE:::", fieldData[key]);
          const formData = new FormData();

          // add the fields from the api response
          for (const [key, value] of Object.entries(uploadData[key].fields)) {
            formData.append(key, value);
          }

          // add the file from the form
          formData.append("file", fieldData[key]);

          const upload = await fetch(uploadData[key].url, {
            method: "POST",
            body: formData,
          });

          if (upload.ok) {
            console.log("Uploaded successfully!");
            setSuccess(true);
          } else {
            console.error("Upload failed.");
            setError(true);
          }
        }
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
      if (showCaptchaAlert) {
        setShowCaptchaAlert(false);
      }
    }
  }, [token]);

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  return (
    <MaxWidthContent>
      <FormProvider {...methods}>
        <Box
          style={{ width: "100%" }}
          as="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          aria-label="Apply to Mode Elle"
        >
          <FormWrapper>
            <h2>Apply to Mode Elle</h2>
            {!enabled && !enableForm && (
              <Temp>
                <p>
                  Thank you for your interest in Mode Elle. This site has only
                  recently been launched and we're experiencing a technical
                  difficulty with this form.
                </p>
                <p>
                  Please bear with us while we resolve this issue and feel free
                  to contact us directly using the contact data above.
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
                There was a technical error while submitting your application.
                Our apologies for the inconvenience. Please try back again soon
                or we would be happy to assist you if you contact us directly.
              </Error>
            )}
            {(enabled || enableForm) && !success && !error && (
              <>
                <MainFields>
                  <ContactData>
                    <h3>Contact data</h3>
                    <label htmlFor="firstName">First name: *</label>
                    <Input
                      {...methods.register("firstName", { required: true })}
                      type="text"
                      id="firstName"
                      required="required"
                      aria-required="true"
                      aria-invalid={
                        methods.formState.errors.firstName ? "true" : "false"
                      }
                      maxLength="80"
                      mb={3}
                    />
                    {methods.formState.errors.firstName && (
                      <span role="alert">Please fill in a first name.</span>
                    )}

                    <label htmlFor="lastName">Last name: *</label>
                    <Input
                      {...methods.register("lastName", { required: true })}
                      type="text"
                      id="lastName"
                      required="required"
                      aria-required="true"
                      aria-invalid={
                        methods.formState.errors.lastName ? "true" : "false"
                      }
                      maxLength="80"
                      mb={3}
                    />
                    {methods.formState.lastName && (
                      <span role="alert">Please fill in a last name.</span>
                    )}

                    <label htmlFor="email">Email address: *</label>
                    <Input
                      {...methods.register("email", { required: true })}
                      type="email"
                      id="email"
                      required="required"
                      aria-required="true"
                      aria-invalid={
                        methods.formState.errors.email ? "true" : "false"
                      }
                      maxLength="254"
                      mb={3}
                    />
                    {methods.formState.errors.email && (
                      <span role="alert">Please fill in an email address.</span>
                    )}

                    <label htmlFor="phoneNumber">Phone number: *</label>
                    <Input
                      {...methods.register("phoneNumber", { required: true })}
                      type="tel"
                      id="phoneNumber"
                      required="required"
                      aria-required="true"
                      aria-invalid={
                        methods.formState.errors.phoneNumber ? "true" : "false"
                      }
                      maxLength="80"
                      mb={3}
                    />
                    {methods.formState.errors.phoneNumber && (
                      <span role="alert">Please fill in a phone number.</span>
                    )}
                  </ContactData>

                  <ContactData>
                    <h3>Address</h3>
                    <label htmlFor="address">Address: *</label>
                    <Input
                      {...methods.register("address", { required: true })}
                      type="text"
                      id="address"
                      required="required"
                      aria-required="true"
                      aria-invalid={
                        methods.formState.errors.address ? "true" : "false"
                      }
                      maxLength="80"
                      mb={3}
                    />
                    {methods.formState.errors.address && (
                      <span role="alert">Please fill in an address.</span>
                    )}

                    <label htmlFor="city">City: *</label>
                    <Input
                      {...methods.register("city", { required: true })}
                      type="text"
                      id="city"
                      required="required"
                      aria-required="true"
                      aria-invalid={
                        methods.formState.errors.city ? "true" : "false"
                      }
                      maxLength="80"
                      mb={3}
                    />
                    {methods.formState.errors.city && (
                      <span role="alert">Please fill in a city.</span>
                    )}

                    <label htmlFor="province">Province: *</label>
                    <Input
                      {...methods.register("province", { required: true })}
                      type="text"
                      id="province"
                      required="required"
                      aria-required="true"
                      aria-invalid={
                        methods.formState.errors.province ? "true" : "false"
                      }
                      maxLength="254"
                      mb={3}
                    />
                    {methods.formState.errors.province && (
                      <span role="alert">Please fill in a province.</span>
                    )}

                    <PostalCodeAndCountry>
                      <div className="postal-code">
                        <label htmlFor="postalCode">Postal code: *</label>
                        <Input
                          {...methods.register("postalCode", {
                            required: true,
                          })}
                          type="text"
                          id="postalCode"
                          required="required"
                          aria-required="true"
                          aria-invalid={
                            methods.formState.errors.postalCode
                              ? "true"
                              : "false"
                          }
                          maxLength="80"
                          mb={3}
                        />
                        {methods.formState.errors.postalCode && (
                          <span role="alert">
                            Please fill in a postal code.
                          </span>
                        )}
                      </div>

                      <div className="country">
                        <label htmlFor="country">Country: *</label>
                        <Input
                          {...methods.register("country", { required: true })}
                          type="text"
                          id="country"
                          required="required"
                          aria-required="true"
                          aria-invalid={
                            methods.formState.errors.country ? "true" : "false"
                          }
                          maxLength="80"
                          mb={3}
                        />
                        {methods.formState.errors.country && (
                          <span role="alert">Please fill in a country.</span>
                        )}
                      </div>
                    </PostalCodeAndCountry>
                  </ContactData>

                  <ContactData>
                    <h3>Model data</h3>

                    <InterestedIn>
                      <p>What are you interested in? *</p>
                      <InterestedInOptions>
                        <Label>
                          <Checkbox
                            name="modelling"
                            {...methods.register("interestedInModelling")}
                          />
                          Modelling
                        </Label>
                        <Label>
                          <Checkbox
                            name="acting"
                            {...methods.register("interestedInActing")}
                          />
                          Acting
                        </Label>
                        <Label>
                          <Checkbox
                            name="buildingSelfEsteem"
                            {...methods.register(
                              "interestedInBuildingSelfEsteem"
                            )}
                          />
                          Building self-esteem
                        </Label>
                        <Label>
                          <Checkbox
                            name="personalDevelopment"
                            {...methods.register(
                              "interestedInPersonalDevelopment"
                            )}
                          />
                          Personal development
                        </Label>
                        <Label>
                          <Checkbox
                            name="other"
                            {...methods.register("interestedInOther")}
                          />
                          Other
                        </Label>
                      </InterestedInOptions>
                    </InterestedIn>

                    <div className="fill-to-bottom">
                      <DateOfBirth>
                        <label>Date of birth: *</label>
                        <DateOfBirthFields>
                          <Select
                            className="select-month"
                            {...methods.register("dateOfBirthMonth", {
                              required: true,
                            })}
                            required={true}
                            defaultValue=""
                          >
                            <option value="" disabled hidden>
                              Month
                            </option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </Select>

                          <Input
                            {...methods.register("dateOfBirthDay", {
                              required: true,
                              min: 1,
                              max: 31,
                            })}
                            type="number"
                            id="dateOfBirthDay"
                            className="input-day"
                            min="1"
                            max="31"
                            placeholder="Day"
                            required="required"
                            aria-required="true"
                            aria-invalid={
                              methods.formState.errors.dateOfBirthDay
                                ? "true"
                                : "false"
                            }
                            maxLength="80"
                            mb={3}
                          />
                          {methods.formState.errors.dateOfBirthDay && (
                            <span role="alert">
                              Please fill in a last name.
                            </span>
                          )}

                          <Input
                            {...methods.register("dateOfBirthYear", {
                              required: true,
                            })}
                            type="number"
                            id="dateOfBirthYear"
                            required="required"
                            className="input-year"
                            placeholder="Year"
                            aria-required="true"
                            min={currentYear - 100}
                            max={currentYear}
                            aria-invalid={
                              methods.formState.errors.email ? "true" : "false"
                            }
                            maxLength="254"
                            mb={3}
                          />
                          {methods.formState.errors.email && (
                            <span role="alert">
                              Entering an email address is required.
                            </span>
                          )}
                        </DateOfBirthFields>
                      </DateOfBirth>

                      <GenderAndParentInfo>
                        <div className="gender">
                          <label htmlFor="gender">Gender: *</label>
                          <Input
                            {...methods.register("gender", { required: true })}
                            type="text"
                            id="gender"
                            required="required"
                            aria-required="true"
                            aria-invalid={
                              methods.formState.errors.gender ? "true" : "false"
                            }
                            maxLength="80"
                            mb={3}
                          />
                          {methods.formState.errors.gender && (
                            <span role="alert">Please state your gender.</span>
                          )}
                        </div>
                        <div className="parentName">
                          <label htmlFor="gender">
                            Parent name:{" "}
                            <span className="note-small">(if under 18)</span>
                          </label>
                          <Input
                            {...methods.register("parentName")}
                            type="text"
                            id="parentName"
                            aria-invalid={
                              methods.formState.errors.parentName
                                ? "true"
                                : "false"
                            }
                            maxLength="80"
                            mb={3}
                          />
                        </div>
                      </GenderAndParentInfo>
                    </div>
                  </ContactData>
                </MainFields>
                <PhotoSubmission>
                  <h3>Photo submission</h3>
                  <DropzoneWrapper>
                    <Controller
                      name="photo1"
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Dropzone
                          key="photo1"
                          registerName="photo1"
                          onChange={onChange}
                        />
                      )}
                    />

                    <Controller
                      name="photo2"
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Dropzone
                          key="photo2"
                          registerName="photo2"
                          onChange={onChange}
                        />
                      )}
                    />
                  </DropzoneWrapper>
                  <PhotoSubmissionErrors>
                    {methods.formState.errors.photo1 && (
                      <span role="alert">Please add a photo (face).</span>
                    )}
                    {methods.formState.errors.photo2 && (
                      <span role="alert">Please add a photo (full-body).</span>
                    )}
                  </PhotoSubmissionErrors>
                </PhotoSubmission>

                <FormBottom>
                  <Label mb={3}>
                    <Checkbox {...methods.register("communications")} />
                    <span className="communicationsText">
                      I would like to be added to Mode Elle's mailing list to
                      receive additional information about the agency and
                      academy.
                    </span>
                  </Label>

                  <HCaptcha
                    {...methods.register("hcaptcha")}
                    // This is a testing sitekey, will autopass
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

                  <Button
                    disabled={
                      methods.formState.isSubmitting ||
                      methods.formState.isSubmitted
                    }
                    mt={3}
                  >
                    {submitting && (
                      <span style={{ marginRight: 12 }}>
                        <BeatLoader size={8} margin={4} color="#fff" />
                      </span>
                    )}
                    Send application
                  </Button>
                </FormBottom>
              </>
            )}
          </FormWrapper>
        </Box>
      </FormProvider>
    </MaxWidthContent>
  );
};

export default ApplyFormSlice;
