"use strict";

const GRAPH_SCOPE = "https://graph.microsoft.com/.default";
const GRAPH_SEND_MAIL_PATH = "/sendMail";
const MAX_FIELD_LENGTH = 2000;
function createResponse(status, body) {
  return {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body
  };
}

function requiredSetting(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error("Missing required app setting: " + name);
  }
  return value;
}

function cleanText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload) {
  const contact = {
    name: cleanText(payload && payload.name),
    email: cleanText(payload && payload.email),
    company: cleanText(payload && payload.company),
    phone: cleanText(payload && payload.phone),
    service: cleanText(payload && payload.service),
    message: cleanText(payload && payload.message),
    website: cleanText(payload && payload.website)
  };

  if (contact.website) {
    return { isSpam: true, contact };
  }
  if (!contact.name || !isValidEmail(contact.email) || !contact.message) {
    return { error: "Name, valid email, and message are required.", contact };
  }
  return { contact };
}

function parsePayload(body) {
  if (typeof body !== "string") {
    return body;
  }
  try {
    return JSON.parse(body);
  } catch (error) {
    return {};
  }
}

function buildEmail(contact, toEmail) {
  const subject = "Consultation request from " + contact.name;
  const body = [
    "A new consultation request was submitted from norma-via.com.",
    "",
    "Name: " + contact.name,
    "Email: " + contact.email,
    "Company: " + (contact.company || "(not provided)"),
    "Phone: " + (contact.phone || "(not provided)"),
    "",
    "Message:",
    contact.message
  ];

  if (contact.service) {
    body.splice(6, 0, "Service of interest: " + contact.service);
  }

  return {
    message: {
      subject,
      body: {
        contentType: "Text",
        content: body.join("\n")
      },
      toRecipients: [
        {
          emailAddress: {
            address: toEmail
          }
        }
      ],
      replyTo: [
        {
          emailAddress: {
            address: contact.email,
            name: contact.name
          }
        }
      ]
    },
    saveToSentItems: true
  };
}

async function getGraphAccessToken() {
  const tenantId = requiredSetting("M365_TENANT_ID");
  const clientId = requiredSetting("M365_CLIENT_ID");
  const clientSecret = requiredSetting("M365_CLIENT_SECRET");
  const tokenUrl = "https://login.microsoftonline.com/" + tenantId + "/oauth2/v2.0/token";
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: GRAPH_SCOPE,
    grant_type: "client_credentials"
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Microsoft Graph token acquisition failed with status " + response.status + ": " + errorText);
  }

  const result = await response.json();
  if (!result || !result.access_token) {
    throw new Error("Microsoft Graph token acquisition returned no access token.");
  }

  return result.access_token;
}

async function sendMail(contact) {
  const toEmail = requiredSetting("CONTACT_TO_EMAIL");
  const fromEmail = requiredSetting("CONTACT_FROM_EMAIL");
  const accessToken = await getGraphAccessToken();
  const graphUrl = "https://graph.microsoft.com/v1.0/users/"
    + encodeURIComponent(fromEmail)
    + GRAPH_SEND_MAIL_PATH;

  const response = await fetch(graphUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildEmail(contact, toEmail))
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Microsoft Graph sendMail failed with status " + response.status + ": " + errorText);
  }
}

module.exports = async function (context, req) {
  try {
    const validation = validatePayload(parsePayload(req.body));

    if (validation.isSpam) {
      context.res = createResponse(202, { ok: true });
      return;
    }
    if (validation.error) {
      context.res = createResponse(400, { error: validation.error });
      return;
    }

    await sendMail(validation.contact);
    context.res = createResponse(202, { ok: true });
  } catch (error) {
    context.log.error("Contact form email failed.", error);
    context.res = createResponse(500, { error: "Message could not be sent." });
  }
};
