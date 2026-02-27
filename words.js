// ─── Tricky Words ─────────────────────────────────────────────────────────────
const TRICKY_WORDS = [
  { word: "said",   sentence: "She said hello to her friend."         },
  { word: "are",    sentence: "The cats are sleeping on the mat."     },
  { word: "her",    sentence: "I gave her the red book."              },
  { word: "was",    sentence: "The dog was very happy."               },
  { word: "very",   sentence: "The cake was very sweet."              },
  { word: "you",    sentence: "Can you see the big dog?"              },
  { word: "put",    sentence: "Please put it on the table."           },
  { word: "have",   sentence: "I have a red ball."                    },
  { word: "were",   sentence: "The birds were singing in the tree."   },
  { word: "there",  sentence: "The cat is sitting over there."        },
  { word: "then",   sentence: "We ate lunch and then we played."      },
  { word: "they",   sentence: "They all went to school together."     },
  { word: "here",   sentence: "Come and sit here with me."            },
  { word: "want",   sentence: "I want some more milk, please."        },
  { word: "what",   sentence: "What is inside the big box?"           },
  { word: "some",   sentence: "Can I have some cake, please?"         },
  { word: "where",  sentence: "Where did I put my hat?"               },
  { word: "should", sentence: "You should brush your teeth each day." },
  { word: "would",  sentence: "I would like a glass of milk."         },
  { word: "could",  sentence: "She could run very fast."              },
  { word: "saw",    sentence: "I saw a big dog at the park."          },
  { word: "friend", sentence: "My friend has a red bag."              },
  { word: "school", sentence: "We go to school every day."            },
];

// ─── Easy Words ───────────────────────────────────────────────────────────────
const EASY_WORDS = [
  { word: "cat",  emoji: "🐱", hint: "a pet that meows",          sentence: "The cat sat on the mat."                 },
  { word: "dog",  emoji: "🐶", hint: "a pet that barks",          sentence: "The dog ran fast in the park."           },
  { word: "mum",  emoji: "👩", hint: "your mother",               sentence: "My mum gave me a big hug."              },
  { word: "dad",  emoji: "👨", hint: "your father",               sentence: "My dad can kick the ball far."           },
  { word: "hat",  emoji: "🎩", hint: "worn on your head",         sentence: "I put my hat on my head."               },
  { word: "sun",  emoji: "☀️", hint: "shines in the sky",         sentence: "The sun is hot and bright today."        },
  { word: "cup",  emoji: "☕", hint: "you drink from it",         sentence: "I drink milk from my cup."              },
  { word: "bed",  emoji: "🛏️", hint: "you sleep in it",           sentence: "I hop into bed when I am tired."        },
  { word: "pig",  emoji: "🐷", hint: "a pink farm animal",        sentence: "The pig sat in the wet mud."            },
  { word: "hen",  emoji: "🐔", hint: "a female chicken",          sentence: "The hen laid a big brown egg."          },
  { word: "fox",  emoji: "🦊", hint: "an orange wild animal",     sentence: "The fox ran into the bush."             },
  { word: "bug",  emoji: "🐛", hint: "a small creepy crawly",     sentence: "A bug sat on my hand."                  },
  { word: "ant",  emoji: "🐜", hint: "a tiny insect",             sentence: "The ant found a big crumb on the path." },
  { word: "bee",  emoji: "🐝", hint: "makes honey and buzzes",    sentence: "A bee flew from flower to flower."      },
  { word: "cow",  emoji: "🐄", hint: "says moo on a farm",        sentence: "The cow stood in the green field."      },
  { word: "egg",  emoji: "🥚", hint: "laid by a hen",             sentence: "The hen laid a big white egg."          },
  { word: "jam",  emoji: "🍓", hint: "fruity spread for bread",   sentence: "I put jam on my toast."                 },
  { word: "bag",  emoji: "🎒", hint: "you carry things in it",    sentence: "I put my book in my bag."               },
  { word: "map",  emoji: "🗺️", hint: "shows you where to go",    sentence: "We used the map to find the way."       },
  { word: "bus",  emoji: "🚌", hint: "a big vehicle",             sentence: "We rode the bus to school."             },
  { word: "log",  emoji: "🪵", hint: "a cut piece of tree",       sentence: "A frog sat on the old log."             },
  { word: "mud",  emoji: "💧", hint: "wet, dirty earth",          sentence: "The dog got mud on its paws."           },
  { word: "van",  emoji: "🚐", hint: "a big box-shaped vehicle",  sentence: "The big van drove down the road."       },
  { word: "pot",  emoji: "🍲", hint: "used for cooking",          sentence: "Mum put the soup in the pot."           },
  { word: "pen",  emoji: "🖊️", hint: "you write with it",         sentence: "I wrote my name with a red pen."        },
  { word: "box",  emoji: "📦", hint: "a square container",        sentence: "I put my toys in the box."              },
  { word: "bat",  emoji: "🦇", hint: "flies at night",            sentence: "A bat flew out of the cave at night."   },
  { word: "rat",  emoji: "🐀", hint: "a small furry rodent",      sentence: "The rat ran under the bench."           },
  { word: "net",  emoji: "🥅", hint: "used to catch things",      sentence: "The ball went into the net."            },
  { word: "bun",  emoji: "🍞", hint: "a small soft bread roll",   sentence: "I ate a warm bun for lunch."            },
  { word: "dot",  emoji: "⚫", hint: "a small round mark",        sentence: "I put a dot at the end of my sentence." },
  { word: "nut",  emoji: "🥜", hint: "a hard seed you can eat",   sentence: "The squirrel found a nut."              },
  { word: "rug",  emoji: "🪹", hint: "a soft floor mat",          sentence: "The cat curled up on the rug."          },
  { word: "jug",  emoji: "🫖", hint: "holds drinks",              sentence: "Dad poured milk from the jug."          },
  { word: "bin",  emoji: "🗑️", hint: "you put rubbish in it",     sentence: "Put the rubbish in the bin."            },
  { word: "cap",  emoji: "🧢", hint: "a hat with a brim",         sentence: "He put his cap on before going out."    },
];

