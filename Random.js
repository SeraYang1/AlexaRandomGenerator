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
                                    buildSpeechletResponse(`Your random number is ${rand}. Anything else?`, false), {}
                                )
                            )
                        
                        break;

                    case "two":
                        var rand = Math.floor(Math.random() * 2);
                        var val=" ";
                        if (rand == 0){
                            val = event.request.intent.slots.one.value;
                        }
                        else{
                            val = event.request.intent.slots.two.value;
                        }
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Your random choice is ${val}. Anything else?`, false), {}
                                )
                            )
                        
                        break;

                    case "three":
                        var rand = Math.floor(Math.random() * 3);
                        var val=" ";
                        if (rand == 0){
                            val = event.request.intent.slots.one.value.toLowerCase();
                        }
                        else if (rand == 1){
                            val = event.request.intent.slots.two.value.toLowerCase();
                        }
                        else {
                            val = event.request.intent.slots.three.value.toLowerCase();                            
                        }
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Your random choice is ${val}. Anything else?`, false), {}
                                )
                            )
                        
                        break;

                    case "four":
                        var rand = Math.floor(Math.random() * 4);
                        var val=" ";
                        if (rand == 0){
                            val = event.request.intent.slots.one.value.toLowerCase();
                        }
                        else if (rand ==1){
                            val = event.request.intent.slots.two.value.toLowerCase();
                        }
                        else if (rand == 2){
                            val = event.request.intent.slots.three.value.toLowerCase();
                        }
                        else {
                            val = event.request.intent.slots.four.value.toLowerCase();
                        }
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Your random choice is ${val}. Anything else?`, false), {}
                                )
                            )
                        
                        break;

                    case "five":
                        var rand = Math.floor(Math.random() * 5);
                        var val=" ";
                        if (rand == 0){
                            val = event.request.intent.slots.one.value.toLowerCase();
                        }
                        else if (rand == 1){
                            val = event.request.intent.slots.two.value.toLowerCase();
                        }
                        else if (rand == 2){
                            val = event.request.intent.slots.three.value.toLowerCase();
                        }
                        else if (rand == 3){
                            val = event.request.intent.slots.four.value.toLowerCase();
                        }
                        else {
                            val = event.request.intent.slots.five.value.toLowerCase();
                        }
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Your random choice is ${val}. Anything else?`, false), {}
                                )
                            )
                        
                        break;

                    case "six":
                        var rand = Math.floor(Math.random() * 6);
                        var val=" ";
                        if (rand == 0){
                            val = event.request.intent.slots.one.value.toLowerCase();
                        }
                        else if (rand == 1){
                            val = event.request.intent.slots.two.value.toLowerCase();
                        }
                        else if (rand == 2){
                            val = event.request.intent.slots.three.value.toLowerCase();
                        }
                        else if (rand == 3){
                            val = event.request.intent.slots.four.value.toLowerCase();
                        }
                        else if (rand == 4){
                            val = event.request.intent.slots.five.value.toLowerCase();
                        }
                        else{
                            val = event.request.intent.slots.six.value.toLowerCase();
                        }
                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(`Your random choice is ${val}. Anything else?`, false), {}
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
