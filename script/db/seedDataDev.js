/******************************************************************************
Seed data for development environment.
******************************************************************************/

var content = [
  "Twee yr cornhole, artisan ramps pabst you probably haven't heard of them art party cold-pressed mustache farm-to-table. Hammock selvage slow-carb VHS fingerstache. Chicharrones everyday carry direct trade humblebrag, pabst 3 wolf moon tousled art party bushwick poutine VHS franzen scenester. Keffiyeh lo-fi hoodie, pop-up seitan roof party beard occupy heirloom green juice cliche. Celiac gastropub literally shoreditch ethical, godard listicle fashion axe williamsburg chambray. Tumblr post-ironic scenester, +1 everyday carry lomo godard hoodie 3 wolf moon next level meggings man braid listicle. Leggings cray irony biodiesel, kickstarter hella four dollar toast.",
  "Gentrify plaid meggings lo-fi chambray, cred schlitz. Wayfarers tumblr mixtape biodiesel. Bespoke portland readymade raw denim, pop-up cronut banh mi pitchfork chicharrones chia flannel irony pork belly marfa whatever. Viral tilde cred twee, blog intelligentsia direct trade freegan food truck normcore farm-to-table. Street art seitan tilde YOLO, pop-up listicle beard. Stumptown cray schlitz pickled, tilde deep v pinterest poutine. Meh plaid keytar listicle, yr shabby chic ethical polaroid readymade.",
  "Chia plaid biodiesel fixie godard gastropub, fingerstache echo park. Marfa authentic microdosing post-ironic master cleanse pickled. IPhone keytar waistcoat kickstarter, master cleanse truffaut viral food truck hammock 3 wolf moon craft beer kitsch taxidermy hoodie. Actually before they sold out cray, butcher vice cliche VHS food truck disrupt next level brooklyn wayfarers synth franzen selfies. Kombucha roof party synth, hashtag cornhole readymade authentic keffiyeh lomo aesthetic pitchfork fap fashion axe quinoa. Street art polaroid bespoke, beard tofu +1 butcher selfies intelligentsia actually authentic VHS normcore biodiesel. Seitan yuccie kale chips tousled letterpress, bicycle rights yr chicharrones you probably haven't heard of them etsy neutra 90's locavore small batch.",
  "Stumptown meggings slow-carb distillery pabst drinking vinegar fashion axe fingerstache, banh mi keytar letterpress try-hard sustainable. Scenester VHS direct trade freegan try-hard, chambray cred pabst chia hashtag godard. Tattooed kale chips kickstarter distillery. Tousled yr deep v, freegan 8-bit keytar hammock green juice authentic polaroid brunch typewriter literally. Ethical green juice mlkshk, synth aesthetic pitchfork XOXO. Lomo green juice shoreditch keffiyeh, pug cardigan cray paleo you probably haven't heard of them fap blue bottle bushwick etsy small batch. Swag fingerstache selfies tofu tacos messenger bag.",
  "Asymmetrical yuccie distillery, man braid banjo messenger bag hoodie sriracha. Synth mustache mlkshk gentrify williamsburg, VHS deep v hammock. Bushwick vinyl swag celiac yr church-key. Organic try-hard aesthetic, single-origin coffee selvage iPhone pop-up chillwave venmo twee ramps four dollar toast. Offal art party gochujang organic, intelligentsia vinyl try-hard sartorial fixie biodiesel you probably haven't heard of them drinking vinegar 90's +1. Ennui ugh trust fund disrupt raw denim. Taxidermy health goth flexitarian fap, slow-carb VHS DIY brooklyn franzen literally asymmetrical shoreditch plaid sustainable umami.",
  "Normcore single-origin coffee chillwave, blue bottle yuccie try-hard paleo. Chambray poutine mustache, yr portland disrupt keytar. Yr listicle whatever pug, pinterest stumptown cliche chambray artisan banjo ethical irony ramps. Stumptown flannel vinyl hashtag iPhone four dollar toast, selfies lo-fi taxidermy +1 bushwick. Tousled asymmetrical meditation kitsch. Cronut marfa before they sold out bicycle rights man bun, man braid pork belly chicharrones XOXO. Keffiyeh flexitarian occupy keytar cold-pressed."
].join('\n\n');

