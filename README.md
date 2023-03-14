### Searchbar with custom search suggestions

**Description:** a searchbar widget with custom stuggestions in dropdown format.  
**Dependencies:** none (written in pure JS)  
**Accessibility:** :white_check_mark: tabbable, :white_check_mark: supports arrow keys  
**Requirements:** basic&hairsp;&ndash;&hairsp;intermediate HTML/CSS knowledge  
**Author:** HT (@&#x200A;glenthemes)  

#### Before we begin:
This searchbar was initially tailored for T&#x200B;u&#x200B;m&#x200B;b&#x200B;l&#x200B;r. However, you're free to use this for your own site or projects. Just remember that the `<form>`'s `action` URL and `method` type will vary depending on what platform you're using.

---

##### Table of Contents:
- [demo](#demo)
- [enable tumblr settings](#tumblr-settings)
- Installation instructions:
	- [step 1](#step-1--essentials)
	- [step 2](#step-2--styling)
	- [step 3](#step-3--use-your-own-suggestions)
- [further customization](#extras)
- [usage notes](#usage-notes)
- [need help?](#issues--troubleshooting)

---

#### Demo:
:mag:&ensp;[jsfiddle.net/glenthemes/p23sfx1a/show](https://jsfiddle.net/glenthemes/p23sfx1a/show)  

<img src="https://64.media.tumblr.com/d338a409dbe976e1200eb7a0711ec8ec/99ce4dfdb1f0808c-f7/s1280x1920/c461bb5311ac610b8914fae723b194d8f3ef8fdf.gif" width="600">  

<details>
<summary>

[ _image description_ ]

</summary>

[*image description:* a GIF screenshot of OP demonstrating this widget by typing "hello world :)" into the searchbar. When the searchbar is focused, a suggestions box appears with a slide-down animation. They then hover over the provided suggestions, namingly #photography, #art shares, #fav games, and #cat tag, each with a corresponding emoji preceding it. As the mouseover activates, the text in the searchbar changes to match that suggestion. OP moves the mouse away from the suggestions box, and the searchbar text reverts back to what they were typing before. OP clicks away from the search entirely, and the suggestion box hides by sliding up. *end ID* ]
</details>

---

#### Tumblr Settings:

Before installing the searchbar, you need to make sure that both your blog and your theme are visible, otherwise the search functionality will not work.

1. Go to your blog's settings page:
   `https://www.tumblr.com/settings/blog/BLOG-NAME`  
   (replace **BLOG_NAME** with your blog's username, e.g. **devsmaycry**)
2. In "**Custom Theme**", make sure this option is turned ON (blue):  
   
   <img src="https://cdn.discordapp.com/attachments/382037367940448256/1085085974452768828/image.png">
   <details>
      <summary>
	  
	  [ _image description_ ]
	  
	  </summary>

	  [ _image description:_ A screenshot of the Tumblr settings page for your blog. "Custom Theme" is written in bold on the left, and "Enable custom theme" appears as a toggle option on the right. It is currently toggled on, with the color blue. Underneath it, the description reads "Create a separate theme for your blog. Change the layout. Edit the code. Make an entirely new theme. It's up to you." _end ID_ ]
   </details>
3. Scroll down to **Visibility**. Make sure all of its options are turned OFF (gray):  
   
   <img src="https://cdn.discordapp.com/attachments/382037367940448256/1085087300574265355/image.png">
   <details>
      <summary>
	  
	  [ _image description_ ]
	  
	  </summary>

	  [ _image description:_ A screenshot of the Tumblr settings page for your blog. "Visibility" is written in bold on the left. There are two toggle options on the right, both switched off, their colors are gray. The first toggle reads: "Hide BLOG-NAME from people without an account. This blog will only be viewable to people that are logged into Tumblr and its submission form will only be available on mobile apps." The second toggle reads: "It'll be hidden from Tumblr searches, and from external search engines like Google or Yahoo." _end ID_ ]
   </details>

---

#### Step 1 &mdash; Essentials:
Paste the following between `<body>` and `</body>`:  
(Or paste it where you want it to be located, e.g. within your sidebar).
```html
<!--✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻
    
    SEARCHBAR WITH CUSTOM SUGGESTIONS
    - author: @glenthemes
    - gitlab.com/search-dropdown/i
    
✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻✻-->
<link href="https://search-dropdown.gitlab.io/i/style.css" rel="stylesheet">
<script src="https://search-dropdown.gitlab.io/i/init.js"></script>

<style>
:root {
	/*----- SEARCHBAR -----*/
	--Searchbar-Field-Width:215px;
	--Searchbar-Field-Border:#424242;
	--Searchbar-Field-Background:#17191b;
	--Searchbar-Field-Padding:10px;
	--Searchbar-Field-Corner-Rounding:3px;
	--Searchbar-Field-Font:"Golos Text";
	--Searchbar-Field-Font-Size:12px;
	--Searchbar-Field-Placeholder-Color:#a5a5a5;
	--Searchbar-Field-Typing-Color:#e8e7ec;
	--Searchbar-Spacing:9px;
	
	/*----- SEARCHBAR BUTTON -----*/
	--Searchbar-Button-Width:69px;
	--Searchbar-Button-Border:#2c2e3a;
	--Searchbar-Button-Background:#2c2e3a;
	--Searchbar-Button-Corner-Rounding:3px;
	--Searchbar-Button-Font:"Figtree";
	--Searchbar-Button-Font-Size:10.5px;
	--Searchbar-Button-Text-Color:#e8e7ec;
	
	/*----- SEARCH SUGGESTIONS -----*/
	--Search-Suggestion-Box-Top-Gap:10px;
	--Search-Suggestion-Box-Inner-Margin:10px;
	--Search-Suggestion-Box-Background:#21232c;
	--Search-Suggestion-Box-Corner-Rounding:10px;
	--Search-Suggestion-Box-Border:#2c2e3a;
	
	--Search-Suggestion-Items-Padding:10px;
	--Search-Suggestion-Items-Corner-Rounding:5px;
	
	--Search-Suggestions-Font:"Golos Text";
	--Search-Suggestions-Font-Size:12px;
	--Search-Suggestions-Text-Color:#e8e7ec;
	--Search-Suggestions-Expand-Speed:420ms; /* ms only */
	
	--Search-Suggestions-HOVER-Background:#5b6ddb;
	--Search-Suggestions-HOVER-Text-Color:#eee;
	--Search-Suggestions-HOVER-Speed:0.25s;
}

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

<!-- google fonts for the searchbar -->
<link href="https://fonts.googleapis.com/css?family=Public+Sans:500|Golos+Text|Figtree:500" rel="stylesheet">

<!--✻✻✻✻✻✻ START search ✻✻✻✻✻✻-->
<form class="searchblock" action="/search" method="get">

	<input class="searchbar-field" type="text" name="q" value="{SearchQuery}" placeholder="Looking for something?">
	
	<div class="searchbar-button">
		<button type="submit">Search</button>
	</div>
	

	<div class="search-suggestions-wrapper">
		<div class="search-suggestions">
			<a href="/tagged/photography">📸 #photography</a>
			<a href="/tagged/art">🎨 #art shares</a>
			<a href="/tagged/games">🎮 #fav games</a>
			<a href="/tagged/cats">🐈 #cat tag</a>
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
Additionally, I've added this temporary placement for the searchbar (fixed at top left of your screen). Feel free to remove this block of code, or adjust it to fit your theme.
```css
/* temporary searchbar placement */
.searchblock {
	position:fixed;
	top:0;
	margin-top:25px;
	left:0;
	margin-left:25px;
}
```
---

#### Step 3 &mdash; use your own suggestions:
From the huge chunk of code you pasted in Step 1, the actual content of the searchbar starts at:
```html
<!--✻✻✻✻✻✻ START search ✻✻✻✻✻✻-->
```
Scroll a bit down and you will find:
```html
<div class="search-suggestions-wrapper">
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
In which `SUGGESTION_URL` is your suggestion's search (or tag) URL, and `SUGGESTION_TEXT` is the **display text** for that suggestion.

---

#### Extras:
If you don't want shadows around the suggestions box (this is more prominent if you choose to change your colors to a light palette), you can add `no-shadows` to the `form class="searchblock"` line (1st line), like this:
```html
<form class="searchblock" no-shadows [...rest of the code]
```
---

#### Usage notes:
- Whilst you're free to customize it as much as you want:
    - please do not remove the credit.
    - do not alter the div/class names.
- It can only be used once. Multiple searchbars may crash your page!
---

#### Issues & Troubleshooting:
[discord.gg/RcMKnwz](https://discord.gg/RcMKnwz)
