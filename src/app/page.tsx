import Link from "next/link";
import { ETSY_TRACKED_URL } from "../lib/site";
import IntroTransition from "../components/IntroTransition";

const researchLinks = [
  "https://mygolfspy.com/labs/hot-versus-cold-golf-balls/",
  "https://golfingfocus.com/do-heated-golf-balls-go-further-keep-them-in-the-room/",
  "https://www.nationalclubgolfer.com/equipment/balls/how-does-cold-weather-affect-golf-balls/",
  "https://www.todays-golfer.com/features/equipment-features/winter-golf/cold-golf-balls-test/"
];

const faqs = [
  {
    question: "How do hot balls perform better?",
    answer:
      "Hot balls are proven to perform substantially better than cold balls in winter conditions. Warmed balls maintain ball speed and launch better than freezing balls, helping reduce lost yards."
  },
  {
    question: "What temperature is best for golf balls?",
    answer:
      "Room temperature or warmer is ideal. In cold rounds, keeping balls warm helps preserve compression and feel."
  },
  {
    question: "What is included with Hot Balls?",
    answer:
      "One black insulated golf ball sack plus 2 heat pads for your round, and a bonus set of 2 extra heat pads."
  },
  {
    question: "How many balls does the sack hold?",
    answer: "The warming sack is sized to hold 3 golf balls and 2 disposable heat pads."
  }
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Hot Balls Golf Ball Warming Sack",
  description:
    "Portable and reusable golf ball warming sack that holds 3 golf balls and 2 disposable heat pads to keep golf balls warm during cold weather rounds.",
  brand: {
    "@type": "Brand",
    name: "Hot Balls"
  },
  category: "Sports Accessories",
  url: ETSY_TRACKED_URL,
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Capacity",
      value: "3 golf balls"
    },
    {
      "@type": "PropertyValue",
      name: "Included Heat Pads",
      value: "4 disposable heat pads (2 + 2 bonus)"
    }
  ],
  offers: {
    "@type": "Offer",
    url: ETSY_TRACKED_URL,
    availability: "https://schema.org/InStock",
    priceCurrency: "USD"
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

function EtsyButton({ label }: { label: string }) {
  return (
    <Link
      className="ctaButton"
      href={ETSY_TRACKED_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-etsy-cta="true"
      data-cta-label={label}
    >
      {label}
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <IntroTransition>
        <div className="siteToolbar" id="top">
          <a className="brandLogo" href="#top" aria-label="Hot Balls home">
            <span className="brandLogoTitle">Hot Balls</span>
            <span className="brandLogoSub">Golf Ball Warmer Sack</span>
          </a>
          <nav className="toolbarNav" aria-label="Primary">
            <a href="#how-it-works">How It Works</a>
            <a href="#performance">Performance</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>

        <section className="section" id="how-it-works">
          <h2>How Hot Balls Works</h2>
          <p>
            This insulated sack carries <strong>3 golf balls</strong> with{" "}
            <strong>2 disposable heat pads</strong> so your ball stays at an ideal
            playing temperature during cold rounds.
          </p>
          <div className="cardGrid">
            <article className="card">
              <h3>Portable and Reusable</h3>
              <p>Clip it into your golf routine and carry it all round.</p>
            </article>
            <article className="card">
              <h3>Simple Setup</h3>
              <p>Insert heat pads, load balls, and head to the first tee.</p>
            </article>
            <article className="card">
              <h3>Gift-Ready Golf Accessory</h3>
              <p>
                A strong golf gift idea for players who already own every club
                and gadget.
              </p>
            </article>
          </div>
          <div className="sectionCta">
            <EtsyButton label="Shop Hot Balls on Etsy" />
          </div>
        </section>

        <section className="section sectionDark" id="performance">
          <h2>Why Hot Balls Perform Better</h2>
          <p className="inventorTagline">Invented by Richard TerHaar.</p>
          <ul className="proofList">
            <li>Hot balls are proven to go substantially further than cold balls.</li>
            <li>
              Stop the sting: hitting a freezing ball can feel like hitting a
              rock.
            </li>
            <li>Cold balls launch lower and fly slower than hot balls.</li>
            <li>Room temperature or warmer is the ideal performance range.</li>
          </ul>
          <p className="note">
            Research-backed references:
            {" "}
            {researchLinks.map((link, index) => (
              <span key={link}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Source {index + 1}
                </a>
                {index < researchLinks.length - 1 ? " | " : ""}
              </span>
            ))}
          </p>
          <div className="sectionCta">
            <EtsyButton label="See Reviews on Etsy" />
          </div>
        </section>

        <section className="section" id="included">
          <h2>What&apos;s Included</h2>
          <div className="includedPanel">
            <p>One black insulated golf ball warming sack</p>
            <p>2 heat pads for warming up to 3 golf balls</p>
            <p>Bonus set of 2 extra heat pads for your next cold round</p>
          </div>
          <div className="sectionCta">
            <EtsyButton label="Grab Yours on Etsy" />
          </div>
        </section>

        <section className="section" id="faq">
          <h2>FAQ</h2>
          <div className="faqWrap">
            {faqs.map((faq) => (
              <details key={faq.question} className="faqItem">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="finalCta">
          <h2>Cold Rounds Don&apos;t Have to Cost You Distance</h2>
          <p>Upgrade your winter golf setup with Hot Balls today.</p>
          <EtsyButton label="Buy Hot Balls on Etsy" />
        </section>

        <section className="specialRequestBox" id="contact">
          <h2>Special Requests</h2>
          <p>
            Need a custom request, bulk order, or gift-specific detail? Reach out
            directly and we&apos;ll help.
          </p>
          <a className="ctaButton" href="mailto:Kristy@KristyTerHaar.com">
            Contact Us
          </a>
        </section>

        <footer className="siteFooter">© 2026 Hot Balls</footer>
      </IntroTransition>
    </main>
  );
}