var playlistContent =   "Paleo meggings direct trade truffaut quinoa, microdosing yuccie keytar fap venmo. Trust fund pabst tote bag microdosing, chartreuse paleo green juice banjo +1 plaid sustainable letterpress tattooed. Gentrify gochujang everyday carry ramps. Single-origin coffee tote bag before they sold out gluten-free. Ethical occupy asymmetrical, migas selvage echo park sustainable four dollar toast hella. Knausgaard art party master cleanse, next level tumblr ethical pour-over pabst mumblecore bicycle rights actually banh mi. Keffiyeh portland narwhal knausgaard everyday carry, microdosing heirloom.";

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
    }, {
      name:     'Oz Dillard',
      username: 'oz',
      email:    'mean@armchair-dj.com'
    }, {
      name:     'River Smith-Dillard',
      username: 'river',
      email:    'nice@armchair-dj.com'
    }
  ],

  tags: {
    Genre:   [
      'Genre 1',
      'Genre 2',
      'Genre 3',
      'Genre 4',
    ],
    Artist:  [
      'Artist 1',
      'Artist 2',
      'Artist 3',
      'Artist 4',
    ],
    Mood:    [
      'Mood 1',
      'Mood 2',
      'Mood 3',
      'Mood 4',
    ],
    Keyword: [
      'Keyword 1',
      'Keyword 2',
      'Keyword 3',
      'Keyword 4',
    ]
  },

  releases: [
    {
      tags:    {
        Genre: 'disco',
        Mood:  'autumnal'
      },
      artist:  'David Bowie',
      title:   'Blackstar',
      year:    '2015',
      type:    'Track',
      url:     'http://www.example.com'
    }, {
      tags:    { Genre: 'foo, bar' },
      artist:  'Kate Boy',
      title:   'Northern Lights',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Genre: 'bat, baz' },
      artist:  'Chvrches',
      title:   'The Mother We Share',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Genre: 'apple, carrot, potato' },
      artist:  'Class Actress',
      title:   'Weekend',
      year:    '2011',
      type:    'Track'
    }, {
      tags:    { Genre: 'orange, rhubarb, pistachio' },
      artist:  'Tegan and Sara',
      title:   'How Come You Don\'t Want Me',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Genre: 'meat, bread, cheese, milk, dessert' },
      artist:  'AlunaGeorge',
      title:   'Attracting Flies',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Keyword: 'tree, forest, lawn' },
      artist:  'Twin Shadow',
      title:   'Tyrant Destroyed',
      year:    '2010',
      type:    'Track'
    }, {
      tags:    { Keyword: 'boy, girl, man, woman' },
      artist:  'Pet Shop Boys',
      title:   'One Night',
      year:    '2012',
      type:    'Track'
    }, {
      tags:    { Keyword: 'hate, love, like, dislike, adore, abhor' },
      artist:  'Class Actress',
      title:   'Love Me Like You Used To',
      year:    '2011',
      type:    'Track'
    }, {
      tags:    { Keyword: 'android, robot, tweekie' },
      artist:  'Bat for Lashes',
      title:   'Pearl\'s Dream',
      year:    '2009',
      type:    'Track'
    }, {
      tags:    { Keyword: 'trekker, nerd, twihard' },
      artist:  'Yeah Yeah Yeahs',
      title:   'Sacrilege',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Keyword: 'spring, summer, winter, fall' },
      artist:  'Justin Timberlake',
      title:   'Mirrors',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Mood: 'actual, general, insufferable' },
      artist:  'The Postal Service',
      title:   'A Tattered Line of String',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Mood: 'oops, i, did, it, again' },
      artist:  'Class Actress',
      title:   'Prove Me Wrong',
      year:    '2011',
      type:    'Track'
    }, {
      tags:    { Mood: 'anti-histamine' },
      artist:  'Jessie Ware',
      title:   'Running',
      version: 'Disclosure Remix',
      year:    '2012',
      type:    'Track'
    }, {
      tags:    { Mood: 'thomas jefferson, george washington, diet coke' },
      artist:  'Two Door Cinema Club',
      title:   'Something Good Can Work',
      version: 'Ted & Francis Remix',
      year:    '2010',
      type:    'Track'
    }, {
      tags:    { Mood: 'too good to be true, i cannot believe this exists' },
      artist:  'Ciara & Future & B.o.B.',
      title:   'Body Party',
      version: 'Remix',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Mood: 'twee, awful, energetic' },
      artist:  'Empire of the Sun',
      title:   'Walking on a Dream',
      year:    '2009',
      type:    'Track'
    }, {
      tags:    { Mood: 'trip-hop, post-rock, post-punk' },
      artist:  'Solange',
      title:   'Losing You',
      year:    '2012',
      type:    'Track'
    }, {
      tags:    { Mood: 'aboriginal, native american' },
      artist:  'Ciara',
      title:   'Overdose',
      year:    '2013',
      type:    'Track'
    }, {
      tags:    { Mood: 'ambiguous, ambidextrous, bisexual, agender, amphibious' },
      artist:  'Kate Boy',
      title:   'The Way We Are',
      year:    '2015',
      type:    'Track'
    }, {
      tags:    { Genre: 'dead, kerput, corrupt, insane in the membrane' },
      artist:  'David Bowie',
      title:   'Blackstar',
      year:    '2016',
      type:    'Album',
      url:     'http://www.example.com'
    }, {
      tags:    { Mood: 'apocryphal, erotica, anonymintiy' , Genre: 'techno' },
      artist:  'Various Artists',
      title:   'We Were So Turned On: The Songs of David Bowie',
      year:    '2010',
      type:    'Compilation'
    }, {
      tags:    { Keyword: 'breezy, easy, queasy' },
      artist:  'Moodymann',
      title:   'DJ-Kicks',
      year:    '2016',
      type:    'DJ Mix',
    }, {
      tags:    { Genre: 'recluse, damned, crazy, diaphanous, wonderful, sainted' },
      artist:  'Kate Bush',
      title:   'Wild Man',
      year:    '2011',
      type:    'Track'
    }, {
      tags:    { Mood: 'over the hill, still full of life' },
      artist:  'Pet Shop Boys',
      title:   'The Pop Kids',
      year:    '2016',
      type:    'Track'
    }, {
      tags:    { Keyword: 'wistful, retro, imaginative' },
      artist:  'Sarah Cracknell',
      title:   'On the Swings',
      year:    '2015',
      type:    'Track'
    }, {
      tags:    { Genre: 'stone cold classic, proto-trip-hop, uk soul, uk blak' },
      artist:  'Soul II Soul',
      title:   'Back to Life (However Do You Want Me)',
      year:    '1989',
      type:    'Track'
    }, {
      tags:    { Mood: 'haunting, piano-led, wistful, sexy' },
      artist:  'Kate Bush',
      title:   'Under the Ivy',
      year:    '1985',
      type:    'Track'
    }, {
      tags:    { Keyword: 'syncopated, detroit', Genre: 'detroit techno, techno' },
      artist:  'Derrick May',
      title:   'Strings of Life',
      year:    '1987',
      type:    'Track'
    }, {
      tags:    { Genre: 'uk techno, minimal techno, industrial techno, techno' },
      artist:  'Surgeon',
      title:   'Krautrock',
      year:    '1996',
      type:    'Track'
    }, {
      tags:    { Mood: 'dance-pop, gay, club kiddie, larry t' },
      artist:  'RuPaul',
      title:   'Supermodel (You Better Work)',
      year:    '1992',
      type:    'Track'
    }, {
      tags:    { Keyword: 'soul, soulful, rest in peace, RIP' },
      artist:  'Aaliyah',
      title:   'Loose Rap',
      year:    '2001',
      type:    'Track'
    }, {
      tags:    { Genre: 'paranoid, icy, synth-pop, electro', Keyword: 'detroit' },
      artist:  'Adult.',
      title:   'The Cold Call',
      year:    '2003',
      type:    'Track'
    }, {
      tags:    { Mood: 'singer-songwriter, candy, melancholy' },
      artist:  'Aimee Mann',
      title:   'Red Vines',
      year:    '1999',
      type:    'Track'
    }, {
      tags:    { Keyword: 'sinister, trip-hop, nasal, cover song, sample' },
      artist:  'The Aloof',
      title:   'Doing It for Money',
      year:    '1999',
      type:    'Track'
    }, {
      tags:    { Genre: 'lesbian, sexy, funny' },
      artist:  'Ani Difranco',
      title:   'Fire Door',
      year:    '1989',
      type:    'Track'
    }, {
      tags:    { Mood: 'political, sad, acoustic' },
      artist:  "Sinead O'Connor",
      title:   'Black Boys on Mopeds',
      year:    '1990',
      type:    'Track'
    }, {
      tags:    { Keyword: '80s, quiet storm, adult contemporary' },
      artist:  'Atlantic Starr',
      title:   'Secret Lovers',
      year:    '1985',
      type:    'Track'
    }, {
      tags:    { Genre: 'punk, post-punk, surf-rock' },
      artist:  "The B-52's",
      title:   'Planet Claire',
      year:    '1979',
      type:    'Track'
    }, {
      tags:    { Mood: 'rave, breakbeat, uk hardcore' },
      artist:  'Baby D',
      title:   'Let Me Be Your Fantasy',
      year:    '1992',
      type:    'Track'
    }, {
      tags:    { Keyword: 'indie-pop, britpop, throwback' },
      artist:  'Badly Drawn Boy',
      title:   'Disillusion',
      year:    '2000',
      type:    'Track'
    }, {
      tags:    { Genre: 'majestic, score, soundtrack, sci-fi, battlestar galactica' },
      artist:  'Bear McCreary',
      title:   'Passacaglia',
      year:    '2005',
      type:    'Track'
    }, {
      tags:    { Mood: 'rap, punky, bratty, 80s' },
      artist:  'Beastie Boys',
      title:   'Brass Monkey',
      year:    '1986',
      type:    'Track'
    }, {
      tags:    { Keyword: 'classic, melancholy, silly' },
      artist:  'The Beatles',
      title:   'The Fool on the Hill',
      year:    '1967',
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
      theme: 'Christmas, Thanksgiving and the Winter Solstice'
    }
  ],

  playlists: [
    {
      title:        'Popcorn & Dread',
      series:       14,
      seriesIndex:  1,
      tracks:       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }, {
      title:       'The Heart of the Crowd',
      series:      10,
      seriesIndex: 16,
      tracks:      [24, 23, 22, 21, 20, 19, 18, 17, 16]
    }, {
      title:       'Mostly German',
      series:      9,
      seriesIndex: 4,
      tracks:      [15, 14, 13, 0, 19, 21, 24, 19, 18, 16, 13, 2, 4, 8]
    }, {
      title:       'Techno Is Not House',
      series:      12,
      seriesIndex: 1,
      tracks:      [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    }, {
      series:      13,
      seriesIndex: 1,
      title:       'Wacky',
      tracks:      [10, 12, 14, 16, 18, 20, 22, 24, 0, 2, 4, 6, 8]
    }
  ],

  posts: [
    {
      author:      0,
      release:     0,
      content:     content
    }, {
      author:      1,
      release:     1,
      content:     content
    }, {
      author:      2,
      release:     2,
      content:     content
    }, {
      author:      3,
      release:     3,
      content:     content
    }, {
      author:      0,
      release:     4,
      content:     content
    }, {
      author:      1,
      release:     5,
      content:     content
    }, {
      author:      2,
      release:     6,
      content:     content
    }, {
      author:      3,
      release:     7,
      content:     content
    }, {
      author:      0,
      release:     8,
      content:     content
    }, {
      author:      0,
      release:     9,
      content:     content
    }, {
      author:      1,
      release:     10,
      content:     content
    }, {
      author:      1,
      release:     11,
      content:     content
    }, {
      author:      2,
      release:     12,
      content:     content
    }, {
      author:      2,
      release:     13,
      content:     content
    }, {
      author:      3,
      release:     14,
      content:     content
    }, {
      author:      3,
      release:     15,
      content:     content
    }, {
      author:      3,
      playlist:    0,
      content:     playlistContent
    }, {
      author:      2,
      release:     16,
      content:     content
    }, {
      author:      1,
      release:     17,
      content:     content
    }, {
      author:      0,
      playlist:    1,
      content:     playlistContent
    }, {
      author:      3,
      release:     18,
      content:     content
    }, {
      author:      2,
      release:     19,
      content:     content
    }, {
      author:      1,
      release:     20,
      content:     content
    }, {
      author:      0,
      playlist:    2,
      content:     playlistContent
    }, {
      author:      2,
      release:     21,
      content:     content
    }, {
      author:      3,
      release:     22,
      content:     content
    }, {
      author:      0,
      release:     23,
      content:     content
    }, {
      author:      1,
      playlist:    3,
      content:     playlistContent
    }, {
      author:      2,
      release:     24,
      content:     content
    }, {
      author:      3,
      playlist:    4,
      content:     playlistContent
    }, {
      author:      2,
      release:     25,
      content:     content
    }, {
      author:      2,
      release:     26,
      content:     content
    }, {
      author:      2,
      release:     27,
      content:     content
    }, {
      author:      2,
      release:     28,
      content:     content
    }, {
      author:      2,
      release:     29,
      content:     content
    }, {
      author:      2,
      release:     30,
      content:     content
    }, {
      author:      2,
      release:     31,
      content:     content
    }, {
      author:      2,
      release:     32,
      content:     content
    }, {
      author:      2,
      release:     33,
      content:     content
    }, {
      author:      2,
      release:     34,
      content:     content
    }, {
      author:      2,
      release:     35,
      content:     content
    }, {
      author:      2,
      release:     36,
      content:     content
    }, {
      author:      2,
      release:     37,
      content:     content
    }, {
      author:      2,
      release:     38,
      content:     content
    }, {
      author:      2,
      release:     39,
      content:     content
    }, {
      author:      2,
      release:     40,
      content:     content
    }, {
      author:      2,
      release:     41,
      content:     content
    }, {
      author:      2,
      release:     42,
      content:     content
    }, {
      author:      2,
      release:     43,
      content:     content
    }, {
      author:      2,
      release:     44,
      content:     content
    }
  ]
};
