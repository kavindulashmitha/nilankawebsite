import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../assets/css/style.css'
import teacherImage from '../assets/images/the.jpeg'
import classroomImage from '../assets/images/hero-2.jpeg'
import studentsImage from '../assets/images/hero-3.jpeg'
import lessonImage from '../assets/images/hero-4.jpeg'
import brandLogo from '../assets/images/logo.jpeg'

const STORAGE_KEY = 'beyond-tradition-admin-content-v1'
const ADMIN_CREDENTIAL_KEY = 'beyond-tradition-admin-credential-v1'
const ADMIN_SESSION_KEY = 'beyond-tradition-admin-session-v1'

const defaultSiteContent = {
  navItems: [
    { to: '/', label: 'Home' },
    { to: '/classes', label: 'Classes' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/events', label: 'Events' },
    { to: '/materials', label: 'Materials' },
    { to: '/about', label: 'About Me' },
    { to: '/contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Beyond Tradition',
    headline: 'Learn English with clarity & confidence',
    description: 'Professional English classes for Grades 6–11, plus certificate pathways for After Scholarship and After A/L students.',
    primaryCta: 'Explore Classes →',
    secondaryCta: 'Enrol Now',
  },
  classesPage: {
    eyebrow: 'Classes',
    title: 'English classes for Grades 6–11',
    description: 'Clear schedules, practical learning and a supportive path from school English to confident communication.',
    scheduleEyebrow: 'Class Schedule',
    scheduleTitle: 'Weekly timetable',
    scheduleDescription: 'Contact us for the latest venue and availability before enrolment.',
  },
  heroSlides: [
    { src: teacherImage, alt: 'Nilanka Ramayake at graduation', duration: 3000, portrait: true },
    { src: classroomImage, alt: 'Students working in class', duration: 3000 },
    { src: studentsImage, alt: 'Full classroom of students learning', duration: 3000 },
    { src: lessonImage, alt: 'Teacher explaining a lesson at the whiteboard', duration: 3000 },
  ],
  courseCards: [
    { title: 'Junior English Programme', tag: 'Grades 6–8', image: classroomImage, text: 'Strong foundations in grammar, vocabulary, reading and confident classroom speaking.', venue: 'Sisiji - Akuressa & The First - Horagoda' },
    { title: 'O/L English Programme', tag: 'Grades 9–11', image: lessonImage, text: 'Exam-focused teaching with writing, comprehension and speaking practice for O/L success.', venue: 'Sisiji- Akuressa & The First- Horagoda' },
    { title: 'After A/L English Course', tag: 'Certificate', image: studentsImage, text: 'Communication, academic writing and professional English for students moving beyond school.', venue: 'Igenra - Akuressa & Sipara - Morawaka' },
  ],
  stats: [
    { value: '1000', suffix: '+', label: 'Students Taught' },
    { value: '10', suffix: '+', label: 'Years Experience' },
    { value: '6', suffix: '', label: 'Grade Levels' },
    { value: '1000', suffix: '+', label: 'Student Satisfaction' },
  ],
  reasons: [
    { icon: '🎯', title: 'Focused Teaching', copy: 'Lessons built around each grade\'s real syllabus needs.' },
    { icon: '💬', title: 'Practical Speaking', copy: 'Confidence-building practice, not just textbook theory.' },
    { icon: '📝', title: 'Exam Support', copy: 'Targeted writing, comprehension and revision strategies.' },
    { icon: '🌱', title: 'Independent Growth', copy: 'Habits that help students keep learning on their own.' },
  ],
  testimonials: [
    { name: 'Sanduni Perera', label: 'Parent – Grade 9', quote: 'The classes completely changed how my daughter approaches English. She\'s now confident speaking in front of her class.' },
    { name: 'Kavindu Fernando', label: 'Student – Grade 11', quote: 'The essay workshops were a game changer. I finally understood how to plan and structure my writing for exams.' },
  ],
  materialGroups: [
    { title: 'Grade 6', folder: 'grade6', description: 'Practice material and revision support.' },
    { title: 'Grade 7', folder: 'grade7', description: 'Practice material and revision support.' },
    { title: 'Grade 8', folder: 'grade8', description: 'Practice material and revision support.' },
    { title: 'Grade 9', folder: 'grade9', description: 'Practice material and revision support.' },
    { title: 'Grade 10', folder: 'grade10', description: 'Practice material and revision support.' },
    { title: 'Grade 11', folder: 'grade11', description: 'Practice material and revision support.' },
  ],
  eventCards: [
    { category: 'essay', title: 'Essay Writing Workshop', status: 'Upcoming', date: '[Date] · [Time] · [Venue]', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80', alt: 'Essay writing workshop', text: 'Learn how to understand a topic, plan ideas, structure paragraphs and develop a clear English essay.' },
    { category: 'essay', title: 'Exam Essay Practice Session', status: 'Past', date: '[Date] · [Time] · [Venue]', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80', alt: 'Exam essay session', text: 'A focused practice session with guided feedback and exam-oriented writing strategies.' },
    { category: 'third', title: '[Event Title]', status: 'Upcoming', date: '[Date] · [Time] · [Venue]', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', alt: 'Students at an event', text: '[Replace with a short event description.]' },
    { category: 'other', title: '[Other Event]', status: 'Upcoming', date: '[Date] · [Time] · [Venue]', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80', alt: 'Students attending a class', text: '[Replace with a short event description.]' },
  ],
  classSchedules: [
    { grade: 'Grade 6', venue: 'Sisija, Akuressa', days: '[Day]', time: '[Time]' },
    { grade: 'Grade 7', venue: 'Sisija, Akuressa', days: '[Day]', time: '[Time]' },
    { grade: 'Grade 8', venue: 'Sisija, Akuressa', days: '[Day]', time: '[Time]' },
    { grade: 'Grade 9', venue: 'The First, Horagoda', days: '[Day]', time: '[Time]' },
    { grade: 'Grade 10', venue: 'The First, Horagoda', days: '[Day]', time: '[Time]' },
    { grade: 'Grade 11', venue: 'The First, Horagoda', days: '[Day]', time: '[Time]' },
  ],
  scheduleGroups: [
    {
      venue: 'Sisiji, Akuressa',
      items: [
        { grade: 'Grade 6', day: 'Monday & Wednesday', time: '5:00 PM – 6:00 PM', focus: 'Foundation writing and reading' },
        { grade: 'Grade 7', day: 'Tuesday & Thursday', time: '5:00 PM – 6:00 PM', focus: 'Grammar, vocabulary and speaking' },
        { grade: 'Grade 8', day: 'Monday & Friday', time: '5:30 PM – 6:30 PM', focus: 'Exam preparation and confidence building' },
        { grade: 'Grade 9', day: 'Monday & Wednesday', time: '5:00 PM – 6:00 PM', focus: 'Foundation writing and reading' },
        { grade: 'Grade 10', day: 'Tuesday & Thursday', time: '5:00 PM – 6:00 PM', focus: 'Grammar, vocabulary and speaking' },
        { grade: 'Grade 11', day: 'Monday & Friday', time: '5:30 PM – 6:30 PM', focus: 'Exam preparation and confidence building' },
      ],
    },
    {
      venue: 'The First, Horagoda',
      items: [
        { grade: 'Grade 6', day: 'Monday & Wednesday', time: '5:00 PM – 6:00 PM', focus: 'Foundation writing and reading' },
        { grade: 'Grade 7', day: 'Tuesday & Thursday', time: '5:00 PM – 6:00 PM', focus: 'Grammar, vocabulary and speaking' },
        { grade: 'Grade 8', day: 'Monday & Friday', time: '5:30 PM – 6:30 PM', focus: 'Exam preparation and confidence building' },
        { grade: 'Grade 9', day: 'Monday & Wednesday', time: '4:30 PM – 5:45 PM', focus: 'O/L English fundamentals' },
        { grade: 'Grade 10', day: 'Tuesday & Thursday', time: '4:30 PM – 5:45 PM', focus: 'Writing and comprehension support' },
        { grade: 'Grade 11', day: 'Saturday', time: '9:30 AM – 11:00 AM', focus: 'Final revision and paper practice' },
      ],
    },
    {
      venue: 'After A/L English Course',
      items: [
        { grade: 'Advanced Programme', day: 'Saturday & Sunday', time: '9:30 AM – 11:00 AM', focus: 'Academic English, presentations and interview skills' },
      ],
    },
  ],
  contact: {
    phone: '+94 71 149 3335',
    whatsapp: '+94 71 149 3335',
    email: 'hello@example.com',
    hours: 'Mon–Sat: 8.00am – 7.00pm',
    address: '[Class / Office Address]',
    facebook: '#',
    instagram: '#',
    youtube: '#',
  },
  footer: {
    description: 'Beyond Tradition — a fresh, thoughtful approach to English learning. Professional teaching for students ready to communicate with confidence.',
    quickLinksTitle: 'Quick Links',
    quickLinks: [
      { label: 'Home', to: '/' },
      { label: 'Classes', to: '/classes' },
      { label: 'Schedule', to: '/schedule' },
      { label: 'Events', to: '/events' },
      { label: 'Materials', to: '/materials' },
      { label: 'About Me', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Admin Panel', to: '/admin' },
    ],
    programmesTitle: 'Programmes',
    programmes: [
      { label: 'Grades 6–8', to: '/classes' },
      { label: 'Grades 9–11', to: '/classes' },
      { label: 'After Scholarship', to: '/certificate-courses' },
      { label: 'After A/L', to: '/certificate-courses' },
      { label: 'Workshops', to: '/events' },
    ],
    contactTitle: 'Contact',
    copyright: 'Nilanka Ramayake – Beyond Tradition. All rights reserved.',
    logo: brandLogo,
  },
  about: {
    intro: '[Replace this paragraph with Nilanka\'s professional biography, teaching experience and personal story.]',
    details: '[Add qualifications, certifications, institutions, years of experience and any achievements here.]',
    quote: '[Replace this with a short teaching philosophy or personal statement.]',
  },
  certificate: {
    title: 'Build your next English milestone.',
    description: 'Two focused pathways designed for students moving beyond school-level learning and preparing for university, scholarships and future careers.',
    sessionA: {
      name: 'After Scholarship',
      description: 'This course helps students strengthen the communication skills needed after scholarship study or the next academic step. Learners focus on clear speaking, confident presentation, formal writing, reading for understanding and practical English for higher-level study and daily professional life.',
      duration: '12 weeks',
      schedule: 'Weekday / Weekend options available',
      venue: 'Beyond Tradition classroom',
      fee: 'Contact for current fee structure',
      accreditedBy: 'Delaware Digital University (United States of America)',
      accreditationNo: '103',
      audience: 'Students who have completed scholarship studies or are preparing for the next academic stage.',
    },
    sessionB: {
      name: 'After A/L',
      description: 'Designed for students after A/L, this pathway prepares them for university applications, scholarship opportunities, professional communication and confident academic English. The focus is on presentation skills, essay and report writing, interview preparation and formal English for future goals.',
      duration: '16 weeks',
      schedule: 'Flexible class timings',
      venue: 'Beyond Tradition classroom',
      fee: 'Contact for current fee structure',
      accreditedBy: 'Delaware Digital University (United States of America)',
      accreditationNo: '103',
      audience: 'Students after A/L preparing for higher education, scholarships, or career pathways.',
    },
  },
}

function loadSiteContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return defaultSiteContent
    const parsed = JSON.parse(saved)
    const navItems = (Array.isArray(parsed.navItems) ? parsed.navItems : defaultSiteContent.navItems)
      .filter((item) => item.to !== '/admin')
    return { ...defaultSiteContent, ...parsed, navItems }
  } catch (error) {
    return defaultSiteContent
  }
}

async function hashAdminPassword(password, salt) {
  const input = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', input)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function imageFileToDataUrl(file) {
  if (!file.type.startsWith('image/')) throw new Error('Choose an image file.')
  if (file.size > 12 * 1024 * 1024) throw new Error('Image must be smaller than 12 MB.')

  const image = await createImageBitmap(file)
  const scale = Math.min(1, 1600 / image.width, 1200 / image.height)
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
  image.close()
  return canvas.toDataURL('image/jpeg', 0.82)
}

function Header({ navItems }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container navbar">
        <NavLink className="logo" to="/" aria-label="Nilanka Ramayake — Beyond the Tradition, Home">
          <span className="brand-logo-frame"><img src={brandLogo} alt="English for Life — Nilanka Ramanayake, Beyond the Tradition" /></span>
        </NavLink>

        <button className="menu-toggle" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span></span><span></span><span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.filter((item) => item.to !== '/admin').map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function HeroSlider({ slides, hero }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const item = slides[activeIndex]
    if (!item) return undefined

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, item.duration || 3000)

    return () => clearTimeout(timer)
  }, [activeIndex, slides])

  return (
    <section className="hero" data-slider aria-label="Featured teaching images">
      <div className="slides">
        {slides.map((slide, index) => (
          <div key={`${slide.alt}-${index}`} className={`slide ${slide.portrait ? 'slide-portrait' : ''} ${index === activeIndex ? 'active' : ''}`}>
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>

      <div className="hero-overlay">
        <div className="container">
          <div className="hero-content">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.headline}</h1>
            <p>{hero.description}</p>
            <div className="hero-actions">
              <NavLink className="btn btn-primary" to="/classes">{hero.primaryCta}</NavLink>
              <NavLink className="btn btn-outline" to="/contact">{hero.secondaryCta}</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-controls">
        <button className="hero-arrow" type="button" onClick={() => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)} aria-label="Previous slide">‹</button>
        <div className="dots" aria-label="Slide navigation">
          {slides.map((slide, index) => (
            <button key={`${slide.alt}-dot-${index}`} type="button" className={`dot ${index === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(index)} aria-label={`Slide ${index + 1}`} />
          ))}
        </div>
        <button className="hero-arrow" type="button" onClick={() => setActiveIndex((activeIndex + 1) % slides.length)} aria-label="Next slide">›</button>
      </div>
    </section>
  )
}

function Footer({ footer, contact }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <NavLink to="/" className="footer-brand" aria-label="Go to homepage">
              <span className="brand-logo-frame"><img src={footer.logo} alt="English for Life — Nilanka Ramanayake, Beyond the Tradition" /></span>
            </NavLink>
            <p>{footer.description}</p>
            <div className="footer-social">
              <a href={contact.facebook || '#'} aria-label="Facebook">f</a>
              <a href={contact.instagram || '#'} aria-label="Instagram">◎</a>
              <a href={contact.youtube || '#'} aria-label="YouTube">▶</a>
              <a href={`https://wa.me/${contact.whatsapp.replace(/\s+/g, '').replace('+', '')}`} aria-label="WhatsApp">✆</a>
            </div>
          </div>
          <div>
            <h3>{footer.quickLinksTitle}</h3>
            <div className="footer-links">
              {footer.quickLinks.map((item, index) => (
                <NavLink key={`${item.to}-${index}`} to={item.to}>{item.label}</NavLink>
              ))}
            </div>
          </div>
          <div>
            <h3>{footer.programmesTitle}</h3>
            <div className="footer-links">
              {footer.programmes.map((item, index) => (
                <NavLink key={`${item.to}-${index}`} to={item.to}>{item.label}</NavLink>
              ))}
            </div>
          </div>
          <div>
            <h3>{footer.contactTitle}</h3>
            <div className="footer-links">
              <span>📞 {contact.phone}</span>
              <span>✉ {contact.email}</span>
              <span>🕐 {contact.hours}</span>
            </div>
          </div>
        </div>
        <div className="copyright">© <span>{new Date().getFullYear()}</span> {footer.copyright}</div>
      </div>
    </footer>
  )
}

function RevealOnScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  return null
}

function HomePage({ heroSlides, hero, courseCards, stats, reasons, testimonials }) {
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number[data-counter]')

    if (!counters.length) return undefined

    const animateCounter = (element) => {
      const targetValue = Number(element.dataset.counter)
      const suffix = element.dataset.suffix || ''
      const duration = 1600
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(eased * targetValue)
        element.textContent = currentValue + suffix

        if (progress < 1) {
          requestAnimationFrame(tick)
        } else {
          element.textContent = targetValue + suffix
        }
      }

      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    counters.forEach((counter) => observer.observe(counter))

    return () => observer.disconnect()
  }, [stats])

  return (
    <>
      <HeroSlider slides={heroSlides} hero={hero} />

      <section className="quick-info">
        <div className="container">
          <div className="grid">
            <div className="info-box reveal">
              <div className="info-box-icon">🎓</div>
              <div>
                <h3>Expert Teaching</h3>
                <p>Years of focused English-teaching experience.</p>
              </div>
            </div>
            <div className="info-box reveal">
              <div className="info-box-icon">📚</div>
              <div>
                <h3>Grades 6–11</h3>
                <p>Structured classes aligned with the school syllabus.</p>
              </div>
            </div>
            <div className="info-box reveal">
              <div className="info-box-icon">🏆</div>
              <div>
                <h3>Certificate Courses</h3>
                <p>After Scholarship & After A/L learning pathways.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image reveal">
              <img src={teacherImage} alt="Nilanka Ramayake" />
              <div className="about-badge"><strong>10+</strong>Years of Experience</div>
            </div>
            <div className="reveal">
              <span className="eyebrow">About Beyond Tradition</span>
              <h2>A fresh, thoughtful approach to English learning.</h2>
              <p className="lead">Beyond Tradition connects language knowledge with confidence, communication and practical use — so students don't just memorise, they grow.</p>
              <ul className="about-list">
                <li>Clear, structured lessons that build strong foundations</li>
                <li>Practical speaking, writing, reading and listening practice</li>
                <li>Supportive environment that builds confidence</li>
                <li>Focused exam and communication-oriented guidance</li>
              </ul>
              <NavLink className="btn btn-blue" to="/about">Learn More About Me</NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Our Programmes</span>
            <h2>Popular classes & courses</h2>
            <p className="lead">Choose the pathway that matches your stage — from school English to certificate-level learning.</p>
          </div>

          <div className="cards-grid">
            {courseCards.map((course) => (
              <article key={course.title} className="course-tile reveal">
                <div className="course-img"><img src={course.image} alt={course.title} /></div>
                <div className="course-body">
                  <span className="course-tag">{course.tag}</span>
                  <h3>{course.title}</h3>
                  <p>{course.text}</p>
                  <div className="course-meta">
                    <span>🕐 Weekly</span>
                    <span>📍 {course.venue}</span>
                  </div>
                  <NavLink className="course-link" to="/classes">View Schedule →</NavLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="reveal">
                <div
                  className="stat-number"
                  data-counter={stat.value}
                  data-suffix={stat.suffix}
                >
                  0
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Learning that actually works</h2>
          </div>
          <div className="why-grid">
            {reasons.map((item) => (
              <div key={item.title} className="why-card reveal">
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Student Voices</span>
            <h2>What students & parents say</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((person) => (
              <div key={person.name} className="testi-card reveal">
                <p className="testi-text">{person.quote}</p>
                <div className="testi-person">
                  <div className="testi-avatar">{person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
                  <div>
                    <strong>{person.name}</strong>
                    <span>{person.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner reveal">
            <div>
              <span className="eyebrow" style={{ color: 'white' }}>Ready to Begin?</span>
              <h2>Register for the next intake</h2>
              <p>Limited seats per grade. Message us on WhatsApp to reserve your spot today.</p>
            </div>
            <NavLink className="btn btn-light" to="/contact">Enrol Now →</NavLink>
          </div>
        </div>
      </section>
    </>
  )
}

function ClassesPage({ classSchedules, classesPage }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> › Classes</p>
          <span className="eyebrow">{classesPage.eyebrow}</span>
          <h1>{classesPage.title}</h1>
          <p className="lead">{classesPage.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head left reveal">
            <span className="eyebrow">{classesPage.scheduleEyebrow}</span>
            <h2>{classesPage.scheduleTitle}</h2>
            <p className="lead">{classesPage.scheduleDescription}</p>
          </div>
          <div className="table-wrap reveal">
            <table className="schedule">
              <thead><tr><th>Grade</th><th>Venue</th><th>Day(s)</th><th>Time</th></tr></thead>
              <tbody>{classSchedules.map((item) => <tr key={item.grade}><td>{item.grade}</td><td>{item.venue}</td><td>{item.days}</td><td>{item.time}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="card reveal" style={{ marginTop: '1.5rem' }}>
            <h3>How to enrol</h3>
            <p>Contact us through WhatsApp, phone or the enquiry form. Please mention the student&apos;s grade and preferred class when making an enquiry.</p>
            <NavLink className="btn btn-primary" to="/contact">Enquire Now</NavLink>
          </div>
        </div>
      </section>
    </>
  )
}

function SchedulePage({ scheduleGroups }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> › Weekly Schedule</p>
          <span className="eyebrow">Weekly Schedule</span>
          <h1>Class timetable by venue</h1>
          <p className="lead">Find the weekly timetable for each venue and grade group, from junior classes to the After A/L programme.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {scheduleGroups.map((group) => (
            <div key={group.venue} className="reveal" style={{ marginBottom: '2rem' }}>
              <div className="section-head left" style={{ marginBottom: '1.5rem' }}>
                <span className="eyebrow">Venue</span>
                <h2>{group.venue}</h2>
              </div>

              <div className="cards-grid">
                {group.items.map((item) => (
                  <article key={`${group.venue}-${item.grade}`} className="course-tile">
                    <div className="course-body">
                      <span className="course-tag">{item.grade}</span>
                      <h3>{item.grade === 'Advanced Programme' ? 'After A/L English Course' : item.grade}</h3>
                      <div className="course-meta">
                        <span>📅 {item.day}</span>
                        <span>🕒 {item.time}</span>
                        <span>🎯 {item.focus}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function EventsPage({ eventCards }) {
  const [activeCategory, setActiveCategory] = useState('essay')
  const categories = [
    { id: 'essay', label: 'Essay Workshops' },
    { id: 'third', label: '[Third Category]' },
    { id: 'other', label: 'Other' },
  ]

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> › Events</p>
          <span className="eyebrow">Events</span>
          <h1>Workshops & learning events</h1>
          <p className="lead">Special sessions that turn English learning into practical, memorable experiences.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Event categories">
            {categories.map((category) => (
              <button key={category.id} className={`tab ${activeCategory === category.id ? 'active' : ''}`} type="button" role="tab" aria-selected={activeCategory === category.id} onClick={() => setActiveCategory(category.id)}>{category.label}</button>
            ))}
          </div>
          <div className="cards-grid">
            {eventCards.filter((event) => event.category === activeCategory).map((event) => (
              <article key={event.title} className="course-tile reveal">
                <div className="course-img"><img src={event.image} alt={event.alt} /></div>
                <div className="course-body">
                  <span className={`badge ${event.status === 'Past' ? 'badge-past' : 'badge-upcoming'}`}>{event.status}</span>
                  <h3>{event.title}</h3>
                  <p className="event-meta">{event.date}</p>
                  <p>{event.text}</p>
                  <NavLink className="course-link" to="/contact">{event.status === 'Past' ? 'View Details →' : 'Register Interest →'}</NavLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function MaterialsPage({ materialGroups }) {
  const [search, setSearch] = useState('')
  const [openGrades, setOpenGrades] = useState([])
  const filteredGroups = materialGroups.filter((group) =>
    group.title.toLowerCase().includes(search.toLowerCase()) ||
    group.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> › Materials</p>
          <span className="eyebrow">Materials</span>
          <h1>Learning materials</h1>
          <p className="lead">Find downloadable English resources organized by grade.</p>
        </div>
      </section>

      <section className="section materials-section">
        <div className="container">
          <label htmlFor="materialSearch">Search materials</label>
          <input id="materialSearch" className="search-box" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by grade, topic or material name..." aria-label="Search materials" />

          <div className="accordion">
            {filteredGroups.map((group) => (
              <div key={group.title} className={`accordion-item ${openGrades.includes(group.title) ? 'open' : ''}`}>
                <button type="button" className="accordion-header" aria-expanded={openGrades.includes(group.title)} onClick={() => setOpenGrades((grades) => grades.includes(group.title) ? grades.filter((grade) => grade !== group.title) : [...grades, group.title])}>
                  {group.title}<span>+</span>
                </button>
                <div className="accordion-panel">
                  <article className="card">
                    <h3>{group.title} English Sample Pack</h3>
                    <p>{group.description}</p>
                    <p className="muted">File size: [XX KB]</p>
                    <a className="btn btn-blue" href={`/materials/${group.folder}/sample.pdf`} download>Download PDF</a>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function AboutPage({ about }) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> › About Me</p>
          <span className="eyebrow">About Me</span>
          <h1>Teaching with purpose, clarity and a fresh perspective.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="profile">
            <div className="profile-photo reveal">
              <img src={teacherImage} alt="Nilanka Ramayake" />
            </div>
            <div className="reveal">
              <span className="eyebrow">Nilanka Ramayake</span>
              <h2>English teacher & learning guide</h2>
              <p>{about.intro}</p>
              <p>{about.details}</p>
              <div className="quote">“{about.quote}”</div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Beyond Tradition</span>
            <h2>A different way to think about English learning.</h2>
            <p className="lead">The Beyond Tradition approach connects language knowledge with confidence, communication, creativity and practical use.</p>
          </div>
          <div className="cards-grid">
            <article className="why-card reveal"><div className="why-icon">📖</div><h3>Understand</h3><p>Build strong foundations instead of relying only on memorization.</p></article>
            <article className="why-card reveal"><div className="why-icon">🗣</div><h3>Practise</h3><p>Apply English through writing, speaking, reading and listening.</p></article>
            <article className="why-card reveal"><div className="why-icon">🌱</div><h3>Grow</h3><p>Build confidence and independent learning habits.</p></article>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactPage({ contact }) {
  const [formMessage, setFormMessage] = useState('')
  const [formErrors, setFormErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const nextErrors = {}
    const name = String(formData.get('name') || '').trim()
    const email = form.elements.email
    const message = String(formData.get('message') || '').trim()

    if (!name) nextErrors.name = 'This field is required.'
    if (!email.value.trim() || !email.validity.valid) nextErrors.email = 'Please enter a valid email.'
    if (!message) nextErrors.message = 'This field is required.'

    setFormErrors(nextErrors)
    setFormMessage('')

    if (Object.keys(nextErrors).length === 0) {
      setFormMessage('Thank you! Your message has been validated. Connect the form to a backend or form service to receive submissions.')
      form.reset()
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> › Contact</p>
          <span className="eyebrow">Contact</span>
          <h1>Let&apos;s start the conversation.</h1>
          <p className="lead">For class enquiries, certificate courses, workshops or general questions, get in touch.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="section-head left"><h2>Contact details</h2><p className="lead">Replace the placeholders below with your actual details.</p></div>
            <div className="contact-list">
              <div className="contact-item"><strong>Phone</strong><br /><a href={`tel:${contact.phone.replace(/\s+/g, '').replace('+', '+')}`}>{contact.phone}</a></div>
              <div className="contact-item"><strong>WhatsApp</strong><br /><a href={`https://wa.me/${contact.whatsapp.replace(/\s+/g, '').replace('+', '')}`}>{contact.whatsapp}</a></div>
              <div className="contact-item"><strong>Email</strong><br /><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
              <div className="contact-item"><strong>Address</strong><br />{contact.address}</div>
              <div className="contact-item"><strong>Social</strong><br /><a href={contact.facebook}>Facebook</a> · <a href={contact.instagram}>Instagram</a> · <a href={contact.youtube}>YouTube</a></div>
              <div className="contact-item"><strong>Class / Office Hours</strong><br />{contact.hours}</div>
            </div>
          </div>

          <div className="card">
            <h2>Send an enquiry</h2>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" required aria-describedby="name-error" />
                <div id="name-error" className="error" aria-live="polite">{formErrors.name}</div>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required aria-describedby="email-error" />
                <div id="email-error" className="error" aria-live="polite">{formErrors.email}</div>
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required aria-describedby="message-error" />
                <div id="message-error" className="error" aria-live="polite">{formErrors.message}</div>
              </div>
              <button type="submit" className="btn btn-primary">Send Enquiry</button>
              <div id="formResult" aria-live="polite">{formMessage && <div className="success">{formMessage}</div>}</div>
            </form>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Location</span><h2>Find us</h2></div>
          <div className="map-placeholder"><div><strong>Map Placeholder</strong><br />[Paste your Google Maps / OpenStreetMap embed here]</div></div>
        </div>
      </section>
    </>
  )
}

function CertificateCoursesPage({ certificate }) {
  return (
    <>
      <section className="page-hero certificate-hero">
        <div className="container certificate-hero-inner">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> <span>›</span> <span>Certificate Courses</span></p>
          <span className="eyebrow">Certificate Courses</span>
          <h1>Build your next <span className="hero-accent">English</span> milestone.</h1>
          <p className="lead">{certificate.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
            <article className="course-tile reveal" style={{ borderTop: '4px solid var(--orange)' }}>
              <div className="course-body">
                <span className="course-tag">Session A</span>
                <h2 style={{ fontSize: '1.6rem' }}>{certificate.sessionA.name}</h2>
                <p>{certificate.sessionA.description}</p>
                <div className="course-details">
                  <div className="detail"><strong>Duration</strong>{certificate.sessionA.duration}</div>
                  <div className="detail"><strong>Schedule</strong>{certificate.sessionA.schedule}</div>
                  <div className="detail"><strong>Venue</strong>{certificate.sessionA.venue}</div>
                  <div className="detail"><strong>Fee</strong>{certificate.sessionA.fee}</div>
                  <div className="detail"><strong>Accredited By</strong>{certificate.sessionA.accreditedBy}</div>
                  <div className="detail"><strong>Accreditation No.</strong>{certificate.sessionA.accreditationNo}</div>
                  <div className="detail"><strong>Who it&apos;s for</strong>{certificate.sessionA.audience}</div>
                </div>
                <NavLink className="btn btn-primary" to="/contact?course=post-scholarship">Register Interest</NavLink>
              </div>
            </article>
            <article className="course-tile reveal" style={{ borderTop: '4px solid var(--blue)' }}>
              <div className="course-body">
                <span className="course-tag" style={{ background: 'var(--orange)', color: 'white' }}>Session B</span>
                <h2 style={{ fontSize: '1.6rem' }}>{certificate.sessionB.name}</h2>
                <p>{certificate.sessionB.description}</p>
                <div className="course-details">
                  <div className="detail"><strong>Duration</strong>{certificate.sessionB.duration}</div>
                  <div className="detail"><strong>Schedule</strong>{certificate.sessionB.schedule}</div>
                  <div className="detail"><strong>Venue</strong>{certificate.sessionB.venue}</div>
                  <div className="detail"><strong>Fee</strong>{certificate.sessionB.fee}</div>
                  <div className="detail"><strong>Accredited By</strong>{certificate.sessionB.accreditedBy}</div>
                  <div className="detail"><strong>Accreditation No.</strong>{certificate.sessionB.accreditationNo}</div>
                  <div className="detail"><strong>Who it&apos;s for</strong>{certificate.sessionB.audience}</div>
                </div>
                <NavLink className="btn btn-primary" to="/contact?course=post-al">Register Interest</NavLink>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

function AdminPanelPage({ content, setContent, resetContent, storageError }) {
  const [credential, setCredential] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ADMIN_CREDENTIAL_KEY) || 'null')
    } catch (error) {
      return null
    }
  })
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'unlocked')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [notice, setNotice] = useState('')

  const handlePasswordSubmit = async (event) => {
    event.preventDefault()
    if (password.length < 8) {
      setAuthMessage('Use at least 8 characters for the password.')
      return
    }

    if (credential) {
      const passwordHash = await hashAdminPassword(password, credential.salt)
      if (passwordHash !== credential.hash) {
        setAuthMessage('That password did not match.')
        setPassword('')
        return
      }
    } else {
      const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('')
      const nextCredential = { salt, hash: await hashAdminPassword(password, salt) }
      localStorage.setItem(ADMIN_CREDENTIAL_KEY, JSON.stringify(nextCredential))
      setCredential(nextCredential)
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, 'unlocked')
    setAuthenticated(true)
    setPassword('')
    setAuthMessage('')
  }

  const handlePasswordChange = async (event) => {
    event.preventDefault()
    if (newPassword.length < 8) {
      setNotice('New password must be at least 8 characters.')
      return
    }
    const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('')
    const nextCredential = { salt, hash: await hashAdminPassword(newPassword, salt) }
    localStorage.setItem(ADMIN_CREDENTIAL_KEY, JSON.stringify(nextCredential))
    setCredential(nextCredential)
    setNewPassword('')
    setNotice('Admin password updated in this browser.')
  }

  const lockAdmin = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    setAuthenticated(false)
    setNotice('')
  }

  const handleImageUpload = async (event, onUpload) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const dataUrl = await imageFileToDataUrl(file)
      onUpload(dataUrl)
      setNotice('Image uploaded. It will be saved with the site content.')
    } catch (error) {
      setNotice(error.message || 'Could not process this image.')
    } finally {
      event.target.value = ''
    }
  }

  const updateNavItem = (index, field, value) => {
    setContent((prev) => ({
      ...prev,
      navItems: prev.navItems.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
    }))
  }

  const updateHero = (field, value) => {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }))
  }

  const updateClassesPage = (field, value) => {
    setContent((prev) => ({ ...prev, classesPage: { ...prev.classesPage, [field]: value } }))
  }

  const updateClassSchedule = (index, field, value) => {
    setContent((prev) => ({
      ...prev,
      classSchedules: prev.classSchedules.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
    }))
  }

  const addClassSchedule = () => {
    setContent((prev) => ({
      ...prev,
      classSchedules: [...prev.classSchedules, { grade: '', venue: '', days: '', time: '' }],
    }))
  }

  const removeClassSchedule = (index) => {
    setContent((prev) => ({
      ...prev,
      classSchedules: prev.classSchedules.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const updateSlide = (index, field, value) => {
    setContent((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.map((slide, slideIndex) => slideIndex === index ? { ...slide, [field]: value } : slide),
    }))
  }

  const updateCourse = (index, field, value) => {
    setContent((prev) => ({
      ...prev,
      courseCards: prev.courseCards.map((course, courseIndex) => courseIndex === index ? { ...course, [field]: value } : course),
    }))
  }

  const updateStat = (index, field, value) => {
    setContent((prev) => ({
      ...prev,
      stats: prev.stats.map((stat, statIndex) => statIndex === index ? { ...stat, [field]: value } : stat),
    }))
  }

  const updateScheduleGroup = (groupIndex, field, value) => {
    setContent((prev) => ({
      ...prev,
      scheduleGroups: prev.scheduleGroups.map((group, index) => index === groupIndex ? { ...group, [field]: value } : group),
    }))
  }

  const updateScheduleItem = (groupIndex, itemIndex, field, value) => {
    setContent((prev) => ({
      ...prev,
      scheduleGroups: prev.scheduleGroups.map((group, index) => index === groupIndex ? {
        ...group,
        items: group.items.map((item, itemPosition) => itemPosition === itemIndex ? { ...item, [field]: value } : item),
      } : group),
    }))
  }

  const updateContact = (field, value) => {
    setContent((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }))
  }

  const updateFooter = (field, value) => {
    setContent((prev) => ({ ...prev, footer: { ...prev.footer, [field]: value } }))
  }

  const updateFooterLink = (list, index, field, value) => {
    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        [list]: prev.footer[list].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
      },
    }))
  }

  const addFooterLink = (list) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, [list]: [...prev.footer[list], { label: '', to: '/' }] },
    }))
  }

  const removeFooterLink = (list, index) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, [list]: prev.footer[list].filter((_, itemIndex) => itemIndex !== index) },
    }))
  }

  const updateMaterialGroup = (index, field, value) => {
    setContent((prev) => ({
      ...prev,
      materialGroups: prev.materialGroups.map((group, groupIndex) => groupIndex === index ? { ...group, [field]: value } : group),
    }))
  }

  const updateEventCard = (index, field, value) => {
    setContent((prev) => ({
      ...prev,
      eventCards: prev.eventCards.map((event, eventIndex) => eventIndex === index ? { ...event, [field]: value } : event),
    }))
  }

  const updateAbout = (field, value) => {
    setContent((prev) => ({ ...prev, about: { ...prev.about, [field]: value } }))
  }

  const updateCertificate = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      certificate: {
        ...prev.certificate,
        [section]: { ...prev.certificate[section], [field]: value },
      },
    }))
  }

  if (!authenticated) {
    return (
      <section className="section admin-shell">
        <div className="container admin-access">
          <span className="eyebrow">Admin Access</span>
          <h1>{credential ? 'Enter your admin password' : 'Create an admin password'}</h1>
          <p>This browser-level lock helps prevent casual access. It is not server authentication and does not protect published site data.</p>
          <form className="form" onSubmit={handlePasswordSubmit}>
            <label htmlFor="admin-password">{credential ? 'Password' : 'Create password (8+ characters)'}</label>
            <input id="admin-password" type="password" autoComplete={credential ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} required />
            {authMessage && <p className="error" role="alert">{authMessage}</p>}
            <button className="btn btn-primary" type="submit">{credential ? 'Unlock Admin' : 'Set Password'}</button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="section admin-shell">
      <div className="container admin-panel">
        <div className="admin-header">
          <div>
            <span className="eyebrow">Admin Panel</span>
            <h1>Update the site content</h1>
          </div>
          <div className="admin-actions">
            <button className="btn btn-outline admin-reset" type="button" onClick={resetContent}>Reset to default</button>
            <button className="btn btn-outline admin-reset" type="button" onClick={lockAdmin}>Lock</button>
          </div>
        </div>
        {(notice || storageError) && <p className={`admin-notice ${storageError ? 'is-error' : ''}`} role="status">{storageError || notice}</p>}
        <details className="admin-password-settings">
          <summary>Change admin password</summary>
          <form className="admin-password-form" onSubmit={handlePasswordChange}>
            <label htmlFor="new-admin-password">New password</label>
            <input id="new-admin-password" type="password" autoComplete="new-password" minLength="8" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required />
            <button className="btn btn-blue" type="submit">Update Password</button>
          </form>
        </details>

        <div className="admin-section">
          <h2>Navigation</h2>
          <div className="editor-grid">
            {content.navItems.map((item, index) => (
              <div key={item.to} className="admin-card">
                <label>Label</label>
                <input value={item.label} onChange={(event) => updateNavItem(index, 'label', event.target.value)} />
                <label>Route</label>
                <input value={item.to} onChange={(event) => updateNavItem(index, 'to', event.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Classes Page</h2>
          <div className="editor-grid">
            <div className="admin-card">
              <label>Page eyebrow</label>
              <input value={content.classesPage.eyebrow} onChange={(event) => updateClassesPage('eyebrow', event.target.value)} />
              <label>Page title</label>
              <input value={content.classesPage.title} onChange={(event) => updateClassesPage('title', event.target.value)} />
              <label>Page description</label>
              <textarea value={content.classesPage.description} onChange={(event) => updateClassesPage('description', event.target.value)} />
              <label>Schedule eyebrow</label>
              <input value={content.classesPage.scheduleEyebrow} onChange={(event) => updateClassesPage('scheduleEyebrow', event.target.value)} />
              <label>Schedule title</label>
              <input value={content.classesPage.scheduleTitle} onChange={(event) => updateClassesPage('scheduleTitle', event.target.value)} />
              <label>Schedule description</label>
              <textarea value={content.classesPage.scheduleDescription} onChange={(event) => updateClassesPage('scheduleDescription', event.target.value)} />
            </div>
            {content.classSchedules.map((item, index) => (
              <div key={`class-schedule-${index}`} className="admin-card">
                <strong>Class row {index + 1}</strong>
                <label>Grade / class</label>
                <input value={item.grade} onChange={(event) => updateClassSchedule(index, 'grade', event.target.value)} />
                <label>Venue</label>
                <input value={item.venue} onChange={(event) => updateClassSchedule(index, 'venue', event.target.value)} />
                <label>Day(s)</label>
                <input value={item.days} onChange={(event) => updateClassSchedule(index, 'days', event.target.value)} />
                <label>Time</label>
                <input value={item.time} onChange={(event) => updateClassSchedule(index, 'time', event.target.value)} />
                <button className="btn btn-outline admin-reset" type="button" onClick={() => removeClassSchedule(index)}>Remove row</button>
              </div>
            ))}
          </div>
          <button className="btn btn-blue admin-add-row" type="button" onClick={addClassSchedule}>Add class row</button>
        </div>

        <div className="admin-section">
          <h2>Hero Section</h2>
          <div className="editor-grid">
            <div className="admin-card">
              <label>Eyebrow</label>
              <input value={content.hero.eyebrow} onChange={(event) => updateHero('eyebrow', event.target.value)} />
              <label>Headline</label>
              <input value={content.hero.headline} onChange={(event) => updateHero('headline', event.target.value)} />
              <label>Description</label>
              <textarea value={content.hero.description} onChange={(event) => updateHero('description', event.target.value)} />
            </div>
            {content.heroSlides.map((slide, index) => (
              <div key={`${slide.alt}-${index}`} className="admin-card">
                <label>Slide {index + 1} alt text</label>
                <input value={slide.alt} onChange={(event) => updateSlide(index, 'alt', event.target.value)} />
                <label htmlFor={`slide-image-${index}`}>Slide image</label>
                <input id={`slide-image-${index}`} type="file" accept="image/*" onChange={(event) => handleImageUpload(event, (src) => updateSlide(index, 'src', src))} />
                <img className="admin-image-preview" src={slide.src} alt={slide.alt} />
                <label>Duration (ms)</label>
                <input type="number" value={slide.duration} onChange={(event) => updateSlide(index, 'duration', Number(event.target.value) || 3000)} />
                <label>Portrait image</label>
                <input type="checkbox" checked={Boolean(slide.portrait)} onChange={(event) => updateSlide(index, 'portrait', event.target.checked)} />
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Events</h2>
          <div className="editor-grid">
            {content.eventCards.map((event, index) => (
              <div key={`${event.title}-${index}`} className="admin-card">
                <label>Title</label>
                <input value={event.title} onChange={(eventValue) => updateEventCard(index, 'title', eventValue.target.value)} />
                <label>Category</label>
                <input value={event.category} onChange={(eventValue) => updateEventCard(index, 'category', eventValue.target.value)} />
                <label>Status</label>
                <input value={event.status} onChange={(eventValue) => updateEventCard(index, 'status', eventValue.target.value)} />
                <label htmlFor={`event-image-${index}`}>Image</label>
                <input id={`event-image-${index}`} type="file" accept="image/*" onChange={(eventValue) => handleImageUpload(eventValue, (image) => updateEventCard(index, 'image', image))} />
                <img className="admin-image-preview" src={event.image} alt={event.alt} />
                <label>Date</label>
                <input value={event.date} onChange={(eventValue) => updateEventCard(index, 'date', eventValue.target.value)} />
                <label>Description</label>
                <textarea value={event.text} onChange={(eventValue) => updateEventCard(index, 'text', eventValue.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Materials</h2>
          <div className="editor-grid">
            {content.materialGroups.map((group, index) => (
              <div key={`${group.title}-${index}`} className="admin-card">
                <label>Title</label>
                <input value={group.title} onChange={(event) => updateMaterialGroup(index, 'title', event.target.value)} />
                <label>Folder</label>
                <input value={group.folder} onChange={(event) => updateMaterialGroup(index, 'folder', event.target.value)} />
                <label>Description</label>
                <textarea value={group.description} onChange={(event) => updateMaterialGroup(index, 'description', event.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Stats</h2>
          <div className="editor-grid">
            {content.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="admin-card">
                <label>Value</label>
                <input value={stat.value} onChange={(event) => updateStat(index, 'value', event.target.value)} />
                <label>Suffix</label>
                <input value={stat.suffix} onChange={(event) => updateStat(index, 'suffix', event.target.value)} />
                <label>Label</label>
                <input value={stat.label} onChange={(event) => updateStat(index, 'label', event.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Courses</h2>
          <div className="editor-grid">
            {content.courseCards.map((course, index) => (
              <div key={`${course.title}-${index}`} className="admin-card">
                <label>Title</label>
                <input value={course.title} onChange={(event) => updateCourse(index, 'title', event.target.value)} />
                <label>Tag</label>
                <input value={course.tag} onChange={(event) => updateCourse(index, 'tag', event.target.value)} />
                <label htmlFor={`course-image-${index}`}>Image</label>
                <input id={`course-image-${index}`} type="file" accept="image/*" onChange={(event) => handleImageUpload(event, (image) => updateCourse(index, 'image', image))} />
                <img className="admin-image-preview" src={course.image} alt={course.title} />
                <label>Venue</label>
                <input value={course.venue} onChange={(event) => updateCourse(index, 'venue', event.target.value)} />
                <label>Description</label>
                <textarea value={course.text} onChange={(event) => updateCourse(index, 'text', event.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Weekly Schedule</h2>
          <div className="editor-grid">
            {content.scheduleGroups.map((group, groupIndex) => (
              <div key={`${group.venue}-${groupIndex}`} className="admin-card">
                <label>Venue</label>
                <input value={group.venue} onChange={(event) => updateScheduleGroup(groupIndex, 'venue', event.target.value)} />
                {group.items.map((item, itemIndex) => (
                  <div key={`${item.grade}-${itemIndex}`} className="mini-editor">
                    <label>Grade</label>
                    <input value={item.grade} onChange={(event) => updateScheduleItem(groupIndex, itemIndex, 'grade', event.target.value)} />
                    <label>Day</label>
                    <input value={item.day} onChange={(event) => updateScheduleItem(groupIndex, itemIndex, 'day', event.target.value)} />
                    <label>Time</label>
                    <input value={item.time} onChange={(event) => updateScheduleItem(groupIndex, itemIndex, 'time', event.target.value)} />
                    <label>Focus</label>
                    <input value={item.focus} onChange={(event) => updateScheduleItem(groupIndex, itemIndex, 'focus', event.target.value)} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Contact Details</h2>
          <div className="editor-grid">
            <div className="admin-card">
              <label>Phone</label>
              <input value={content.contact.phone} onChange={(event) => updateContact('phone', event.target.value)} />
              <label>WhatsApp</label>
              <input value={content.contact.whatsapp} onChange={(event) => updateContact('whatsapp', event.target.value)} />
              <label>Email</label>
              <input value={content.contact.email} onChange={(event) => updateContact('email', event.target.value)} />
              <label>Hours</label>
              <input value={content.contact.hours} onChange={(event) => updateContact('hours', event.target.value)} />
              <label>Address</label>
              <input value={content.contact.address} onChange={(event) => updateContact('address', event.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h2>Footer</h2>
          <div className="editor-grid">
            <div className="admin-card">
              <label>Footer logo</label>
              <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, (src) => updateFooter('logo', src))} />
              <img className="admin-image-preview footer-logo-preview" src={content.footer.logo} alt="Footer logo preview" />
              <label>Brand description</label>
              <textarea value={content.footer.description} onChange={(event) => updateFooter('description', event.target.value)} />
              <label>Quick Links heading</label>
              <input value={content.footer.quickLinksTitle} onChange={(event) => updateFooter('quickLinksTitle', event.target.value)} />
              <label>Programmes heading</label>
              <input value={content.footer.programmesTitle} onChange={(event) => updateFooter('programmesTitle', event.target.value)} />
              <label>Contact heading</label>
              <input value={content.footer.contactTitle} onChange={(event) => updateFooter('contactTitle', event.target.value)} />
              <label>Facebook link</label>
              <input type="url" placeholder="https://facebook.com/your-page" value={content.contact.facebook} onChange={(event) => updateContact('facebook', event.target.value)} />
              <label>Instagram link</label>
              <input type="url" placeholder="https://instagram.com/your-profile" value={content.contact.instagram} onChange={(event) => updateContact('instagram', event.target.value)} />
              <label>YouTube link</label>
              <input type="url" placeholder="https://youtube.com/@your-channel" value={content.contact.youtube} onChange={(event) => updateContact('youtube', event.target.value)} />
              <label>Copyright text</label>
              <input value={content.footer.copyright} onChange={(event) => updateFooter('copyright', event.target.value)} />
            </div>
            {[
              { list: 'quickLinks', title: 'Quick Links' },
              { list: 'programmes', title: 'Programmes' },
            ].map(({ list, title }) => (
              <div key={list} className="admin-card">
                <h3>{title}</h3>
                {content.footer[list].map((item, index) => (
                  <div key={`${list}-${index}`} className="mini-editor">
                    <label>Link label</label>
                    <input value={item.label} onChange={(event) => updateFooterLink(list, index, 'label', event.target.value)} />
                    <label>Destination</label>
                    <input value={item.to} onChange={(event) => updateFooterLink(list, index, 'to', event.target.value)} />
                    <button className="btn btn-outline admin-reset" type="button" onClick={() => removeFooterLink(list, index)}>Remove link</button>
                  </div>
                ))}
                <button className="btn btn-blue admin-add-row" type="button" onClick={() => addFooterLink(list)}>Add {title.toLowerCase()} link</button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>About Section</h2>
          <div className="editor-grid">
            <div className="admin-card">
              <label>Intro</label>
              <textarea value={content.about.intro} onChange={(event) => updateAbout('intro', event.target.value)} />
              <label>Details</label>
              <textarea value={content.about.details} onChange={(event) => updateAbout('details', event.target.value)} />
              <label>Quote</label>
              <textarea value={content.about.quote} onChange={(event) => updateAbout('quote', event.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h2>Certificate Courses</h2>
          <div className="editor-grid">
            <div className="admin-card">
              <label>Hero description</label>
              <textarea value={content.certificate.description} onChange={(event) => setContent((prev) => ({ ...prev, certificate: { ...prev.certificate, description: event.target.value } }))} />
            </div>
            <div className="admin-card">
              <h3>After Scholarship</h3>
              <label>Name</label>
              <input value={content.certificate.sessionA.name} onChange={(event) => updateCertificate('sessionA', 'name', event.target.value)} />
              <label>Description</label>
              <textarea value={content.certificate.sessionA.description} onChange={(event) => updateCertificate('sessionA', 'description', event.target.value)} />
              <label>Duration</label>
              <input value={content.certificate.sessionA.duration} onChange={(event) => updateCertificate('sessionA', 'duration', event.target.value)} />
              <label>Accredited By</label>
              <input value={content.certificate.sessionA.accreditedBy} onChange={(event) => updateCertificate('sessionA', 'accreditedBy', event.target.value)} />
              <label>Accreditation No.</label>
              <input value={content.certificate.sessionA.accreditationNo} onChange={(event) => updateCertificate('sessionA', 'accreditationNo', event.target.value)} />
            </div>
            <div className="admin-card">
              <h3>After A/L</h3>
              <label>Name</label>
              <input value={content.certificate.sessionB.name} onChange={(event) => updateCertificate('sessionB', 'name', event.target.value)} />
              <label>Description</label>
              <textarea value={content.certificate.sessionB.description} onChange={(event) => updateCertificate('sessionB', 'description', event.target.value)} />
              <label>Duration</label>
              <input value={content.certificate.sessionB.duration} onChange={(event) => updateCertificate('sessionB', 'duration', event.target.value)} />
              <label>Accredited By</label>
              <input value={content.certificate.sessionB.accreditedBy} onChange={(event) => updateCertificate('sessionB', 'accreditedBy', event.target.value)} />
              <label>Accreditation No.</label>
              <input value={content.certificate.sessionB.accreditationNo} onChange={(event) => updateCertificate('sessionB', 'accreditationNo', event.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [siteContent, setSiteContent] = useState(loadSiteContent)
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteContent))
      setStorageError('')
    } catch (error) {
      setStorageError('Browser storage is full. Export a backup, then use smaller images or fewer uploads.')
    }
  }, [siteContent])

  const resetContent = () => {
    setSiteContent(defaultSiteContent)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteContent))
  }

  return (
    <BrowserRouter>
      <Header navItems={siteContent.navItems} />
      <RevealOnScroll />
      <main id="page-content">
        <Routes>
          <Route path="/" element={<HomePage heroSlides={siteContent.heroSlides} hero={siteContent.hero} courseCards={siteContent.courseCards} stats={siteContent.stats} reasons={siteContent.reasons} testimonials={siteContent.testimonials} />} />
          <Route path="/classes" element={<ClassesPage classSchedules={siteContent.classSchedules} classesPage={siteContent.classesPage} />} />
          <Route path="/schedule" element={<SchedulePage scheduleGroups={siteContent.scheduleGroups} />} />
          <Route path="/events" element={<EventsPage eventCards={siteContent.eventCards} />} />
          <Route path="/materials" element={<MaterialsPage materialGroups={siteContent.materialGroups} />} />
          <Route path="/about" element={<AboutPage about={siteContent.about} />} />
          <Route path="/contact" element={<ContactPage contact={siteContent.contact} />} />
          <Route path="/certificate-courses" element={<CertificateCoursesPage certificate={siteContent.certificate} />} />
          <Route path="/admin" element={<AdminPanelPage content={siteContent} setContent={setSiteContent} resetContent={resetContent} storageError={storageError} />} />
        </Routes>
      </main>
      <Footer footer={siteContent.footer} contact={siteContent.contact} />
    </BrowserRouter>
  )
}

export default App
