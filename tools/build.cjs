// Static bilingual Cortex pages. Node.js only; no tracking or runtime JavaScript.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const content = {
 en: {
  games:'Our games',contact:'Contact',skip:'Skip to content',studio:'A studio for thoughtful play',
  intro:'We make games for a moment of focus. A small challenge, a satisfying discovery, a little time for yourself.',
  explore:'Explore our games',collection:'The collection',two:'02 games',discover:'Discover Kings',
  kingsShort:'Colourful boards. Satisfying deductions. The pleasure of getting better, one crown at a time.',
  almanacShort:'A journey through handcrafted puzzles.',available:'On the App Store',soon:'In development',
  almanacLink:'Discover The Almanac',approach:'A moment to think.\nSomething to come back to.',
  approachBody:'That is active relaxation: taking a break while giving your attention to something you enjoy. We make room for curiosity, a little effort, and the pleasure of a good idea.',
  talk:'A question, an idea?',copyright:'© 2026 Cortex',home:'Cortex home',
  kingsPromise:'A moment to think.\nThe pleasure of getting better.',
  kingsBody:'Place crowns, rule out possibilities, and find the logic that connects them. Kings is a puzzle hobby you can grow into, at your own pace.',
  kingsStatus:'In development · iPhone & iPad',seeGame:'See the game',support:'Kings support',privacy:'Kings privacy',
  ruleTitle:'Simple rules.\nGood deductions.',rule:'One crown in every row, column and coloured region. Crowns cannot touch, even diagonally. Each move is a chance to see something you missed before.',
  classic:'Classic boards',classicBody:'Settle into a full board, from Easy to Expert. Mark crosses with a slide, then place a crown when you have found its home.',
  practice:'Short tactical puzzles',practiceBody:'Work on one idea at a time. Follow your journey and revisit techniques as your understanding grows.',
  hintTitle:'Understand your next move.',hintBody:'A Tactical Hint shows where to look, explains the deduction, then lets you make the move yourself. Your first complete lesson is free.',
  premiumTitle:'Go further with Premium.',premiumBody:'Optional monthly Premium adds unlimited tactical hints and new puzzles, full-board continuation after a problem, and Expert difficulty once earned.',
  note:'Kings is being prepared for the App Store. The game interface is currently in English. Progress stays on your device.',
  classicAlt:'Kings Classic: a colourful board with placed crowns and crosses.',
  journeyAlt:'The Kings Puzzle journey with completed problems and the next step.',
  hintAlt:'A Kings Tactical Hint explaining a deduction on a board.',
  almanacPromise:'Begin your journey into handcrafted puzzles.',almanacBody:'Discover The Almanac, already available on the App Store.',almanacStatus:'Available on iPhone',download:'Download on the App Store',backGames:'All Cortex games',
 },
 fr: {
  games:'Nos jeux',contact:'Contact',skip:'Aller au contenu',studio:'Un studio pour le plaisir de réfléchir',
  intro:'Nous créons des jeux pour prendre un moment à soi. Un petit défi, le plaisir de comprendre, un peu de temps pour réfléchir.',
  explore:'Découvrir nos jeux',collection:'La collection',two:'02 jeux',discover:'Découvrir Kings',
  kingsShort:'Des grilles colorées. Des déductions satisfaisantes. Le plaisir de progresser, une couronne à la fois.',
  almanacShort:'Un voyage à travers des puzzles créés à la main.',available:'Sur l’App Store',soon:'En préparation',
  almanacLink:'Découvrir The Almanac',approach:'Un moment pour réfléchir.\nL’envie de revenir.',
  approachBody:'C’est cela, active relaxation : faire une pause en consacrant son attention à une activité qui nous plaît. Nous faisons une place à la curiosité, à un peu d’effort et au plaisir d’une bonne idée.',
  talk:'Une question, une idée ?',copyright:'© 2026 Cortex',home:'Accueil Cortex',
  kingsPromise:'Un moment pour réfléchir.\nLe plaisir de progresser.',
  kingsBody:'Placez des couronnes, éliminez des possibilités et découvrez la logique qui les relie. Kings est un loisir que l’on apprend à maîtriser, à son rythme.',
  kingsStatus:'En préparation · iPhone et iPad',seeGame:'Découvrir le jeu',support:'Assistance Kings',privacy:'Confidentialité Kings',
  ruleTitle:'Des règles simples.\nDe belles déductions.',rule:'Une couronne dans chaque ligne, colonne et région colorée. Les couronnes ne doivent pas se toucher, même en diagonale. Chaque coup est l’occasion de repérer ce qui vous avait échappé.',
  classic:'Les grilles classiques',classicBody:'Prenez le temps de résoudre une grille complète, de Easy à Expert. Tracez vos croix en glissant, puis placez une couronne lorsque vous avez trouvé sa place.',
  practice:'Les problèmes tactiques',practiceBody:'Travaillez une idée à la fois. Avancez dans votre parcours et retrouvez les techniques à mesure que votre compréhension se développe.',
  hintTitle:'Comprendre le prochain coup.',hintBody:'Un Tactical Hint montre où regarder, explique la déduction, puis vous laisse jouer le coup. Votre première leçon complète est gratuite.',
  premiumTitle:'Aller plus loin avec Premium.',premiumBody:'L’abonnement mensuel facultatif ajoute les indices tactiques et nouveaux problèmes illimités, la continuation de la grille après un problème et la difficulté Expert une fois acquise.',
  note:'Kings se prépare à arriver sur l’App Store. L’interface du jeu est actuellement en anglais. La progression reste sur votre appareil.',
  classicAlt:'Une grille classique Kings colorée, avec des couronnes et des croix placées.',
  journeyAlt:'Le parcours Puzzle de Kings, ses problèmes terminés et la prochaine étape.',
  hintAlt:'Un indice Tactical Hint de Kings qui explique une déduction sur une grille.',
  almanacPromise:'Un voyage à travers des puzzles créés à la main.',almanacBody:'Découvrez The Almanac, déjà disponible sur l’App Store.',almanacStatus:'Disponible sur iPhone',download:'Télécharger sur l’App Store',backGames:'Tous les jeux Cortex',
 }
};
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const line = s => esc(s).replaceAll('\n','<br>');
const route = (slug,lang) => `/${slug ? slug+'/' : ''}${lang==='fr'?'fr/':''}`;
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
function layout(lang,slug,title,description,body){
 const t=content[lang],home=route('',lang);
 return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#f4f1e9"><link rel="canonical" href="https://cortexstudio.io${route(slug,lang)}"><link rel="alternate" hreflang="en" href="https://cortexstudio.io${route(slug,'en')}"><link rel="alternate" hreflang="fr" href="https://cortexstudio.io${route(slug,'fr')}"><link rel="alternate" hreflang="x-default" href="https://cortexstudio.io${route(slug,'en')}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="https://cortexstudio.io${route(slug,lang)}"><link rel="stylesheet" href="/assets/site.css"></head><body><a class="skip" href="#main">${t.skip}</a><div class="wrap"><header class="site-header"><a class="brand" href="${home}" aria-label="${t.home}"><strong>CORTEX</strong><small>active relaxation</small></a><nav class="site-nav" aria-label="${lang==='fr'?'Navigation principale':'Main navigation'}"><a href="${home}#games">${t.games}</a><a class="contact-link" href="${home}#contact">${t.contact}</a><div class="languages"><a lang="en" href="${route(slug,'en')}" ${lang==='en'?'aria-current="page"':''}>EN</a><a lang="fr" href="${route(slug,'fr')}" ${lang==='fr'?'aria-current="page"':''}>FR</a></div></nav></header><main id="main">${body}</main><footer class="site-footer"><div>${t.copyright}<br>active relaxation</div><nav aria-label="${lang==='fr'?'Liens utiles':'Useful links'}"><a href="${home}">Cortex</a><a href="${route('kings',lang)}">Kings</a><a href="${route('the-almanac',lang)}">The Almanac</a><a href="mailto:hugo@cortexstudio.io">Contact</a></nav></footer></div></body></html>`;
}
function home(lang){
 const t=content[lang];
 const art='<div class="play-art" aria-hidden="true"><div class="art-grid">'+['','×','','·','','×','+','',''].map(x=>`<i>${x}</i>`).join('')+'</div></div>';
 return layout(lang,'','Cortex — active relaxation',t.intro,`
 <section class="hero"><div><p class="eyebrow">${t.studio}</p><h1 lang="en">active<br><em>relaxation.</em></h1><p class="intro">${t.intro}</p><a class="button" href="#games">${t.explore}${arrow}</a></div>${art}</section>
 <section id="games" aria-labelledby="collection"><div class="section-heading"><h2 id="collection">${t.collection}</h2><span class="eyebrow muted">${t.two}</span></div><div class="games">
 <article class="game-card"><a class="game-art" href="${route('kings',lang)}" aria-label="${t.discover}"><div class="board-window"><img src="/assets/kings/01-classic.png" alt="${t.classicAlt}" width="1206" height="2622"></div></a><div class="card-top"><h3>Kings</h3><span class="tag muted">${t.soon}</span></div><p>${t.kingsShort}</p><div><a class="text-link" href="${route('kings',lang)}">${t.discover}${arrow}</a></div></article>
 <article class="game-card"><a class="game-art almanac-art" href="${route('the-almanac',lang)}" aria-label="${t.almanacLink}"><img src="/appicon.png" alt="The Almanac" width="160" height="160" loading="lazy"></a><div class="card-top"><h3>The Almanac</h3><span class="tag muted">${t.available}</span></div><p>${t.almanacShort}</p><div><a class="text-link" href="${route('the-almanac',lang)}">${t.almanacLink}${arrow}</a></div></article></div></section>
 <section class="manifesto"><h2>${line(t.approach)}</h2><p>${t.approachBody}</p></section><section id="contact" class="contact"><h2>${t.talk}</h2><a href="mailto:hugo@cortexstudio.io">hugo@cortexstudio.io</a></section>`);
}
function kings(lang){
 const t=content[lang];
 return layout(lang,'kings','Kings — Cortex',t.kingsBody,`
 <div class="crumb"><a href="${route('',lang)}">Cortex</a> / Kings</div>
 <section class="product-hero"><div><p class="availability">${t.kingsStatus}</p><h1>Kings</h1><p class="promise">${line(t.kingsPromise)}</p><p class="description">${t.kingsBody}</p><a class="button" href="#game">${t.seeGame}${arrow}</a></div><div class="product-art"><div class="screen"><img src="/assets/kings/01-classic.png" width="1206" height="2622" alt="${t.classicAlt}"></div></div></section>
 <section class="product-intro" id="game"><h2>${line(t.ruleTitle)}</h2><p>${t.rule}</p></section>
 <div class="features"><section class="feature"><p class="eyebrow">01 / ${lang==='fr'?'Prendre son temps':'Take your time'}</p><h3>${t.classic}</h3><p>${t.classicBody}</p><div class="feature-image"><img src="/assets/kings/01-classic.png" width="1206" height="2622" alt="${t.classicAlt}" loading="lazy"></div></section><section class="feature"><p class="eyebrow">02 / ${lang==='fr'?'Une idée à la fois':'One idea at a time'}</p><h3>${t.practice}</h3><p>${t.practiceBody}</p><div class="feature-image"><img src="/assets/kings/03-puzzle-journey.png" width="1206" height="2622" alt="${t.journeyAlt}" loading="lazy"></div></section></div>
 <div class="details"><section><h3>${t.hintTitle}</h3><p>${t.hintBody}</p></section><section><h3>${t.premiumTitle}</h3><p>${t.premiumBody}</p></section></div>
 <p class="muted" style="max-width:720px;margin-bottom:35px">${t.note}</p><nav class="product-links" aria-label="${t.support}"><a href="${route('kings/support',lang)}">${t.support}${arrow}</a><a href="${route('kings/privacy',lang)}">${t.privacy}${arrow}</a><a href="mailto:hugo@cortexstudio.io">Contact${arrow}</a></nav>`);
}
function almanac(lang){
 const t=content[lang];
 return layout(lang,'the-almanac','The Almanac — Cortex',t.almanacPromise,`
 <div class="crumb"><a href="${route('',lang)}">Cortex</a> / The Almanac</div><section class="product-hero"><div><p class="availability">${t.almanacStatus}</p><h1 class="almanac-title">The Almanac</h1><p class="promise">${t.almanacPromise}</p><p class="description">${t.almanacBody}</p><a class="store-link" href="https://apps.apple.com/us/app/the-almanac/id6742649363"><img src="/download.svg" alt="${t.download}" width="170" height="57"></a></div><div class="product-art almanac-product-art"><img src="/appicon.png" alt="The Almanac" width="200" height="200"></div></section><nav class="product-links"><a href="${route('',lang)}#games">← ${t.backGames}</a></nav>`);
}
for(const lang of ['en','fr'])for(const [slug,build]of [['',home],['kings',kings],['the-almanac',almanac]]){
 const dest=path.join(root,route(slug,lang));fs.mkdirSync(dest,{recursive:true});fs.writeFileSync(path.join(dest,'index.html'),build(lang));
}
console.log('Built Cortex, Kings and The Almanac in English and French.');
