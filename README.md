### :mag:&ensp;searchbar with custom search suggestions

---

**Description:** a searchbar widget with custom suggestions in dropdown format.  
**Dependencies:** none (written in pure JS)  
**Accessibility:** :white_check_mark: tabbable, :white_check_mark: supports arrow keys  
**Requirements:** basic&hairsp;&ndash;&hairsp;intermediate HTML/CSS knowledge  
**Author:** HT (@&#x200A;glenthemes)  
**Tumblr post:** [glenthemes.tumblr.com/post/163630663674](https://glenthemes.tumblr.com/post/163630663674)

**Credits:**
- `height:auto` animation via `grid-template-rows` by [Nelson Menezes](https://nemzes.net/posts/animating-height-auto).
- Google Fonts: Figtree, Golos Text

---

#### Table of Contents:
- [About](#magsearchbar-with-custom-search-suggestions)
- [Demo&#x2009;/&#x2009;Preview](#demo)
- [How it works](#how-it-works)
- [Tumblr or elsewhere](#tumblr-or-elsewhere)
- [Enable Tumblr settings](#tumblr-settings)
- [How to install](#how-to-install)
- [Further customization](#further-customization)
- [Usage notes](#usage-notes)
- [Need help?](#issues--troubleshooting)

---

### Demo:
:mag:&ensp;[search-dropdown.gitlab.io/i/demo](https://search-dropdown.gitlab.io/i/demo)  

<img alt="A GIF screenshot of OP demonstrating this widget by typing 'hello world :)' into the searchbar. When the searchbar is focused, a suggestions box appears with a slide-down animation. They then hover over the provided suggestions, namingly #photography, #art shares, #fav games, and #cat tag, each with a corresponding emoji preceding it. As the mouseover activates, the text in the searchbar changes to match that suggestion. OP moves the mouse away from the suggestions box, and the searchbar text reverts back to what they were typing before. OP clicks away from the search entirely, and the suggestion box hides by sliding up." src="https://search-dropdown.gitlab.io/i/screenshots/preview.gif" width="600">  

#### Demo code / playground:
:construction_worker:&ensp;[jsfiddle.net/glenthemes/a7bqhn4k](https://jsfiddle.net/glenthemes/a7bqhn4k)

---

### How it works:
> Users can type their custom search queries into the search input field. When they press <kbd>Enter</kbd>, it will execute the search function specified by the `<form>`, in this case, `/search`. Users also have the option to pick from one of the suggestions you've provided. These suggestions are URLs you can set yourself. For example, you could promote your `#cat tag`, or a `quote` keyword. If the user decides to choose from your suggestions, then pressing <kbd>Enter</kbd> will take them to that URL, instead of executing the query in the searchbar.
<br><br>
Your suggestions do not have to be `/tagged/some_keyword`, they can be any URL you want.
<br><br>
Users can use <kbd>up</kbd> or <kbd>down</kbd> arrow keys on their keyboard to navigate the dropdown suggestions, and <kbd>Enter</kbd> does the same thing as clicking `Search`.

---

### Tumblr or elsewhere:

This searchbar was initially tailored for T&#x2060;u&#x2060;m&#x2060;b&#x2060;l&#x2060;r, so the `<input>`'s `value` is `{SearchQuery}`, which is [a "block" unique to T&#x2060;u&#x2060;m&#x2060;b&#x2060;l&#x2060;r](https://www.tumblr.com/docs/en/custom_themes#search). However, you are welcome to use this searchbar on other websites as well. Just remember that the `<form>`'s `action` URL will vary depending on what platform you're using.

---

### Tumblr Settings:
<small>( *Skip this part if you are not using it on T&#x2060;u&#x2060;m&#x2060;b&#x2060;l&#x2060;r* )</small>

Before installing the searchbar, you need to **make sure that both your blog and your theme are visible**, otherwise the search functionality will not work.

1. Go to your blog's settings page:
   `https://www.tumblr.com/settings/blog/BLOG-NAME`  
   (replace `BLOG-NAME` with your blog's username, e.g. **devsmaycry**)
2. In "**Custom Theme**", make sure this option is turned ON (blue):  
   
   <img alt="A screenshot of the Tumblr settings page for your blog. 'Custom Theme' is written in bold on the left, and 'Enable custom theme' appears as a toggle option on the right. It is currently toggled on, with the color blue. Underneath it, the description reads 'Create a separate theme for your blog. Change the layout. Edit the code. Make an entirely new theme. It's up to you.'" src="https://search-dropdown.gitlab.io/i/screenshots/custom_theme_enabled.png">

3. Scroll down to **Visibility**. Make sure all of the following circled options are turned OFF (gray):  
   
   <img alt="A screenshot of the Tumblr settings page for your blog. 'Visibility; is written in bold on the left. There are three toggle options with labels on the right. The first toggle is circled, is turned off and gray, and reads: 'Hide BLOG-NAME from people without an account. This blog will only be viewable to people that are logged into Tumblr and its submission form will only be available on mobile apps.' The second toggle is not circled, and reads: 'Discourage external searching of BLOG-NAME. It'll be hidden from Tumblr searches, and from external search engines like Google or Yahoo.' The third toggle is circled, is turned off and gray, and reads: 'Exclude BLOG-NAME from Tumblr search and recommendations. Your blog and posts will not be recommended to others, will be excluded from Tumblr search results, and the in-blog search function will be disabled for everyone, including you.'" src="https://search-dropdown.gitlab.io/i/screenshots/tumblr_visibility_circled.png">

---

### How to install:

#### Step 1 &mdash; Essentials:

Paste the following between `<body>` and `</body>`:  
(Or paste it where you want it to be located, e.g. within your sidebar).
```html
<!--✻✻✻✻✻✻  SEARCHBAR + CUSTOM SUGGESTIONS by @glenthemes  ✻✻✻✻✻✻-->
<link href="https://search-dropdown.gitlab.io/i/2.1/style.css" rel="stylesheet">
<script src="https://search-dropdown.gitlab.io/i/2.1/init.min.js"></script>

<style searchbar>
:root {
    /*----- GENERAL SETTINGS -----*/
    --Search-Max-Width:300px;
    --Search-Shadow-Strength:10%;
    
    /*----- SEARCHBAR -----*/
    --Searchbar-Field-Border:#424242;
    --Searchbar-Field-Corner-Rounding:3px;
    --Searchbar-Field-Background:#17191b;
    --Searchbar-Field-Padding:10px;
    --Searchbar-Field-Font:"Golos Text";
    --Searchbar-Field-Font-Size:12px;
    --Searchbar-Field-Placeholder-Color:#a5a5a5;
    --Searchbar-Field-Typing-Color:#e8e7ec;
    --Searchbar-Spacing:9px;
    
    /*----- SEARCHBAR BUTTON -----*/
    --Searchbar-Button-Border:#2c2e3a;
    --Searchbar-Button-Corner-Rounding:3px;
    --Searchbar-Button-Background:#2c2e3a;
    --Searchbar-Button-Padding:10px;
    --Searchbar-Button-Font:"Figtree";
    --Searchbar-Button-Font-Size:10.5px;
    --Searchbar-Button-Text-Color:#e8e7ec;
    
    /*----- SEARCH SUGGESTIONS -----*/
    --Search-Suggestion-Box-Top-Gap:10px;
    --Search-Suggestion-Box-Inner-Margin:10px;
    --Search-Suggestion-Box-Border:#2c2e3a;
    --Search-Suggestion-Box-Corner-Rounding:10px;
    --Search-Suggestion-Box-Background:#21232c;
    
    --Search-Suggestion-Items-Corner-Rounding:5px;
    --Search-Suggestion-Items-Padding:10px;
    
    --Search-Suggestions-Font:"Golos Text";
    --Search-Suggestions-Font-Size:12px;
    --Search-Suggestions-Text-Color:#e8e7ec;
    --Search-Suggestions-Expand-Speed:420ms; /* ms only */
    
    --Search-Suggestions-HOVER-Background:#5b6ddb;
    --Search-Suggestions-HOVER-Text-Color:#eee;
    --Search-Suggestions-HOVER-Speed:0.25s;
} /* do not delete this bracket */

/* temporary searchbar placement */
    .searchblock {
    position:fixed;
    top:0;
    margin-top:25px;
    left:0;
    margin-left:25px;
    z-index:69;
}
</style>

<!--✻✻✻✻✻✻ START search ✻✻✻✻✻✻-->
<form class="searchblock" action="/search" method="get">
    
    <input class="searchbar-field" type="text" name="q" value="{SearchQuery}" placeholder="Looking for something?">
    
    <div class="searchbar-button">
        <button type="submit">Search</button>
    </div>
    
    <div class="search-suggestions-wrapper" fixed>
        <div class="search-suggestions">
            <a href="/tagged/photography">📸 #photography</a>
            <a href="/tagged/art">🎨 #art shares</a>
            <a href="/tagged/games">🎮 #fav games</a>
            <a href="/tagged/cats">🐈 #cat tag</a>
        </div>
    </div>
</form>
<!--✻✻✻✻✻✻ END search ✻✻✻✻✻✻-->
```
---

#### Step 2 &mdash; Styling:
You can edit the appearance within this huge list called `:root` (from the code you just copied above):
```css
:root {
    /*--
        customize your appearance options here
    --*/
}
```
Additionally, I've added this temporary placement for the searchbar (fixed at top left of your screen).  
Feel free to remove this block of code and adjust it to fit your theme.
```css
/* temporary searchbar placement */
.searchblock {
    position:fixed;
    top:0;
    margin-top:25px;
    left:0;
    margin-left:25px;
    z-index:69;
}
```

---

#### Step 3 &mdash; use your own suggestions:
From the huge chunk of code you pasted in [Step 1](#step-1--essentials), the actual **content** of the searchbar starts at:
```html
<!--✻✻✻✻✻✻ START search ✻✻✻✻✻✻-->
```
Scroll a bit down and you will find:
```html
<div class="search-suggestions-wrapper" fixed>
    <div class="search-suggestions">
        <a href="/tagged/photography">📸 #photography</a>
        <a href="/tagged/art">🎨 #art shares</a>
        <a href="/tagged/games">🎮 #fav games</a>
        <a href="/tagged/cats">🐈 #cat tag</a>
    </div>
</div>
```
Each suggestion is represented by this line of code:
```html
<a href="SUGGESTION_URL">SUGGESTION TEXT</a>
```
| Part | Explanation |
| ------ | ------ |
| `SUGGESTION_URL`&ensp;&ensp;&ensp;&ensp; | Your suggestion's search URL (or tag URL), or anything you want linked. |
| `SUGGESTION TEXT` | Your suggestion's displayed text. |

---

### Further Customization:

:green_square:&ensp; **Shadows:**

Currently, there is a faint shadow around each element of the searchbar. If you don't want shadows, you can add `no-shadows` to the `form class="searchblock"` line before the closing pointy bracket (`>`), like this:
```html
<form class="searchblock" (rest of the code as normal) no-shadows>
```

:green_square:&ensp; **Dropdown behavior:**

If your searchbar was placed near the bottom of the screen, there is a chance that the searchbar dropdown may not reveal all the suggestions as intended. To solve this, go to this line:
```html
<div class="search-suggestions-wrapper" fixed>
```
And remove the `fixed` keyword, such that:
```html
<div class="search-suggestions-wrapper">
```

:green_square:&ensp; **Additional styling for each part:**

**The entire search:**
```css
.searchblock {
    /* your extra styling here */
}
```

**Searchbar:**
```css
.searchbar-field {
    /* your extra styling here */
}
```

**"Search" button:**
```css
.searchbar-button button {
    /* your extra styling here */
}
```

**Suggestions wrapper:**
```css
.search-suggestions {
    /* your extra styling here */
}
```

**EACH suggestion:**
```css
.search-suggestions a {
    /* your extra styling here */
}
```

---

### Usage notes:
   
- You can add **to** the class names, but don't remove any existing ones.
- The searchbar can only be used once on your site. Multiple searchbars may crash your page!

### Terms of use:

- Whilst you're free to customize it as much as you want:
	- Please do not remove the credit.
	- **If you're a theme maker,** you're welcome to use this in your own theme, just make sure to include a link to [this repository page](https://git.new/glen-searchbar) or [my Tumblr post](https://glenthemes.tumblr.com/post/163630663674).

---

### Issues & Troubleshooting:

If you have any questions, please contact me on Discord:  
:computer:&ensp;[discord.gg/RcMKnwz](https://discord.gg/RcMKnwz)

Once you've joined, please read the **#server-rules** to get an idea of what to prepare when asking a question. You can send your questions in either the **#theme-help** or **#open-questions** channels, or via DMs if you prefer.

---

#### Thank you〜 :love_letter:

If you found this useful, please consider leaving me a tip!  
:coffee:&ensp;[ko-fi.com/glenthemes](https://ko-fi.com/glenthemes)
