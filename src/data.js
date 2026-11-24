export const currentUser = { name: "Auksė Varlytė", username: "GeltonpilveVarle", role: "Mokinė, 3B" };

export const problemStages = [
  { key: "submitted", label: "Pateikta" },
  { key: "review", label: "Peržiūrima" },
  { key: "progress", label: "Sprendžiama" },
  { key: "resolved", label: "Išspręsta" },
];

export const ideaStages = [
  { key: "submitted", label: "Pateikta" },
  { key: "review", label: "Svarstoma" },
  { key: "approved", label: "Patvirtinta" },
  { key: "done", label: "Įgyvendinta" },
];

export const statusLabels = {
  submitted: "Pateikta",
  review: "Peržiūrima",
  progress: "Sprendžiama",
  resolved: "Išspręsta",
  approved: "Patvirtinta",
  done: "Įgyvendinta",
  declined: "Nepatvirtinta",
};

export const ideaStatusLabels = { ...statusLabels, review: "Svarstoma" };

export const problemCategories = ["Pastatas", "Bendros erdvės", "Paslaugos", "Saugumas", "Kita"];
export const ideaCategories = ["Erdvės", "Renginiai", "Mokymasis", "Aplinka", "Kita"];

export const initialProblems = [
  {
    id: "p-light",
    title: "Neveikia apšvietimas trečiame aukšte",
    description: "Koridoriuje prie 301–306 kabinetų nedega pusė lempų. Žiemą po 15 val. ten beveik tamsu.",
    category: "Pastatas",
    location: "3 aukšto koridorius",
    author: "Tomas K.",
    created: "lapkr. 19 d.",
    updated: "prieš 2 d.",
    rank: 2,
    status: "progress",
    supporters: 18,
    supported: false,
    response: { from: "Rimantas Petraitis", role: "Ūkio dalies vedėjas", text: "Lempos užsakytos, pakeisime iki gruodžio 2 d. Iki tol koridoriuje papildomai įjungsime avarinį apšvietimą.", date: "lapkr. 22 d." },
    history: [
      { status: "submitted", date: "lapkr. 19 d." },
      { status: "review", date: "lapkr. 20 d.", note: "Perduota ūkio daliai" },
      { status: "progress", date: "lapkr. 22 d.", note: "Užsakytos naujos lempos" },
    ],
  },
  {
    id: "p-canteen",
    title: "Per mažai vietų valgykloje",
    description: "Per ilgąją pertrauką dalis mokinių valgo stovėdami arba laukia, kol atsilaisvins stalas.",
    category: "Bendros erdvės",
    location: "Valgykla",
    author: "Anonimiškai",
    created: "lapkr. 17 d.",
    updated: "prieš 3 d.",
    rank: 3,
    status: "review",
    supporters: 41,
    supported: true,
    response: { from: "Mokinių taryba", role: "Mokinių savivalda", text: "Klausimą įtraukėme į gruodžio 1 d. posėdį su direkcija. Svarstome pertraukų grafiką pagal klases.", date: "lapkr. 21 d." },
    history: [
      { status: "submitted", date: "lapkr. 17 d." },
      { status: "review", date: "lapkr. 21 d.", note: "Įtraukta į posėdžio darbotvarkę" },
    ],
  },
  {
    id: "p-water",
    title: "Neveikia vandens fontanėlis prie sporto salės",
    description: "Po kūno kultūros pamokų nėra kur atsigerti, fontanėlis neveikia jau savaitę.",
    category: "Pastatas",
    location: "1 aukštas, prie sporto salės",
    author: "Greta V.",
    created: "lapkr. 23 d.",
    updated: "šiandien",
    rank: 1,
    status: "submitted",
    supporters: 6,
    supported: false,
    response: null,
    history: [{ status: "submitted", date: "lapkr. 23 d." }],
  },
  {
    id: "p-cold",
    title: "Šalta 214 kabinete",
    description: "Radiatoriai vos šilti, per pirmas pamokas sėdime su striukėmis.",
    category: "Pastatas",
    location: "214 kabinetas",
    author: "Anonimiškai",
    created: "lapkr. 14 d.",
    updated: "prieš 5 d.",
    rank: 4,
    status: "review",
    supporters: 12,
    supported: false,
    response: { from: "Rimantas Petraitis", role: "Ūkio dalies vedėjas", text: "Patikrinsime šildymo sistemą šią savaitę.", date: "lapkr. 19 d." },
    history: [
      { status: "submitted", date: "lapkr. 14 d." },
      { status: "review", date: "lapkr. 19 d." },
    ],
  },
  {
    id: "p-library",
    title: "Biblioteka užsidaro per anksti",
    description: "Biblioteka dirbo iki 15 val., todėl po pamokų nebuvo kur ramiai pasiruošti kontroliniams.",
    category: "Paslaugos",
    location: "Biblioteka",
    author: "Emilija R.",
    created: "spal. 28 d.",
    updated: "prieš 6 d.",
    rank: 5,
    status: "resolved",
    supporters: 27,
    supported: false,
    response: { from: "Direkcija", role: "Gimnazijos administracija", text: "Nuo lapkričio 18 d. biblioteka dirba iki 16:30.", date: "lapkr. 18 d." },
    history: [
      { status: "submitted", date: "spal. 28 d." },
      { status: "review", date: "lapkr. 4 d." },
      { status: "progress", date: "lapkr. 11 d.", note: "Derinamas bibliotekininkės grafikas" },
      { status: "resolved", date: "lapkr. 18 d." },
    ],
  },
];