// ─── Phonetic Words ───────────────────────────────────────────────────────────
const PHONETIC_WORDS = [
  // sh digraph
  { word: "ship",   emoji: "🚢", hint: "sails on the sea",              sentence: "The big ship sailed on the sea."              },
  { word: "shop",   emoji: "🏪", hint: "you buy things here",           sentence: "We went to the shop to get some milk."        },
  { word: "fish",   emoji: "🐟", hint: "swims in water",                sentence: "The fish swam in the clear blue water."       },
  { word: "dish",   emoji: "🍽️", hint: "food goes on it",               sentence: "I put my dinner on a clean dish."             },
  { word: "shed",   emoji: "🛖", hint: "a small garden building",       sentence: "The tools are kept in the shed."              },
  { word: "shell",  emoji: "🐚", hint: "found at the beach",            sentence: "I found a pretty shell on the beach."         },
  { word: "brush",  emoji: "🪥", hint: "used to clean your teeth",      sentence: "I brush my teeth each morning and night."     },
  { word: "flash",  emoji: "⚡", hint: "a quick burst of light",        sentence: "There was a bright flash of lightning."       },
  { word: "crash",  emoji: "💥", hint: "a loud bang",                   sentence: "The toys fell off with a big crash."          },

  // ch digraph
  { word: "chin",   emoji: "🫦", hint: "below your mouth",              sentence: "I bumped my chin on the table."               },
  { word: "chip",   emoji: "🍟", hint: "a crispy potato snack",         sentence: "I ate a hot chip from the bag."               },
  { word: "chat",   emoji: "💬", hint: "a friendly talk",               sentence: "We had a chat at the playground."             },
  { word: "chop",   emoji: "🪓", hint: "cut with an axe",               sentence: "Dad went to chop the wood."                   },
  { word: "chest",  emoji: "📦", hint: "a big box for treasure",        sentence: "The pirate hid gold in the chest."            },
  { word: "bench",  emoji: "🪑", hint: "a long seat in a park",         sentence: "We sat on the bench to eat our lunch."        },
  { word: "much",   emoji: null,  hint: null, showPicture: false,        sentence: "Thank you so much for my gift."               },
  { word: "rich",   emoji: "💰", hint: "has lots of money",             sentence: "The king was very rich."                      },
  { word: "catch",  emoji: "🫳", hint: "grab something thrown at you",  sentence: "Can you catch the ball?"                      },

  // th digraph
  { word: "thin",   emoji: null,  hint: null, showPicture: false,        sentence: "The paper was very thin."                     },
  { word: "thick",  emoji: null,  hint: null, showPicture: false,        sentence: "The big book was very thick."                 },
  { word: "that",   emoji: null,  hint: null, showPicture: false,        sentence: "I want that red apple, please."               },
  { word: "with",   emoji: null,  hint: null, showPicture: false,        sentence: "Come and play with me."                       },
  { word: "cloth",  emoji: "🧣",  hint: "a piece of fabric",             sentence: "She wiped the bench with a cloth."            },
  { word: "think",  emoji: "🤔",  hint: "use your brain",               sentence: "I think it will be sunny today."              },
  { word: "three",  emoji: "3️⃣",  hint: "one more than two",            sentence: "I have three cats at home."                   },
  { word: "throw",  emoji: "🤾",  hint: "toss something through the air", sentence: "Can you throw the ball to me?"              },

  // ng digraph
  { word: "ring",   emoji: "💍", hint: "worn on a finger",              sentence: "She wore a gold ring on her finger."          },
  { word: "sing",   emoji: "🎤", hint: "make music with your voice",    sentence: "We love to sing songs at school."             },
  { word: "long",   emoji: null,  hint: null, showPicture: false,        sentence: "The snake was very long."                     },
  { word: "song",   emoji: "🎵", hint: "music you sing",                sentence: "We sang a happy song together."               },
  { word: "wing",   emoji: "🪶",  hint: "a bird uses it to fly",        sentence: "The bird flapped its wing and flew off."      },
  { word: "bang",   emoji: "💥", hint: "a loud sudden noise",           sentence: "The door shut with a loud bang."              },
  { word: "strong", emoji: "💪", hint: "very powerful",                 sentence: "The wind was very strong today."              },
  { word: "spring", emoji: "🌸", hint: "the season after winter",       sentence: "The flowers bloom in spring."                 },
  { word: "string", emoji: "🧵", hint: "thin rope or thread",           sentence: "I tied the parcel up with some string."       },

  // ck digraph
  { word: "duck",   emoji: "🦆", hint: "says quack",                    sentence: "The duck swam on the still pond."             },
  { word: "back",   emoji: null,  hint: null, showPicture: false,        sentence: "Please put the book back on the shelf."       },
  { word: "lock",   emoji: "🔒", hint: "keeps a door shut",             sentence: "I used a key to lock the door."               },
  { word: "sock",   emoji: "🧦", hint: "worn on your foot",             sentence: "I lost one sock in the wash."                 },
  { word: "clock",  emoji: "🕐", hint: "tells you the time",            sentence: "The clock said it was three o'clock."         },
  { word: "truck",  emoji: "🚛", hint: "a big delivery vehicle",        sentence: "A big red truck drove past our house."        },
  { word: "black",  emoji: "⬛", hint: "the darkest colour",            sentence: "My cat has black and white fur."              },
  { word: "brick",  emoji: "🧱", hint: "used to build walls",           sentence: "The house was built from red brick."          },
  { word: "click",  emoji: "🖱️", hint: "a short sharp sound",           sentence: "I heard a click when I opened the door."      },

  // ee / ea vowel teams
  { word: "tree",   emoji: "🌳", hint: "tall with branches and leaves", sentence: "We played under the big shady tree."          },
  { word: "feet",   emoji: "🦶", hint: "at the end of your legs",       sentence: "I washed my feet after the beach."            },
  { word: "seed",   emoji: "🌱", hint: "a plant grows from it",         sentence: "I planted a seed in the garden."              },
  { word: "sheep",  emoji: "🐑", hint: "a fluffy white farm animal",    sentence: "The sheep ate the green grass."               },
  { word: "green",  emoji: "🟢", hint: "colour of grass",               sentence: "The frog was bright green."                   },
  { word: "queen",  emoji: "👸", hint: "rules a kingdom",               sentence: "The queen wore a big gold crown."             },
  { word: "sweet",  emoji: "🍬", hint: "tastes like sugar",             sentence: "The lolly was very sweet."                    },
  { word: "teeth",  emoji: "🦷", hint: "you chew food with them",       sentence: "I brush my teeth twice a day."               },
  { word: "sleep",  emoji: "😴", hint: "rest with your eyes closed",    sentence: "I sleep in my cosy bed at night."             },

  // ai / ay vowel teams
  { word: "rain",   emoji: "🌧️", hint: "falls from clouds",             sentence: "We got wet walking in the rain."              },
  { word: "tail",   emoji: "🐕", hint: "a dog wags it",                 sentence: "The dog wagged its tail at me."               },
  { word: "snail",  emoji: "🐌", hint: "moves very slowly with a shell", sentence: "A snail moved slowly up the wall."           },
  { word: "train",  emoji: "🚂", hint: "travels on tracks",             sentence: "We went on the train to the city."            },
  { word: "chain",  emoji: "⛓️", hint: "linked metal rings",            sentence: "The gate was held shut by a chain."           },
  { word: "day",    emoji: "🌤️", hint: "when the sun is up",            sentence: "It was a bright and sunny day."               },
  { word: "play",   emoji: "🛝", hint: "have fun at the playground",    sentence: "Let's play in the park today."                },
  { word: "clay",   emoji: "🏺", hint: "used to make pottery",          sentence: "We made a pot out of soft clay."              },
  { word: "spray",  emoji: "💦", hint: "water shoots out in drops",     sentence: "Mum used the spray to water the plants."      },
  { word: "stay",   emoji: null,  hint: null, showPicture: false,        sentence: "Please stay close to me."                     },

  // oa vowel team
  { word: "boat",   emoji: "⛵", hint: "floats on water",               sentence: "We went on a boat trip on the lake."          },
  { word: "coat",   emoji: "🧥", hint: "worn to keep warm",             sentence: "I put my coat on before going outside."       },
  { word: "goat",   emoji: "🐐", hint: "a farm animal with horns",      sentence: "The goat ate the grass on the hill."          },
  { word: "road",   emoji: "🛣️", hint: "cars drive on it",              sentence: "We walked along the long road."               },
  { word: "toad",   emoji: "🐸", hint: "like a frog",                   sentence: "A toad sat still on the rock."                },
  { word: "toast",  emoji: "🍞", hint: "grilled bread",                 sentence: "I had toast and jam for breakfast."           },

  // igh vowel team
  { word: "light",  emoji: "💡", hint: "it makes things bright",        sentence: "Please turn the light on in here."            },
  { word: "night",  emoji: "🌙", hint: "when it is dark outside",       sentence: "The stars come out at night."                 },
  { word: "right",  emoji: null,  hint: null, showPicture: false,        sentence: "Turn right at the corner."                    },
  { word: "tight",  emoji: null,  hint: null, showPicture: false,        sentence: "My new shoes were too tight."                 },
  { word: "bright", emoji: "🌟", hint: "very full of light",            sentence: "The sun was very bright today."               },
  { word: "fright", emoji: "😱", hint: "a sudden scare",                sentence: "The loud bang gave me a fright."              },

  // oo vowel team
  { word: "book",   emoji: "📚", hint: "you read it",                   sentence: "I read a good book at bedtime."               },
  { word: "cook",   emoji: "👨‍🍳", hint: "makes food in the kitchen",    sentence: "Mum loves to cook dinner for us."             },
  { word: "moon",   emoji: "🌙", hint: "glows in the night sky",        sentence: "The moon was big and round last night."       },
  { word: "pool",   emoji: "🏊", hint: "you swim in it",                sentence: "We swam in the pool all afternoon."           },
  { word: "roof",   emoji: "🏠", hint: "top of a house",                sentence: "A bird sat on top of the roof."               },
  { word: "boot",   emoji: "👢", hint: "a tall shoe",                   sentence: "I pulled on my muddy boot."                   },
  { word: "stool",  emoji: "🪑", hint: "a small seat with no back",     sentence: "I sat on a little stool in the kitchen."      },

  // consonant blends + final mix
  { word: "flag",   emoji: "🚩", hint: "waves in the wind",             sentence: "The flag blew in the strong wind."            },
  { word: "frog",   emoji: "🐸", hint: "green and loves to jump",       sentence: "A frog jumped into the pond."                 },
  { word: "drum",   emoji: "🥁", hint: "you hit it to make music",      sentence: "She banged the drum very loudly."             },
  { word: "star",   emoji: "⭐", hint: "twinkles in the night sky",     sentence: "I can see a bright star in the sky."          },
  { word: "king",   emoji: "👑", hint: "wears a crown and rules",       sentence: "The king sat on his golden throne."           },
  { word: "gift",   emoji: "🎁", hint: "a present",                     sentence: "I got a lovely gift for my birthday."         },
  { word: "tent",   emoji: "⛺", hint: "you sleep in it camping",       sentence: "We slept in a tent at the beach."             },
  { word: "bell",   emoji: "🔔", hint: "makes a ringing sound",         sentence: "The bell rang at the end of school."          },
  { word: "bird",   emoji: "🐦", hint: "has wings and can fly",         sentence: "A bird sat singing in the tree."              },
  { word: "ball",   emoji: "⚽", hint: "round and bouncy",              sentence: "We kicked the ball at the park."              },
  { word: "hand",   emoji: "✋", hint: "at the end of your arm",        sentence: "She held my hand on the way home."            },
  { word: "sand",   emoji: "🏖️", hint: "found at the beach",            sentence: "We built a big castle in the sand."           },
  { word: "lamp",   emoji: "💡", hint: "it gives off light",            sentence: "The lamp lit up the whole room."              },
  { word: "milk",   emoji: "🥛", hint: "white drink from cows",         sentence: "I drink a glass of milk each day."            },
  { word: "cake",   emoji: "🎂", hint: "sweet birthday treat",          sentence: "We had cake at the birthday party."           },
  { word: "door",   emoji: "🚪", hint: "you open and close it",         sentence: "Please close the door behind you."            },
  { word: "desk",   emoji: "🖥️", hint: "you work at it in school",      sentence: "I sat at my desk to do my writing."           },
  { word: "step",   emoji: "👣", hint: "one foot movement",             sentence: "Watch your step on the slippery path."        },
  { word: "swim",   emoji: "🏊", hint: "move through water",            sentence: "I love to swim at the beach in summer."       },
  { word: "crab",   emoji: "🦀", hint: "has claws and lives in the sea", sentence: "A crab walked sideways across the sand."     },
  { word: "drip",   emoji: "💧", hint: "water falling in drops",        sentence: "Water began to drip from the tap."            },
  { word: "flip",   emoji: "🥞", hint: "turn something over",           sentence: "Dad can flip a pancake in the pan."           },
  { word: "grip",   emoji: "🤜", hint: "hold tightly",                  sentence: "Get a good grip on the rope."                 },
  { word: "grin",   emoji: "😁", hint: "a big smile",                   sentence: "She had a big grin on her face."              },
  { word: "plug",   emoji: "🔌", hint: "connects to a power socket",    sentence: "I pulled the plug out of the bath."           },
  { word: "slip",   emoji: "⚠️", hint: "slide and nearly fall",         sentence: "Be careful or you might slip on the wet floor."},
  { word: "spin",   emoji: "🌀", hint: "go round and round",            sentence: "The top began to spin very fast."             },
  { word: "spot",   emoji: "🔴", hint: "a small mark or dot",           sentence: "I saw a red spot on the leaf."                },
  { word: "snap",   emoji: "🫰", hint: "a quick sharp sound",           sentence: "She heard the twig snap under her foot."      },
  { word: "slug",   emoji: "🐌", hint: "a slimy garden creature",       sentence: "A slimy slug crawled across the path."        },
  { word: "plum",   emoji: "🍑", hint: "a small purple fruit",          sentence: "I ate a sweet plum from the tree."            },
  { word: "clam",   emoji: "🦪", hint: "a sea creature in a shell",     sentence: "A clam lives inside a hard shell."            },
  { word: "snip",   emoji: "✂️", hint: "cut with scissors",             sentence: "I used the scissors to snip the paper."       },
  { word: "flat",   emoji: null,  hint: null, showPicture: false,        sentence: "The land near the beach was very flat."       },
  { word: "glad",   emoji: null,  hint: null, showPicture: false,        sentence: "I am glad you came to my party."              },
];

// ─── Word Selection Logic ─────────────────────────────────────────────────────
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickWords(totalCount = 10) {
  const numTricky   = 2 + Math.floor(Math.random() * 2); // 2 or 3 tricky words
  const numEasy     = 2 + Math.floor(Math.random() * 2); // 2 or 3 easy words
  const numPhonetic = totalCount - numTricky - numEasy;   // rest are phonetic

  const tricky = shuffle(TRICKY_WORDS).slice(0, numTricky).map(w => ({
    ...w,
    type: "tricky",
    showPicture: false,
  }));

  const easy = shuffle(EASY_WORDS).slice(0, numEasy).map(w => ({
    ...w,
    type: "easy",
    showPicture: true,
  }));

  const phonetic = shuffle(PHONETIC_WORDS).slice(0, numPhonetic).map(w => ({
    ...w,
    type: "phonetic",
    showPicture: w.showPicture !== false && !!w.emoji,
  }));

  return shuffle([...tricky, ...easy, ...phonetic]);
}
