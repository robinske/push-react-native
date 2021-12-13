import { BASE_URL, ACCESS_TOKEN_URL } from "@env";
import { getDeviceName, getDeviceToken } from "react-native-device-info";

// TODO - implement hashing1!
function hash(value) {
  // return JSHash(value, CONSTANTS.HashAlgorithms.sha256);
  return value;
}

import TwilioVerify, {
  PushFactorPayload,
  VerifyPushFactorPayload,
} from "@twilio/twilio-verify-for-react-native";

export const createFactor = async (phoneNumber) => {
  const identity = hash(phoneNumber);
  console.log(`Creating factor with identity ${identity}`);

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

  console.log("fetched access token");

  const json = await response.json();

  console.log(json.identity);
  const deviceName = await getDeviceName().catch(
    () => `${phoneNumber}'s Device'`
  );

  const deviceToken = await getDeviceToken().catch(
    () => "000000000000000000000000000000000000"
  );

  console.log(deviceToken);

  const payload = new PushFactorPayload(
    deviceName,
    json.serviceSid,
    json.identity,
    deviceToken,
    json.token
  );
  let factor = await TwilioVerify.createFactor(payload);

  factor = await TwilioVerify.verifyFactor(
    new VerifyPushFactorPayload(factor.sid)
  ).catch((err) => {
    console.log(`Error verifying factor: ${err}`);
  });

  console.log(`Verified new factor for ${deviceName} with ${factor.sid}`);
  return factor.sid;
};

export const getChallenge = async (factorSid, challengeSid) => {
  // const challenge = await TwilioVerify.getChallenge(challengeSid, factorSid);
  // return challenge;
  return {
    location: "United States",
    deviceInfo: "Chrome running on Mac OSX",
    sid: "abc1232456",
  };
};

export const updateChallenge = async (factorSid, challengeSid, status) => {
  await TwilioVerify.updateChallenge(
    new UpdatePushChallengePayload(factorSid, challengeSid, status)
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
