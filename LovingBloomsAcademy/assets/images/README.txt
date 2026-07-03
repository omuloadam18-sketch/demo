Drop your About page background photo here as:

    about-hero.jpg

The About page (html/about.html) already references this file via
css/style.css, rule "#about-hero". Until you add a real photo, the
page shows a clean navy gradient fallback, so nothing looks broken.

To use a different filename or an external/Google Storage URL instead,
open css/style.css and edit the #about-hero rule:

    #about-hero{
      background-image:
        linear-gradient(180deg, rgba(11,44,92,.75), rgba(11,44,92,.6)),
        url('../assets/images/about-hero.jpg');
    }

Recommended photo size: at least 1600x900px, landscape orientation,
so it stays sharp on large screens.
