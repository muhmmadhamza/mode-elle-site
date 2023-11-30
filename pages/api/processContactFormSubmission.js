import * as z from "zod";
var qs = require("qs");

const validateFormData = async (req) => {
  const axios = require("axios").default;
  const fieldStringSchema = z.string().max(256);
  const messageStringSchema = z.string().max(2000);
  const fieldNames = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "subject",
    "message",
  ];

  // Do a schema check on the submitted data
  fieldNames.forEach((field) => {
    if (field === "message") {
      messageStringSchema.parse(req.body[field]);
    } else {
      fieldStringSchema.parse(req.body[field]);
    }
  });

  // Validate hCaptcha
  const verifyUrl = "https://hcaptcha.com/siteverify";
  const data = {
    secret: process.env.HCAPTCHA_SECRET_KEY,
    response: req.body.captchaToken,
  };

  // Endpoint expects application/x-www-form-urlencoded content type
  axios
    .post(verifyUrl, qs.stringify(data))
    .then(function (response) {
      if (!response.data.success) {
        console.log("Error codes:", response.data["error-codes"]); // https://vercel.com/support/articles/how-to-debug-a-502-error
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return true;
};

const submitFormToHubSpot = async (req) => {
  const HubSpotClient = require("hubspot-api");
  const hs = new HubSpotClient();
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_CONTACT_FORM_ID;

  // The field names are the same as the ones of the form created in HubSpot
  const body = {
    submittedAt: Date.now(),
    fields: [
      {
        name: "firstname",
        value: req.body.firstName,
      },
      {
        name: "lastname",
        value: req.body.lastName,
      },
      {
        name: "email",
        value: req.body.email,
      },
      {
        name: "phone",
        value: req.body.phoneNumber,
      },
      {
        name: "TICKET.subject", // Tickets are automatically created from form submissions
        value: req.body.subject,
      },
      {
        name: "TICKET.content",
        value: req.body.message,
      },
    ],
    context: {
      //"hutk": ":hutk", // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
      pageUri: req.body.pageUri,
      pageName: req.body.pageName,
    },
    legalConsentOptions: {
      consent: {
        // Include this object when GDPR options are enabled
        consentToProcess: true, // Because of form submission
        text: "I agree to allow Mode Elle to store and process my personal data.",
        communications: [
          {
            value: req.body.communications,
            subscriptionTypeId: 14079422,
            text: "I agree to receive marketing communications from Mode Elle.",
          },
        ],
      },
    },
  };

  await hs.forms.submitFormV3(portalId, formId, body);

  return true;
};

async function handler(req, res) {
  try {
    const formDataValid = await validateFormData(req);
    if (formDataValid) {
      const submitFormSuccess = await submitFormToHubSpot(req);
      if (submitFormSuccess) {
        res.status(200).json({ success: true });
      } else {
        throw new Error("Error while submitting form to HubSpot");
      }
    } else {
      throw new Error("Submitted form data invalid");
    }
  } catch (error) {
    console.log("handler error");
    console.log(error);
    res.status(200).json({
      success: false,
      error: { code: error.code, message: error.message },
    });
  }
}

export default handler;