export const initialIdeas = [
  {
    id: "i-bikes",
    title: "Uždengta dviračių stovėjimo vieta",
    description: "Prie sporto salės įrengti stogelį ir 20 vietų stovą. Dabar dviračiai lyjant šlampa, o stovas telpa tik 8.",
    benefit: "Daugiau mokinių galėtų atvažiuoti dviračiu ištisus metus.",
    category: "Aplinka",
    author: "Mantas J.",
    created: "lapkr. 10 d.",
    updated: "prieš 4 d.",
    rank: 3,
    status: "review",
    votes: 64,
    voted: false,
    response: { from: "Mokinių taryba", role: "Mokinių savivalda", text: "Kartu su direkcija ieškome finansavimo. Atsakymą pateiksime iki gruodžio 15 d.", date: "lapkr. 20 d." },
    comments: [
      { name: "Lukas T.", text: "Būtų puiku, dabar dviratį tenka rakinti prie tvoros.", time: "prieš 5 d." },
    ],
  },
  {
    id: "i-quiet",
    title: "Rami poilsio erdvė per pertraukas",
    description: "Skirti nedidelę patalpą be triukšmo tiems, kam per pertrauką reikia pailsėti ar pasikartoti.",
    benefit: "Mažiau streso prieš kontrolinius, vieta ramiems pokalbiams.",
    category: "Erdvės",
    author: "Aistė B.",
    created: "spal. 30 d.",
    updated: "prieš 2 d.",
    rank: 1,
    status: "approved",
    votes: 48,
    voted: true,
    response: { from: "Direkcija", role: "Gimnazijos administracija", text: "Patvirtinta. Erdvę įrengsime antro aukšto poilsio zonoje sausio mėnesį.", date: "lapkr. 22 d." },
    comments: [],
  },
  {
    id: "i-music",
    title: "Muzika per ilgąją pertrauką",
    description: "Kas savaitę vis kita klasė sudaro grojaraštį, kuris skamba fojė per ilgąją pertrauką.",
    benefit: "Linksmesnė pertrauka ir proga klasėms prisistatyti.",
    category: "Renginiai",
    author: "Paulius S.",
    created: "lapkr. 21 d.",
    updated: "prieš 3 d.",
    rank: 4,
    status: "submitted",
    votes: 35,
    voted: false,
    response: null,
    comments: [],
  },
  {
    id: "i-books",
    title: "Knygų mainų lentyna",
    description: "Lentyna prie bibliotekos, kur galima palikti perskaitytą knygą ir pasiimti kitą.",
    benefit: "Daugiau skaitymo be papildomų išlaidų.",
    category: "Mokymasis",
    author: "Ugnė L.",
    created: "rugs. 22 d.",
    updated: "prieš 3 sav.",
    rank: 6,
    status: "done",
    votes: 29,
    voted: false,
    response: { from: "Biblioteka", role: "Bibliotekininkė", text: "Lentyna stovi prie bibliotekos įėjimo nuo spalio 15 d.", date: "spal. 15 d." },
    comments: [],
  },
  {
    id: "i-cafe",
    title: "Kavinė atvira iki 17 val.",
    description: "Pratęsti mokyklos kavinės darbo laiką, kad po būrelių būtų galima užkąsti.",
    benefit: "Mokiniams, kurie lieka būreliuose, nereikėtų eiti į parduotuvę.",
    category: "Kita",
    author: "Dovydas A.",
    created: "spal. 5 d.",
    updated: "prieš 4 sav.",
    rank: 7,
    status: "declined",
    votes: 22,
    voted: false,
    response: { from: "Direkcija", role: "Gimnazijos administracija", text: "Kavinės nuomininkas negali pratęsti darbo laiko. Vietoj to fojė pastatysime užkandžių automatą.", date: "spal. 27 d." },
    comments: [],
  },
];

