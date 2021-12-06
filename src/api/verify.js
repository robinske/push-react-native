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
  console.log(identity);

  const response = await fetch(ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identity: identity,
    }),
  }).catch((err) => console.log(`Error fetching access token: ${err}`));

  const json = await response.json();
  const deviceName = "Kelley's iPhone 12";
  // const deviceName = await getDeviceName().catch(
  //   () => `${phoneNumber}'s Device'`
  // );

  const deviceToken = "000000000000000000000000000000000123";
  // const deviceToken = await getDeviceToken().catch(
  //   () => "000000000000000000000000000000000000"
  // );

  console.log("registering...");
  // const payload = ;

  // console.log(payload);

  try {
    const payload = new PushFactorPayload(
      deviceName,
      json.serviceSid,
      json.identity,
      deviceToken,
      json.token
    );
    console.log(payload);
    let factor = await TwilioVerify.createFactor(payload);
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }

  // factor = await TwilioVerify.verifyFactor(
  //   new VerifyPushFactorPayload(factor.sid)
  // ).catch((err) => {
  //   console.log(`Error verifying factor: ${err}`);
  // });
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
