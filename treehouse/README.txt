Treehouse — Free Bootstrap 5 Kids School Website Template by uiCookies
https://uicookies.com/

Treehouse is a bright, parent-friendly website template for a primary or
elementary school (Kindergarten to Grade 5), built on Bootstrap 5. It ships three
pages for the fictional Treehouse Elementary: a home page, an academics page and
an admissions page. The look is royal blue, sunshine yellow and tomato on white,
with chunky "Baloo 2" headings, "Figtree" body text, arch-shaped photo frames and
a few playful SVG shapes. It is completely jQuery-free: the grade tabs, the
day filter for after-school clubs, the month-view events calendar, the specialist
minutes chart, the open-day booking form and the scroll animations are all plain
vanilla JavaScript. Content is progressively enhanced (everything is readable
without JavaScript) and respects prefers-reduced-motion.
Free for personal and commercial use. Attribution is optional but always welcome — https://uicookies.com/license/

WHAT'S INSIDE
  index.html            Home: hero, why Treehouse, learning by grade (K-5 tabs),
                        after-school clubs filtered by day, events calendar,
                        latest news, parent portal box, admissions call to action
  academics.html        Curriculum by grade, specialist subjects with a
                        minutes-per-week chart, learning support, a Grade 3
                        timetable, assessment and a sample report
  admissions.html       Admissions steps, tuition and fees tables, open-day
                        booking form, key dates and FAQ
  css/vendor/           Bootstrap 5.3.8 (minified, self-hosted)
  css/style.css         Template design layer; colours and fonts are CSS
                        custom properties at the top of the file
  js/vendor/            Bootstrap 5.3.8 bundle (includes Popper)
  js/main.js            Template behaviour: vanilla JavaScript, no jQuery
  img/                  Demo photos (CC0 / public domain, see CREDITS.txt)
  CREDITS.txt           Source and licence of every demo photo

NOTES
  - Built on Bootstrap 5.3.8. No jQuery and no other JavaScript libraries.
  - Calendar events live in the EVENTS array at the top of js/main.js (dates as
    YYYY-MM-DD, with an optional "end" date for breaks and multi-day events).
    The calendar opens on the current month, or the next month that has events.
    The short list inside the calendar in index.html is what visitors see with
    JavaScript turned off; update it when you change the events.
  - The specialist chart on academics.html reads SPECIALIST_MINUTES in
    js/main.js.
  - To rebrand, edit the custom properties at the top of css/style.css
    (--blue, --sun, --tomato, --ink and the two font families).
  - Forms are front-end only: they validate in the browser and show a thank-you
    state, but nothing is sent. Point the form at your backend or a form service
    before launch, and remove the "Demo form" note in admissions.html.
  - Portal, news and download links point to "#" placeholders; link them to
    your own pages.
  - People are shown as initials avatars rather than photos. Replace the demo
    images in img/ with your own school photography before launch.
