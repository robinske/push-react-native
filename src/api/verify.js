import { BASE_URL, ACCESS_TOKEN_URL, CHALLENGE_URL } from "@env";
import { getDeviceName, getDeviceToken } from "react-native-device-info";
import { sha256 } from "react-native-sha256";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function hash(value) {
  return sha256(value);
}

import TwilioVerify, {
  PushFactorPayload,
  VerifyPushFactorPayload,
  UpdatePushChallengePayload,
  ChallengeStatus,
} from "@twilio/twilio-verify-for-react-native";

export const createFactor = async (phoneNumber) => {
  try {
    // identity should not contain PII
    const identity = await hash(phoneNumber);

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

    const deviceName = await getDeviceName().catch(
      () => `${phoneNumber}'s Device'`
    );

    const deviceToken = await getDeviceToken().catch(
      () => "000000000000000000000000000000000000"
    );

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
    );

    AsyncStorage.setItem("@factor_sid", factor.sid);
    AsyncStorage.setItem("@identity", identity);

    return factor.sid;
  } catch (e) {
    console.error(`ERROR!`);
    console.error(`${e}`);
  }
};

export const silentAuthorization = async (factorSid) => {
  try {
    const identity = await AsyncStorage.getItem("@identity");

    const data = JSON.stringify({
      identity,
      factor: factorSid,
      message: "Login request",
    });

    const response = await fetch(CHALLENGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const json = await response.json();
    const challengeSid = json.sid;

    // silently approve
    const payload = new UpdatePushChallengePayload(
      factorSid,
      challengeSid,
      ChallengeStatus.Approved
    );
    let updated = await TwilioVerify.updateChallenge(payload);
    updated = await TwilioVerify.getChallenge(challengeSid, factorSid);

    return updated.status === ChallengeStatus.Approved;
  } catch (e) {
    console.error(e);
    return false;
  }
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