export const forumTopics = [
  {
    title: "Mokyklos aplinka",
    description: "Erdvės, kasdienybė ir tai, ką galime pagerinti mokykloje.",
    time: "prieš 1 val.",
    posts: [
      { username: "AustejaM", name: "Austėja M.", text: "Gal galėtume prie bibliotekos įrengti daugiau vietų mokytis pertraukų metu?", time: "prieš 1 val." },
      { username: "TomasK", name: "Tomas K.", text: "Pritariu. Taip pat būtų naudinga turėti daugiau lizdų kompiuteriams įkrauti.", time: "prieš 42 min." },
    ],
  },
  {
    title: "Tech naujienos",
    description: "Įrankiai ir klausimai apie technologijas mokykloje.",
    time: "prieš 2 val.",
    posts: [
      { username: "LukasT", name: "Lukas T.", text: "Ar jau išbandėte naują mokyklos bibliotekos katalogą? Paieška tapo daug patogesnė.", time: "prieš 2 val." },
      { username: "GretaV", name: "Greta V.", text: "Taip, ypač patinka, kad galima matyti, kada knyga grįš.", time: "prieš 1 val." },
    ],
  },
  {
    title: "Pasaulio naujienos",
    description: "Svarbiausios pasaulio naujienos ir mūsų požiūris į jas.",
    time: "prieš 3 val.",
    posts: [{ username: "EmilijaR", name: "Emilija R.", text: "Kurią šios savaitės pasaulio naujieną laikote svarbiausia?", time: "prieš 3 val." }],
  },
  {
    title: "Lietuvos naujienos",
    description: "Aktualijos Lietuvoje, aptariamos pagarbiai ir atsakingai.",
    time: "prieš 4 val.",
    posts: [{ username: "MatasP", name: "Matas P.", text: "Kokie sprendimai, jūsų nuomone, labiausiai paveiks mokinius šiais metais?", time: "prieš 4 val." }],
  },
];

export const messageConversations = [
  { id: "austeja", name: "Austėja M.", username: "AustejaM", type: "Asmeninis", preview: "Pritariu, galime pasiūlyti tai forume.", time: "10:42", avatar: "AM", messages: [{ from: "them", text: "Gal galėtume prie bibliotekos įrengti daugiau vietų mokytis?", time: "10:40" }, { from: "me", text: "Pritariu, galime pasiūlyti tai forume.", time: "10:42" }] },
  { id: "economics", name: "Ekonomika", type: "Pamoka", preview: "Rytoj aptarsime infliaciją.", time: "09:18", avatar: "EK", messages: [{ from: "them", text: "Rytoj aptarsime infliaciją. Nepamirškite pasiimti užrašų.", time: "09:18" }] },
  { id: "3a", name: "3A klasė", type: "Klasė", preview: "Dėl išvykos susitinkame prie įėjimo.", time: "vakar", avatar: "3A", messages: [{ from: "them", text: "Dėl išvykos susitinkame prie pagrindinio įėjimo.", time: "vakar" }] },
  { id: "robotics", name: "Robotikos komanda", type: "Grupė", preview: "Įkėliau idėjas mūsų projektui.", time: "pirmad.", avatar: "RK", messages: [{ from: "them", text: "Įkėliau idėjas mūsų projektui.", time: "pirmadienį" }] },
  { id: "anonymous-school", name: "Unicorn", username: "Unicorn", type: "Anoniminis", preview: "Ačiū, kad parašei.", time: "sekmad.", avatar: "?", anonymous: true, messages: [{ from: "them", text: "Ačiū, kad parašei po mano komentaru.", time: "sekmadienį" }] },
];

export const messagePeople = [
  { id: "austeja", name: "Austėja M.", username: "@AustejaM", detail: "Mokinė" },
  { id: "tomas", name: "Tomas K.", username: "@TomasK", detail: "Mokinys" },
  { id: "greta", name: "Greta V.", username: "@GretaV", detail: "Mokinė" },
];

export const announcements = [
  { id: "a1", tag: "Renginys", date: "Gruod. 12 d., 18:00", title: "Žiemos vakaras mokykloje", text: "Muzika, pokalbiai ir laikas kartu aktų salėje." },
  { id: "a2", tag: "Galimybė", date: "Iki gruod. 8 d.", title: "Ieškome savanorių", text: "Padėk organizuoti pavasario iniciatyvas su mokinių taryba." },
  { id: "a3", tag: "Būrelis", date: "Trečiadieniais, 15:00", title: "Stalo žaidimų popietė", text: "Ateik, net jei dar nepažįsti kitų dalyvių. 108 kabinetas." },
];
