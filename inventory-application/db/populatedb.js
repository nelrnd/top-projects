const { argv } = require("node:process")
const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR(100),
  category_description TEXT
);

CREATE TABLE IF NOT EXISTS brands (
  brand_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand_name VARCHAR(100),
  brand_description TEXT
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100),
  description TEXT,
  price_in_dollar INTEGER,
  stock_quantity INTEGER,
  category_id INTEGER REFERENCES categories,
  brand_id INTEGER REFERENCES brands
);

INSERT INTO categories (category_name, category_description) VALUES
('Piano', 'The piano is a versatile and elegant instrument known for its wide range and expressive potential. With its 88 keys, it allows players to perform both melody and harmony simultaneously, making it central to many genres, from classical to jazz and pop. Its dynamic capabilities make it equally suited for delicate, introspective pieces and powerful, dramatic performances.'),
('Guitar', 'The guitar is a popular and adaptable string instrument, prized for its ability to produce a wide variety of sounds. From the gentle strumming of acoustic folk to the electrifying riffs of rock and metal, the guitar is central to many musical styles. With six strings and countless playing techniques, it offers a unique blend of rhythm and melody.'),
('Drums', 'Drums are the rhythmic backbone of music, providing structure, energy, and drive to a performance. From the steady pulse of a snare in a marching band to the complex grooves of a jazz kit, drums bring music to life. They are highly dynamic, allowing for both subtle accents and powerful beats that command attention.');

INSERT INTO brands (brand_name, brand_description) VALUES
('Yamaha', 'The Yamaha brand is known throughout the world for its various sectors of activity. From motorized mechanics to acoustic and electronic musical instruments, through Hi-Fi audio equipment, everyone has had to deal with Yamaha. Today, the brand creates references in each of its fields. This is notably the case with the HS series of monitoring speakers, the P-45 or P-125 digital pianos or the C40 series of classical guitars. Over the years, Yamaha has acquired an image that many of its competitors envy, namely that of an innovative, demanding, environmentally conscious and customer-oriented musical instrument manufacturer. These multiple activities make Yamaha a huge company with over 90 subsidiaries and no less than 25,000 employees worldwide.'),
('Roland', 'The Roland brand is undoubtedly part of the small circle of brands that have revolutionised music, and more particularly electronic music. Today, Roland offers musicians a substantial catalogue of products, ranging from synthesizers and guitar amps to effects processors and virtual instruments.'),
('Eastone', 'If there is a brand that is more and more talked about among musicians, it is EASTONE. Just put your hands on their entry-level model, the SBC20, to understand that it is possible to strike your first chords on an acoustic guitar offering unparalleled playing comfort at this price level. This observation also applies to all the acoustic and electric models in the EASTONE range. Whether you are looking for a study guitar, a travel guitar or in search of a real sound identity thanks to the DR200 with a solid top, you will understand at first try the reason why this brand arouses such enthusiasm with guitarists.'),
('Fender', 'With an illustrious history dating back to 1946, Fender has touched and transformed music worldwide and in nearly every genre: rock ‘n’ roll, country and western, jazz, rhythm and blues and many others. Everyone from beginners and hobbyists to the world’s most acclaimed artists and performers have used Fender instruments and amps, in the process making the company not only a revered music industry name, but also a cultural icon. It is our vision to continue championing THE SPIRIT OF ROCK-N-ROLL® throughout the world and our mission to exceed the expectations of music enthusiasts worldwide.'),
('Pearl', 'We care for every musician''s needs and deliver unrivaled instruments developed from innovative research and development combined with world-class craftsmanship to meet those needs.'),
('Alesis', 'Alesis has revolutionized the music industry time and time again with their ground-breaking studio recording, electronic percussion, keyboard and live sound gear. Their passion for innovation is unmatched, and they''re dedicated to creating gear that empowers musicians, producers and engineers at all skill levels to unleash their full creative potential at home, on-stage and in the studio.');



