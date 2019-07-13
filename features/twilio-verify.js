const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = function verification(number) {
	let verificationResult;
	var phone_number = [];

	if (number.length == 14){
		phone_number.push(number);
		try {
			verificationResult = twilio.verify.services(VERIFICATION_SID)
			.verifications
			.create({ channel: 'sms', to: phone_number });
		} catch (e) {
			console.log("error : ", e);
		}
	}
	else if (number.length == 6) {
		try {
			verificationResult = twilio.verify.services(VERIFICATION_SID)
			.verificationChecks
			.create({ code: number, to: phone_number[0] });
			phone_number = [];
		} catch (e) {
			console.log("error : ", e);
		}
	}
}