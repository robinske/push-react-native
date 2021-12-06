import { BASE_URL, ACCESS_TOKEN_URL } from "react-native-dotenv";
// import { getDeviceName, getDeviceToken } from "react-native-device-info";

// TODO - implement hashing1!
function hash(value) {
  // return JSHash(value, CONSTANTS.HashAlgorithms.sha256);
  return value;
}

import TwilioVerify, {
  PushFactorPayload,
} from "@twilio/twilio-verify-for-react-native";

export const createFactor = async (phoneNumber) => {
  const identity = hash(phoneNumber);

  const response = await fetch(ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identity: identity,
    }),
  });

  const json = await response.json();
  // const deviceName = await getDeviceName().catch(
  //   () => `${phoneNumber}'s Device'`
  // );
  const deviceName = "Kelley's iPhone";

  // const deviceToken = await getDeviceToken().catch(
  //   () => "000000000000000000000000000000000000"
  // );
  const deviceToken = "000000000000000000000000000000000000";

  let factor = await TwilioVerify.createFactor(
    new PushFactorPayload(
      deviceName,
      json.serviceSid,
      json.identity,
      deviceToken,
      json.token
    )
  );

  factor = await TwilioVerify.verifyFactor(
    new VerifyPushFactorPayload(factor.sid)
  );
};

export const sendSmsVerification = async (phoneNumber) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      channel: "sms",
    });

    const response = await fetch(`${BASE_URL}/start-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkVerification = async (phoneNumber, code) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      verification_code: code,
    });

    const response = await fetch(`${BASE_URL}/check-verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();
    return json.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};
