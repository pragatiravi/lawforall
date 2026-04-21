export interface LawContent {
  about: string;
  reference: string;
  rights: string[];
  authorities_allowed: string[];
  authorities_not_allowed: string[];
  scenario: string;
  explanation: string;
  todo: string;
  not_todo: string;
}

export interface Law {
  id: string;
  category: 'constitution' | 'criminal' | 'civil' | 'women' | 'consumer' | 'cyber' | 'workplace' | 'education' | 'traffic';
  title: {
    en: string;
    hi: string;
    kn: string;
    mr: string;
  };
  content: {
    en: LawContent;
    hi: LawContent;
    kn: LawContent;
    mr: LawContent;
  };
}

export const laws: Law[] = [
  {
    id: "fundamental-rights",
    category: "constitution",
    title: {
      en: "Fundamental Rights (Articles 12-35)",
      hi: "मौलिक अधिकार (अनुच्छेद 12-35)",
      kn: "ಮೂಲಭೂತ ಹಕ್ಕುಗಳು (ವಿಧಿಗಳು 12-35)",
      mr: "मूलभूत अधिकार (कलम १२-३५)"
    },
    content: {
      en: {
        about: "Basic human rights guaranteed to all citizens of India regardless of race, place of birth, religion, caste, creed, or gender.",
        reference: "Part III, Articles 12 to 35 of the Constitution of India",
        rights: ["Right to Equality", "Right to Freedom", "Right against Exploitation", "Right to Freedom of Religion", "Cultural and Educational Rights", "Right to Constitutional Remedies"],
        authorities_allowed: ["Impose reasonable restrictions for national security", "Maintain public order"],
        authorities_not_allowed: ["Discriminate on grounds of religion or caste", "Deprive life or personal liberty without due process"],
        scenario: "A person is stopped from entering a public temple because of their caste.",
        explanation: "This violates Article 15 (Prohibition of discrimination) and Article 17 (Abolition of Untouchability).",
        todo: "File a writ petition in the High Court or Supreme Court.",
        not_todo: "Do not take the law into your own hands."
      },
      hi: {
        about: "भारत के सभी नागरिकों को जाति, जन्म स्थान, धर्म, पंथ या लिंग की परवाह किए बिना गारंटीकृत बुनियादी मानवाधिकार।",
        reference: "भारत के संविधान का भाग III, अनुच्छेद 12 से 35",
        rights: ["समानता का अधिकार", "स्वतंत्रता का अधिकार", "शोषण के विरुद्ध अधिकार", "धर्म की स्वतंत्रता का अधिकार", "सांस्कृतिक और शैक्षिक अधिकार", "संवैधानिक उपचार का अधिकार"],
        authorities_allowed: ["राष्ट्रीय सुरक्षा के लिए उचित प्रतिबंध लगाना", "सार्वजनिक व्यवस्था बनाए रखना"],
        authorities_not_allowed: ["धर्म या जाति के आधार पर भेदभाव करना", "उचित प्रक्रिया के बिना जीवन या व्यक्तिगत स्वतंत्रता से वंचित करना"],
        scenario: "किसी व्यक्ति को उसकी जाति के कारण सार्वजनिक मंदिर में प्रवेश करने से रोका जाता है।",
        explanation: "यह अनुच्छेद 15 (भेदभाव का निषेध) और अनुच्छेद 17 (अस्पृश्यता का उन्मूलन) का उल्लंघन है।",
        todo: "उच्च न्यायालय या सर्वोच्च न्यायालय में रिट याचिका दायर करें।",
        not_todo: "कानून को अपने हाथ में न लें।"
      },
      kn: {
        about: "ಜಾತಿ, ಜನ್ಮಸ್ಥಳ, ಧರ್ಮ ಅಥವಾ ಲಿಂಗವನ್ನು ಲೆಕ್ಕಿಸದೆ ಭಾರತದ ಎಲ್ಲಾ ನಾಗರಿಕರಿಗೆ ಖಾತರಿಪಡಿಸಿದ ಮೂಲಭೂತ ಮಾನವ ಹಕ್ಕುಗಳು.",
        reference: "ಭಾರತದ ಸಂವಿಧಾನದ ಭಾಗ III, ವಿಧಿಗಳು 12 ರಿಂದ 35",
        rights: ["ಸಮಾನತೆಯ ಹಕ್ಕು", "ಸ್ವಾತಂತ್ರ್ಯದ ಹಕ್ಕು", "ಶೋಷಣೆಯ ವಿರುದ್ಧ ಹಕ್ಕು", "ಧಾರ್ಮಿಕ ಸ್ವಾತಂತ್ರ್ಯದ ಹಕ್ಕು", "ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಹಕ್ಕುಗಳು", "ಸಂವಿಧಾನಾತ್ಮಕ ಪರಿಹಾರಗಳ ಹಕ್ಕು"],
        authorities_allowed: ["ರಾಷ್ಟ್ರೀಯ ಭದ್ರತೆಗಾಗಿ ಸಮಂಜಸವಾದ ನಿರ್ಬಂಧಗಳನ್ನು ವಿಧಿಸುವುದು", "ಸಾರ್ವಜನಿಕ ಸುವ್ಯವಸ್ಥೆಯನ್ನು ಕಾಪಾಡುವುದು"],
        authorities_not_allowed: ["ಧರ್ಮ ಅಥವಾ ಜಾತಿಯ ಆಧಾರದ ಮೇಲೆ ತಾರತಮ್ಯ ಮಾಡುವುದು", "ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಯಿಲ್ಲದೆ ಜೀವನ ಅಥವಾ ವೈಯಕ್ತಿಕ ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ಕಸಿದುಕೊಳ್ಳುವುದು"],
        scenario: "ಒಬ್ಬ ವ್ಯಕ್ತಿಯನ್ನು ಅವರ ಜಾತಿಯ ಕಾರಣದಿಂದ ಸಾರ್ವಜನಿಕ ದೇವಸ್ಥಾನಕ್ಕೆ ಪ್ರವೇಶಿಸದಂತೆ ತಡೆಯಲಾಗುತ್ತದೆ.",
        explanation: "ಇದು ವಿಧಿ 15 (ತಾರತಮ್ಯದ ನಿಷೇಧ) ಮತ್ತು ವಿಧಿ 17 (ಅಸ್ಪೃಶ್ಯತೆಯ ನಿರ್ಮೂಲನೆ) ಅನ್ನು ಉಲ್ಲಂಘಿಸುತ್ತದೆ.",
        todo: "ಹೈಕೋರ್ಟ್ ಅಥವಾ ಸುಪ್ರೀಂ ಕೋರ್ಟ್‌ನಲ್ಲಿ ರಿಟ್ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ.",
        not_todo: "ಕಾನೂನನ್ನು ಕೈಗೆ ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ."
      },
      mr: {
        about: "वंश, जन्मस्थान, धर्म, जात, पंथ किंवा लिंग यांचा विचार न करता भारतातील सर्व नागरिकांना हमी दिलेले मूलभूत मानवाधिकार.",
        reference: "भारताच्या संविधानाचा भाग III, कलम १२ ते ३५",
        rights: ["समानतेचा अधिकार", "स्वातंत्र्याचा अधिकार", "शोषणाविरुद्ध अधिकार", "धार्मिक स्वातंत्र्याचा अधिकार", "सांस्कृतिक आणि शैक्षणिक अधिकार", "घटनात्मक उपायांचा अधिकार"],
        authorities_allowed: ["राष्ट्रीय सुरक्षेसाठी वाजवी निर्बंध घालणे", "सार्वजनिक सुव्यवस्था राखणे"],
        authorities_not_allowed: ["धर्म किंवा जातीच्या आधारावर भेदभाव करणे", "योग्य प्रक्रियेशिवाय जीवन किंवा वैयक्तिक स्वातंत्र्य हिरावून घेणे"],
        scenario: "एखाद्या व्यक्तीला त्यांच्या जातीमुळे सार्वजनिक मंदिरात प्रवेश करण्यापासून रोखले जाते.",
        explanation: "हे कलम १५ (भेदभावास मनाई) आणि कलम १७ (अस्पृश्यता निर्मूलन) चे उल्लंघन करते.",
        todo: "उच्च न्यायालय किंवा सर्वोच्च न्यायालयात रिट याचिका दाखल करा.",
        not_todo: "कायदा हातात घेऊ नका."
      }
    }
  },
  {
    id: "womens-rights",
    category: "women",
    title: {
      en: "Women's Rights & Protection",
      hi: "महिला अधिकार और सुरक्षा",
      kn: "ಮಹಿಳಾ ಹಕ್ಕುಗಳು ಮತ್ತು ರಕ್ಷಣೆ",
      mr: "महिलांचे अधिकार आणि संरक्षण"
    },
    content: {
      en: {
        about: "Special legal provisions to ensure safety, equality, and dignity for women in India.",
        reference: "Domestic Violence Act 2005, POSH Act 2013, Criminal Law Amendment Act 2013",
        rights: ["Right to live with dignity", "Right against domestic violence", "Right to equal pay", "Right against sexual harassment at workplace"],
        authorities_allowed: ["Arrest accused in non-bailable offences", "Provide immediate protection orders"],
        authorities_not_allowed: ["Arrest a woman after sunset and before sunrise without a female officer and magistrate's permission"],
        scenario: "A woman is being harassed by her husband and in-laws for dowry.",
        explanation: "This is a criminal offence under Section 498A of IPC and the Dowry Prohibition Act.",
        todo: "Contact the nearest police station or call 1091 helpline.",
        not_todo: "Do not suffer in silence; seek legal help immediately."
      },
      hi: {
        about: "भारत में महिलाओं के लिए सुरक्षा, समानता और गरिमा सुनिश्चित करने के लिए विशेष कानूनी प्रावधान।",
        reference: "घरेलू हिंसा अधिनियम 2005, POSH अधिनियम 2013, आपराधिक कानून संशोधन अधिनियम 2013",
        rights: ["गरिमा के साथ जीने का अधिकार", "घरेलू हिंसा के विरुद्ध अधिकार", "समान वेतन का अधिकार", "कार्यस्थल पर यौन उत्पीड़न के विरुद्ध अधिकार"],
        authorities_allowed: ["गैर-जमानती अपराधों में आरोपी को गिरफ्तार करना", "तत्काल सुरक्षा आदेश प्रदान करना"],
        authorities_not_allowed: ["महिला अधिकारी और मजिस्ट्रेट की अनुमति के बिना सूर्यास्त के बाद और सूर्योदय से पहले किसी महिला को गिरफ्तार करना"],
        scenario: "एक महिला को उसके पति और ससुराल वालों द्वारा दहेज के लिए प्रताड़ित किया जा रहा है।",
        explanation: "यह आईपीसी की धारा 498ए और दहेज निषेध अधिनियम के तहत एक आपराधिक अपराध है।",
        todo: "निकटतम पुलिस स्टेशन से संपर्क करें या 1091 हेल्पलाइन पर कॉल करें।",
        not_todo: "खामोशी से न सहें; तुरंत कानूनी मदद लें।"
      },
      kn: {
        about: "ಭಾರತದಲ್ಲಿ ಮಹಿಳೆಯರ ಸುರಕ್ಷತೆ, ಸಮಾನತೆ ಮತ್ತು ಘನತೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ವಿಶೇಷ ಕಾನೂನು ನಿಬಂಧನೆಗಳು.",
        reference: "ಗೃಹ ಹಿಂಸೆ ಕಾಯ್ದೆ 2005, POSH ಕಾಯ್ದೆ 2013, ಕ್ರಿಮಿನಲ್ ಕಾನೂನು ತಿದ್ದುಪಡಿ ಕಾಯ್ದೆ 2013",
        rights: ["ಘನತೆಯಿಂದ ಬದುಕುವ ಹಕ್ಕು", "ಗೃಹ ಹಿಂಸೆಯ ವಿರುದ್ಧ ಹಕ್ಕು", "ಸಮಾನ ವೇತನದ ಹಕ್ಕು", "ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಲೈಂಗಿಕ ಕಿರುಕುಳದ ವಿರುದ್ಧ ಹಕ್ಕು"],
        authorities_allowed: ["ಜಾಮೀನು ರಹಿತ ಅಪರಾಧಗಳಲ್ಲಿ ಆರೋಪಿಯನ್ನು ಬಂಧಿಸುವುದು", "ತಕ್ಷಣದ ರಕ್ಷಣೆ ಆದೇಶಗಳನ್ನು ನೀಡುವುದು"],
        authorities_not_allowed: ["ಮಹಿಳಾ ಅಧಿಕಾರಿ ಮತ್ತು ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಅನುಮತಿಯಿಲ್ಲದೆ ಸೂರ್ಯಾಸ್ತದ ನಂತರ ಮತ್ತು ಸೂರ್ಯೋದಯಕ್ಕೆ ಮೊದಲು ಮಹಿಳೆಯನ್ನು ಬಂಧಿಸುವುದು"],
        scenario: "ವರದಕ್ಷಿಣೆಗಾಗಿ ಮಹಿಳೆಗೆ ಆಕೆಯ ಪತಿ ಮತ್ತು ಅತ್ತೆ-ಮಾವಂದಿರಿಂದ ಕಿರುಕುಳ ನೀಡಲಾಗುತ್ತಿದೆ.",
        explanation: "ಇದು ಐಪಿಸಿಯ ಸೆಕ್ಷನ್ 498A ಮತ್ತು ವರದಕ್ಷಿಣೆ ನಿಷೇಧ ಕಾಯ್ದೆಯಡಿ ಕ್ರಿಮಿನಲ್ ಅಪರಾಧವಾಗಿದೆ.",
        todo: "ಹತ್ತಿರದ ಪೊಲೀಸ್ ಠಾಣೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ 1091 ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.",
        not_todo: "ಮೌನವಾಗಿ ಸಹಿಸಬೇಡಿ; ತಕ್ಷಣ ಕಾನೂನು ನೆರವು ಪಡೆಯಿರಿ."
      },
      mr: {
        about: "भारतातील महिलांसाठी सुरक्षितता, समानता आणि प्रतिष्ठा सुनिश्चित करण्यासाठी विशेष कायदेशीर तरतुदी.",
        reference: "कौटुंबिक हिंसाचार कायदा २००५, POSH कायदा २०१३, फौजदारी कायदा सुधारणा कायदा २०१३",
        rights: ["प्रतिष्ठेने जगण्याचा अधिकार", "कौटुंबिक हिंसाचाराविरुद्ध अधिकार", "समान कामासाठी समान वेतनाचा अधिकार", "कामाच्या ठिकाणी लैंगिक छळाविरुद्ध अधिकार"],
        authorities_allowed: ["अजामीनपात्र गुन्ह्यांमध्ये आरोपीला अटक करणे", "तातडीने संरक्षण आदेश देणे"],
        authorities_not_allowed: ["महिला अधिकारी आणि दंडाधिकार्‍यांच्या परवानगीशिवाय सूर्यास्तानंतर आणि सूर्योदयापूर्वी महिलेला अटक करणे"],
        scenario: "एका महिलेचा हुंड्यासाठी तिचे पती आणि सासरच्या लोकांकडून छळ केला जात आहे.",
        explanation: "हा आयपीसीच्या कलम ४९८ए आणि हुंडा बंदी कायद्यांतर्गत फौजदारी गुन्हा आहे.",
        todo: "जवळच्या पोलीस ठाण्याशी संपर्क साधा किंवा १०९१ हेल्पलाइन नंबरवर कॉल करा.",
        not_todo: "शांतपणे सहन करू नका; ताबडतोब कायदेशीर मदत घ्या."
      }
    }
  },
  {
    id: "consumer-rights",
    category: "consumer",
    title: {
      en: "Consumer Rights & Protection",
      hi: "उपभोक्ता अधिकार और संरक्षण",
      kn: "ಗ್ರಾಹಕ ಹಕ್ಕುಗಳು ಮತ್ತು ರಕ್ಷಣೆ",
      mr: "ग्राहक हक्क आणि संरक्षण"
    },
    content: {
      en: {
        about: "Rights of a consumer to be protected against unfair trade practices and defective goods.",
        reference: "Consumer Protection Act, 2019",
        rights: ["Right to Safety", "Right to be Informed", "Right to Choose", "Right to be Heard", "Right to Redressal"],
        authorities_allowed: ["Penalty on misleading advertisements", "Order recall of dangerous goods"],
        authorities_not_allowed: ["Reject a valid complaint without hearing", "Allow unfair contract terms"],
        scenario: "A consumer bought a refrigerator that stopped working in 2 days, and the company refuses to repair it under warranty.",
        explanation: "This is a 'deficiency in service' and 'unfair trade practice'.",
        todo: "File a complaint in the District Consumer Commission.",
        not_todo: "Do not forget to keep the original bill and warranty card."
      },
      hi: {
        about: "अनुचित व्यापार प्रथाओं और दोषपूर्ण वस्तुओं के विरुद्ध संरक्षित होने का उपभोक्ता का अधिकार।",
        reference: "उपभोक्ता संरक्षण अधिनियम, 2019",
        rights: ["सुरक्षा का अधिकार", "सूचना का अधिकार", "चुनने का अधिकार", "सुने जाने का अधिकार", "निवारण का अधिकार"],
        authorities_allowed: ["भ्रामक विज्ञापनों पर जुर्माना", "खतरनाक वस्तुओं को वापस लेने का आदेश"],
        authorities_not_allowed: ["बिना सुनवाई के वैध शिकायत को खारिज करना", "अनुचित अनुबंध शर्तों की अनुमति देना"],
        scenario: "एक उपभोक्ता ने एक रेफ्रिजरेटर खरीदा जो 2 दिनों में खराब हो गया, और कंपनी वारंटी के तहत इसकी मरम्मत करने से इनकार कर रही है।",
        explanation: "यह 'सेवा में कमी' और 'अनुचित व्यापार व्यवहार' है।",
        todo: "जिला उपभोक्ता आयोग में शिकायत दर्ज करें।",
        not_todo: "मूल बिल और वारंटी कार्ड रखना न भूलें।"
      },
      kn: {
        about: "ಅನ್ಯಾಯದ ವ್ಯಾಪಾರ ಪದ್ಧತಿಗಳು ಮತ್ತು ದೋಷಪೂರಿತ ಸರಕುಗಳ ವಿರುದ್ಧ ರಕ್ಷಿಸಲ್ಪಡುವ ಗ್ರಾಹಕರ ಹಕ್ಕುಗಳು.",
        reference: "ಗ್ರಾಹಕ ರಕ್ಷಣೆ ಕಾಯ್ದೆ, 2019",
        rights: ["ಸುರಕ್ಷತೆಯ ಹಕ್ಕು", "ಮಾಹಿತಿ ಪಡೆಯುವ ಹಕ್ಕು", "ಆಯ್ಕೆ ಮಾಡುವ ಹಕ್ಕು", "ಆಲಿಸುವ ಹಕ್ಕು", "ಪರಿಹಾರ ಪಡೆಯುವ ಹಕ್ಕು"],
        authorities_allowed: ["ದಾರಿ ತಪ್ಪಿಸುವ ಜಾಹೀರಾತುಗಳ ಮೇಲೆ ದಂಡ", "ಅಪಾಯಕಾರಿ ಸರಕುಗಳನ್ನು ಹಿಂಪಡೆಯಲು ಆದೇಶ"],
        authorities_not_allowed: ["ವಿಚಾರಣೆಯಿಲ್ಲದೆ ಮಾನ್ಯ ದೂರನ್ನು ತಿರಸ್ಕರಿಸುವುದು", "ಅನ್ಯಾಯದ ಒಪ್ಪಂದದ ನಿಯಮಗಳನ್ನು ಅನುಮತಿಸುವುದು"],
        scenario: "ಗ್ರಾಹಕರೊಬ್ಬರು ರೆಫ್ರಿಜರೇಟರ್ ಖರೀದಿಸಿದರು, ಅದು 2 ದಿನಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡುವುದನ್ನು ನಿಲ್ಲಿಸಿತು ಮತ್ತು ಕಂಪನಿಯು ವಾರಂಟಿ ಅಡಿಯಲ್ಲಿ ಅದನ್ನು ಸರಿಪಡಿಸಲು ನಿರಾಕರಿಸುತ್ತಿದೆ.",
        explanation: "ಇದು 'ಸೇವೆಯಲ್ಲಿನ ನ್ಯೂನತೆ' ಮತ್ತು 'ಅನ್ಯಾಯದ ವ್ಯಾಪಾರ ಪದ್ಧತಿ' ಆಗಿದೆ.",
        todo: "ಜಿಲ್ಲಾ ಗ್ರಾಹಕ ಆಯೋಗದಲ್ಲಿ ದೂರು ಸಲ್ಲಿಸಿ.",
        not_todo: "ಅಸಲಿ ಬಿಲ್ ಮತ್ತು ವಾರಂಟಿ ಕಾರ್ಡ್ ಇಟ್ಟುಕೊಳ್ಳುವುದನ್ನು ಮರೆಯಬೇಡಿ."
      },
      mr: {
        about: "अनुचित व्यापारी प्रथा आणि सदोष वस्तूंपासून संरक्षण मिळवण्याचा ग्राहकाचा अधिकार.",
        reference: "ग्राहक संरक्षण कायदा, २०१९",
        rights: ["सुरक्षिततेचा अधिकार", "माहिती मिळण्याचा अधिकार", "निवडण्याचा अधिकार", "ऐकले जाण्याचा अधिकार", "निवारण मिळवण्याचा अधिकार"],
        authorities_allowed: ["दिशाभूल करणाऱ्या जाहिरातींवर दंड अकारणे", "धोकादायक वस्तू परत घेण्याचा आदेश देणे"],
        authorities_not_allowed: ["सुनावणीशिवाय वैध तक्रार फेटाळणे", "अनुचित कंत्राट अटींना मान्यता देणे"],
        scenario: "एका ग्राहकाने फ्रीज खरेदी केला जो २ दिवसांत बंद पडला आणि कंपनी वॉरंटी अंतर्गत दुरुस्ती करण्यास नकार देत आहे.",
        explanation: "ही 'सेवेतील त्रुटी' आणि 'अनुचित व्यापारी प्रथा' आहे.",
        todo: "जिल्हा ग्राहक आयोगाकडे तक्रार दाखल करा.",
        not_todo: "मूळ बिल आणि वॉरंटी कार्ड ठेवण्यास विसरू नका."
      }
    }
  },
  {
    id: "education-rights",
    category: "education",
    title: {
      en: "Right to Education (RTE)",
      hi: "शिक्षा का अधिकार (RTE)",
      kn: "ಶಿಕ್ಷಣದ ಹಕ್ಕು (RTE)",
      mr: "शिक्षणाचा अधिकार (RTE)"
    },
    content: {
      en: {
        about: "Free and compulsory education to all children of the age of six to fourteen years.",
        reference: "Article 21-A of the Constitution, RTE Act 2009",
        rights: ["Right to free education in neighborhood school", "Right to not be expelled until completion of elementary education", "25% reservation for weaker sections in private schools"],
        authorities_allowed: ["Monitor school standards", "Ensure enrollment of all children"],
        authorities_not_allowed: ["Charge any kind of capitation fee", "Subject a child to physical punishment or mental harassment"],
        scenario: "A private school refuses admission to a child from a poor family under the 25% quota.",
        explanation: "This is a violation of the RTE Act.",
        todo: "Complain to the local education officer or NCPCR.",
        not_todo: "Do not pay illegal capitation fees."
      },
      hi: {
        about: "छह से चौदह वर्ष की आयु के सभी बच्चों को मुफ्त और अनिवार्य शिक्षा।",
        reference: "संविधान का अनुच्छेद 21-ए, आरटीई अधिनियम 2009",
        rights: ["पड़ोस के स्कूल में मुफ्त शिक्षा का अधिकार", "प्रारंभिक शिक्षा पूरी होने तक निष्कासित न होने का अधिकार", "निजी स्कूलों में कमजोर वर्गों के लिए 25% आरक्षण"],
        authorities_allowed: ["स्कूल मानकों की निगरानी करना", "सभी बच्चों का नामांकन सुनिश्चित करना"],
        authorities_not_allowed: ["किसी भी प्रकार का कैपिटेशन शुल्क लेना", "बच्चे को शारीरिक दंड या मानसिक प्रताड़ना देना"],
        scenario: "एक निजी स्कूल 25% कोटे के तहत एक गरीब परिवार के बच्चे को प्रवेश देने से इनकार करता है।",
        explanation: "यह आरटीई अधिनियम का उल्लंघन है।",
        todo: "स्थानीय शिक्षा अधिकारी या NCPCR को शिकायत करें।",
        not_todo: "अवैध कैपिटेशन शुल्क का भुगतान न करें।"
      },
      kn: {
        about: "ಆರರಿಂದ ಹದಿನಾಲ್ಕು ವರ್ಷ ವಯಸ್ಸಿನ ಎಲ್ಲಾ ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಮತ್ತು ಕಡ್ಡಾಯ ಶಿಕ್ಷಣ.",
        reference: "ಸಂವಿಧಾನದ ವಿಧಿ 21-A, RTE ಕಾಯ್ದೆ 2009",
        rights: ["ನೆರೆಹೊರೆಯ ಶಾಲೆಯಲ್ಲಿ ಉಚಿತ ಶಿಕ್ಷಣದ ಹಕ್ಕು", "ಪ್ರಾಥಮಿಕ ಶಿಕ್ಷಣ ಮುಗಿಯುವವರೆಗೆ ಶಾಲೆಯಿಂದ ಹೊರಹಾಕಲ್ಪಡದಿರುವ ಹಕ್ಕು", "ಖಾಸಗಿ ಶಾಲೆಗಳಲ್ಲಿ ದುರ್ಬಲ ವರ್ಗದವರಿಗೆ 25% ಮೀಸಲಾತಿ"],
        authorities_allowed: ["ಶಾಲಾ ಗುಣಮಟ್ಟವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುವುದು", "ಎಲ್ಲಾ ಮಕ್ಕಳ ದಾಖಲಾತಿಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುವುದು"],
        authorities_not_allowed: ["ಯಾವುದೇ ರೀತಿಯ ಕ್ಯಾಪಿಟೇಶನ್ ಶುಲ್ಕವನ್ನು ವಿಧಿಸುವುದು", "ಮಗುವಿಗೆ ದೈಹಿಕ ಶಿಕ್ಷೆ ಅಥವಾ ಮಾನಸಿಕ ಕಿರುಕುಳ ನೀಡುವುದು"],
        scenario: "ಖಾಸಗಿ ಶಾಲೆಯು 25% ಕೋಟಾದಡಿ ಬಡ ಕುಟುಂಬದ ಮಗುವಿಗೆ ಪ್ರವೇಶ ನೀಡಲು ನಿರಾಕರಿಸುತ್ತದೆ.",
        explanation: "ಇದು RTE ಕಾಯ್ದೆಯ ಉಲ್ಲಂಘನೆಯಾಗಿದೆ.",
        todo: "ಸ್ಥಳೀಯ ಶಿಕ್ಷಣಾಧಿಕಾರಿ ಅಥವಾ NCPCR ಗೆ ದೂರು ನೀಡಿ.",
        not_todo: "ಕಾನೂನುಬಾಹಿರ ಕ್ಯಾಪಿಟೇಶನ್ ಶುಲ್ಕವನ್ನು ಪಾವತಿಸಬೇಡಿ."
      },
      mr: {
        about: "सहा ते चौदा वर्षे वयोगटातील सर्व मुलांना मोफत आणि सक्तीचे शिक्षण.",
        reference: "संविधानाचे कलम २१-अ, आरटीई कायदा २००९",
        rights: ["जवळच्या शाळेत मोफत शिक्षणाचा अधिकार", "प्राथमिक शिक्षण पूर्ण होईपर्यंत शाळेतून काढून न टाकण्याचा अधिकार", "खाजगी शाळांमध्ये दुर्बल घटकांसाठी २५% आरक्षण"],
        authorities_allowed: ["शाळेच्या मानकांचे निरीक्षण करणे", "सर्व मुलांचे नावनोंदणी सुनिश्चित करणे"],
        authorities_not_allowed: ["कोणत्याही प्रकारचे कॅपिटेशन शुल्क आकारणे", "मुलाला शारीरिक शिक्षा किंवा मानसिक त्रासास सामोरे जाणे"],
        scenario: "एक खाजगी शाळा २५% कोट्यांतर्गत गरीब कुटुंबातील मुलाला प्रवेश नाकारते.",
        explanation: "हे आरटीई कायद्याचे उल्लंघन आहे.",
        todo: "स्थानिक शिक्षण अधिकारी किंवा NCPCR कडे तक्रार करा.",
        not_todo: "बेकायदेशीर कॅपिटेशन फी देऊ नका."
      }
    }
  },
  {
    id: "workplace-rights",
    category: "workplace",
    title: {
      en: "Workplace & Employer Rights",
      hi: "कार्यस्थल और नियोक्ता अधिकार",
      kn: "ಕೆಲಸದ ಸ್ಥಳ ಮತ್ತು ಉದ್ಯೋಗದಾತರ ಹಕ್ಕುಗಳು",
      mr: "कामाची जागा आणि मालकांचे अधिकार"
    },
    content: {
      en: {
        about: "Laws governing the relationship between employers and employees to ensure fair treatment.",
        reference: "Minimum Wages Act, Industrial Disputes Act, Maternity Benefit Act",
        rights: ["Right to minimum wages", "Right to safe working conditions", "Right to maternity leave", "Right against arbitrary dismissal"],
        authorities_allowed: ["Inspect workplace safety", "Adjudicate labor disputes"],
        authorities_not_allowed: ["Force employees to work beyond legal hours without overtime", "Discriminate in hiring based on gender"],
        scenario: "An employee is fired without notice or valid reason after 2 years of service.",
        explanation: "This may be an 'illegal retrenchment' under the Industrial Disputes Act.",
        todo: "Approach the Labor Commissioner or Labor Court.",
        not_todo: "Do not sign any forced resignation letters."
      },
      hi: {
        about: "उचित व्यवहार सुनिश्चित करने के लिए नियोक्ताओं और कर्मचारियों के बीच संबंधों को नियंत्रित करने वाले कानून।",
        reference: "न्यूनतम मजदूरी अधिनियम, औद्योगिक विवाद अधिनियम, मातृत्व लाभ अधिनियम",
        rights: ["न्यूनतम मजदूरी का अधिकार", "सुरक्षित कार्य परिस्थितियों का अधिकार", "मातृत्व अवकाश का अधिकार", "मनमानी बर्खास्तगी के विरुद्ध अधिकार"],
        authorities_allowed: ["कार्यस्थल सुरक्षा का निरीक्षण करना", "श्रम विवादों का न्यायनिर्णयन करना"],
        authorities_not_allowed: ["कर्मचारियों को ओवरटाइम के बिना कानूनी घंटों से अधिक काम करने के लिए मजबूर करना", "लिंग के आधार पर भर्ती में भेदभाव करना"],
        scenario: "2 साल की सेवा के बाद बिना किसी नोटिस या वैध कारण के एक कर्मचारी को निकाल दिया जाता है।",
        explanation: "यह औद्योगिक विवाद अधिनियम के तहत 'अवैध छंटनी' हो सकती है।",
        todo: "श्रम आयुक्त या श्रम न्यायालय से संपर्क करें।",
        not_todo: "किसी भी जबरन इस्तीफे पत्र पर हस्ताक्षर न करें।"
      },
      kn: {
        about: "ನ್ಯಾಯಯುತ ನಡವಳಿಕೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಉದ್ಯೋಗದಾತರು ಮತ್ತು ಉದ್ಯೋಗಿಗಳ ನಡುವಿನ ಸಂಬಂಧವನ್ನು ನಿಯಂತ್ರಿಸುವ ಕಾನೂನುಗಳು.",
        reference: "ಕನಿಷ್ಠ ವೇತನ ಕಾಯ್ದೆ, ಕೈಗಾರಿಕಾ ವಿವಾದಗಳ ಕಾಯ್ದೆ, ಮಾತೃತ್ವ ಸೌಲಭ್ಯ ಕಾಯ್ದೆ",
        rights: ["ಕನಿಷ್ಠ ವೇತನದ ಹಕ್ಕು", "ಸುರಕ್ಷಿತ ಕೆಲಸದ ಪರಿಸ್ಥಿತಿಗಳ ಹಕ್ಕು", "ಮಾತೃತ್ವ ರಜೆಯ ಹಕ್ಕು", "ಅನಿಯಂತ್ರಿತ ವಜಾದ ವಿರುದ್ಧ ಹಕ್ಕು"],
        authorities_allowed: ["ಕೆಲಸದ ಸ್ಥಳದ ಸುರಕ್ಷತೆಯನ್ನು ಪರಿಶೀಲಿಸುವುದು", "ಕಾರ್ಮಿಕ ವಿವಾದಗಳನ್ನು ಬಗೆಹರಿಸುವುದು"],
        authorities_not_allowed: ["ಹೆಚ್ಚುವರಿ ವೇತನವಿಲ್ಲದೆ ಕಾನೂನುಬದ್ಧ ಸಮಯಕ್ಕಿಂತ ಹೆಚ್ಚು ಕೆಲಸ ಮಾಡಲು ಉದ್ಯೋಗಿಗಳನ್ನು ಒತ್ತಾಯಿಸುವುದು", "ಲಿಂಗದ ಆಧಾರದ ಮೇಲೆ ನೇಮಕಾತಿಯಲ್ಲಿ ತಾರತಮ್ಯ ಮಾಡುವುದು"],
        scenario: "2 ವರ್ಷಗಳ ಸೇವೆಯ ನಂತರ ಯಾವುದೇ ನೋಟಿಸ್ ಅಥವಾ ಮಾನ್ಯ ಕಾರಣವಿಲ್ಲದೆ ಉದ್ಯೋಗಿಯನ್ನು ಕೆಲಸದಿಂದ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ.",
        explanation: "ಇದು ಕೈಗಾರಿಕಾ ವಿವಾದಗಳ ಕಾಯ್ದೆಯಡಿ 'ಕಾನೂನುಬಾಹಿರ ವಜಾ' ಆಗಿರಬಹುದು.",
        todo: "ಕಾರ್ಮಿಕ ಆಯುಕ್ತರು ಅಥವಾ ಕಾರ್ಮಿಕ ನ್ಯಾಯಾಲಯವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        not_todo: "ಯಾವುದೇ ಬಲವಂತದ ರಾಜೀನಾಮೆ ಪತ್ರಗಳಿಗೆ ಸಹಿ ಹಾಕಬೇಡಿ."
      },
      mr: {
        about: "वाजवी वागणूक सुनिश्चित करण्यासाठी मालक आणि कर्मचारी यांच्यातील संबंधांचे नियमन करणारे कायदे.",
        reference: "किमान वेतन कायदा, औद्योगिक विवाद कायदा, प्रसूती लाभ कायदा",
        rights: ["किमान वेतनाचा अधिकार", "सुरक्षित कामाच्या परिस्थितीचा अधिकार", "प्रसूती रजेचा अधिकार", "मनमानी हकालपट्टीविरुद्ध अधिकार"],
        authorities_allowed: ["कामाच्या ठिकाणी सुरक्षिततेची तपासणी करणे", "कामगार विवादांवर न्यायनिवाडा करणे"],
        authorities_not_allowed: ["कर्मचाऱ्यांना ओव्हरटाइमशिवाय कायदेशीर तासांनंतर काम करण्यास भाग पाडणे", "लिंगाच्या आधारे भरतीमध्ये भेदभाव करणे"],
        scenario: "२ वर्षांच्या सेवेनंतर कोणत्याही नोटीस किंवा वैध कारणाशिवाय कर्मचाऱ्याला कामावरून काढून टाकले जाते.",
        explanation: "हा औद्योगिक विवाद कायद्यांतर्गत 'बेकायदेशीर कपात' असू शकतो.",
        todo: "कामगार आयुक्त किंवा कामगार न्यायालयाशी संपर्क साधा.",
        not_todo: "कोणत्याही सक्तीच्या राजीनामा पत्रावर स्वाक्षरी करू नका."
      }
    }
  },
  {
    id: "traffic-laws",
    category: "traffic",
    title: {
      en: "Traffic Laws & Road Safety",
      hi: "यातायात कानून और सड़क सुरक्षा",
      kn: "ಸಂಚಾರ ಕಾನೂನುಗಳು ಮತ್ತು ರಸ್ತೆ ಸುರಕ್ಷತೆ",
      mr: "वाहतूक कायदे आणि रस्ते सुरक्षा"
    },
    content: {
      en: {
        about: "Rules for safe conduct on roads and penalties for violations.",
        reference: "Motor Vehicles Act, 1988 (Amended 2019)",
        rights: ["Right to be treated politely by traffic police", "Right to ask for identification from the officer", "Right to a receipt for any fine paid"],
        authorities_allowed: ["Seize vehicle for serious offences", "Conduct breathalyzer tests"],
        authorities_not_allowed: ["Take away car keys forcefully", "Abuse or physically assault commuters"],
        scenario: "A traffic policeman asks for a bribe instead of issuing a challan for a red light jump.",
        explanation: "Bribery is a criminal offence under the Prevention of Corruption Act.",
        todo: "Note the officer's name/buckle number and report to the Anti-Corruption Bureau.",
        not_todo: "Do not offer or give bribes."
      },
      hi: {
        about: "सड़कों पर सुरक्षित आचरण के नियम और उल्लंघन के लिए दंड।",
        reference: "मोटर वाहन अधिनियम, 1988 (संशोधित 2019)",
        rights: ["यातायात पुलिस द्वारा विनम्रता से व्यवहार किए जाने का अधिकार", "अधिकारी से पहचान पत्र मांगने का अधिकार", "भुगतान किए गए किसी भी जुर्माने की रसीद का अधिकार"],
        authorities_allowed: ["गंभीर अपराधों के लिए वाहन जब्त करना", "ब्रीथ एनालाइजर टेस्ट करना"],
        authorities_not_allowed: ["जबरन कार की चाबियां छीनना", "यात्रियों के साथ दुर्व्यवहार या शारीरिक हमला करना"],
        scenario: "एक ट्रैफिक पुलिसकर्मी रेड लाइट जंप के लिए चालान काटने के बजाय रिश्वत मांगता है।",
        explanation: "रिश्वतखोरी भ्रष्टाचार निवारण अधिनियम के तहत एक आपराधिक अपराध है।",
        todo: "अधिकारी का नाम/बकल नंबर नोट करें और भ्रष्टाचार निरोधक ब्यूरो को रिपोर्ट करें।",
        not_todo: "रिश्वत न दें और न ही इसकी पेशकश करें।"
      },
      kn: {
        about: "ರಸ್ತೆಗಳಲ್ಲಿ ಸುರಕ್ಷಿತ ನಡವಳಿಕೆಗಾಗಿ ನಿಯಮಗಳು ಮತ್ತು ಉಲ್ಲಂಘನೆಗಳಿಗೆ ದಂಡಗಳು.",
        reference: "ಮೋಟಾರು ವಾಹನಗಳ ಕಾಯ್ದೆ, 1988 (ತಿದ್ದುಪಡಿ 2019)",
        rights: ["ಸಂಚಾರ ಪೊಲೀಸರು ವಿನಯದಿಂದ ವರ್ತಿಸುವ ಹಕ್ಕು", "ಅಧಿಕಾರಿಯಿಂದ ಗುರುತಿನ ಚೀಟಿ ಕೇಳುವ ಹಕ್ಕು", "ಪಾವತಿಸಿದ ಯಾವುದೇ ದಂಡಕ್ಕೆ ರಸೀದಿ ಪಡೆಯುವ ಹಕ್ಕು"],
        authorities_allowed: ["ಗಂಭೀರ ಅಪರಾಧಗಳಿಗಾಗಿ ವಾಹನವನ್ನು ವಶಪಡಿಸಿಕೊಳ್ಳುವುದು", "ಬ್ರೀತ್ ಅನಲೈಸರ್ ಪರೀಕ್ಷೆಗಳನ್ನು ನಡೆಸುವುದು"],
        authorities_not_allowed: ["ಬಲವಂತವಾಗಿ ಕಾರಿನ ಕೀಗಳನ್ನು ಕಸಿದುಕೊಳ್ಳುವುದು", "ಪ್ರಯಾಣಿಕರ ಮೇಲೆ ದೌರ್ಜನ್ಯ ಅಥವಾ ದೈಹಿಕ ಹಲ್ಲೆ ಮಾಡುವುದು"],
        scenario: "ರೆಡ್ ಲೈಟ್ ಜಂಪ್ ಮಾಡಿದ್ದಕ್ಕಾಗಿ ಚಲನ್ ನೀಡುವ ಬದಲು ಸಂಚಾರ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಯೊಬ್ಬರು ಲಂಚ ಕೇಳುತ್ತಾರೆ.",
        explanation: "ಲಂಚ ಪಡೆಯುವುದು ಭ್ರಷ್ಟಾಚಾರ ತಡೆ ಕಾಯ್ದೆಯಡಿ ಕ್ರಿಮಿನಲ್ ಅಪರಾಧವಾಗಿದೆ.",
        todo: "ಅಧಿಕಾರಿಯ ಹೆಸರು/ಬಕಲ್ ಸಂಖ್ಯೆಯನ್ನು ಗಮನಿಸಿ ಮತ್ತು ಭ್ರಷ್ಟಾಚಾರ ವಿರೋಧಿ ದಳಕ್ಕೆ ವರದಿ ಮಾಡಿ.",
        not_todo: "ಲಂಚವನ್ನು ನೀಡಬೇಡಿ ಅಥವಾ ಕೊಡಬೇಡಿ."
      },
      mr: {
        about: "रस्त्यांवर सुरक्षित वर्तनाचे नियम आणि उल्लंघनासाठी दंड.",
        reference: "मोटर वाहन कायदा, १९८८ (सुधारित २०१९)",
        rights: ["वाहतूक पोलिसांकडून सौजन्याने वागणूक मिळण्याचा अधिकार", "अधिकाऱ्याकडे ओळखपत्र मागण्याचा अधिकार", "भरलेल्या कोणत्याही दंडाची पावती मिळण्याचा अधिकार"],
        authorities_allowed: ["गंभीर गुन्ह्यांसाठी वाहन जप्त करणे", "ब्रेथ विश्लेषक चाचण्या घेणे"],
        authorities_not_allowed: ["कारच्या चाव्या जबरदस्तीने काढून घेणे", "प्रवाशांशी गैरवर्तन किंवा शारीरिक हल्ला करणे"],
        scenario: "रेड लाईट जंप केल्याबद्दल चालान काढण्याऐवजी रहदारी पोलीस लाच मागतो.",
        explanation: "भ्रष्टाचार प्रतिबंधक कायद्यांतर्गत लाचखोरी हा फौजदारी गुन्हा आहे.",
        todo: "अधिकाऱ्याचे नाव/बकल नंबर नोट करा आणि लाचलुचपत प्रतिबंधक ब्युरोकडे तक्र रिपोर्ट करा.",
        not_todo: "लाच देऊ नका किंवा देऊ नका."
      }
    }
  },
  {
    id: "rti",
    category: "constitution",
    title: {
      en: "Right to Information (RTI)",
      hi: "सूचना का अधिकार (RTI)",
      kn: "ಮಾಹಿತಿ ಹಕ್ಕು (RTI)",
      mr: "माहितीचा अधिकार (RTI)"
    },
    content: {
      en: {
        about: "The Right to Information Act allows any citizen to request information from a 'public authority' which is required to reply expeditiously or within thirty days.",
        reference: "RTI Act, 2005",
        rights: [
          "Right to inspect work, documents, and records",
          "Right to take notes, extracts or certified copies",
          "Right to obtain information in electronic mode"
        ],
        authorities_allowed: ["Provide information within 30 days", "Transfer application to correct department"],
        authorities_not_allowed: ["Deny information without valid reason", "Charge excessive fees"],
        scenario: "You want to know why a road in your locality hasn't been repaired despite funds being allocated.",
        explanation: "You can file an RTI with the Municipal Corporation to get details of the contract and funds spent.",
        todo: "Be specific in your request for information.",
        not_todo: "Do not ask for information that could compromise national security."
      },
      hi: {
        about: "सूचना का अधिकार अधिनियम किसी भी नागरिक को 'सार्वजनिक प्राधिकरण' से जानकारी मांगने की अनुमति देता है, जिसे शीघ्रता से या तीस दिनों के भीतर जवाब देना आवश्यक है।",
        reference: "RTI अधिनियम, 2005",
        rights: [
          "कार्य, दस्तावेजों और रिकॉर्ड का निरीक्षण करने का अधिकार",
          "नोट्स, उद्धरण या प्रमाणित प्रतियां लेने का अधिकार",
          "इलेक्ट्रॉनिक मोड में जानकारी प्राप्त करने का अधिकार"
        ],
        authorities_allowed: ["30 दिनों के भीतर जानकारी प्रदान करें", "आवेदन को सही विभाग में स्थानांतरित करें"],
        authorities_not_allowed: ["बिना वैध कारण के जानकारी देने से मना करना", "अत्यधिक शुल्क लेना"],
        scenario: "आप जानना चाहते हैं कि फंड आवंटित होने के बावजूद आपके इलाके की सड़क की मरम्मत क्यों नहीं हुई है।",
        explanation: "आप अनुबंध और खर्च किए गए धन का विवरण प्राप्त करने के लिए नगर निगम के पास RTI दायर कर सकते हैं।",
        todo: "जानकारी के लिए अपने अनुरोध में विशिष्ट रहें।",
        not_todo: "ऐसी जानकारी न मांगें जो राष्ट्रीय सुरक्षा से समझौता कर सकती हो।"
      },
      kn: {
        about: "ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯ್ದೆಯು ಯಾವುದೇ ನಾಗರಿಕರಿಗೆ 'ಸಾರ್ವಜನಿಕ ಪ್ರಾಧಿಕಾರ'ದಿಂದ ಮಾಹಿತಿಯನ್ನು ವಿನಂತಿಸಲು ಅನುಮತಿಸುತ್ತದೆ, ಅದು ತ್ವರಿತವಾಗಿ ಅಥವಾ ಮೂವತ್ತು ದಿನಗಳೊಳಗೆ ಉತ್ತರಿಸಬೇಕಾಗುತ್ತದೆ.",
        reference: "ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯ್ದೆ, 2005",
        rights: [
          "ಕೆಲಸ, ದಾಖಲೆಗಳು ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ಹಕ್ಕು",
          "ಟಿಪ್ಪಣಿಗಳು, ಆಯ್ದ ಭಾಗಗಳು ಅಥವಾ ಪ್ರಮಾಣೀಕೃತ ಪ್ರತಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುವ ಹಕ್ಕು",
          "ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಮೋಡ್‌ನಲ್ಲಿ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯುವ ಹಕ್ಕು"
        ],
        authorities_allowed: ["30 ದಿನಗಳೊಳಗೆ ಮಾಹಿತಿ ನೀಡಿ", "ಅರ್ಜಿಯನ್ನು ಸರಿಯಾದ ಇಲಾಖೆಗೆ ವರ್ಗಾಯಿಸಿ"],
        authorities_not_allowed: ["ಸರಿಯಾದ ಕಾರಣವಿಲ್ಲದೆ ಮಾಹಿತಿಯನ್ನು ನಿರಾಕರಿಸುವುದು", "ಹೆಚ್ಚಿನ ಶುಲ್ಕ ವಿಧಿಸುವುದು"],
        scenario: "ನಿಮ್ಮ ಪ್ರದೇಶದ ರಸ್ತೆಗೆ ಹಣ ಮಂಜೂರಾಗಿದ್ದರೂ ಅದು ಏಕೆ ದುರಸ್ತಿಯಾಗಿಲ್ಲ ಎಂದು ನೀವು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ.",
        explanation: "ಗುತ್ತಿಗೆ ಮತ್ತು ಖರ್ಚು ಮಾಡಿದ ಹಣದ ವಿವರಗಳನ್ನು ಪಡೆಯಲು ನೀವು ಮಹಾನಗರ ಪಾಲಿಕೆಗೆ RTI ಸಲ್ಲಿಸಬಹುದು.",
        todo: "ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ವಿನಂತಿಯಲ್ಲಿ ನಿರ್ದಿಷ್ಟವಾಗಿರಿ.",
        not_todo: "ರಾಷ್ಟ್ರೀಯ ಭದ್ರತೆಗೆ ಧಕ್ಕೆ ತರುವ ಮಾಹಿತಿಯನ್ನು ಕೇಳಬೇಡಿ."
      },
      mr: {
        about: "माहितीचा अधिकार कायदा कोणत्याही नागरिकाला 'सार्वजनिक प्राधिकरणाकडे' माहिती मागण्याची परवानगी देतो ज्याला त्वरीत किंवा तीस दिवसांच्या आत उत्तर देणे आवश्यक आहे.",
        reference: "आरटीआय कायदा, २००५",
        rights: ["काम, दस्तऐवज आणि रेकॉर्ड तपासण्याचा अधिकार", "नोट्स, उतारे किंवा प्रमाणित प्रती घेण्याचा अधिकार", "इलेक्ट्रॉनिक मोडमध्ये माहिती मिळवण्याचा अधिकार"],
        authorities_allowed: ["३० दिवसांच्या आत माहिती देणे", "अर्जाचे योग्य विभागात हस्तांतरण करणे"],
        authorities_not_allowed: ["सक्षम कारणाशिवाय माहिती नाकारणे", "अवाजवी शुल्क आकारणे"],
        scenario: "निधी वाटप होऊनही तुमच्या परिसरातील रस्त्याची दुरुस्ती का झाली नाही हे तुम्हाला जाणून घ्यायचे आहे.",
        explanation: "तुम्ही करार आणि खर्च केलेल्या निधीचे तपशील मिळवण्यासाठी महानगरपालिकेकडे आरटीआय दाखल करू शकता.",
        todo: "माहितीसाठी तुमच्या विनंतीमध्ये विशिष्ट राहा.",
        not_todo: "राष्ट्रीय सुरक्षेशी तडजोड करू शकणारी माहिती विचारू नका."
      }
    }
  }
];
