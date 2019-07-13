/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
// const logger = require('./logger');

module.exports = function(controller) {

    controller.hears('sample','message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

	controller.interrupts('Code Verification', 'message', async(bot, message) => {
		try {
			verificationRequest = await twilio.verify.services(VERIFICATION_SID)
			.verifications
			.create({ to: message, channel: 'sms' });
		} catch (e) {
			console.log(e);
		}	
	  });

    controller.on('message', async(bot, message) => {

		const code = Math.floor((Math.random() * 10000) + 1000);
		let verificationResult;

		try {
			verificationResult = await twilio.verify.services(VERIFICATION_SID)
			.verificationChecks
			.create({ code, to: message });
		} catch (e) {
			console.log("error : ", e);
		}

		if (verificationResult.status === 'approved') {
			await bot.reply(message, `${ message.text } Approved ! `);
		}
		else {
			await bot.reply(message, `${ message.text } Not Approved !`);

		}
    });

	// await bot.reply(message, `Enter verification code sent to : ${ message.text }`);


}