INSERT INTO items (name, description, price_in_dollar, stock_quantity, category_id, brand_id) VALUES
('PSR-SX920', 'The PSR-SX920 is an arranger keyboard from Yamaha.', 2640, 2000, (SELECT category_id FROM categories WHERE category_name = 'Piano'), (SELECT brand_id FROM brands WHERE brand_name = 'Yamaha')),
('CLP-835 - black', 'The CLP-835 is a digital upright piano offered by Yamaha. The sounds of the Yamaha CFX and Bösendorfer Imperial concert grand pianos are available in binaural sound. You can also play with a variety of rhythms, as well as two fortepiano sounds. Clavinova CLP digital pianos are designed to reproduce the feel and experience of a grand piano on a digital instrument, combining the latest digital technology with the art of piano craftsmanship cultivated for over 120 years. The new CLP-800 series incorporates several new technologies at every stage of the process to replicate the complex interactions that occur inside a grand piano and offer the pianist an unprecedented experience on a digital instrument.', 2352, 2000, (SELECT category_id FROM categories WHERE category_name = 'Piano'), (SELECT brand_id FROM brands WHERE brand_name = 'Yamaha')),
('GO:KEYS 3-TQ', 'The GO:KEYS 3 is a keyboard from Roland.', 399, 1500, (SELECT category_id FROM categories WHERE category_name = 'Piano'), (SELECT brand_id FROM brands WHERE brand_name = 'Roland')),
('Player Telecaster II (MEX, RW) - transparent cherry', 'Introduced in 2024, the FENDER Player Telecaster II (0140550514) solid body electric guitar radiates timeless Fender charm, but under the hood, it''s primed for today''s players. Everything about the neck is designed for fast and fluid playability, from the Modern “C”-profile with silky satin urethane finish on the back to the comfy 9.5”-radius slab rosewood or maple fingerboard with smooth rolled edges and 22 medium jumbo frets.', 1055, 2000, (SELECT category_id FROM categories WHERE category_name = 'Guitar'), (SELECT brand_id FROM brands WHERE brand_name = 'Fender')),
('Chris Shiflett Cleaver Telecaster Deluxe (USA, RW) - dakota red', 'Night after night the Foo Fighters'' Chris Shiflett carves his way through a full brigade of guitar tones on the biggest, loudest stages in the world. This tour-tested son-of-a-gun is named "The Cleaver" for a reason - it positively slashes through the mix with a voice that snarls dirty as well as it sings clean. Previously available only as a Fender Custom Shop Masterbuilt Artist offering, Fender is proud to announce the FENDER Chris Shiflett Cleaver Telecaster Deluxe (0117450754)—a stripped-down rock machine built for high-octane live performance.', 3325, 2000, (SELECT category_id FROM categories WHERE category_name = 'Guitar'), (SELECT brand_id FROM brands WHERE brand_name = 'Fender')),
('GJ70 - wine', 'If you are looking for a great low-priced semi-hollow body electric guitar with a traditional temper, EASTONE GJ70 (Wine Red) is a tremendous instrument. It''s worth the price, and you''ll be amazed by the built quality and the great sounds that this GJ70 is able to produce. The dimensions of its neck are perfect for beginners.', 349, 1500, (SELECT category_id FROM categories WHERE category_name = 'Guitar'), (SELECT brand_id FROM brands WHERE brand_name = 'Eastone')),
('Turbo Mesh Kit', 'ALESIS Turbo Mesh Kit is a seven-piece electronic drum kit with mesh heads and intuitive sound module. Mesh heads are the overwhelming preference of drummers when they play electronic kits because of their natural feel and ultra-quiet response.', 389, 2000, (SELECT category_id FROM categories WHERE category_name = 'Drums'), (SELECT brand_id FROM brands WHERE brand_name = 'Alesis')),
('KIT JUNIOR 16 - jet black', 'Beginner''s kit with great playability and sound.', 428, 2000, (SELECT category_id FROM categories WHERE category_name = 'Drums'), (SELECT brand_id FROM brands WHERE brand_name = 'Pearl')),
('TD-07KV', 'Conveniently compact and ideal for drumming at home, the TD-07KV V-Drums kit delivers the superior expression and playability of high-end V-Drums in a budget-friendly package. Roland’s original ultra-quiet, double-ply mesh heads feature across the snare and tom pads, while large crash and ride pads and a dedicated kick pad with realistic, satisfying pedal feel round out the kit. The TD-07KV also lets you explore creative opportunities that go far beyond any acoustic kit, with deep editing tools to craft custom sounds, onboard Bluetooth to play along with music tracks and lessons, USB to connect with computer recording software, and much more.', 1199, 2000, (SELECT category_id FROM categories WHERE category_name = 'Drums'), (SELECT brand_id FROM brands WHERE brand_name = 'Roland'));
`

async function main() {
  console.log("seedling...")
  const client = new Client({
    connectionString: argv[2] || process.env.DATABASE_URL,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
