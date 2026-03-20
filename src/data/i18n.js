// All UI translations — 10 languages
// EN, HI, TA, TE, BN, MR, PA, GU, KN, OD

export const LANGUAGES = [
  { code: 'en', label: 'English',    native: 'EN'  },
  { code: 'hi', label: 'Hindi',      native: 'हि'  },
  { code: 'ta', label: 'Tamil',      native: 'த'   },
  { code: 'te', label: 'Telugu',     native: 'తె'  },
  { code: 'bn', label: 'Bengali',    native: 'বা'  },
  { code: 'mr', label: 'Marathi',    native: 'म'   },
  { code: 'pa', label: 'Punjabi',    native: 'ਪੰ'  },
  { code: 'gu', label: 'Gujarati',   native: 'ગુ'  },
  { code: 'kn', label: 'Kannada',    native: 'ಕ'   },
  { code: 'od', label: 'Odia',       native: 'ଓ'   },
]

// All Indian states/regions for community location picker
export const REGIONS = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
]

export const TRANSLATIONS = {
  // ── ENGLISH ─────────────────────────────────────────────────
  en: {
    brand: 'Bhoomi Care', tagline: 'Apni Mitti, Apna Adhikar',
    nav: { home:'Dashboard', nutrients:'Nutrients', schemes:'Schemes', ai:'AI Chat', weather:'Weather', community:'Community', market:'Marketplace' },
    hero: { greeting:'Good morning, Farmer', location:'Survey 47/2, Nashik · Rabi 2024–25', upload:'Upload Report' },
    dashboard: {
      scoreLabel:'Soil Health Score', phLabel:'pH Level', ecLabel:'EC (dS/m)', ocLabel:'Organic C %',
      good:'Good', avg:'Average', poor:'Poor', actionPlanTitle:'Action Plan',
      actionItems:['Apply 45 kg/ha Urea before sowing — Nitrogen is low','Zinc Sulphate 25 kg/ha to correct Zn deficiency','Add 2–3 t/ha FYM to boost organic carbon','pH is ideal — no lime required this season'],
    },
    nutrients: { title:'Nutrient Profile', subtitle:'Macro & Micronutrients', macro:'Macronutrients', micro:'Micronutrients', optimal:'Optimal', deficient:'Deficient', excess:'Excess', barsTab:'Bars', trendTab:'Trend', trendTitle:'NPK Trend — Jun to Nov 2024' },
    schemes: { title:'Government Schemes', subtitle:'Schemes you may qualify for', eligLabel:'Eligible Only', eligStat:'You Qualify', applyBtn:'Apply Now', checkBtn:'Check Eligibility', moreBtn:'Details', deadline:'Deadline', docsLabel:'Documents needed', all:'All' },
    assistant: { title:'AI Soil Assistant', subtitle:'Ask about soil, crops, fertilisers or government schemes', placeholder:'Ask in any language…', sendBtn:'Send', resetBtn:'Reset chat', poweredBy:'Powered by Claude AI · Advisory only', greeting:'Namaste 🙏 I am your MittiAI expert. Your soil shows low Nitrogen (38 kg/ha) and Zinc (0.45 ppm). I can help with deficiencies, crop selection, and government schemes. What would you like to know?', chips:['Best crop for my soil?','Fix Nitrogen deficiency','PM-KISAN eligibility','Improve organic carbon'], contextPills:{ n:'⬇ N: 38 kg/ha', p:'✓ P: Optimal', zn:'⬇ Zn: Deficient', ph:'✓ pH 6.8', field:'🌱 Survey 47/2' } },
    weather: {
      title:'Weather Forecast', subtitle:'Live 7-day forecast with crop advisory',
      location:'Nashik, Maharashtra',
      current:'Current Conditions', weekAhead:'7-Day Forecast',
      feelsLike:'Feels like', humidity:'Humidity', wind:'Wind', uvIndex:'UV Index',
      rain:'Rainfall', sunrise:'Sunrise', sunset:'Sunset', rainChance:'Rain chance',
      cropAdvisory:'Crop Advisory', pressure:'Pressure', visibility:'Visibility',
      dewpoint:'Dew Point', cloudcover:'Cloud Cover',
      loadingText:'Fetching live weather data…', errorText:'Could not load weather. Check your connection.',
      advisories: {
        rain:'🌧️ Rain expected — delay irrigation and avoid pesticide spraying today.',
        rainSoon:'🌦️ Rain likely in next 24h — complete field operations today if possible.',
        hot:'🌡️ High heat alert — irrigate early morning (before 8am), avoid afternoon fieldwork.',
        wind:'💨 High winds — postpone all spraying operations. Risk of pesticide drift.',
        uv:'☀️ Very high UV — protect workers in the field, provide shade for nursery seedlings.',
        cold:'🌨️ Cold wave warning — protect sensitive crops with mulching or covers.',
        good:'✅ Favourable conditions for all field operations today.',
      },
    },
    community: {
      title:'Farmer Community', subtitle:'Chat with farmers from your region',
      regionFilter:'Filter by region', allRegions:'All Regions',
      myRegion:'My Region', online:'online',
      chatPlaceholder:'Type your message in any language…',
      sendBtn:'Send', joinRoom:'Join', leaveRoom:'Leave',
      roomTitle:'Regional Chat', selectRegion:'Select your region to join the chat',
      membersOnline:'farmers online', translateBtn:'Translate',
      aiReplyBtn:'Ask MittiAI', aiReplying:'MittiAI is typing…',
      postTopic:'Topic', pinned:'Pinned',
      youLabel:'You',
      welcomeMsg:'Welcome to the MittiAI Farmer Community! Chat with farmers from your region in your own language. MittiAI can answer questions in any language.',
    },
  },

  // ── HINDI ────────────────────────────────────────────────────
  hi: {
    brand:'Bhoomi Care', tagline:'स्मार्ट मृदा विश्लेषण',
    nav:{ home:'डैशबोर्ड', nutrients:'पोषक तत्व', schemes:'योजनाएं', ai:'AI चैट', weather:'मौसम', community:'समुदाय' },
    hero:{ greeting:'नमस्ते, किसान भाई', location:'सर्वे नं. 47/2, नासिक · रबी 2024–25', upload:'रिपोर्ट अपलोड करें' },
    dashboard:{ scoreLabel:'मृदा स्वास्थ्य स्कोर', phLabel:'pH स्तर', ecLabel:'EC (dS/m)', ocLabel:'जैव कार्बन %', good:'अच्छा', avg:'औसत', poor:'खराब', actionPlanTitle:'कार्य योजना', actionItems:['बुवाई से पहले 45 किग्रा/हेक्टर यूरिया — नाइट्रोजन कम है','जिंक की कमी के लिए ZnSO₄ 25 किग्रा/हेक्टर','2–3 टन/हेक्टर FYM डालें','pH सही है — चूना नहीं चाहिए'] },
    nutrients:{ title:'पोषक तत्व प्रोफाइल', subtitle:'वृहत् और सूक्ष्म पोषक', macro:'वृहत् पोषक तत्व', micro:'सूक्ष्म पोषक तत्व', optimal:'उचित', deficient:'कमी', excess:'अधिक', barsTab:'बार', trendTab:'प्रवृत्ति', trendTitle:'NPK प्रवृत्ति — जून से नवम्बर 2024' },
    schemes:{ title:'सरकारी योजनाएं', subtitle:'आपके लिए उपयुक्त योजनाएं', eligLabel:'केवल पात्र', eligStat:'आप पात्र हैं', applyBtn:'अभी आवेदन करें', checkBtn:'पात्रता जांचें', moreBtn:'विवरण', deadline:'अंतिम तिथि', docsLabel:'आवश्यक दस्तावेज़', all:'सभी' },
    assistant:{ title:'AI मृदा सहायक', subtitle:'मिट्टी, फसल, खाद या योजनाओं के बारे में पूछें', placeholder:'किसी भी भाषा में पूछें…', sendBtn:'भेजें', resetBtn:'चैट रीसेट', poweredBy:'Claude AI द्वारा · केवल सलाह', greeting:'नमस्ते 🙏 मैं आपका MittiAI विशेषज्ञ हूं। मिट्टी में नाइट्रोजन और जिंक की कमी है। सुधार, फसल और योजनाओं में मदद करूंगा।', chips:['मेरी मिट्टी के लिए सबसे अच्छी फसल?','नाइट्रोजन की कमी ठीक करें','PM-KISAN पात्रता','जैव कार्बन बढ़ाएं'], contextPills:{ n:'⬇ N: 38 किग्रा', p:'✓ P: उचित', zn:'⬇ Zn: कमी', ph:'✓ pH 6.8', field:'🌱 सर्वे 47/2' } },
    weather:{ title:'मौसम पूर्वानुमान', subtitle:'लाइव 7-दिन का पूर्वानुमान और फसल सलाह', location:'नासिक, महाराष्ट्र', current:'वर्तमान स्थिति', weekAhead:'7 दिन का पूर्वानुमान', feelsLike:'महसूस', humidity:'आर्द्रता', wind:'हवा', uvIndex:'UV सूचकांक', rain:'वर्षा', sunrise:'सूर्योदय', sunset:'सूर्यास्त', rainChance:'बारिश संभावना', cropAdvisory:'फसल सलाह', pressure:'दबाव', visibility:'दृश्यता', dewpoint:'ओसांक', cloudcover:'बादल', loadingText:'लाइव मौसम लोड हो रहा है…', errorText:'मौसम लोड नहीं हो सका।', advisories:{ rain:'🌧️ बारिश संभव — सिंचाई और कीटनाशक छिड़काव टालें।', rainSoon:'🌦️ 24 घंटे में बारिश — खेत के काम आज निपटाएं।', hot:'🌡️ अधिक गर्मी — सुबह 8 बजे से पहले सिंचाई करें।', wind:'💨 तेज हवा — आज कोई छिड़काव न करें।', uv:'☀️ अधिक UV — पौधों को छाया दें।', cold:'🌨️ शीत लहर — फसलों को मल्चिंग से बचाएं।', good:'✅ आज सभी खेती कार्यों के लिए अनुकूल मौसम है।' } },
    community:{ title:'किसान समुदाय', subtitle:'अपने क्षेत्र के किसानों के साथ चैट करें', regionFilter:'क्षेत्र से फ़िल्टर', allRegions:'सभी क्षेत्र', myRegion:'मेरा क्षेत्र', online:'ऑनलाइन', chatPlaceholder:'किसी भी भाषा में संदेश लिखें…', sendBtn:'भेजें', joinRoom:'जुड़ें', leaveRoom:'छोड़ें', roomTitle:'क्षेत्रीय चैट', selectRegion:'चैट में जुड़ने के लिए अपना क्षेत्र चुनें', membersOnline:'किसान ऑनलाइन', translateBtn:'अनुवाद', aiReplyBtn:'MittiAI से पूछें', aiReplying:'MittiAI टाइप कर रहा है…', postTopic:'विषय', pinned:'पिन', youLabel:'आप', welcomeMsg:'MittiAI किसान समुदाय में आपका स्वागत है! अपनी भाषा में अपने क्षेत्र के किसानों से बात करें।' },
  },

  // ── TAMIL ────────────────────────────────────────────────────
  ta: {
    brand:'Bhoomi Care', tagline:'AI மண் அறிவியல்',
    nav:{ home:'டாஷ்போர்டு', nutrients:'சத்துக்கள்', schemes:'திட்டங்கள்', ai:'AI அரட்டை', weather:'வானிலை', community:'சமூகம்' },
    hero:{ greeting:'வணக்கம், விவசாயி', location:'கணக்கெடுப்பு 47/2, நாசிக்', upload:'அறிக்கை பதிவேற்று' },
    dashboard:{ scoreLabel:'மண் ஆரோக்கிய மதிப்பெண்', phLabel:'pH அளவு', ecLabel:'EC (dS/m)', ocLabel:'கரிம கார்பன் %', good:'நல்லது', avg:'சராசரி', poor:'குறைவு', actionPlanTitle:'செயல் திட்டம்', actionItems:['45 கி.கி/ஹெ யூரியா — நைட்ரஜன் குறைவு','ZnSO₄ 25 கி.கி/ஹெ','2–3 டன்/ஹெ FYM','pH சரியாக உள்ளது'] },
    nutrients:{ title:'சத்து சுயவிவரம்', subtitle:'மேக்ரோ & நுண் சத்துக்கள்', macro:'மேக்ரோ சத்துக்கள்', micro:'நுண் சத்துக்கள்', optimal:'சரியான அளவு', deficient:'குறைவு', excess:'அதிகம்', barsTab:'பட்டைகள்', trendTab:'போக்கு', trendTitle:'NPK போக்கு — ஜூன்–நவம்பர் 2024' },
    schemes:{ title:'அரசு திட்டங்கள்', subtitle:'நீங்கள் தகுதியான திட்டங்கள்', eligLabel:'தகுதியானவை மட்டும்', eligStat:'தகுதியானவர்', applyBtn:'இப்போது விண்ணப்பிக்கவும்', checkBtn:'தகுதி சரிபார்க்கவும்', moreBtn:'விவரங்கள்', deadline:'கடைசி தேதி', docsLabel:'தேவையான ஆவணங்கள்', all:'அனைத்தும்' },
    assistant:{ title:'AI மண் உதவியாளர்', subtitle:'மண், பயிர்கள், உரங்கள் பற்றி கேளுங்கள்', placeholder:'எந்த மொழியிலும் கேளுங்கள்…', sendBtn:'அனுப்பு', resetBtn:'மீட்டமை', poweredBy:'Claude AI மூலம்', greeting:'வணக்கம் 🙏 நான் MittiAI நிபுணர். மண்ணில் நைட்ரஜன் மற்றும் துத்தநாகம் குறைவு. உதவ தயாராக உள்ளேன்.', chips:['என் மண்ணிற்கு பயிர்?','நைட்ரஜன் சரிசெய்க','PM-KISAN தகுதி','கரிம கார்பன் அதிகரிக்க'], contextPills:{ n:'⬇ N: 38 கி.கி', p:'✓ P: சரி', zn:'⬇ Zn: குறைவு', ph:'✓ pH 6.8', field:'🌱 கணக்கெடுப்பு 47/2' } },
    weather:{ title:'வானிலை முன்னறிவிப்பு', subtitle:'நேரடி 7 நாள் வானிலை', location:'நாசிக், மகாராஷ்டிரா', current:'தற்போதைய நிலை', weekAhead:'7 நாள் முன்னறிவிப்பு', feelsLike:'உணர்வு', humidity:'ஈரப்பதம்', wind:'காற்று', uvIndex:'UV குறியீடு', rain:'மழை', sunrise:'சூர்யோதயம்', sunset:'சூர்யாஸ்தமனம்', rainChance:'மழை வாய்ப்பு', cropAdvisory:'பயிர் ஆலோசனை', pressure:'அழுத்தம்', visibility:'தெரிவுநிலை', dewpoint:'பனிப்பொழிவு', cloudcover:'மேக மூட்டம்', loadingText:'வானிலை தகவல் ஏற்றப்படுகிறது…', errorText:'வானிலை ஏற்ற முடியவில்லை.', advisories:{ rain:'🌧️ மழை எதிர்பார்க்கப்படுகிறது.', rainSoon:'🌦️ 24 மணி நேரத்தில் மழை.', hot:'🌡️ அதிக வெப்பம் — காலை நீர்ப்பாசனம்.', wind:'💨 அதிக காற்று — தெளிப்பு வேண்டாம்.', uv:'☀️ அதிக UV — நிழல் கொடுக்கவும்.', cold:'🌨️ குளிர் — மல்ச்சிங் செய்யவும்.', good:'✅ இன்று நல்ல தட்பவெப்பம்.' } },
    community:{ title:'விவசாயி சமூகம்', subtitle:'உங்கள் மாவட்ட விவசாயிகளுடன் நேரடி அரட்டை', regionFilter:'மாவட்டம் தேர்வு', allRegions:'அனைத்து மாவட்டங்கள்', myRegion:'என் மாவட்டம்', online:'ஆன்லைன்', chatPlaceholder:'எந்த மொழியிலும் செய்தி அனுப்புங்கள்…', sendBtn:'அனுப்பு', joinRoom:'இணை', leaveRoom:'விடு', roomTitle:'மாவட்ட அரட்டை', selectRegion:'அரட்டையில் சேர மாவட்டம் தேர்வு செய்யுங்கள்', membersOnline:'விவசாயிகள் ஆன்லைன்', translateBtn:'மொழிபெயர்', aiReplyBtn:'MittiAI கேளுங்கள்', aiReplying:'MittiAI தட்டச்சு செய்கிறது…', postTopic:'தலைப்பு', pinned:'பின்', youLabel:'நீங்கள்', welcomeMsg:'MittiAI விவசாயி சமூகத்திற்கு வரவேற்கிறோம்! உங்கள் மொழியில் கேளுங்கள்.' },
  },

  // ── TELUGU ───────────────────────────────────────────────────
  te: {
    brand:'Bhoomi Care', tagline:'AI నేల విశ్లేషణ',
    nav:{ home:'డాష్‌బోర్డ్', nutrients:'పోషకాలు', schemes:'పథకాలు', ai:'AI చాట్', weather:'వాతావరణం', community:'సమాజం' },
    hero:{ greeting:'నమస్కారం, రైతు మిత్రా', location:'సర్వే నం. 47/2, నాసిక్', upload:'నివేదిక అప్‌లోడ్' },
    dashboard:{ scoreLabel:'నేల ఆరోగ్య స్కోర్', phLabel:'pH స్థాయి', ecLabel:'EC (dS/m)', ocLabel:'సేంద్రియ కార్బన్ %', good:'మంచిది', avg:'సగటు', poor:'తక్కువ', actionPlanTitle:'చర్య ప్రణాళిక', actionItems:['45 కి.గ్రా/హె యూరియా — నైట్రోజన్ తక్కువ','ZnSO₄ 25 కి.గ్రా/హె','2–3 టన్నులు/హె FYM','pH అనుకూలం — సున్నం వద్దు'] },
    nutrients:{ title:'పోషక ప్రొఫైల్', subtitle:'స్థూల మరియు సూక్ష్మ పోషకాలు', macro:'స్థూల పోషకాలు', micro:'సూక్ష్మ పోషకాలు', optimal:'అనుకూలం', deficient:'లోపం', excess:'అధికం', barsTab:'బార్లు', trendTab:'ట్రెండ్', trendTitle:'NPK ట్రెండ్ — జూన్–నవంబర్ 2024' },
    schemes:{ title:'ప్రభుత్వ పథకాలు', subtitle:'మీకు అర్హత ఉన్న పథకాలు', eligLabel:'అర్హులు మాత్రమే', eligStat:'మీరు అర్హులు', applyBtn:'దరఖాస్తు చేయండి', checkBtn:'అర్హత తనిఖీ', moreBtn:'వివరాలు', deadline:'గడువు', docsLabel:'పత్రాలు', all:'అన్నీ' },
    assistant:{ title:'AI నేల సహాయకుడు', subtitle:'నేల, పంటలు, ఎరువుల గురించి అడగండి', placeholder:'ఏ భాషలోనైనా అడగండి…', sendBtn:'పంపండి', resetBtn:'రీసెట్', poweredBy:'Claude AI ద్వారా', greeting:'నమస్కారం 🙏 నేను MittiAI నిపుణుడిని. నేలలో నైట్రోజన్ మరియు జింక్ తక్కువ. సహాయపడతాను.', chips:['నా నేలకు పంట?','నైట్రోజన్ సరిచేయండి','PM-KISAN అర్హత','సేంద్రియ కార్బన్ పెంచండి'], contextPills:{ n:'⬇ N: 38 కి.గ్రా', p:'✓ P: అనుకూలం', zn:'⬇ Zn: లోపం', ph:'✓ pH 6.8', field:'🌱 సర్వే 47/2' } },
    weather:{ title:'వాతావరణ సూచన', subtitle:'నేరుగా 7 రోజుల వాతావరణ సూచన', location:'నాసిక్, మహారాష్ట్ర', current:'ప్రస్తుత పరిస్థితులు', weekAhead:'7 రోజుల సూచన', feelsLike:'అనుభవం', humidity:'తేమ', wind:'గాలి', uvIndex:'UV సూచిక', rain:'వర్షపాతం', sunrise:'సూర్యోదయం', sunset:'సూర్యాస్తమయం', rainChance:'వర్షం అవకాశం', cropAdvisory:'పంట సలహా', pressure:'ఒత్తిడి', visibility:'దృశ్యమానత', dewpoint:'మంచు బిందువు', cloudcover:'మేఘావరణం', loadingText:'వాతావరణ వివరాలు లోడ్ అవుతున్నాయి…', errorText:'వాతావరణం లోడ్ అవలేదు.', advisories:{ rain:'🌧️ వర్షం రావచ్చు — పని వాయిదా వేయండి.', rainSoon:'🌦️ 24 గంటల్లో వర్షం.', hot:'🌡️ అధిక ఉష్ణోగ్రత — ఉదయం నీటిపారుదల.', wind:'💨 అధిక గాలి — పిచికారీ వద్దు.', uv:'☀️ అధిక UV — నీడ కల్పించండి.', cold:'🌨️ చలి — మొక్కలు కాపాడండి.', good:'✅ నేడు పొలం పనులకు మంచి పరిస్థితులు.' } },
    community:{ title:'రైతు సమాజం', subtitle:'మీ జిల్లా రైతులతో నేరుగా చాట్', regionFilter:'జిల్లా ఫిల్టర్', allRegions:'అన్ని జిల్లాలు', myRegion:'నా జిల్లా', online:'ఆన్‌లైన్', chatPlaceholder:'ఏ భాషలోనైనా సందేశం పంపండి…', sendBtn:'పంపండి', joinRoom:'చేరండి', leaveRoom:'వదిలండి', roomTitle:'జిల్లా చాట్', selectRegion:'చాట్‌కు చేరడానికి జిల్లా ఎంచుకోండి', membersOnline:'రైతులు ఆన్‌లైన్', translateBtn:'అనువాదం', aiReplyBtn:'MittiAI అడగండి', aiReplying:'MittiAI టైప్ చేస్తోంది…', postTopic:'అంశం', pinned:'పిన్', youLabel:'మీరు', welcomeMsg:'MittiAI రైతు సమాజంలో స్వాగతం! మీ భాషలో మాట్లాడండి.' },
  },

  // ── BENGALI ──────────────────────────────────────────────────
  bn: {
    brand:'Bhoomi Care', tagline:'AI মাটি বিশ্লেষণ',
    nav:{ home:'ড্যাশবোর্ড', nutrients:'পুষ্টি', schemes:'প্রকল্প', ai:'AI চ্যাট', weather:'আবহাওয়া', community:'সম্প্রদায়' },
    hero:{ greeting:'নমস্কার, কৃষক ভাই', location:'জরিপ নং 47/2, নাসিক', upload:'রিপোর্ট আপলোড' },
    dashboard:{ scoreLabel:'মাটির স্বাস্থ্য স্কোর', phLabel:'pH মাত্রা', ecLabel:'EC (dS/m)', ocLabel:'জৈব কার্বন %', good:'ভালো', avg:'গড়', poor:'খারাপ', actionPlanTitle:'কর্ম পরিকল্পনা', actionItems:['৪৫ কেজি/হে ইউরিয়া — নাইট্রোজেন কম','ZnSO₄ ২৫ কেজি/হে','২–৩ টন/হে FYM','pH আদর্শ — চুন নেই'] },
    nutrients:{ title:'পুষ্টি প্রোফাইল', subtitle:'স্থূল ও সূক্ষ্ম পুষ্টি', macro:'স্থূল পুষ্টি', micro:'সূক্ষ্ম পুষ্টি', optimal:'উপযুক্ত', deficient:'ঘাটতি', excess:'অতিরিক্ত', barsTab:'বার', trendTab:'প্রবণতা', trendTitle:'NPK প্রবণতা — জুন–নভেম্বর 2024' },
    schemes:{ title:'সরকারি প্রকল্প', subtitle:'আপনার যোগ্য প্রকল্প', eligLabel:'যোগ্য শুধুমাত্র', eligStat:'আপনি যোগ্য', applyBtn:'আবেদন করুন', checkBtn:'যোগ্যতা যাচাই', moreBtn:'বিশদ', deadline:'শেষ তারিখ', docsLabel:'কাগজপত্র', all:'সব' },
    assistant:{ title:'AI মাটি সহকারী', subtitle:'মাটি, ফসল, সার বা প্রকল্প সম্পর্কে জিজ্ঞাসা করুন', placeholder:'যেকোনো ভাষায় জিজ্ঞাসা করুন…', sendBtn:'পাঠান', resetBtn:'রিসেট', poweredBy:'Claude AI দ্বারা', greeting:'নমস্কার 🙏 আমি MittiAI বিশেষজ্ঞ। মাটিতে নাইট্রোজেন ও দস্তা কম। সাহায্য করব।', chips:['আমার মাটির জন্য ফসল?','নাইট্রোজেন সমাধান','PM-KISAN যোগ্যতা','জৈব কার্বন বাড়ান'], contextPills:{ n:'⬇ N: ৩৮ কেজি', p:'✓ P: উপযুক্ত', zn:'⬇ Zn: ঘাটতি', ph:'✓ pH ৬.৮', field:'🌱 জরিপ ৪৭/২' } },
    weather:{ title:'আবহাওয়ার পূর্বাভাস', subtitle:'লাইভ ৭ দিনের পূর্বাভাস', location:'নাসিক, মহারাষ্ট্র', current:'বর্তমান অবস্থা', weekAhead:'৭ দিনের পূর্বাভাস', feelsLike:'অনুভূতি', humidity:'আর্দ্রতা', wind:'বায়ু', uvIndex:'UV সূচক', rain:'বৃষ্টিপাত', sunrise:'সূর্যোদয়', sunset:'সূর্যাস্ত', rainChance:'বৃষ্টির সম্ভাবনা', cropAdvisory:'ফসল পরামর্শ', pressure:'চাপ', visibility:'দৃশ্যমানতা', dewpoint:'শিশির বিন্দু', cloudcover:'মেঘাচ্ছাদন', loadingText:'আবহাওয়া লোড হচ্ছে…', errorText:'আবহাওয়া লোড হয়নি।', advisories:{ rain:'🌧️ বৃষ্টির সম্ভাবনা — সেচ পিছিয়ে দিন।', rainSoon:'🌦️ ২৪ ঘণ্টায় বৃষ্টি।', hot:'🌡️ অতিরিক্ত তাপ — সকালে সেচ দিন।', wind:'💨 তীব্র বায়ু — স্প্রে করবেন না।', uv:'☀️ বেশি UV — ছায়া দিন।', cold:'🌨️ শীত ঢেউ — ফসল রক্ষা করুন।', good:'✅ আজ ভালো আবহাওয়া।' } },
    community:{ title:'কৃষক সম্প্রদায়', subtitle:'আপনার জেলার কৃষকদের সাথে সরাসরি চ্যাট', regionFilter:'জেলা ফিল্টার', allRegions:'সব জেলা', myRegion:'আমার জেলা', online:'অনলাইন', chatPlaceholder:'যেকোনো ভাষায় বার্তা লিখুন…', sendBtn:'পাঠান', joinRoom:'যোগ দিন', leaveRoom:'ছাড়ুন', roomTitle:'জেলা চ্যাট', selectRegion:'চ্যাটে যোগ দিতে জেলা নির্বাচন করুন', membersOnline:'কৃষক অনলাইন', translateBtn:'অনুবাদ', aiReplyBtn:'MittiAI জিজ্ঞাসা', aiReplying:'MittiAI টাইপ করছে…', postTopic:'বিষয়', pinned:'পিন', youLabel:'আপনি', welcomeMsg:'MittiAI কৃষক সম্প্রদায়ে স্বাগতম! আপনার ভাষায় কথা বলুন।' },
  },

  // ── MARATHI ──────────────────────────────────────────────────
  mr: {
    brand:'Bhoomi Care', tagline:'स्मार्ट माती विश्लेषण',
    nav:{ home:'डॅशबोर्ड', nutrients:'पोषक', schemes:'योजना', ai:'AI चॅट', weather:'हवामान', community:'समुदाय' },
    hero:{ greeting:'नमस्कार, शेतकरी', location:'सर्व्हे नं. 47/2, नाशिक', upload:'अहवाल अपलोड करा' },
    dashboard:{ scoreLabel:'माती आरोग्य स्कोर', phLabel:'pH पातळी', ecLabel:'EC (dS/m)', ocLabel:'जैव कार्बन %', good:'चांगले', avg:'सरासरी', poor:'खराब', actionPlanTitle:'कृती योजना', actionItems:['45 किग्रा/हेक्टर युरिया — नायट्रोजन कमी','ZnSO₄ 25 किग्रा/हेक्टर','2–3 टन/हेक्टर FYM','pH योग्य — चुना नाही'] },
    nutrients:{ title:'पोषक प्रोफाइल', subtitle:'मॅक्रो आणि सूक्ष्म पोषक', macro:'मॅक्रो पोषक', micro:'सूक्ष्म पोषक', optimal:'योग्य', deficient:'कमतरता', excess:'जास्त', barsTab:'बार', trendTab:'ट्रेंड', trendTitle:'NPK ट्रेंड — जून–नोव्हेंबर 2024' },
    schemes:{ title:'सरकारी योजना', subtitle:'तुम्ही पात्र योजना', eligLabel:'पात्र फक्त', eligStat:'तुम्ही पात्र', applyBtn:'अर्ज करा', checkBtn:'पात्रता तपासा', moreBtn:'तपशील', deadline:'मुदत', docsLabel:'कागदपत्रे', all:'सर्व' },
    assistant:{ title:'AI माती सहाय्यक', subtitle:'माती, पिके, खते किंवा योजनांबद्दल विचारा', placeholder:'कोणत्याही भाषेत विचारा…', sendBtn:'पाठवा', resetBtn:'रीसेट', poweredBy:'Claude AI द्वारे', greeting:'नमस्कार 🙏 मी MittiAI तज्ज्ञ आहे. मातीत नायट्रोजन आणि जस्त कमी आहे. मदत करेन.', chips:['माझ्या मातीसाठी पीक?','नायट्रोजन सुधारणा','PM-KISAN पात्रता','जैव कार्बन वाढवा'], contextPills:{ n:'⬇ N: 38 किग्रा', p:'✓ P: योग्य', zn:'⬇ Zn: कमतरता', ph:'✓ pH 6.8', field:'🌱 सर्व्हे 47/2' } },
    weather:{ title:'हवामान अंदाज', subtitle:'थेट 7 दिवसांचा अंदाज', location:'नाशिक, महाराष्ट्र', current:'सध्याची स्थिती', weekAhead:'7 दिवसांचा अंदाज', feelsLike:'वाटते', humidity:'आर्द्रता', wind:'वारा', uvIndex:'UV निर्देशांक', rain:'पाऊस', sunrise:'सूर्योदय', sunset:'सूर्यास्त', rainChance:'पावसाची शक्यता', cropAdvisory:'पीक सल्ला', pressure:'दाब', visibility:'दृश्यमानता', dewpoint:'दव बिंदू', cloudcover:'ढग', loadingText:'हवामान लोड होत आहे…', errorText:'हवामान लोड होऊ शकले नाही.', advisories:{ rain:'🌧️ पाऊस अपेक्षित — सिंचन टाळा.', rainSoon:'🌦️ 24 तासांत पाऊस.', hot:'🌡️ जास्त उष्णता — सकाळी सिंचन.', wind:'💨 जोरदार वारा — फवारणी नको.', uv:'☀️ जास्त UV — सावली द्या.', cold:'🌨️ थंडी — पिके झाकून ठेवा.', good:'✅ आज शेती कामांसाठी अनुकूल.' } },
    community:{ title:'शेतकरी समुदाय', subtitle:'तुमच्या जिल्ह्यातील शेतकऱ्यांशी थेट चॅट', regionFilter:'जिल्हा फिल्टर', allRegions:'सर्व जिल्हे', myRegion:'माझा जिल्हा', online:'ऑनलाइन', chatPlaceholder:'कोणत्याही भाषेत संदेश लिहा…', sendBtn:'पाठवा', joinRoom:'सामील व्हा', leaveRoom:'सोडा', roomTitle:'जिल्हा चॅट', selectRegion:'चॅटसाठी जिल्हा निवडा', membersOnline:'शेतकरी ऑनलाइन', translateBtn:'अनुवाद', aiReplyBtn:'MittiAI विचारा', aiReplying:'MittiAI टाइप करत आहे…', postTopic:'विषय', pinned:'पिन', youLabel:'तुम्ही', welcomeMsg:'MittiAI शेतकरी समुदायात स्वागत! तुमच्या भाषेत बोला.' },
  },

  // ── PUNJABI ──────────────────────────────────────────────────
  pa: {
    brand:'Bhoomi Care', tagline:'ਸਮਾਰਟ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ',
    nav:{ home:'ਡੈਸ਼ਬੋਰਡ', nutrients:'ਪੌਸ਼ਟਿਕ', schemes:'ਯੋਜਨਾਵਾਂ', ai:'AI ਚੈਟ', weather:'ਮੌਸਮ', community:'ਭਾਈਚਾਰਾ' },
    hero:{ greeting:'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਕਿਸਾਨ', location:'ਸਰਵੇ 47/2, ਨਾਸਿਕ', upload:'ਰਿਪੋਰਟ ਅਪਲੋਡ ਕਰੋ' },
    dashboard:{ scoreLabel:'ਮਿੱਟੀ ਸਿਹਤ ਸਕੋਰ', phLabel:'pH ਪੱਧਰ', ecLabel:'EC (dS/m)', ocLabel:'ਜੈਵਿਕ ਕਾਰਬਨ %', good:'ਚੰਗਾ', avg:'ਔਸਤ', poor:'ਖਰਾਬ', actionPlanTitle:'ਕਾਰਜ ਯੋਜਨਾ', actionItems:['45 ਕਿਗ੍ਰਾ/ਏਕੜ ਯੂਰੀਆ — ਨਾਈਟ੍ਰੋਜਨ ਘੱਟ','ZnSO₄ 25 ਕਿਗ੍ਰਾ/ਏਕੜ','2–3 ਟਨ/ਏਕੜ FYM','pH ਠੀਕ ਹੈ'] },
    nutrients:{ title:'ਪੌਸ਼ਟਿਕ ਪ੍ਰੋਫਾਈਲ', subtitle:'ਮੈਕ੍ਰੋ ਅਤੇ ਮਾਈਕ੍ਰੋ ਪੌਸ਼ਟਿਕ', macro:'ਮੈਕ੍ਰੋ ਪੌਸ਼ਟਿਕ', micro:'ਮਾਈਕ੍ਰੋ ਪੌਸ਼ਟਿਕ', optimal:'ਉਚਿਤ', deficient:'ਕਮੀ', excess:'ਜ਼ਿਆਦਾ', barsTab:'ਬਾਰ', trendTab:'ਰੁਝਾਨ', trendTitle:'NPK ਰੁਝਾਨ' },
    schemes:{ title:'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ', subtitle:'ਤੁਹਾਡੇ ਲਈ ਯੋਜਨਾਵਾਂ', eligLabel:'ਯੋਗ ਹੀ', eligStat:'ਤੁਸੀਂ ਯੋਗ ਹੋ', applyBtn:'ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ', checkBtn:'ਯੋਗਤਾ ਜਾਂਚੋ', moreBtn:'ਵੇਰਵਾ', deadline:'ਆਖਰੀ ਤਾਰੀਖ', docsLabel:'ਦਸਤਾਵੇਜ਼', all:'ਸਭ' },
    assistant:{ title:'AI ਮਿੱਟੀ ਸਹਾਇਕ', subtitle:'ਮਿੱਟੀ, ਫਸਲ, ਖਾਦ ਬਾਰੇ ਪੁੱਛੋ', placeholder:'ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛੋ…', sendBtn:'ਭੇਜੋ', resetBtn:'ਰੀਸੈੱਟ', poweredBy:'Claude AI ਦੁਆਰਾ', greeting:'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ 🙏 ਮੈਂ MittiAI ਮਾਹਰ ਹਾਂ। ਮਿੱਟੀ ਵਿੱਚ ਨਾਈਟ੍ਰੋਜਨ ਅਤੇ ਜ਼ਿੰਕ ਦੀ ਕਮੀ ਹੈ। ਮਦਦ ਕਰਾਂਗਾ।', chips:['ਮੇਰੀ ਮਿੱਟੀ ਲਈ ਫਸਲ?','ਨਾਈਟ੍ਰੋਜਨ ਸੁਧਾਰ','PM-KISAN ਯੋਗਤਾ','ਜੈਵਿਕ ਕਾਰਬਨ ਵਧਾਓ'], contextPills:{ n:'⬇ N: 38 ਕਿਗ੍ਰਾ', p:'✓ P: ਉਚਿਤ', zn:'⬇ Zn: ਕਮੀ', ph:'✓ pH 6.8', field:'🌱 ਸਰਵੇ 47/2' } },
    weather:{ title:'ਮੌਸਮ ਅਨੁਮਾਨ', subtitle:'ਲਾਈਵ 7-ਦਿਨ ਅਨੁਮਾਨ', location:'ਨਾਸਿਕ, ਮਹਾਰਾਸ਼ਟਰ', current:'ਮੌਜੂਦਾ ਸਥਿਤੀ', weekAhead:'7 ਦਿਨ ਅਨੁਮਾਨ', feelsLike:'ਮਹਿਸੂਸ', humidity:'ਨਮੀ', wind:'ਹਵਾ', uvIndex:'UV ਸੂਚਕਾਂਕ', rain:'ਵਰਖਾ', sunrise:'ਸੂਰਜ ਚੜ੍ਹਨਾ', sunset:'ਸੂਰਜ ਡੁੱਬਨਾ', rainChance:'ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ', cropAdvisory:'ਫਸਲ ਸਲਾਹ', pressure:'ਦਬਾਅ', visibility:'ਦਿੱਖ', dewpoint:'ਤ੍ਰੇਲ ਬਿੰਦੂ', cloudcover:'ਬੱਦਲ', loadingText:'ਮੌਸਮ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…', errorText:'ਮੌਸਮ ਲੋਡ ਨਹੀਂ ਹੋਇਆ।', advisories:{ rain:'🌧️ ਮੀਂਹ ਸੰਭਵ — ਸਿੰਚਾਈ ਟਾਲੋ।', rainSoon:'🌦️ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ।', hot:'🌡️ ਵਧੇਰੇ ਗਰਮੀ — ਸਵੇਰੇ ਸਿੰਚਾਈ।', wind:'💨 ਤੇਜ਼ ਹਵਾ — ਛਿੜਕਾਅ ਨਾ ਕਰੋ।', uv:'☀️ ਵਧੇਰੇ UV — ਛਾਂ ਦਿਓ।', cold:'🌨️ ਠੰਡ — ਫਸਲਾਂ ਢੱਕੋ।', good:'✅ ਅੱਜ ਖੇਤੀ ਲਈ ਚੰਗਾ ਮੌਸਮ।' } },
    community:{ title:'ਕਿਸਾਨ ਭਾਈਚਾਰਾ', subtitle:'ਆਪਣੇ ਜ਼ਿਲ੍ਹੇ ਦੇ ਕਿਸਾਨਾਂ ਨਾਲ ਸਿੱਧਾ ਚੈਟ', regionFilter:'ਜ਼ਿਲ੍ਹਾ ਫਿਲਟਰ', allRegions:'ਸਭ ਜ਼ਿਲ੍ਹੇ', myRegion:'ਮੇਰਾ ਜ਼ਿਲ੍ਹਾ', online:'ਔਨਲਾਈਨ', chatPlaceholder:'ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸੁਨੇਹਾ ਲਿਖੋ…', sendBtn:'ਭੇਜੋ', joinRoom:'ਸ਼ਾਮਲ ਹੋਵੋ', leaveRoom:'ਛੱਡੋ', roomTitle:'ਜ਼ਿਲ੍ਹਾ ਚੈਟ', selectRegion:'ਚੈਟ ਲਈ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ', membersOnline:'ਕਿਸਾਨ ਔਨਲਾਈਨ', translateBtn:'ਅਨੁਵਾਦ', aiReplyBtn:'MittiAI ਪੁੱਛੋ', aiReplying:'MittiAI ਟਾਈਪ ਕਰ ਰਿਹਾ ਹੈ…', postTopic:'ਵਿਸ਼ਾ', pinned:'ਪਿੰਨ', youLabel:'ਤੁਸੀਂ', welcomeMsg:'MittiAI ਕਿਸਾਨ ਭਾਈਚਾਰੇ ਵਿੱਚ ਸੁਆਗਤ ਹੈ!' },
  },

  // ── GUJARATI ─────────────────────────────────────────────────
  gu: {
    brand:'Bhoomi Care', tagline:'સ્માર્ટ માટી વિશ્લેષણ',
    nav:{ home:'ડેશબોર્ડ', nutrients:'પોષક', schemes:'યોજનાઓ', ai:'AI ચેટ', weather:'હવામાન', community:'સમુદાય' },
    hero:{ greeting:'જય જવાન, ખેડૂત', location:'સર્વે 47/2, નાસિક', upload:'અહેવાલ અપલોડ' },
    dashboard:{ scoreLabel:'માટી આરોગ્ય સ્કોર', phLabel:'pH સ્તર', ecLabel:'EC (dS/m)', ocLabel:'જૈવ કાર્બન %', good:'સારું', avg:'સરેરાશ', poor:'ખરાબ', actionPlanTitle:'કાર્ય યોજના', actionItems:['45 કિગ્રા/હેક્ટર યૂરિયા — નાઇટ્રોજન ઓછો','ZnSO₄ 25 કિગ્રા/હેક્ટર','2–3 ટન/હેક્ટર FYM','pH ઠીક — ચૂનો નહીં'] },
    nutrients:{ title:'પોષક પ્રોફાઇલ', subtitle:'મેક્રો અને માઇક્રો પોષક', macro:'મેક્રો પોષક', micro:'માઇક્રો પોષક', optimal:'ઉચિત', deficient:'ઓછું', excess:'વધારે', barsTab:'બાર', trendTab:'ટ્રેન્ડ', trendTitle:'NPK ટ્રેન્ડ' },
    schemes:{ title:'સરકારી યોજનાઓ', subtitle:'તમારા માટે યોજનાઓ', eligLabel:'પાત્ર જ', eligStat:'તમે પાત્ર', applyBtn:'અરજી કરો', checkBtn:'પાત્રતા ચકાસો', moreBtn:'વિગત', deadline:'છેલ્લી તારીખ', docsLabel:'દસ્તાવેજો', all:'બધા' },
    assistant:{ title:'AI માટી સહાયક', subtitle:'માટી, પાક, ખાતર વિશે પૂછો', placeholder:'કોઈ પણ ભાષામાં પૂછો…', sendBtn:'મોકલો', resetBtn:'રીસેટ', poweredBy:'Claude AI દ્વારા', greeting:' જય ખેડૂત 🙏 હું MittiAI નિષ્ણાત છું. માટીમાં નાઇટ્રોજન અને ઝિંક ઓછા છે. મદદ કરીશ.', chips:['મારી માટી માટે પાક?','નાઇટ્રોજન સુધારો','PM-KISAN પાત્રતા','જૈવ કાર્બન વધારો'], contextPills:{ n:'⬇ N: 38 કિ', p:'✓ P: ઉચિત', zn:'⬇ Zn: ઓછું', ph:'✓ pH 6.8', field:'🌱 સર્વે 47/2' } },
    weather:{ title:'હવામાન આગાહી', subtitle:'લાઇવ 7-દિવસ આગાહી', location:'નાસિક, મહારાષ્ટ્ર', current:'હાલની સ્થિતિ', weekAhead:'7 દિવસ આગાહી', feelsLike:'લાગે', humidity:'ભેજ', wind:'પવન', uvIndex:'UV સૂચકાંક', rain:'વરસાદ', sunrise:'સૂર્યોદય', sunset:'સૂર્યાસ્ત', rainChance:'વરસાદ શક્યતા', cropAdvisory:'પાક સલાહ', pressure:'દબાણ', visibility:'દૃશ્યતા', dewpoint:'ઝાકળ બિંદુ', cloudcover:'વાદળ', loadingText:'હવામાન લોડ…', errorText:'હવામાન લોડ ન થઈ શક્યું.', advisories:{ rain:'🌧️ વરસાદ — સિંચાઈ ટાળો.', rainSoon:'🌦️ 24 કલાકમાં વરસાદ.', hot:'🌡️ ગરમી — સવારે સિંચાઈ.', wind:'💨 ઝોકાળ — છંટકાવ ન કરો.', uv:'☀️ UV — છાંયડો.', cold:'🌨️ ઠંડી — ઢાંકો.', good:'✅ આજ ખેતી માટે સારું.' } },
    community:{ title:'ખેડૂત સમુદાય', subtitle:'તમારા જિલ્લાના ખેડૂતો સાથે ચેટ', regionFilter:'જિલ્લો ફિલ્ટર', allRegions:'બધા જિલ્લા', myRegion:'મારો જિલ્લો', online:'ઓનલાઇન', chatPlaceholder:'કોઈ પણ ભાષામાં સંદેશ…', sendBtn:'મોકલો', joinRoom:'જોડાઓ', leaveRoom:'છોડો', roomTitle:'જિલ્લા ચેટ', selectRegion:'ચેટ માટે જિલ્લો પસંદ કરો', membersOnline:'ખેડૂત ઓનલાઇન', translateBtn:'અનુવાદ', aiReplyBtn:'MittiAI', aiReplying:'MittiAI ટાઇપ…', postTopic:'વિષય', pinned:'પિન', youLabel:'તમે', welcomeMsg:'MittiAI ખેડૂત સમુદાયમાં સ્વાગત!' },
  },

  // ── KANNADA ──────────────────────────────────────────────────
  kn: {
    brand:'Bhoomi Care', tagline:'AI ಮಣ್ಣು ವಿಶ್ಲೇಷಣೆ',
    nav:{ home:'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', nutrients:'ಪೋಷಕಾಂಶಗಳು', schemes:'ಯೋಜನೆಗಳು', ai:'AI ಚಾಟ್', weather:'ಹವಾಮಾನ', community:'ಸಮುದಾಯ' },
    hero:{ greeting:'ನಮಸ್ಕಾರ, ರೈತ', location:'ಸರ್ವೆ 47/2, ನಾಸಿಕ್', upload:'ವರದಿ ಅಪ್‌ಲೋಡ್' },
    dashboard:{ scoreLabel:'ಮಣ್ಣು ಆರೋಗ್ಯ ಸ್ಕೋರ್', phLabel:'pH ಮಟ್ಟ', ecLabel:'EC (dS/m)', ocLabel:'ಸಾವಯವ ಇಂಗಾಲ %', good:'ಉತ್ತಮ', avg:'ಸರಾಸರಿ', poor:'ಕಳಪೆ', actionPlanTitle:'ಕ್ರಿಯಾ ಯೋಜನೆ', actionItems:['45 ಕಿ.ಗ್ರಾ/ಹೆ ಯೂರಿಯಾ — ಸಾರಜನಕ ಕಡಿಮೆ','ZnSO₄ 25 ಕಿ.ಗ್ರಾ/ಹೆ','2–3 ಟನ್/ಹೆ FYM','pH ಸರಿ — ಸುಣ್ಣ ಬೇಡ'] },
    nutrients:{ title:'ಪೋಷಕಾಂಶ ಪ್ರೊಫೈಲ್', subtitle:'ಮ್ಯಾಕ್ರೋ ಮತ್ತು ಮೈಕ್ರೋ', macro:'ಮ್ಯಾಕ್ರೋ ಪೋಷಕಾಂಶ', micro:'ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶ', optimal:'ಸೂಕ್ತ', deficient:'ಕೊರತೆ', excess:'ಹೆಚ್ಚು', barsTab:'ಬಾರ್', trendTab:'ಟ್ರೆಂಡ್', trendTitle:'NPK ಟ್ರೆಂಡ್' },
    schemes:{ title:'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು', subtitle:'ನಿಮಗೆ ಅರ್ಹ ಯೋಜನೆಗಳು', eligLabel:'ಅರ್ಹರು ಮಾತ್ರ', eligStat:'ನೀವು ಅರ್ಹರು', applyBtn:'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ', checkBtn:'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ', moreBtn:'ವಿವರ', deadline:'ಗಡುವು', docsLabel:'ದಾಖಲಾತಿ', all:'ಎಲ್ಲ' },
    assistant:{ title:'AI ಮಣ್ಣು ಸಹಾಯಕ', subtitle:'ಮಣ್ಣು, ಬೆಳೆ, ಗೊಬ್ಬರ ಬಗ್ಗೆ ಕೇಳಿ', placeholder:'ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ…', sendBtn:'ಕಳುಹಿಸಿ', resetBtn:'ರೀಸೆಟ್', poweredBy:'Claude AI ಮೂಲಕ', greeting:'ನಮಸ್ಕಾರ 🙏 ನಾನು MittiAI ತಜ್ಞ. ಮಣ್ಣಿನಲ್ಲಿ ಸಾರಜನಕ ಮತ್ತು ಸತು ಕಡಿಮೆ. ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.', chips:['ನನ್ನ ಮಣ್ಣಿಗೆ ಬೆಳೆ?','ಸಾರಜನಕ ಸರಿಪಡಿಸಿ','PM-KISAN ಅರ್ಹತೆ','ಸಾವಯವ ಇಂಗಾಲ ಹೆಚ್ಚಿಸಿ'], contextPills:{ n:'⬇ N: 38 ಕಿ', p:'✓ P: ಸೂಕ್ತ', zn:'⬇ Zn: ಕೊರತೆ', ph:'✓ pH 6.8', field:'🌱 ಸರ್ವೆ 47/2' } },
    weather:{ title:'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ', subtitle:'ನೇರ 7 ದಿನ ಮುನ್ಸೂಚನೆ', location:'ನಾಸಿಕ್, ಮಹಾರಾಷ್ಟ್ರ', current:'ಈಗಿನ ಸ್ಥಿತಿ', weekAhead:'7 ದಿನ ಮುನ್ಸೂಚನೆ', feelsLike:'ಅನಿಸಿಕೆ', humidity:'ತೇವ', wind:'ಗಾಳಿ', uvIndex:'UV ಸೂಚ್ಯಂಕ', rain:'ಮಳೆ', sunrise:'ಸೂರ್ಯೋದಯ', sunset:'ಸೂರ್ಯಾಸ್ತ', rainChance:'ಮಳೆ ಸಾಧ್ಯತೆ', cropAdvisory:'ಬೆಳೆ ಸಲಹೆ', pressure:'ಒತ್ತಡ', visibility:'ದೃಶ್ಯಮಾನತೆ', dewpoint:'ಇಬ್ಬನಿ ಬಿಂದು', cloudcover:'ಮೋಡ', loadingText:'ಹವಾಮಾನ ಲೋಡ್…', errorText:'ಹವಾಮಾನ ಲೋಡ್ ಆಗಲಿಲ್ಲ.', advisories:{ rain:'🌧️ ಮಳೆ ನಿರೀಕ್ಷಿತ.', rainSoon:'🌦️ 24 ಗಂಟೆಯಲ್ಲಿ ಮಳೆ.', hot:'🌡️ ಹೆಚ್ಚು ಬಿಸಿ — ಬೆಳಿಗ್ಗೆ ನೀರು.', wind:'💨 ಜೋರು ಗಾಳಿ — ಸ್ಪ್ರೇ ಬೇಡ.', uv:'☀️ ಹೆಚ್ಚು UV — ನೆರಳು.', cold:'🌨️ ಚಳಿ — ಬೆಳೆ ರಕ್ಷಿಸಿ.', good:'✅ ಇಂದು ಒಳ್ಳೆ ದಿನ.' } },
    community:{ title:'ರೈತ ಸಮುದಾಯ', subtitle:'ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ರೈತರೊಂದಿಗೆ ಚಾಟ್', regionFilter:'ಜಿಲ್ಲೆ ಫಿಲ್ಟರ್', allRegions:'ಎಲ್ಲ ಜಿಲ್ಲೆ', myRegion:'ನನ್ನ ಜಿಲ್ಲೆ', online:'ಆನ್‌ಲೈನ್', chatPlaceholder:'ಯಾವ ಭಾಷೆಯಲ್ಲೂ ಸಂದೇಶ…', sendBtn:'ಕಳುಹಿಸಿ', joinRoom:'ಸೇರಿ', leaveRoom:'ಬಿಡಿ', roomTitle:'ಜಿಲ್ಲಾ ಚಾಟ್', selectRegion:'ಚಾಟ್‌ಗೆ ಜಿಲ್ಲೆ ಆರಿಸಿ', membersOnline:'ರೈತರು ಆನ್‌ಲೈನ್', translateBtn:'ಅನುವಾದ', aiReplyBtn:'MittiAI', aiReplying:'MittiAI ಟೈಪ್…', postTopic:'ವಿಷಯ', pinned:'ಪಿನ್', youLabel:'ನೀವು', welcomeMsg:'MittiAI ರೈತ ಸಮುದಾಯಕ್ಕೆ ಸ್ವಾಗತ!' },
  },

  // ── ODIA ─────────────────────────────────────────────────────
  od: {
    brand:'Bhoomi Care', tagline:'AI ମାଟି ବିଶ୍ଲେଷଣ',
    nav:{ home:'ଡ୍ୟାସ୍‌ବୋର୍ଡ', nutrients:'ପୋଷକ', schemes:'ଯୋଜନା', ai:'AI ଚ୍ୟାଟ', weather:'ଆବହାୱା', community:'ସମ୍ପ୍ରଦାୟ' },
    hero:{ greeting:'ନମସ୍କାର, କୃଷକ', location:'ସର୍ଭେ 47/2, ନାସିକ', upload:'ରିପୋର୍ଟ ଅପଲୋଡ' },
    dashboard:{ scoreLabel:'ମାଟି ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର', phLabel:'pH ସ୍ତର', ecLabel:'EC (dS/m)', ocLabel:'ଜୈବ ଅଙ୍ଗାର %', good:'ଭଲ', avg:'ମଧ୍ୟ', poor:'ଖରାପ', actionPlanTitle:'କ୍ରିୟା ଯୋଜନା', actionItems:['45 କି.ଗ୍ରା/ହେ ୟୁରିଆ','ZnSO₄ 25 କି.ଗ୍ରା/ହେ','2–3 ଟନ/ହେ FYM','pH ସଠିକ'] },
    nutrients:{ title:'ପୋଷକ ପ୍ରୋଫାଇଲ', subtitle:'ମ୍ୟାକ୍ରୋ ଓ ମାଇକ୍ରୋ', macro:'ମ୍ୟାକ୍ରୋ ପୋଷକ', micro:'ସୂକ୍ଷ୍ମ ପୋଷକ', optimal:'ଉଚିତ', deficient:'ଅଭାବ', excess:'ଅଧିକ', barsTab:'ବାର', trendTab:'ଟ୍ରେଣ୍ଡ', trendTitle:'NPK ଟ୍ରେଣ୍ଡ' },
    schemes:{ title:'ସରକାରୀ ଯୋଜନା', subtitle:'ଆପଣଙ୍କ ଯୋଗ୍ୟ ଯୋଜନା', eligLabel:'ଯୋଗ୍ୟ ମାତ୍ର', eligStat:'ଆପଣ ଯୋଗ୍ୟ', applyBtn:'ଆବେଦନ', checkBtn:'ଯୋଗ୍ୟତା ଯାଞ୍ଚ', moreBtn:'ବିବରଣ', deadline:'ଶେଷ ତାରିଖ', docsLabel:'ଦଲିଲ', all:'ସବୁ' },
    assistant:{ title:'AI ମାଟି ସହାୟକ', subtitle:'ମାଟି, ଫସଲ, ସାର ବିଷୟରେ ପଚାର', placeholder:'ଯେ କୌଣସି ଭାଷାରେ ପଚାର…', sendBtn:'ପଠାନ୍ତୁ', resetBtn:'ରିସେଟ', poweredBy:'Claude AI ଦ୍ୱାରା', greeting:'ନମସ୍କାର 🙏 ମୁଁ MittiAI ବିଶେଷଜ୍ଞ। ମାଟିରେ ନାଇଟ୍ରୋଜେନ ଓ ଜିଙ୍କ କମ। ସାହାଯ୍ୟ କରିବି।', chips:['ମୋ ମାଟି ପାଇଁ ଫସଲ?','ନାଇଟ୍ରୋଜେନ ସୁଧାର','PM-KISAN ଯୋଗ୍ୟତା','ଜୈବ ଅଙ୍ଗାର ବଢାନ'], contextPills:{ n:'⬇ N: 38', p:'✓ P: ଉଚିତ', zn:'⬇ Zn: ଅଭାବ', ph:'✓ pH 6.8', field:'🌱 ସର୍ଭେ 47/2' } },
    weather:{ title:'ଆବହାୱା ପୂର୍ବାଭାସ', subtitle:'ଲାଇଭ 7 ଦିନ ପୂର୍ବାଭାସ', location:'ନାସିକ, ମହାରାଷ୍ଟ୍ର', current:'ବର୍ତ୍ତମାନ ଅବସ୍ଥା', weekAhead:'7 ଦିନ ପୂର୍ବାଭାସ', feelsLike:'ଅନୁଭବ', humidity:'ଆର୍ଦ୍ରତା', wind:'ବାୟୁ', uvIndex:'UV ସୂଚକ', rain:'ବର୍ଷା', sunrise:'ସୂର୍ୟୋଦୟ', sunset:'ସୂର୍ୟାସ୍ତ', rainChance:'ବୃଷ୍ଟି ସମ୍ଭାବନା', cropAdvisory:'ଫସଲ ପରାମର୍ଶ', pressure:'ଚାପ', visibility:'ଦୃଶ୍ୟମାନ', dewpoint:'ଶିଶିର ବିନ୍ଦୁ', cloudcover:'ମେଘ', loadingText:'ଆବହାୱା ଲୋଡ…', errorText:'ଆବହାୱା ଲୋଡ ହେଲା ନାହିଁ।', advisories:{ rain:'🌧️ ବର୍ଷା ସମ୍ଭବ।', rainSoon:'🌦️ 24 ଘଣ୍ଟାରେ ବର୍ଷା।', hot:'🌡️ ଅଧିକ ଗରମ।', wind:'💨 ଜୋରରେ ବାୟୁ।', uv:'☀️ UV ଅଧିକ।', cold:'🌨️ ଥଣ୍ଡା।', good:'✅ ଆଜି ଭଲ ଦିନ।' } },
    community:{ title:'କୃଷକ ସମ୍ପ୍ରଦାୟ', subtitle:'ଆପଣଙ୍କ ଜିଲ୍ଲା କୃଷକଙ୍କ ସହ ଚ୍ୟାଟ', regionFilter:'ଜିଲ୍ଲା ଫିଲ୍ଟର', allRegions:'ସମସ୍ତ ଜିଲ୍ଲା', myRegion:'ମୋ ଜିଲ୍ଲା', online:'ଅନଲାଇନ', chatPlaceholder:'ଯେ କୌଣସି ଭାଷାରେ ସଂଦେଶ…', sendBtn:'ପଠାନ୍ତୁ', joinRoom:'ଯୋଗ ଦିଅନ୍ତୁ', leaveRoom:'ଛାଡ଼ନ୍ତୁ', roomTitle:'ଜିଲ୍ଲା ଚ୍ୟାଟ', selectRegion:'ଜିଲ୍ଲା ବାଛନ୍ତୁ', membersOnline:'କୃଷକ ଅନଲାଇନ', translateBtn:'ଅନୁବାଦ', aiReplyBtn:'MittiAI', aiReplying:'MittiAI ଟାଇପ…', postTopic:'ବିଷୟ', pinned:'ପିନ', youLabel:'ଆପଣ', welcomeMsg:'MittiAI ସମ୍ପ୍ରଦାୟରେ ସ୍ୱାଗତ!' },
  },
}

