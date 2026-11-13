import { useEffect, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowDownToLine, ArrowRight, ArrowUpRight, BookOpen, FileText, Mail, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
];
const profiles = [
  { label: 'Google Scholar', href: 'https://scholar-google-com.proxy2.cl.msu.edu/citations?user=F0uw94oAAAAJ&hl=en' },
  { label: 'ORCID', href: 'https://orcid.org/0009-0003-7678-5529' },
  { label: 'Trusst Lab', href: 'https://www.trusstlab.com/research-lab' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yvens-rumbold-5994bb50' },
  { label: 'MSU profile', href: 'https://comartsci.msu.edu/our-people/yvens-rumbold' },
];
const openSafe = { target: '_blank', rel: 'noopener noreferrer' };
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const normalizeRoute = (path: string) => path.length > 1 ? path.replace(/\/+$/, '') : '/';

function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const currentRoute = normalizeRoute(location);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }, [location]);
  return <div className="site-wrap">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <div className="site-nav">
        <Link href="/" className="wordmark" data-testid="link-wordmark" aria-label="Yvens Rumbold — About home">
          <span className="wordmark-mark">YR</span><span>Yvens Rumbold</span>
        </Link>
        <button className="mobile-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-items ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map(item => <Link key={item.href} href={item.href} aria-current={currentRoute === item.href ? 'page' : undefined} className="nav-link" data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</Link>)}
        </nav>
      </div>
    </header>
    <main id="main-content">{children}</main>
    <footer className="site-footer">
      <div className="footer-inner"><Link href="/" className="footer-name" data-testid="link-footer-home">Yvens Rumbold</Link><span>Communication scholar · Michigan State University</span><a href="mailto:rumboldy@msu.edu" data-testid="link-footer-email">rumboldy@msu.edu</a></div>
    </footer>
  </div>;
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-hero"><div className="content-width page-intro"><p className="eyebrow">{eyebrow}</p><h1 className="academic-serif">{title}</h1><p className="intro-copy">{description}</p></div></section>;
}

