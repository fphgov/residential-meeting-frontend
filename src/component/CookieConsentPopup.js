import { useEffect } from 'react'
import 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import { init, push } from '@socialgouv/matomo-next'
import getConfig from 'next/config'

function CookieConsentPopup({ domain }) {
  const { publicRuntimeConfig } = getConfig()

  useEffect(() => {
    if (!document.getElementById('cc--main')) {
      const cc = window.initCookieConsent()

      cc.run({
        autorun: true,
        current_lang: 'hu',
        autoclear_cookies: true,
        page_scripts: true,

        onAccept: function (){
          if (cc.allowedCategory('analytics')) {
            init({
              url: publicRuntimeConfig.matomoUrl,
              siteId: publicRuntimeConfig.matomoSiteId
            })
            push['requiredConsent']
            push['setConsentGiven']
          }

          if (cc.allowedCategory('marketing')) {
            push['requiredConsent']
            push['setConsentGiven']
          }
        },

        onChange: function (){
          if (cc.allowedCategory('analytics') === false) {
            push['forgetConsentGiven']

            cc.eraseCookies(['_pk_ses.2.782e', '_pk_id.2.782e'])
          }

          if (cc.allowedCategory('marketing') === false) {
            push['forgetConsetGiven']
            cc.eraseCookies(['_fbp'])
          }
        },

        languages: {
          'hu': {
            consent_modal: {
              title: 'Tisztelt Látogatónk!',
              description: `
              <p><b>Adatainak védelme fontos számunkra.</b></p>
              <p>Az alábbi tájékoztatás a ${domain} weboldalon alkalmazott sütikről szól.</p>
              <p>A weboldalon használt alapvető sütik a weboldal megfelelő működését biztosítják, ahhoz elengedhetetlenek.</p>
              <p>Ezen kívül a felhasználói élmény javításához szükséges sütiket <span class="cc_bold">csak az ön hozzájárulása esetén állítjuk be</span>. Ezen hozzájáruláshoz kötött sütik vonatkozásában az alábbi választási lehetőségekkel élhet:</p>

              <p><span class="cc_bold">ELUTASÍTOM MINDET</span> - a felhasználói élmény javításához szükséges sütik alkalmazását nem engedélyezi.</p>
              <p><span class="cc_bold">ELFOGADOM MINDET</span> - hozzájárulását adja a felhasználói élmény javításához szükséges sütik alkalmazásához.</p>
              <p><span class="cc_bold">VÁLASZTOK A SÜTIKATEGÓRIÁK KÖZÜL</span> - kiválaszthatja mely sütik alkalmazásához adja hozzájárulását. Választását az alábbi linkre kattinva adhatja meg.</p>

              <p>A hozzájáruláshoz kötött sütik használatának elfogadásával Ön kijelenti, hogy az <a href="${publicRuntimeConfig.publicHost}/files/adatkezelesi_tajekoztato.pdf" target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatóban</a> foglaltakat megismerte, és az ott írtakat tudomásul véve hozzájárul az adott cookie-k használatával járó adatkezeléshez.</p>
                <button type="button" data-cc="c-settings" class="cc-link">Választok a sütik közül</button>`,
              primary_btn: {
                text: 'Elfogadom mindet',
                role: 'accept_all'
              },
              secondary_btn: {
                text: 'Elutasítom mindet',
                role: 'accept_necessary'
              }
            },
            settings_modal: {
              title: 'Süti tájékoztatás',
              save_settings_btn: 'Beállítások mentése',
              accept_all_btn: 'Elfogadom mindet',
              reject_all_btn: 'Elutasítom mindet',
              close_btn_label: 'Bezárás',
              cookie_table_headers: [
                { col1: 'Név' },
                { col2: 'Felhasználás, kezelt adatok köre' },
                { col3: 'Domain' },
                { col4: 'Lejárati idő' },
                { col5: 'Típus' }
              ],
              blocks: [
                {
                  title: 'Sütik kezelése',
                  description: `<p>Tisztelt Látogatónk!</p>
                  <p><b>Adatainak védelme fontos számunkra.</b></p>
                  <p>Az alábbi tájékoztatás a ${domain} weboldalon alkalmazott sütikről szól.</p>
                  <p>A weboldalon használt alapvető sütik a weboldal megfelelő működését biztosítják, ahhoz elengedhetetlenek.</p>
                  <p>Ezen kívül a felhasználói élmény javításához szükséges sütiket <span class="cc_bold">csak az ön hozzájárulása esetén állítjuk be</span>. Ezen hozzájáruláshoz kötött sütik vonatkozásában az alábbi választási lehetőségekkel élhet:</p>

                  <p><span class="cc_bold">ELUTASÍTOM MINDET</span> - a felhasználói élmény javításához szükséges sütik alkalmazását nem engedélyezi.</p>
                  <p><span class="cc_bold">ELFOGADOM MINDET</span> - hozzájárulását adja a felhasználói élmény javításához szükséges sütik alkalmazásához.</p>
                  <p><span class="cc_bold">VÁLASZTOK A SÜTIKATEGÓRIÁK KÖZÜL</span> - az alábbi választási lehetőségek közül választva eldöntheti, hogy mely sütik alkalmazásához adja hozzájárulását.</p>

                  <p>A hozzájáruláshoz kötött sütik használatának elfogadásával Ön kijelenti, hogy az <a href="${publicRuntimeConfig.publicHost}/files/adatkezelesi_tajekoztato.pdf" target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatóban</a> foglaltakat megismerte, és az ott írtakat tudomásul véve hozzájárul az adott cookie-k használatával járó adatkezeléshez.</p>
                  <p><span class="cc_bold">Mi az a süti?</span><br />
                  A felhasználók számítógépére mentett kis fájl, amely megkönnyíti a meglátogatott webhelyeken alkalmazott beállítások és egyéb információk tárolását. A süti általában tartalmazza annak a webhelynek a nevét, ahonnan érkezett, a süti értékét, azaz egy véletlenszerűen generált egyedi számot, valamint a süti élettartamát, vagyis hogy mennyi ideig tárolódik az eszközön. A süti a felhasználó eszközének háttértárjában egy fájlban tárolódik.</p>
                  <p><span class="cc_bold">Milyen sütiket és mire használunk?</span><br>
                  A weboldal működéséhez <span class="cc_highlight">elengedhetetlenül szükséges sütik</span>, amelyek elhelyezéséhez nincs szükség a felhasználó hozzájárulására.<br>
                  <span class="cc_highlight">Előzetes felhasználói hozzájárulást igénylő sütik</span>, amelyek a felhasználói élmény javításához, vagy a kommunikációs tevékenység optimalizálása érdekében szükségesek. Amennyiben a felhasználó nem járul hozzá ezen sütik elhelyezéséhez, úgy elfogadja, hogy hozzájárulásának hiányában a honlap működése nem minden tekintetben lesz szándékainknak megfelelően biztosított. A felhasználóknak azonban a későbbiekben lehetőségük van bármikor a hozzájárulást igénylő sütik elhelyezésére vonatkozó korábbi döntésük megváltoztatására. Hozzájárulását a láblécen folyamatosan elérhető “Sütibeállítások” menüpontban később is megadhatja.<br>
                  <p><span class="cc_bold">Elsődleges süti</span><br>
                  Az elsődleges sütiket az ${domain} oldal helyezi el a felhasználó eszközén annak érdekében, hogy a weboldal használatához kapcsolódó információkat tárolja benne.</p>
                  <p><span class="cc_bold">Harmadik féltől származó sütik</span><br>
                  A harmadik féltől származó sütiket más webhelyek hozzák létre és helyezik el a felhasználó eszközén, amelynek segítségével információkat szerezhetnek a felhasználó által meglátogatott weboldalon végzett böngészésekről. Ez esetben a sütiben tárolt és a süti által közvetített információkhoz a sütit elhelyező harmadik fél fér csak hozzá.
                  </p>
                  <p><span class="cc_bold">Hogyan tudja törölni a sütiket?</span><br>
                  A sütik kezelésével kapcsolatos beállításait bármikor megváltoztathatja. Amennyiben az ${domain} oldal látogatása során az <span class="cc_bold">ELFOGADOM MINDET</span> vagy a <span class="cc_bold">VÁLASZTOK A SÜTIKATEGÓRIÁK KÖZÜL</span> gombra kattintva elfogadta a sütik alkalmazását és ezen változtatni szeretne azt egyszerűen a böngészőjében a böngészési előzmények törlésével teheti meg.<br>
                  A leggyakoribb böngészőkben (Chrome, Edge, Safari, Firefox, Internet Explorer) ezt az alábbiak szerint tudja megtenni:</p>
                  <p>- <a href="https://support.google.com/accounts/answer/61416?hl=hu" target="_blank">Google Chrome</a><br>
                  -	<a href="https://support.microsoft.com/hu-hu/windows/a-microsoft-edge-a-b%C3%B6ng%C3%A9sz%C3%A9si-adatok-%C3%A9s-az-adatv%C3%A9delem-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank">Microsoft Edge</a><br>
                  -	<a href="https://support.apple.com/hu-hu/guide/safari/sfri11471/mac" target="_blank">Safari</a><br>
                  -	<a href="https://support.mozilla.org/hu/kb/sutik-informacio-amelyet-weboldalak-tarolnak-szami" target="_blank">Firefox</a><br>
                  -	<a href="https://support.microsoft.com/hu-hu/windows/cookie-k-t%C3%B6rl%C3%A9se-%C3%A9s-kezel%C3%A9se-168dab11-0753-043d-7c16-ede5947fc64d#ie=ie-11" target="_blank">Internet Explorer</a></p>
                  </p>`
                }, {
                  title: 'A weboldal működéséhez elengedhetetlenül szükséges sütik',
                  description: 'Olyan sütik, amelyek a weboldal technikai működőképességéhez elengedhetetlenül szükségesek, vagy amelyek az ön által igényelt szolgáltatást nyújtják. A honlap ezen sütik nélkül nem tud megfelelően működni, így ezek elhelyezéséhez nincs szükség a felhasználó beleegyezésére. Például a sütik engedélyezésével kapcsolatban megtett felhasználói beállítások megjegyzése.',
                  toggle: {
                    value: 'necessary',
                    enabled: true,
                    readonly: true
                  },
                  cookie_table: [
                    {
                      col1: 'cc_cookie',
                      col2: 'A cookie beállításra kerül amikor a felhasználó elfogadja a cookie-k használatát. Kezelt adatok köre: Felhasználó sütibeállításainak tárolása',
                      col3: `.${domain}`,
                      col4: '6 hónap',
                      col5: 'HTTP'
                    },
                    {
                      col1: 'cookiesession1',
                      col2: 'Az oldal védelmére szolgáló tűzfal által létrehozott cookie.<br><br>Kezelt adatok köre: A munkamenet-cookie lehetővé teszi a böngésző számára, hogy újra azonosítsa magát azon egyetlen, egyedi szerveren, amelyre az ügyfél korábban hitelesített.',
                      col3: `.${domain}`,
                      col4: 'Munkamenet (kilépés után)',
                      col5: 'HTTP'
                    },
                    {
                      col1: '_GRECAPTCHA',
                      col2: `<p>Az oldal Google reCAPTCHA szolgáltatást használ abból a célból, felmérje, felhasználó használja az oldalt és nem robot vagy szoftver.</p><p>A Google reCAPTCHA szolgáltatása mesterséges intelligenciát használ a robotok kiszűrésére, ezzel segít megkülönböztetni a valós látogatókat a robotoktól az oldalon. A szolgáltatás az elemzéshez több információt együttesen értékel (pl. a felhasználó IP-címét, oldalon eltöltött idő, kurzor-/egérmozgásokat). A rendszer az elemzés során összegyűjtött adatokat a Google számára továbbítja.</p><p>A Google reCAPTCHA-val és Google adatvédelmi politikájával kapcsolatban további információkat itt érhetsz el: <a href="https://www.google.com/intl/de/policies/privacy" target="_blank">https://www.google.com/intl/de/policies/privacy</a> és <a href="https://www.google.com/recaptcha/intro" target="_blank">https://www.google.com/recaptcha/intro</a></p>`,
                      col3: `www.recaptcha.net`,
                      col4: '6 hónap',
                      col5: 'HTTP'
                    },
                  ]
                }, {
                  title: 'A weboldal teljesítményének elemzését szolgáló statisztikai sütik',
                  description: `
                                <p>Olyan sütik, amelyek a weboldal teljesítményének elemzését szolgálják. Ezek arról adnak tájékoztatást, hogy hány felhasználó, mikor, milyen időtartamban, a weboldalunk mely részét látogatta. Ezek az adatok abban segítenek nekünk, hogy a látogatók igényeinek megfelelően fejlesszük a weboldalunkat. A látogatói statisztikai méréseket a Főpolgármesteri Hivatal maga végzi. A látogatói statisztikai méréseket a Budapest Főváros Főpolgármesteri Hivatal (elérhetősége: 1052 Budapest, Városház utca 9-11., web: <a href="http://budapest.hu/Lapok/default.aspx" target="_blank">www.budapest.hu</a>) a saját maga által üzemeltett Matomo Analytics nevű szoftver segítségével végzi. <span class="bb_class">Ezeket a sütiket <span class="cc_underline">csak felhasználó hozzájárulása esetén állítjuk be</span></span>.</p>
                                <p>A Matomo Analyticsről részletesebben itt olvashat:</p>
                                <a href="https://matomo.org/faq/general/faq_146/" target="_blank">https://matomo.org/faq/general/faq_146/</a>
                                `,
                  toggle: {
                    value: 'analytics',
                    enabled: false,
                    readonly: false
                  },
                  cookie_table: [
                    {
                      col1: '_pk_id',
                      col2: 'Matomo Analytics  cookie-k melyek segítenek adatokat gyűjteni arról, hogy a látogató milyen módon használja a webhelye Kezelt adatok köre: Felhasználói egyedi azonosító a felhasználók egymástól való megkülönböztetésére, de nem azonosítására.',
                      col3: domain,
                      col4: '13 hónap',
                      col5: 'HTTP'
                    },
                    {
                      col1: '_pk_ses,<br>_pk_cvar,<br>_pk_hsr',
                      col2: 'Matomo Analytics  cookie-k melyek segítenek adatokat gyűjteni arról, hogy a látogató milyen módon használja a webhelyet. Kezelt adatok köre: Felhasználó munkamenetazonosító',
                      col3: domain,
                      col4: '30 perc',
                      col5: 'HTTP'
                    },
                    {
                      col1: '_pk_ref',
                      col2: 'Matomo Analytics  cookie-k melyek segítenek adatokat gyűjteni arról, hogy a látogató milyen módon használja a webhelyet. Kezelt adatok köre: Munkamenetek összekapcsolása',
                      col3: domain,
                      col4: '6 hónap',
                      col5: 'HTTP'
                    },
                    {
                      col1: '_pk_testcookie',
                      col2: 'Matomo Analytics süti létrehozhatóság tesztelésére szolgál.',
                      col3: domain,
                      col4: 'Azonnal',
                      col5: 'HTTP'
                    }
                  ]
                },
              ]
            }
          },
        }
      })
    }
  }, [])

  return null
}

export default CookieConsentPopup
