(function() {
    const readline = require("readline");
    const chalk = require("chalk");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const line = "--------------------------------------";

    function Player() {
        this.name;
        this.playerSay = phrase => chalk.cyan(phrase);
        this.futurePlayerSay = phrase => chalk.magenta(phrase);
    }

    let player = new Player();

    const q1 = `${line}
A loud, abrupt noise grumbled its way
from beneath the washroom door and into your bedroom.
You were not sure that no one else was around at this time of night.

You looked back and forth.
Perhaps it was time for you to change your nature.

It's time to decide...
a. close your eyes and try to go back to sleep or
b. decide to investigate.

What's your choice - "investigate" or "go back to sleep"?
${line}
Your answer?
`;

    const q2 = `${line}
You opened the door cautiously and entered the hall way.
You crept towards the beige bathroom stall door,
hoping to get close enough to peek inside though the crack.

Someone was still bustling around in there... Take a deep breath.
Perhaps the neighbor's cat snug in threw the window again.
Or perhaps the drain broke again.
You were hoping for everything else than a burglar..

You got close enough to make a move now.

"Now, what should I do?"

a. burst in the door or
b. peek inside.

Time to make a decision. Hurry!

What's your choice - "burst in the door" or "try to peek"?
${line}
Your answer? `;

    const q3 = `${line}
Before you could act the door flew open, smashing into your forehead,
knocking you to the floor. The room began to darken and slip out of focus.

Someone ran past you, a streaking black blur against a fuzzy dark room.

You were fighting the desire to become unconscious, you grabbed a mop and used it
as a crutch to bring yourself to your feet.

Down and away, hurried footsteps were echoing from the hallway.

A tempered rage engulfed you - what sort of animal would
desecrate your home like this?

"I have to do something!"

a. Follow the trail of clutter and give chase?
b. Go back and investigate the stall and search for clues?

So what is it going to be?

What's your choice - "follow the trail" or "search for clues"?
${line}
Your answer? `;

    const q4a = `${line}
You had been pushed too far! Whether it was a result of hours of
coding-related frustrations or the obscenely high levels of
poluted blod cells in your bloodstream, you were not sure - but now
it was time for someone to pay.

"Surely, I will need some sort of a tool or weapon."

a. In the kitchen there were plenty of knives, but
b. in the garage there was a spraycan containing some pretty toxic stuff.

So what is it going to be?

What's your choice - "grab a knife" or "grab a spraycan"?
${line}
Your answer? `;

    const q4b = `${line}
As tempting as it was to hunt down whoever that monster was,
you weren't that easily tempted. You took a quick look around.
The garbage can had been flipped over, scattering soiled
papwer towels and a stray condom wrapper acroos the tiled floor.
Adding insult to injury, the syrupy content from a can of soda were
also splattered along the wall.
Yet, there was one mark that stood out: a small, circular logo
perfectly centered near the top of the door.
It looked like an ellipse with the letter "Q" within.
As you looked further down, you saw that more and yet more of these tags
were placed on the wall.

"This can't be a coincidence, but it could be dangerous. I have to react fast."

a. Call the police
b. Go talk to the retired neighbor.

Make a choice

What's your choice - "call the police" or "talk to neighbor"?
${line}
Your answer? `;

    const q5a = `${line}
Thrusting the spraycan in your holster, you took off
running down the hallway.
"You're mine, you filthy buffer", you mumbled to yourself.

You were moving recklessly fast and nearly collided with a coat stand.
Diluted and confused you asked it: "Did someone run by here?"
"Uhh, I don't know. Are you ok? You are bleeding", the coat stand replied
"Are you sure?", you asked ignoring the question.
"I think so." The coat stand didn't sound very sure.
"What's going on?"
"Why is it so smooky here?" you asked once again ignoring the question.
"Incense."
"Why were you burning incense?"
"I'm a spiritual coat stand", the coat stand verified.
"But your jacket has a pentagram on it?"
"It's both a musical and mystical symbol.
Besides, the jacket doesn't belong to me, I'm just holding it."
"And why then is the pentagram covered in blood?"
"Well, that just looks cool."

You sighed.
"Come on. Let's go."
You grabbed the jacket and swung it over the shoulder.
"And get dressed, you're naked"

"Where are we going?", the coat stand asked.

a. go to a hospital
b. go to the mechanical room
c. go back to bed

"So what is it going to be"?

What's your choice - "go to a hospital", "go to the mechanical room" or "go back to bed"?
${line}
Your answer? `;

    const followTheTrail = {
        q: q4a,
        answers: {
            "grab a spraycan": {
                q: q5a,
                answers: {
                    "go to the mechanical room": `
Well, the only way out is through the mechanical room, but the door's always locked.
To be continued...
`,
                    "go to a hospital": `
I got to go see a doctor for my wounds.
Take me to a nearby hospital. The car keys are in the jacket pocket.`,
                    "go back to bed": `
I should have stayed in bed. So, we are going back to bed!
`
                }
            },
            "grab a knife": `
Wow, calm down Rambow. Surely, you are looking for life imprisonment, aren't you?
I'm out.. Good luck with the killing!
`
        }
    };
    const searchForClues = {
        q: q4b,
        answers: {
            "call the police": `
to be continued...
`,
            "talk to neighbor": `
to be continued...
`
        }
    };

    const introduction = {
        q: q1,
        answers: {
            investigate: {
                q: q2,
                answers: {
                    "try to peek": {
                        q: q3,
                        answers: {
                            "follow the trail": followTheTrail,
                            "search for clues": searchForClues
                        }
                    },
                    "burst in the door": {
                        q: q3,
                        answers: {
                            "follow the trail": followTheTrail,
                            "search for clues": searchForClues
                        }
                    }
                }
            },
            "go back to sleep": `
Alright then. Good luck falling asleep now!
`
        }
    };

    function askQuestion(convObj) {
        rl.question(chalk.cyan(convObj.q), function(answer) {
            if (typeof convObj.answers[answer] === "string") {
                console.log(chalk.yellow(convObj.answers[answer]));
                rl.close();
                return;
            } else if (typeof convObj.answers[answer] === "object") {
                convObj = convObj.answers[answer];
                console.log(
                    chalk.green(`
Wow, I hope you are wearing your big boys pyjamas...
Alright then. Let's ${answer}!
                `)
                );
                askQuestion(convObj);
            } else {
                console.log(
                    chalk.red(`
Now is probably not the best time to ${answer}..
You've got another chance to make up your mind. Choose wisely this time!
`)
                );
                askQuestion(convObj);
            }
        });
    }

    askQuestion(introduction);
})();