function Home() {
  return <>
    <section className="home-hero">
      <div className="hero-copy reveal">
        <p className="eyebrow">Communication · Digital life · Public health</p>
        <h1 className="academic-serif">How ideas move.<br /><em>How people make sense.</em></h1>
        <p className="hero-lede">I’m Yvens Rumbold, a communication scholar studying how social norms, media, and new ideas shape trust and behavior in digital environments.</p>
        <p className="affiliation">Third-year PhD student in Communication<br />Michigan State University</p>
        <div className="hero-actions"><Link href="/research" className="btn-primary" data-testid="button-home-research">Explore my research <ArrowRight size={17} /></Link><Link href="/cv" className="text-link" data-testid="link-home-cv">View curriculum vitae <ArrowUpRight size={16} /></Link><a href={assetUrl('assets/yvens-rumbold-cv.pdf')} download="Yvens-Rumbold-CV.pdf" className="btn-outline" data-testid="button-download-cv-home"><ArrowDownToLine size={16} /> Download CV</a></div>
      </div>
      <div className="hero-portrait-wrap"><div className="portrait-accent" /><img className="hero-portrait" src={assetUrl('assets/profile-photo.jpg')} alt="Portrait of Yvens Rumbold" width={1024} height={1024} data-testid="img-profile-photo" /><div className="portrait-note"><span>Researcher</span><span>Educator</span><span>Communication</span></div></div>
    </section>
    <section className="about-content content-width">
      <div className="section-heading"><p className="eyebrow">About</p><h2 className="academic-serif">A communication scholar<br />working across contexts.</h2></div>
      <div className="bio-copy">
        <p>I am a PhD student at Michigan State University, where I previously earned my master’s degree as a Fulbright Scholar. My research explores social norms, diffusion of innovations, and media effects in digital environments—how violent, misleading, and morally framed online content shapes trust, audience engagement, and behavioral outcomes, with implications for public health.</p>
        <p>Alongside my academic work, I serve as Executive Director of Policité, a Haiti-based think-and-do tank. I bring extensive local and international communication and development consulting experience. I was Communications Officer at FOKAL from 2013 to 2015 and Development Manager there from 2020 to 2024. At Internews, I served as editor-in-chief after Haiti’s 2010 earthquake and trained journalists after Hurricane Matthew in 2016. I also served as a board member of the Centre de la Francophonie des Amériques.</p>
        <p>I am a Graduate Teaching Assistant in the Department of Communication at Michigan State University.</p>
        <div className="inline-links"><Link href="/research" className="inline-arrow" data-testid="link-about-research">Read about my research <ArrowRight size={16} /></Link><Link href="/teaching" className="inline-arrow" data-testid="link-about-teaching">Teaching <ArrowRight size={16} /></Link></div>
      </div>
    </section>
    <section className="home-profiles content-width" aria-labelledby="home-profiles-heading">
      <p className="eyebrow">Professional profiles</p>
      <h2 className="academic-serif" id="home-profiles-heading">Find me elsewhere.</h2>
      <div className="profile-links home-profile-links">
        {profiles.map((profile, i) => <a href={profile.href} {...openSafe} className="profile-link" key={profile.label} data-testid={`link-home-profile-${i + 1}`}><span>{profile.label}</span><ArrowUpRight size={16} /></a>)}
      </div>
    </section>
    <section className="interest-band">
      <div className="content-width interest-grid"><div><p className="eyebrow">Questions I work with</p><h2 className="academic-serif">Ideas travel.<br />Meaning changes.</h2></div><div className="interest-list">
        {['Social norms', 'Diffusion of innovations', 'Media effects', 'Digital environments', 'Trust, audiences & behavior', 'Public health'].map((item, i) => <div className="interest-item" key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}
      </div></div>
    </section>
    <section className="home-contact content-width"><div><p className="eyebrow">Connect</p><h2 className="academic-serif">Let’s start a conversation.</h2></div><a href="mailto:rumboldy@msu.edu" className="btn-outline" data-testid="link-home-contact"><Mail size={17} /> rumboldy@msu.edu</a></section>
  </>;
}

const reports = [
  <>Policité &amp; Marijàn. (2026). <i>Corruption and gender inequalities: The experience of Haitian women</i> [Report]. Policité; Marijàn. (Contributor)</>,
  <>Internews &amp; Policité. (2024). <i>Assessment of citizens’ needs and understanding of the political system in Haiti.</i> Port-au-Prince. (Contributor)</>,
  <>Internews &amp; Policité. (2022). <i>Rooted in trust 2.0: Information ecosystem assessment.</i> Port-au-Prince. (Coauthored)</>,
  <>Internews. (2020). <i>Port-au-Prince information ecosystem assessment.</i> Internews Network. (Sole author)</>,
  <>Dearing, J. W., Lapinski-Lafaive, M., Shin, S. Y., Hussain, S. A., Rumbold, Y., Osoro, R. A., &amp; Shell, D. (2019). <i>A model for introducing global ideas to the U.S.</i> Unpublished report to the Robert Wood Johnson Foundation.</>,
];
const opeds = [
  { title: 'Échec de la transition en Haïti et nouveaux dilemmes : Retour sur l’accord du 3 avril 2024', date: '2025, December 30', href: 'https://ayibopost.com/echec-de-la-transition-en-haiti-et-nouveaux-dilemmes-retour-sur-laccord-du-3-avril-2024/' },
  { title: 'À quand la fin de la guerre contre la nation ?', date: '2025, March 2', href: 'https://ayibopost.com/opinion-haiti-a-quand-la-fin-de-la-guerre-contre-la-nation/' },
  { title: '7 février 2022 est un affront au 7 février 1986', date: '2022, February 7', href: 'https://ayibopost.com/opinion-7-fevrier-2022-est-un-affront-au-7-fevrier-1986/' },
  { title: 'Black Americans and Haitians: Dreaming the same dream in America', date: '2020, June 15', href: 'https://ayibopost.com/op-ed-black-americans-and-haitians-dreaming-the-same-dream-in-america/' },
];
function PublicationGroup({ title, children }: { title: string; children: ReactNode }) {
  return <section className="pub-group"><h3>{title}</h3><div className="pub-list">{children}</div></section>;
}
function Pub({ children, testid }: { children: ReactNode; testid: string }) { return <article className="pub-item" data-testid={testid}><span className="pub-mark" aria-hidden="true" /><p>{children}</p></article>; }

function Research() {
  return <>
    <PageIntro eyebrow="Research" title="Ideas in motion." description="Are the factors that explain global-to-US diffusion different than those specified in the general diffusion model? My work explores this question through diffusion of innovations, social norms, and media effects." />
    <div className="content-width research-page">
      <section className="research-question"><div className="rq-label"><span>Featured study</span><span>01 / 2022</span></div><h2 className="academic-serif">A Framework for Introducing Global Health Innovations to the US</h2>
        <p className="citation">Shin, S. Y., Lapinski, M. K., Hussain, S. A., Rumbold, Y., Osoro, R., Shell, D., &amp; Dearing, J. W. (2022). “A framework for introducing global health innovations to the US.” <i>Annals of Global Health, 88</i>(1), Article 67.</p>
        <div className="study-links"><a href="https://doi.org/10.5334/aogh.3600" {...openSafe} className="inline-arrow" data-testid="link-featured-doi">View article at DOI <ArrowUpRight size={15} /></a><a href={assetUrl('assets/featured-study.pdf')} {...openSafe} className="inline-arrow" data-testid="link-featured-pdf">Open the paper PDF <ArrowUpRight size={15} /></a></div>
      </section>
      <section className="study-story">
        <div className="study-body">
          <div className="study-block"><p className="eyebrow">The question</p><blockquote>“Are the factors that explain global-to-US diffusion different than those specified in the general diffusion model?”</blockquote></div>
          <div className="study-block"><p className="eyebrow">Why this study</p><p>The study develops a conceptual framework for the successful introduction of global health innovations to US communities. It asks how decision makers can understand, adapt, and implement an innovation developed elsewhere.</p></div>
          <div className="study-block"><p className="eyebrow">How it was done</p><p>Archival research and five selected case studies: Ciclovía (Colombia), ConsejoSano (Mexico), Cardiff Violence Prevention Model (Wales), Swedish Rheumatology Quality Registry (Sweden), and AgeWell Global (South Africa). During 2018, the team conducted 27 semi-structured interviews with 42 interviewees (leaders and stakeholders), followed by thematic analysis.</p></div>
          <div className="study-block"><p className="eyebrow">What emerged</p><p>Six factors were important across the cases: innovation attributes, linking agents, inter-organizational partnerships, scale-up strategies, implementation processes and outcomes in US communities, and policy/social context. Benefit-cost assessment and compatibility were consistently valued. Stigma about foreign origin was not an important barrier in these cases; origin could be positive.</p></div>
        </div>
        <figure className="framework-figure"><img src={assetUrl('assets/featured-figure.jpg')} alt="Designing for Diffusion framework: global ideas move through linking agents and partnerships, guided by scale-up strategies and context, toward U.S. adopting communities. A table lists attributes and implementation considerations." width={1024} height={1024} loading="lazy" data-testid="img-featured-framework" /><a className="figure-open" href={assetUrl('assets/featured-figure.jpg')} {...openSafe} data-testid="link-featured-figure-full-size">Open the figure full size</a><figcaption>Figure 2 Designing for Diffusion (D4D) Framework for Global Health Innovations.</figcaption><p className="plain-language"><strong>In plain language:</strong> moving an idea into a new community takes more than the idea itself. Its attributes, the people and organizations that connect partners, plans for scaling, the way implementation unfolds, and the surrounding policy and social context all work together.</p></figure>
      </section>
      <section className="implication-callout"><p className="eyebrow">Why it matters</p><p>The framework can help public-health decision makers assess, adapt, partner around, implement, and sustain global innovations. These case studies inform a framework; they do not establish causal proof or claim that every innovation will transfer in the same way.</p></section>
      <section className="research-themes" aria-labelledby="research-themes-heading">
        <p className="eyebrow">Research themes</p>
        <h2 className="academic-serif" id="research-themes-heading">Questions that travel across contexts.</h2>
        <div className="research-theme-grid">
          <article className="research-theme"><span>01</span><h3>Global-to-U.S. innovation diffusion</h3><p>Research on how global health innovations are introduced, adapted, and sustained in U.S. communities, including the factors that shape adoption.</p></article>
          <article className="research-theme"><span>02</span><h3>Social norms &amp; digital media</h3><p>Current work examines moral framing, injunctive norms, audience responses, platform incentives, and networked authority across digital media.</p></article>
          <article className="research-theme"><span>03</span><h3>Haitian communication &amp; information ecosystems</h3><p>Applied research and public writing address Haiti’s information environment, citizens’ needs, political communication, and media.</p></article>
        </div>
      </section>
      <section className="publications"><p className="eyebrow">Selected work</p><h2 className="academic-serif">Publications &amp; writing</h2>
        <PublicationGroup title="Peer-reviewed research"><Pub testid="pub-peer-reviewed-d4d">Shin, S. Y., Lapinski, M. K., Hussain, S. A., Rumbold, Y., Osoro, R., Shell, D., &amp; Dearing, J. W. (2022). A framework for introducing global health innovations to the US. <i>Annals of Global Health, 88</i>(1), Article 67. <a href="https://doi.org/10.5334/aogh.3600" {...openSafe} data-testid="link-pub-doi">https://doi.org/10.5334/aogh.3600</a></Pub></PublicationGroup>
        <PublicationGroup title="Theses"><Pub testid="pub-thesis-ma">Rumbold, Y. (2019). <i>Reinvention and adaptation into U.S. communities of five global health innovations</i> [Master’s thesis, Michigan State University]. <a href="https://d.lib.msu.edu/etd/48063/datastream/OBJ/view" {...openSafe} data-testid="link-thesis-ma">View thesis</a></Pub><Pub testid="pub-thesis-ba">Rumbold, Y. (2017). <i>Communication and reconstructive discourse: An analysis of the editorial treatment of the Duvalier case in Le Nouvelliste from 2011 to 2014</i> [Unpublished bachelor’s thesis]. Haiti State University.</Pub></PublicationGroup>
        <PublicationGroup title="Technical reports & policy publications">{reports.map((r, i) => <Pub key={i} testid={`pub-report-${i + 1}`}>{r}</Pub>)}</PublicationGroup>
        <PublicationGroup title="Book & literary contributions"><Pub testid="pub-book-2011">Brutus, F., Rumbold, Y., et al. (2011). <i>Les cent jours de Martelly.</i> Port-au-Prince: C3 Éditions.</Pub><Pub testid="pub-book-2009">Milcé, J. E., Rumbold, Y., et al. (2009). <i>Ancre des dattes.</i> Port-au-Prince: Les éditions Page ailée.</Pub><Pub testid="pub-book-2008">Chehibat, A., Rumbold, Y., et al. (2008). <i>Contes et nouvelles.</i> Charmey, Switzerland: Les Éditions de l’Hèbe.</Pub></PublicationGroup>
        <PublicationGroup title="Public scholarship & op-eds">{opeds.map((item, i) => <Pub key={item.title} testid={`pub-op-ed-${i + 1}`}>Rumbold, Y. ({item.date}). <i>{item.title}.</i> Ayibopost. <a href={item.href} {...openSafe} data-testid={`link-op-ed-${i + 1}`}>Read at Ayibopost</a></Pub>)}<p className="list-note">Complete list of published op-eds: <a href="https://ayibopost.com/author/yvensrumbold/" {...openSafe} data-testid="link-ayibopost-author">Ayibopost author page</a>.</p></PublicationGroup>
        <PublicationGroup title="Selected journalism · French"><Pub testid="pub-journalism-1">Rumbold, Y. (2013, April 27). “Fin du colloque international Aimé Césaire à Dakar.” <i>Le Nouvelliste.</i></Pub><Pub testid="pub-journalism-2">Rumbold, Y. (2013, April 1). “Césaire, l’homme aimé.” <i>Le Nouvelliste.</i></Pub><Pub testid="pub-journalism-3">Rumbold, Y. (2011, March 21). “Haïti en scène au Parc Historique de la Canne-à-Sucre.” <i>Ticket Magazine.</i></Pub></PublicationGroup>
      </section>
      <section className="conference-section"><p className="eyebrow">2026 conference work</p><h2 className="academic-serif">Presentations &amp; submissions</h2><div className="conference-list">
        <article><span>ICA · Cape Town, South Africa</span><h3>Research escalator: Modeling Audience Responses to Moral Disengagement on TikTok: Mechanisms, Frames, and Injunctive Norms</h3><p>76th International Communication Association Conference, 2026.</p></article>
        <article><span>Moral Media Conference · Gainesville, Florida</span><h3>The virality curse: Platform incentives and the amplification of Haitian gangs’ moral justifications on YouTube</h3><p>Poster presented at the 9th Moral Media Conference, 2026.</p></article>
        <article><span>NCA · New Orleans, United States</span><h3>Research Escalator: Movements of Influence: A Network Analysis of Persuasive Messaging and Networked Authority Among Gang-Affiliated Actors on Haitian Social Media</h3><p>112th National Communication Association Convention, 2026. <b>Accepted.</b></p></article>
        <article><span>NCA · New Orleans, United States</span><h3>Research Escalator: Adoption Intentions of NLP Translation Tools: Trust and Patient Satisfaction Among NELP Communities</h3><p>112th National Communication Association Convention, 2026. <b>Awaiting decision.</b></p></article>
      </div></section>
    </div>
  </>;
}

function CV() {
  return <>
    <PageIntro eyebrow="Curriculum vitae" title="A record of the work." description="Research, teaching, and applied communication work across academic and public-interest settings." />
    <div className="content-width cv-page">
      <div className="download-panel"><div><p className="eyebrow">Full curriculum vitae</p><h2 className="academic-serif">Yvens Rumbold</h2><p>Download the PDF, or open it in a new tab if your browser does not display the embedded viewer.</p></div><div className="cv-actions"><a className="btn-primary" href={assetUrl('assets/yvens-rumbold-cv.pdf')} download="Yvens-Rumbold-CV.pdf" data-testid="button-download-cv"><ArrowDownToLine size={17} /> Download CV</a><a className="inline-arrow" href={assetUrl('assets/yvens-rumbold-cv.pdf')} {...openSafe} data-testid="link-open-cv">Open PDF in new tab <ArrowUpRight size={15} /></a></div></div>
      <div className="pdf-frame"><object data={`${assetUrl('assets/yvens-rumbold-cv.pdf')}#view=FitH`} type="application/pdf" aria-label="Embedded Yvens Rumbold curriculum vitae PDF" data-testid="viewer-cv"><p>Your browser cannot display the embedded PDF. <a href={assetUrl('assets/yvens-rumbold-cv.pdf')} {...openSafe} data-testid="link-cv-fallback">Open the CV in a new tab</a> or download it above.</p></object><div className="viewer-fallback">PDF not appearing? <a href={assetUrl('assets/yvens-rumbold-cv.pdf')} {...openSafe} data-testid="link-cv-viewer-fallback">Open CV in a new tab</a>.</div></div>
      <section className="cv-selected"><p className="eyebrow">Selected work at a glance</p><div className="cv-facts"><div><span>2022</span><p>Peer-reviewed article on global health innovation diffusion</p></div><div><span>2020–24</span><p>Development Manager, FOKAL</p></div><div><span>2024–present</span><p>Executive Director, Policité</p></div></div></section>
    </div>
  </>;
}

function Contact() {
  return <>
    <PageIntro eyebrow="Contact" title="Reach out." description="For research, teaching, or professional inquiries, email is the best way to get in touch." />
    <div className="content-width contact-page">
      <section className="contact-primary"><div><p className="eyebrow">Email</p><h2 className="academic-serif">Start with a note.</h2><p>I welcome thoughtful conversations about communication research, public health, and digital environments.</p></div><a href="mailto:rumboldy@msu.edu" className="email-card" data-testid="link-contact-email"><span><Mail size={19} /></span><span>rumboldy@msu.edu</span><ArrowUpRight size={17} /></a></section>
      <section className="contact-affiliation"><p className="eyebrow">Affiliation</p><h2>Department of Communication</h2><p>College of Communication Arts and Sciences<br />Michigan State University</p><p>Third-year PhD student · Graduate Teaching Assistant</p></section>
      <section className="profile-section"><p className="eyebrow">Elsewhere</p><h2 className="academic-serif">Professional profiles</h2><div className="profile-links">{profiles.map((p, i) => <a href={p.href} {...openSafe} className="profile-link" key={p.label} data-testid={`link-profile-${i + 1}`}><span>{p.label}</span><ArrowUpRight size={16} /></a>)}</div></section>
    </div>
  </>;
}

const courses = [
  { type: 'Instructor of Record', title: 'Leadership & Group Communication', code: 'COM 340', term: 'Summer 2026' },
  { type: 'Instructor of Record', title: 'Communication Campaign Design & Analysis', code: 'COM 475', term: 'Spring 2026' },
  { type: 'Instructor of Record', title: 'Introduction to Organizational Communication', code: 'COM 240', term: 'Fall 2025' },
  { type: 'Lead Instructor', title: 'Human Communication', code: 'COM 100', term: 'Summer 2025' },
  { type: 'Teaching Assistant', title: 'Human Communication', code: 'COM 100', term: '2024–2025' },
];
function Teaching() {
  return <>
    <PageIntro eyebrow="Teaching" title="Teaching communication." description="Course experience in the Department of Communication at Michigan State University." />
    <div className="content-width teaching-page"><div className="teaching-intro"><BookOpen size={24} /><p>Courses taught as Instructor of Record, Lead Instructor, and Teaching Assistant.</p></div><div className="course-list">{courses.map((course, i) => <article className="course-row" key={`${course.code}-${course.term}`} data-testid={`course-${i + 1}`}><div className="course-index">0{i + 1}</div><div className="course-main"><span className="course-role">{course.type}</span><h2 className="academic-serif">{course.title}</h2><p>{course.code} <span className="course-dot">·</span> {course.term}</p></div><span className="course-term">{course.term}</span></article>)}</div></div>
  </>;
}

function NotFound() {
  return <div className="content-width not-found"><p className="eyebrow">404 · Page not found</p><h1 className="academic-serif">This page isn’t here.</h1><p>The address may be outdated, or the page may have moved.</p><Link href="/" className="btn-primary" data-testid="link-not-found-home">Return to About <ArrowRight size={16} /></Link></div>;
}

const metadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'Yvens Rumbold | Communication PhD at Michigan State', description: 'Meet Yvens Rumbold, a PhD student in Communication at Michigan State University. His research explores social norms, innovation diffusion, media, and digital life.' },
  '/research': { title: 'Research on Media & Diffusion | Yvens Rumbold', description: 'Explore Yvens Rumbold’s research on global-to-U.S. diffusion, social norms, media effects, and how content shapes trust, engagement, behavior, and public health.' },
  '/cv': { title: 'Curriculum Vitae | Yvens Rumbold | Michigan State', description: 'Read Yvens Rumbold’s curriculum vitae, including communication research, teaching, publications, policy work, service, and professional experience.' },
  '/contact': { title: 'Contact Yvens Rumbold | Michigan State University', description: 'Contact Yvens Rumbold, Michigan State University PhD student in Communication, or visit his Google Scholar, ORCID, LinkedIn, Trusst Lab, and MSU profiles.' },
  '/teaching': { title: 'Communication Teaching | Yvens Rumbold | MSU', description: 'View Yvens Rumbold’s teaching experience in the Michigan State University Department of Communication, including courses as instructor of record and TA.' },
};
function Router() {
  const [location] = useLocation();
  const currentRoute = normalizeRoute(location);
  useEffect(() => {
    const page = metadata[currentRoute] ?? { title: 'Page not found | Yvens Rumbold', description: 'The requested page could not be found.' };
    document.title = page.title;
    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }
      tag.content = content;
    };
    setMeta('name', 'description', page.description);
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    const siteBase = new URL(import.meta.env.BASE_URL, window.location.origin);
    const pageUrl = new URL(currentRoute === '/' ? '' : currentRoute.replace(/^\/+/, ''), siteBase).href;
    const profileUrl = new URL(assetUrl('assets/profile-photo.jpg'), window.location.origin).href;
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:image', profileUrl);
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', profileUrl);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = pageUrl;
  }, [currentRoute]);
  return <SiteShell><Switch location={currentRoute}><Route path="/" component={Home} /><Route path="/research" component={Research} /><Route path="/cv" component={CV} /><Route path="/contact" component={Contact} /><Route path="/teaching" component={Teaching} /><Route component={NotFound} /></Switch></SiteShell>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>;
}

export default App;
