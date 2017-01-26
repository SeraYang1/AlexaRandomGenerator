exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            //New Session
            console.log("NEW SESSION")
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // > Launch Request
                console.log("LAUNCH REQUEST")
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse(`I can help you generate random responses.`, false)
                    )
                )
                break;

            case "IntentRequest":
                // Intent Request
                console.log(`INTENT REQUEST`)

                switch (event.request.intent.name) {
                    case "RandomBetween":
                        var numSlot = event.request.intent.slots.num;
                        var numEndSlot = event.request.intent.slots.numEnd;
                        var num = parseInt(numSlot.value);
                        var numEnd = parseInt(numEndSlot.value);
                        var diff = numEnd - num;
                        var rand = parseInt(Math.random() * diff + num);
                        
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Your random number is ${rand}`, false), {}
                                )
                            )
                        
                        break;

                        // default:
                        //     throw "Invalid intent"
                }
                break;

            case "SessionEndRequest":
                // Session Ended Request
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse(`Thanks for using Random Generator. See you around!`, true), {}
                    )
                )
                console.log('SESSION ENDED REQUEST')
                break;

            default:
                context.fail('INVALID REQUEST TYPE ${event.request.type}')

        }
    } catch (error) {
        context.fail('Exception: ${error}')
    }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}