// Additional nav key for marketplace - merged into TRANSLATIONS at runtime
export const MARKET_NAV = {
  en: 'Marketplace', hi: 'बाज़ार', ta: 'சந்தை', te: 'మార్కెట్',
  bn: 'বাজার', mr: 'बाजार', pa: 'ਬਾਜ਼ਾਰ', gu: 'બજાર', kn: 'ಮಾರುಕಟ್ಟೆ', od: 'ବଜାର',
}

export const MARKET_I18N = {
  en: {
    title: 'Bhoomi Care Marketplace', subtitle: 'Buy & sell fertilizers, seeds, and soil essentials',
    searchPlaceholder: 'Search products, brands, categories…',
    sortLabel: 'Sort by', sortOptions: { popular:'Most Popular', priceAsc:'Price: Low to High', priceDesc:'Price: High to Low', rating:'Top Rated' },
    addCart: 'Add to Cart', buyNow: 'Buy Now', inCart: 'In Cart',
    cartTitle: 'Your Cart', cartEmpty: 'Your cart is empty', checkout: 'Proceed to Order',
    cartTotal: 'Total', cartItems: 'items',
    sellTab: 'Sell a Product', myListings: 'My Listings',
    sellTitle: 'List Your Product for Sale',
    sellFields: { name:'Product Name', category:'Category', price:'Price (₹)', qty:'Quantity', unit:'Unit', desc:'Description (optional)', contact:'Contact Number' },
    sellBtn: 'Post Listing',
    badge: { verified:'Verified Seller', subsidy:'Subsidy Available', certified:'Certified', organic:'Organic', bestSeller:'Best Seller', new:'New', popular:'Popular', recommended:'Recommended', newListing:'New Listing' },
    inStock: 'in stock', outOfStock: 'Out of stock',
    reviews: 'reviews', seller: 'Seller', region: 'Region',
    wishlist: 'Wishlist', viewDetail: 'View Details', closeDetail: 'Back',
    discount: 'off', mrp: 'MRP',
    filterTitle: 'Filter Products', clearFilter: 'Clear',
    loginToSell: 'Please login to post a listing',
    loginToCart: 'Please login to add items to cart',
    emptySearch: 'No products found. Try a different search.',
    orderConfirm: 'Order Placed! 🎉 A seller will contact you within 24 hours.',
  },
  hi: {
    title: 'भूमि केयर बाज़ार', subtitle: 'खाद, बीज और मिट्टी की जरूरी चीजें खरीदें-बेचें',
    searchPlaceholder: 'उत्पाद, ब्रांड खोजें…',
    sortLabel: 'क्रमबद्ध करें', sortOptions: { popular:'सबसे लोकप्रिय', priceAsc:'कीमत: कम से अधिक', priceDesc:'कीमत: अधिक से कम', rating:'सर्वोच्च रेटिंग' },
    addCart: 'कार्ट में डालें', buyNow: 'अभी खरीदें', inCart: 'कार्ट में है',
    cartTitle: 'आपका कार्ट', cartEmpty: 'कार्ट खाली है', checkout: 'ऑर्डर करें',
    cartTotal: 'कुल', cartItems: 'वस्तुएं',
    sellTab: 'उत्पाद बेचें', myListings: 'मेरी सूची',
    sellTitle: 'अपना उत्पाद बिक्री के लिए सूचीबद्ध करें',
    sellFields: { name:'उत्पाद का नाम', category:'श्रेणी', price:'कीमत (₹)', qty:'मात्रा', unit:'इकाई', desc:'विवरण', contact:'संपर्क नंबर' },
    sellBtn: 'लिस्टिंग पोस्ट करें',
    badge: { verified:'सत्यापित विक्रेता', subsidy:'सब्सिडी उपलब्ध', certified:'प्रमाणित', organic:'जैविक', bestSeller:'बेस्ट सेलर', new:'नया', popular:'लोकप्रिय', recommended:'अनुशंसित', newListing:'नई लिस्टिंग' },
    inStock: 'स्टॉक में', outOfStock: 'स्टॉक खत्म',
    reviews: 'समीक्षाएं', seller: 'विक्रेता', region: 'क्षेत्र',
    wishlist: 'विशलिस्ट', viewDetail: 'विवरण देखें', closeDetail: 'वापस',
    discount: 'छूट', mrp: 'MRP',
    filterTitle: 'फ़िल्टर', clearFilter: 'साफ करें',
    loginToSell: 'लिस्टिंग के लिए लॉगिन करें', loginToCart: 'कार्ट के लिए लॉगिन करें',
    emptySearch: 'कोई उत्पाद नहीं मिला।',
    orderConfirm: 'ऑर्डर हो गया! 🎉 विक्रेता 24 घंटे में संपर्क करेगा।',
  },
}

