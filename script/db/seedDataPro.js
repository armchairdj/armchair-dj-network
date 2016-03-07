/******************************************************************************
Seed data for production environment.
******************************************************************************/

var blackstar = [
  "It's hard to listen to \"Blackstar,\" the title track from David Bowie's final album, outside the context of his death from cancer at the age of 69. The song was released as a single a few months before he died, but as with so many other Bowie projects, I didn't take the time to engage with it. I gave the song a spin or two, scrubbed through the creepy, button-eyed video, and filed the entire pop-culture event under \"weird, probably good, must investigate further.\"",
  "Then I returned to slinging code and binge-watching police procedurals with my husband.",
  "I'd always been that way with Bowie: engaging intermittently, most often based on his collaborators du jour. I spent 2013 obsessed with James Murphy's remix of \"Love is Lost\" the same way I spent 1996 playing the Pet Shop Boys version of \"Hallo Spaceboy\" on repeat. \"Let's Dance\" has been in my collection for 25 years - filed under \"C\" for \"Chic.\" Each time I rubbed up against Bowie's genius, I attributed it to somebody else.",
  "I think it was the 1980s ubiquity of lesser Bowie singles that put me off. Junior high, for me, was the age of \"Dancing in the Streets\" and \"Blue Jean.\" Ugh.",
  "Then, in the '90s, Bowie had the nerve to get excited about the same electronic music I loved. I lumped 1997's drum-n-bass-infused \"Earthling\" album in with U2 and other rock dinosaurs daring to get their guitars in my techno.",
  "As my interest in electronic music deepened during the Napster era, I dutifully downloaded low-quality MP3s of the Berlin trilogy and filed them away with all the other music I knew I should really study and absorb. But I kept pushing my Bowie phase out into some imaginary future when I would have time to really roll up my sleeves and study.",
  "Now, in the wake of Bowie's passing, that time has finally come. I've spent 2016 in a fever dream, expanded my Bowie collection with the mad abandon of somebody who knows he's late to the party. I can't stop listening to \"Aladdin Sane,\" \"Bring Me the Disco King\" and \"John, I'm Only Dancing.\" But the song that finally made Bowie click into place for me was the sprawling, gloriously weird \"Blackstar,\" which I played endlessly in the days after his death.",
  "The ghostly croon and the staccato, funkless drums sound beamed in from another, cooler dimension. The squawking sax lines and odd computer noises reinforce a sense of weightless yearning. Then, halfway through, heavenly strings come in and the beat attains a gentle swing. Bowie ratchets up the lyrical/vocal weirdness, flutes duel it out with the sax, and he cycles back to the gnostic chanting of the song's opening moments. He ends where he began, a krautrock-jazz daddy-o ready to ascend."
].join('\n\n');

module.exports = {
  users: [
    {
      name:     'Brian Dillard',
      username: 'armchairdj',
      email:    'armchairdj@gmail.com',
      role:     'admin'
    }, {
      name:     'Charlie Smith',
      username: 'oddhoursradio',
      email:    'moviemanager05@yahoo.com',
      role:     'author'
    }
  ],

  tags: {
    Genre:   [
      'techno',
      'Detroit techno',
      'Chicago house',
      'synth-pop',
    ],
    Artist:  [
      'Kate Bush',
      'Saint Etienne',
      'Pet Shop Boys',
      'Robyn',
    ],
    Mood:    [
      'over-the-top',
      'sleazy',
      'intense',
      'dark',
    ],
    Keyword: [
      'zeitgeist',
      'pretentious',
      'hipster',
      'back in the day',
    ]
  },

  releases: [
    {
      tags:    {
        Genre: 'art-rock, jazz',
        Mood:  'autumnal, melancholy, creepy, spacey, mournful'
      },
      artist:  'David Bowie',
      title:   'Blackstar',
      year:    '2015',
      type:    'Track'
    }
  ],

  playlistSeries: [
    {
      title: 'Verona Elementary',
      theme: 'Battle Creek: 1978-1985'
    }, {
      title: 'W.K. Kellogg',
      theme: 'Battle Creek: 1985-1988'
    }, {
      title: 'BCCHS',
      theme: 'Battle Creek: 1988-1991'
    }, {
      title: 'Shaw Hall & Haslett Arms',
      theme: 'East Lansing: 1991-1993'
    }, {
      title: 'Camberwell & Howland House',
      theme: 'London & East Lansing: 1993-1994'
    }, {
      title: 'Beal Street & Crouch End',
      theme: 'East Lansing & London: 1994-1996'
    }, {
      title: 'West Lakeview',
      theme: 'Chicago: 1996-1998'
    }, {
      title: 'East Lakeview',
      theme: 'Chicago: 1998-2000'
    }, {
      title: 'The Tenderloin',
      theme: 'San Francisco: 2000-2003'
    }, {
      title: 'Wicker Park',
      theme: 'Chicago: 2003-2008'
    }, {
      title: 'Logan Square',
      theme: 'Chicago: 2008-2015'
    }, {
      title: 'Mount Washington',
      theme: 'Los Angeles: 2015-present'
    }, {
      title: "Techno Is",
      theme: 'Remedial Education in Electronic Music'
    }, {
      title: 'Postmodern Cabaret',
      theme: 'All Over the Map'
    }, {
      title: 'Popcorn',
      theme: 'Film Music, Ambient, Krautrock & Post-Rock'
    }, {
      title: 'Holiday',
      theme: 'Winter and Its Discontents'
    }
  ],

  posts: [
    {
      author:  0,
      release: 0,
      content: blackstar
    }
  ]
};
