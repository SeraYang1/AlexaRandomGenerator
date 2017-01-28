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
                        buildSpeechletResponse(`I can help you generate random responses. You can give me two numbers or up to six options to choose between.`, false)
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

                    case "randtwo":
                        var rand = Math.floor(Math.random() * 2);
                        var val='hi';
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

                    case "randthree":
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

                    case "randfour":
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

                    case "randfive":
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

                    case "randsix":
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

                    case "Help":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Hello! Welcome to unofficial Random Generator. You can give me two numbers for me to choose a random number between, such as one and ten, or you can give me a list of up to six items for me to choose from.`, false),{}
                        )
                            )
                        break;

                    case "Terminate":
                        context.succeed(
                            generateResponse(
                                buildSpeechletResponse(`Thanks for using unofficial Random Generator. See you around!`, true), {}
                            )
                        )
                        console.log('SESSION ENDED REQUEST')
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
