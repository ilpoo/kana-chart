export default (()=>{
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const measurements　=　{};
  const span = document.createElement('span');
  span.style.fontSize = '72px';
  span.style.display = 'inline';
  span.innerHTML = '!?_:;#@{[()]}"\'/ 123, Latin, 汉字 漢字, العربية, देवनागरी, Кирилица, বাংলা অসমীয়া, かな カナ, ꦗꦮ, 한글 조선글, తెలుగు, தமிழ், ગુજરાતી, ಕನ್ನಡ, မြန်မာ, മലയാളം, ไทย, ᮞᮥᮔ᮪ᮓ, ਗੁਰਮੁਖੀ, ລາວ, ଉତ୍କଳ, ግዕዝ, සිංහල, אלפבית, Հայոց, ខ្មែរ, Ελληνικό, ᨒᨚᨈᨑ, ⵜⵉⴼⵉⵏⴰⵖ, ܣܘܪܝܬ, ދިވެހި, ᐃᓄᒃᑎᑐᑦ, ᏣᎳᎩ.';

  baseFonts.forEach(baseFont=>{
    span.style.fontFamily = baseFont;
    document.body.appendChild(span);
    measurements[baseFont] = {
      width: span.offsetWidth,
      height: span.offsetHeight,
    }
    document.body.removeChild(span);
  });

  return font => !baseFonts.some(baseFont=>{
    span.style.fontFamily　=　`${font}, ${baseFont}`;
    document.body.appendChild(span);
    const matched = (
      span.offsetWidth  === measurements[baseFont].width &&
      span.offsetHeight === measurements[baseFont].height
    );
    document.body.removeChild(span);
    return matched;
  });
})();