export const AUTH_I18N = {
  en: {
    login: 'Login', register: 'Register', logout: 'Logout',
    loginTitle: 'Welcome back to Bhoomi Care', registerTitle: 'Join Bhoomi Care',
    loginSub: 'Login to access marketplace, AI chat and more',
    registerSub: 'Create your free farmer account',
    email: 'Email address', password: 'Password', name: 'Full Name',
    phone: 'Mobile Number', region: 'Your State / Region', lang: 'Preferred Language',
    loginBtn: 'Login to Account', registerBtn: 'Create Account',
    noAccount: "Don't have an account?", hasAccount: 'Already have an account?',
    forgotPw: 'Forgot password?', orContinue: 'or',
    demoHint: 'Demo: ramesh@example.com / farmer123',
    profile: 'My Profile', editProfile: 'Edit Profile', saveProfile: 'Save Changes',
    greeting: (name) => `Welcome, ${name}! 🌾`,
    logoutConfirm: 'Are you sure you want to logout?',
    errors: { required: 'This field is required', emailInvalid: 'Enter a valid email', pwShort: 'Password must be at least 6 characters', phoneInvalid: 'Enter a valid 10-digit mobile number' },
  },
  hi: {
    login: 'लॉगिन', register: 'रजिस्टर', logout: 'लॉगआउट',
    loginTitle: 'भूमि केयर में आपका स्वागत है', registerTitle: 'भूमि केयर से जुड़ें',
    loginSub: 'बाज़ार, AI चैट के लिए लॉगिन करें', registerSub: 'मुफ्त किसान खाता बनाएं',
    email: 'ईमेल', password: 'पासवर्ड', name: 'पूरा नाम',
    phone: 'मोबाइल नंबर', region: 'राज्य / क्षेत्र', lang: 'पसंदीदा भाषा',
    loginBtn: 'लॉगिन करें', registerBtn: 'खाता बनाएं',
    noAccount: 'खाता नहीं है?', hasAccount: 'पहले से खाता है?',
    forgotPw: 'पासवर्ड भूल गए?', orContinue: 'या',
    demoHint: 'डेमो: ramesh@example.com / farmer123',
    profile: 'मेरी प्रोफाइल', editProfile: 'प्रोफाइल संपादित करें', saveProfile: 'बदलाव सहेजें',
    greeting: (name) => `स्वागत है, ${name}! 🌾`,
    logoutConfirm: 'क्या आप लॉगआउट करना चाहते हैं?',
    errors: { required: 'यह फ़ील्ड आवश्यक है', emailInvalid: 'सही ईमेल दर्ज करें', pwShort: 'पासवर्ड कम से कम 6 अक्षर का हो', phoneInvalid: 'सही 10-अंकीय मोबाइल नंबर दर्ज करें' },
  },
}
