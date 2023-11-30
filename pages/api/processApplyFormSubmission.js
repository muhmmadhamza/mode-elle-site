const HubSpotClient = require("hubspot-api");
import { Storage } from "@google-cloud/storage";
import * as z from "zod";
var qs = require("qs");
import { v4 as uuidv4 } from "uuid";

const validateCaptcha = async (req) => {
  const axios = require("axios").default;
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
};

const validateFormData = async (req) => {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  const fieldStringSchema = z.string().max(256);
  const messageStringSchema = z.string().max(2000);
  const interestedInSchema = z.boolean();
  const communicationsSchema = z.boolean();

  const stringFieldNames = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "address",
    "city",
    "province",
    "postalCode",
    "country",
    "gender",
    "parentName",
    "pageUri",
    "pageName",
  ];

  const interestedInMapping = {
    interestedInModelling: "modelling",
    interestedInActing: "acting",
    interestedInBuildingSelfEsteem: "self_esteem",
    interestedInPersonalDevelopment: "personal_development",
    interestedInOther: "other",
  };

  // Do a schema check on the submitted data
  stringFieldNames.forEach((field) => {
    if (field === "message") {
      messageStringSchema.parse(req.body[field]);
    } else {
      fieldStringSchema.parse(req.body[field]);
    }
  });

  const dateOfBirthFields = {
    day: {
      fieldName: "dateOfBirthDay",
      value: parseInt(req.body["dateOfBirthDay"], 10),
      schema: z.number().min(1).max(31),
    },
    month: {
      fieldName: "dateOfBirthMonth",
      value: parseInt(req.body["dateOfBirthMonth"], 10),
      schema: z.number().min(1).max(12),
    },
    year: {
      fieldName: "dateOfBirthYear",
      value: parseInt(req.body["dateOfBirthYear"], 10),
      schema: z
        .number()
        .min(currentYear - 100)
        .max(currentYear),
    },
  };

  Object.keys(dateOfBirthFields).forEach((key) => {
    dateOfBirthFields[key].schema.parse(dateOfBirthFields[key].value);
  });

  const zeroMonth = ("0" + dateOfBirthFields["month"].value).slice(-2);
  const zeroDay = ("0" + dateOfBirthFields["day"].value).slice(-2);

  const dateOfBirth = `${dateOfBirthFields["year"].value}-${zeroMonth}-${zeroDay}`;

  Object.keys(interestedInMapping).forEach((key) => {
    interestedInSchema.parse(req.body[key]);
  });

  let interestedInValues = [];
  Object.keys(interestedInMapping).forEach((key) => {
    if (req.body[key] === true) {
      interestedInValues.push(interestedInMapping[key]);
    }
  });

  communicationsSchema.parse(req.body["communications"]);

  // This is the format HubSpot requires...
  const interestedIn = interestedInValues.join(";");

  const photoTypeFieldNames = ["photo1", "photo2"];
  const typeToExt = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };
  let photoExts = {
    photo1: "",
    photo2: "",
  };
  photoTypeFieldNames.forEach((field) => {
    if (!req.body[field] in typeToExt) {
      throw new Error("Invalid file type");
    }

    photoExts[field] = typeToExt[req.body[field]];
  });

  const filenames = {
    photo1: uuidv4() + photoExts["photo1"],
    photo2: uuidv4() + photoExts["photo2"],
  };

  const data = [
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
      name: "address",
      value: req.body.address,
    },
    {
      name: "city",
      value: req.body.city,
    },
    {
      name: "state",
      value: req.body.province,
    },
    {
      name: "zip",
      value: req.body.postalCode,
    },
    {
      name: "country",
      value: req.body.country,
    },
    { name: "date_of_birth", value: dateOfBirth },
    {
      name: "gender",
      value: req.body.gender,
    },
    {
      name: "parent_name",
      value: req.body.parentName,
    },
    {
      name: "TICKET.interested_in",
      value: interestedIn,
    },
  ];

  const context = {
    pageUri: req.body.pageUri,
    pageName: req.body.pageName,
  };

  const communications = req.body.communications;

  return [data, filenames, context, communications];
};

const getSignedUrls = async (filenames) => {
  const { privateKey } = JSON.parse(
    process.env.GCP_SERVICE_ACCOUNT_PRIVATE_KEY
  );

  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCP_STORAGE_CLIENT_EMAIL,
      private_key: privateKey,
    },
  });

  let uploadData = {
    photo1: "",
    photo2: "",
  };
  let readUrls = {
    photo1: "",
    photo2: "",
  };

  for (const key in filenames) {
    /* Generate upload url */
    const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET_NAME);
    const file = bucket.file(filenames[key]);

    // https://googleapis.dev/nodejs/storage/latest/File.html#generateSignedPostPolicyV4
    const uploadOptions = {
      expires: Date.now() + 1 * 60 * 1000, //  1 minute,
      config: {
        virtualHostedStyle: true,
        bucketBoundHostname: "static.mode-elle.ca",
      },
    };
    const [response] = await file.generateSignedPostPolicyV4(uploadOptions);

    uploadData[key] = { url: response.url, fields: response.fields };

    /* Generate read url */
    // These options will allow temporary read access to the file
    const readOptions = {
      version: "v4",
      action: "read",
      expires: Date.now() + 600000 * 1000, // ~7 days
    };

    // Get a v4 signed URL for reading the file
    const [url] = await storage
      .bucket(process.env.GCP_STORAGE_BUCKET_NAME)
      .file(filenames[key])
      .getSignedUrl(readOptions);

    readUrls[key] = url;
  }

  return [uploadData, readUrls];
};

const submitFormToHubSpot = async (data, readUrls, context, communications) => {
  const hs = new HubSpotClient();
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_APPLY_FORM_ID;

  // The field names are the same as the ones of the form created in HubSpot
  const body = {
    submittedAt: Date.now(),
    fields: [
      ...data,
      {
        name: "TICKET.subject", // Tickets are automatically created from form submissions
        value: "Website application",
      },
      {
        name: "TICKET.content",
        value: `[Image urls] \n \n Photo 1: ${readUrls["photo1"]} \n \n Photo 2: ${readUrls["photo2"]}`,
      },
    ],
    context: {
      //"hutk": ":hutk", // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
      pageUri: context.pageUri,
      pageName: context.pageName,
    },
    legalConsentOptions: {
      consent: {
        // Include this object when GDPR options are enabled
        consentToProcess: true, // Because of form submission
        text: "I agree to allow Mode Elle to store and process my personal data.",
        communications: [
          {
            value: communications,
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
    await validateCaptcha(req);
    const [data, filenames, context, communications] = await validateFormData(
      req
    );
    const [uploadData, readUrls] = await getSignedUrls(filenames);
    const hubSpotFormSubmission = await submitFormToHubSpot(
      data,
      readUrls,
      context,
      communications
    );

    if (
      hubSpotFormSubmission &&
      (Object.keys(uploadData).length !== 2 ||
        Object.keys(readUrls).length !== 2)
    ) {
      /*
       * If one of these is false, the files are not successfully uploaded
       * or connected to the ticket. For the user, we display a success state
       * anyway, as the most important thing is that their data was submitted
       * to HubSpot. If needed, customer service staff can follow up to get the
       * necessary photos after the first submission.
       */

      console.log("Error with uploadUrl, readUrl ");
    }

    if (hubSpotFormSubmission) {
      res.status(200).json({ success: true, uploadData: uploadData });
    } else {
      throw new Error("Error while submitting form to HubSpot");
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
