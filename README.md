# Algolia-test

This is a full rewrite of the CSS for the **e-commerce-infinite theme**, as a well as a partial rewrite of its JS template. The theme has been tested on Chrome/Firefox on Mac/Windows. The theme is **fully responsive** and will work from small iPhone resolution to big desktop screens.

## How-to

Run `npm install && npm start` to launch the app at http://localhost:3000/.

## Stack and approach

- This app has been built using **create-react-app**.
- I've added **Sass** to get a lot of benefits over vanilla CSS (variables, smart nesting, mixins, etc).
- The CSS of this theme has been completely rewritten using a BEM variant called [SUIT](https://suitcss.github.io/). I find it to be the most relevant when it comes to React as its CamelCase syntax complements React components. It's also very scalable and efficient when the codebase grows a lot.
- All the CSS has been written in one file (index.scss) for the sake of simplicity.
- Most of the unit measures I've used are written using **rem** over px (stuff like images or border-width / radius still use px). This is good for users who have changed the default size of  their browsers.
- I've adopted an **approach by component**, rewriting a part of the JS layout in the process in order to make it match the CSS components. As an example, you'll notice media queries which concern a specific component **are located inside this very component**. This makes components more maintainable as well as making media queries easier to manage. The impact of this on gzipped file size is negligible, as shown by [Jake Archibald](https://jakearchibald.github.io/sass-ie/).

## Remarks

While rewriting the theme, I've noticed a few things:

- The original theme has no BEM structure or equivalent. **This can prove to be a bit hard to maintain on big code bases**. BEM adds a sense of hierarchy between elements as well as preventing a lot of side effects that could arise with no specific methodology.
- I've removed **Bootstrap** completely. In most cases I find it's way more interesting to adopt a custom approach using a lightweight base, only adding things I need (such as grids) when I really need to.
- I've tried to remove most of font-icons in favor of **pure SVG icons** (please see [this article](https://css-tricks.com/icon-fonts-vs-svg/) for more details). Unfortunately I had to keep font-awesome as it's needed by some of instantsearch widgets (eg. Rating widget).
- I've removed IDs from some components, using classes instead, as per [those guidelines](http://cssguidelin.es/#ids-in-css).
- I also got rid of some unneeded DOM, eg. extra-wrappers with no real added value.

I've also noticed a few accessibility issues on the current theme which I've tried to fixed while rewriting it:

- The theme **wasn't fully responsive**. People accessing it on mobile devices might find it complicated to navigate in it.
- Some **alt attributes** were missing on pictures.
- Some contrasts weren't strong enough, making it complicated for some people to read some texts (eg. product description).
- The font-size was a bit too small on some elements on desktop.

## Nice to have

Here are a few things I would have liked to do/add wih a bit more time:

- Add filters on mobile. They would have been hidden by default and toggled when click on a button.
- Test the rendering on more devices with tools such as [Browserstack](https://www.browserstack.com/start).
