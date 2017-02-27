# alexa_copycat_skill

This simple example shows how to bypass Alexa's NLP almost entirely by capturing raw user input from Alexa, then handing it off to API.ai for processing.

My impetus for writing this was to avoid the pitfalls and limitations of Alexa's simplistic NLP engine since my skill's complexity outgrew its capability fairly quickly. Amazon is soon deprecating the the AMAZON.LITERAL slot type. See this [Amazon blog post](https://developer.amazon.com/blogs/post/Tx3IHSFQSUF3RQP/why-a-custom-slot-is-the-literal-solution) on how to capture raw data using Custom Slot Types instead.

Of course you can use any third party NLP/NLU engine you choose or use your own. This just shows how you can hook into API.ai. And as of this release Amazon's LEX is still in Preview and I've not been granted access yet, so it's unclear how well LEX will improve Alexa's NLP functionality.

If you just want to play with the Copycat skill without talking to API.ai, just don't specify a `API_CLIENT_TOKEN` environment variable.

### Create an Alexa skill

This assumes you have an existing Alexa account, are logged in.

1. Create a new skill from your Alexa dashboard online.
2. Set up **Skill Information**.
    - Set Name to `CopyCat` or desired name.
    - Set Invocation Name to `copycat` or desired invocation name, then click Save.
3. Set up **Interaction Model**.
    - Paste contents of file `schema.json` into the Intent Schema box.
    - Click the Add Slot Type button. Set Enter Type to `CatchAll` and paste `CatchAll_slot_type.txt` values into the Enter Values box.
    - Paste contents of file `utterances.txt` into the Sample Utterances box.
    - Click Save.
4. Set up **Configuration**.
    - Set Service Endpoint Type to HTTPS since this example requires you host the skill yourself (Heroku, etc.)
    - Set to your location (North America or Europe).
    - Set your server's endpoint URL. Most likely you'll want to point to your local PC/Mac so you'll need to find a tunnel that routes webhook requests to your local machine. I use [ngrok](https://ngrok.com/) which has been terrific for me. If you deploy to a cloud, you might use Heroku as `https://<appname>.herokuapp.com/alexa/copycat`.
    - Set Account Linking to `No`. Click Save.
5. Set up **SSL Certificate**.
    - Set Certificate for NA Endpoint to appropriate option. If using Heroku, just set the middle option `My development endpoint is a sub-domain...`. Click Save.
6. Don't worry about the remaining skill tabs since you'll just be testing as a developer.

### Create an API.ai agent

Set up your API.ai account and create or use an existing agent.

1. Create at least one intent to demonstrate recognition of a trigger. For example:
1. Create an Intent called `Hello` with multiple greeting examples. Set intent action to `hello`.
1. Copy your agent's `Client access token` found on your agent's general tab and add an environment variable called API_CLIENT_TOKEN whose value is this id.

### Execution

You should be good to go. Make sure you supply the `API_CLIENT_TOKEN` environment variable to connect with API.ai.

You can now either go to your skill's Test tab and enter phrases into the Service Simulator or invoke the skill via Alexa by saying "Alexa, open Copycat".

NOTE: The extraneous Express files are due to using express-generator, which you can basically ignore.

Good luck!
