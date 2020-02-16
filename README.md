# PostCSS Tailwind Rtl

[PostCSS] plugin to add RTL support to tailwind.

[PostCSS]: https://github.com/postcss/postcss

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
    require('tailwindcss'),
+   require('@onexer/postcss-tailwind-rtl'),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage

## HTML Page
You will must add dir property in both html and body in your page for both ltr ot trl
```html
<html dir="rtl">
<head>...</head>
<body dir="rtl">
...
</body>
</html>
```

enjoy! :)
