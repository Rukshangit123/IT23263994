const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data from IT23263994.xlsx
const TEST_DATA = {
  positive: [
    {
      tcId: 'Pos_Fun_0001',
      name: 'Simple sentences',
      input: 'mama adha udheeta bath kaevaa',
      expected: 'මම අද උදේට බත් කැවා',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0002',
      name: 'Interrogative (questions) forms',
      input: 'oyaa kavadhdha gedhara ennee?',
      expected: 'ඔයා කවද්ද ගෙදර එන්නේ?',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0003',
      name: 'Negative forms',
      input: 'mama adha kadee yanne naee',
      expected: 'මම අද කඩේ යන්නෙ නෑ',
      category: 'Daily language usage',
      grammar: 'Negation',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0004',
      name: 'Greetings',
      input: 'suba dhavasak oyaata!',
      expected: 'සුබ දවසක් ඔයාට!',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0005',
      name: 'Polite phrasing',
      input: 'karunaakaralaa mee paeththa balanna puLuvandha?',
      expected: 'කරුනාකරලා මේ පැත්ත බලන්න පුළුවන්ද?',
      category: 'Greeting / request / response',
      grammar: 'Imperative (command)',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0006',
      name: 'Frequently used day-to-day expressions',
      input: 'mama yanavaa ',
      expected: 'මම යනවා',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0007',
      name: 'Multi-word expressions and frequent collocations',
      input: 'mata baee',
      expected: 'මට බෑ',
      category: 'Word combination / phrase pattern',
      grammar: 'Negation (negative form)',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0008',
      name: 'Joined vs segmented word variations (Proper spacing)',
      input: 'mama pansal yanavaa',
      expected: 'මම පන්සල් යනවා',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0009',
      name: 'Repeated word expressions used for emphasis',
      input: 'yanavaa yanavaa',
      expected: 'යනවා යනවා',
      category: 'Word combination / phrase pattern',
      grammar: 'Repeated word expression',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0010',
      name: 'Tense variations (Past)',
      input: 'mama iiye raee chithrayak aendhaa',
      expected: 'මම ඊයෙ රෑ චිත්‍රයක් ඇන්දා',
      category: 'Daily language usage',
      grammar: 'Past tense',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0011',
      name: 'Negation patterns',
      input: 'mama eeka dhanne naee',
      expected: 'මම ඒක දන්නෙ නෑ',
      category: 'Daily language usage',
      grammar: 'Negation',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0012',
      name: 'Convert a Plural usage and pronoun variations',
      input: 'lamayi pansal yanavaa',
      expected: 'ලමයි පන්සල් යනවා',
      category: 'Daily language usage',
      grammar: 'Plural form',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0013',
      name: 'Convert a Request forms with varying degrees of politeness',
      input: 'karuNaakara oyaa enna',
      expected: 'කරුණාකර ඔයා එන්න',
      category: 'Greeting / request / response',
      grammar: 'Imperative (command)',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0014',
      name: 'Convert a English technical/brand terms embedded in Singlish',
      input: 'mata email ekak avilla.',
      expected: 'මට email එකක් අවිල්ල.',
      category: 'Mixed Singlish + English',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0015',
      name: 'Convert a sentences containing places and common English words that should remain as they are',
      input: 'magee phone eka charger ekata dhaanna.',
      expected: 'මගේ phone එක charger එකට දාන්න.',
      category: 'Common English words',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0016',
      name: 'Convert a English abbreviations and short forms',
      input: 'mata SMS ekak dhaanna',
      expected: 'මට SMS එකක් දාන්න',
      category: 'Mixed Singlish + English',
      grammar: 'Imperative (command)',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0017',
      name: 'Convert a Inputs containing punctuation marks',
      input: 'oba saemata dhevi pihitayi!',
      expected: 'ඔබ සැමට දෙවි පිහිටයි!',
      category: 'Punctuation',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0018',
      name: 'Convert Currency',
      input: 'Rs. 150 k dhenna',
      expected: 'Rs. 150 ක් දෙන්න',
      category: 'Numbers',
      grammar: 'Imperative (command)',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0019',
      name: 'Convert dates',
      input: 'adha 2025-12-31 venidhaa.',
      expected: 'අද 2025-12-31 වෙනිදා.',
      category: 'Numbers',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0020',
      name: 'Line breaks',
      input: 'mama pansal yanavaa\noyaa enavadha yanna?',
      expected: 'මම පන්සල් යනවා\nඔයා එනවද යන්න?',
      category: 'Formatting line breaks',
      grammar: 'Interrogative (question)',
      length: 'M',
    },
    {
      tcId: 'Pos-Fun_0021',
      name: 'Slang and colloquial phrasing',
      input: 'adoo siraavata, maru neh',
      expected: 'අඩෝ සිරාවට, මරු නෙහ්',
      category: 'Slang informal language',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0022',
      name: 'Units of measures',
      input: 'kadeeta gihin haal 5Kg aragena enna',
      expected: 'කඩේට ගිහින් හාල් 5Kg අරගෙන එන්න',
      category: 'Unit of measurement / daily language usage',
      grammar: 'Imperative (command)',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0023',
      name: 'Pronoun variation',
      input: 'eyaa adha gedhara innee.',
      expected: 'එයා අද ගෙදර ඉන්නේ.',
      category: 'Daily language usage',
      grammar: 'Pronoun variation',
      length: 'S',
    },
    {
      tcId: 'Pos-Fun_0024',
      name: 'Long Input',
      input: 'adha udhee mama banis kanna kiyala hithalaa kadee yanna laesthi unaa. eth ekapaarata mahaa vaessak patan gaththa nisaa mata yanna baeri unaa. gedharatama velaa kadee yanna baeri una eka gana hithalaa mama decide karaa uyaagena kanna.',
      expected: 'අද උදේ මම බනිස් කන්න කියල හිතලා කඩේ යන්න ලැස්ති උනා. එත් එකපාරට මහා වැස්සක් පටන් ගත්ත නිසා මට යන්න බැරි උනා. ගෙදරටම වෙලා කඩේ යන්න බැරි උන එක ගන හිතලා මම decide කරා උයාගෙන කන්න.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M',
    }
  ],
  
  negative: [
    {
      tcId: 'Neg-Fun_0001',
      name: 'Incorrect slang phonetic mapping',
      input: 'supiri macho ',
      expected: 'සුපිරි මචෝ',
      category: 'Slang / informal language',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0002',
      name: 'Multiple line break handling',
      input: 'mama\n\n\n yanavaa',
      expected: 'මම යනවා',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0003',
      name: 'All-caps simple negative',
      input: 'LECTURE EKA ADHA THIYNAWAA',
      expected: 'lecture එක අද තියනවා',
      category: 'Formatting',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0004',
      name: 'Repeated word expressions used for emphasis',
      input: 'baebaebae',
      expected: 'බැ බැ බැ',
      category: 'Typographical error handling',
      grammar: 'Repeated word expression',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0005',
      name: 'Symbol injections',
      input: 'gedh@ra',
      expected: 'ගෙදර',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0006',
      name: 'Currency placement',
      input: 'Rs.500 ',
      expected: 'රු.500',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0007',
      name: 'No sinhala letter for "W"',
      input: 'waedee waeradhunaa',
      expected: 'වැඩේ වැරදුනා',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0008',
      name: 'Random upper/lower case letters',
      input: 'Adha Uba Ohiyee giyaAdha ',
      expected: 'අද උබ ඔහියේ ගියාද ',
      category: 'Formatting',
      grammar: 'Interrogative (question)',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0009',
      name: 'Common english word "set" is not showing',
      input: 'set vunaadha ubalaa ',
      expected: 'set වුනාද උබලා ',
      category: 'Mixed Singlish + English',
      grammar: 'Interrogative (question)',
      length: 'S',
    },
    {
      tcId: 'Neg-Fun_0010',
      name: 'Missing spaces',
      input: 'mamagameeaavaa',
      expected: ' මම ගමේ ආවා',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S',
    }
  ]
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - IT23263994 Test Cases', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });
});