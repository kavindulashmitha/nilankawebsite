import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../assets/css/style.css'
import teacherImage from '../assets/images/the.jpeg'
import classroomImage from '../assets/images/hero-2.jpeg'
import studentsImage from '../assets/images/hero-3.jpeg'
import lessonImage from '../assets/images/hero-4.jpeg'
import brandLogo from '../assets/images/logo.jpeg'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/classes', label: 'Classes' },
  { to: '/events', label: 'Events' },
  { to: '/materials', label: 'Materials' },
  { to: '/about', label: 'About Me' },
  { to: '/contact', label: 'Contact' },
]

const heroSlides = [
  { src: teacherImage, alt: 'Nilanka Ramayake at graduation', duration: 3000, portrait: true },
  { src: classroomImage, alt: 'Students working in class', duration: 3000 },
  { src: studentsImage, alt: 'Full classroom of students learning', duration: 3000 },
  { src: lessonImage, alt: 'Teacher explaining a lesson at the whiteboard', duration: 3000 },
]

const courseCards = [
  { title: 'Junior English Programme', tag: 'Grades 6–8', image: classroomImage, text: 'Strong foundations in grammar, vocabulary, reading and confident classroom speaking.' },
  { title: 'O/L English Programme', tag: 'Grades 9–11', image: lessonImage, text: 'Exam-focused teaching with writing, comprehension and speaking practice for O/L success.' },
  { title: 'Post-A/L English Course', tag: 'Certificate', image: studentsImage, text: 'Communication, academic writing and professional English for students moving beyond school.' },
]

const stats = [
  { value: '500', suffix: '+', label: 'Students Taught' },
  { value: '12', suffix: '+', label: 'Years Experience' },
  { value: '6', suffix: '', label: 'Grade Levels' },
  { value: '98', suffix: '%', label: 'Student Satisfaction' },
]

const reasons = [
  { icon: '🎯', title: 'Focused Teaching', copy: 'Lessons built around each grade\'s real syllabus needs.' },
  { icon: '💬', title: 'Practical Speaking', copy: 'Confidence-building practice, not just textbook theory.' },
  { icon: '📝', title: 'Exam Support', copy: 'Targeted writing, comprehension and revision strategies.' },
  { icon: '🌱', title: 'Independent Growth', copy: 'Habits that help students keep learning on their own.' },
]

const testimonials = [
  { name: 'Sanduni Perera', label: 'Parent – Grade 9', quote: 'The classes completely changed how my daughter approaches English. She\'s now confident speaking in front of her class.' },
  { name: 'Kavindu Fernando', label: 'Student – Grade 11', quote: 'The essay workshops were a game changer. I finally understood how to plan and structure my writing for exams.' },
]

const materialGroups = [
  { title: 'Grade 6', folder: 'grade6', description: 'Practice material and revision support.' },
  { title: 'Grade 7', folder: 'grade7', description: 'Practice material and revision support.' },
  { title: 'Grade 8', folder: 'grade8', description: 'Practice material and revision support.' },
  { title: 'Grade 9', folder: 'grade9', description: 'Practice material and revision support.' },
  { title: 'Grade 10', folder: 'grade10', description: 'Practice material and revision support.' },
  { title: 'Grade 11', folder: 'grade11', description: 'Practice material and revision support.' },
]

const eventCards = [
  { category: 'essay', title: 'Essay Writing Workshop', status: 'Upcoming', date: '[Date] · [Time] · [Venue]', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80', alt: 'Essay writing workshop', text: 'Learn how to understand a topic, plan ideas, structure paragraphs and develop a clear English essay.' },
  { category: 'essay', title: 'Exam Essay Practice Session', status: 'Past', date: '[Date] · [Time] · [Venue]', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80', alt: 'Exam essay session', text: 'A focused practice session with guided feedback and exam-oriented writing strategies.' },
  { category: 'third', title: '[Event Title]', status: 'Upcoming', date: '[Date] · [Time] · [Venue]', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', alt: 'Students at an event', text: '[Replace with a short event description.]' },
  { category: 'other', title: '[Other Event]', status: 'Upcoming', date: '[Date] · [Time] · [Venue]', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80', alt: 'Students attending a class', text: '[Replace with a short event description.]' },
]

const classSchedules = [
  { grade: 'Grade 6', venue: '[Venue]', days: '[Day]', time: '[Time]' },
  { grade: 'Grade 7', venue: '[Venue]', days: '[Day]', time: '[Time]' },
  { grade: 'Grade 8', venue: '[Venue]', days: '[Day]', time: '[Time]' },
  { grade: 'Grade 9', venue: '[Venue]', days: '[Day]', time: '[Time]' },
  { grade: 'Grade 10', venue: '[Venue]', days: '[Day]', time: '[Time]' },
  { grade: 'Grade 11', venue: '[Venue]', days: '[Day]', time: '[Time]' },
]

function Header() {
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
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <NavLink className="nav-cta" to="/certificate-courses" onClick={() => setMenuOpen(false)}>Certificate Courses</NavLink>
        </nav>
      </div>
    </header>
  )
}

function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const item = heroSlides[activeIndex]
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length)
    }, item.duration)

    return () => clearTimeout(timer)
  }, [activeIndex])

  return (
    <section className="hero" data-slider aria-label="Featured teaching images">
      <div className="slides">
        {heroSlides.map((slide, index) => (
          <div key={slide.alt} className={`slide ${slide.portrait ? 'slide-portrait' : ''} ${index === activeIndex ? 'active' : ''}`}>
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>

      <div className="hero-overlay">
        <div className="container">
          <div className="hero-content">
            <p className="eyebrow">Beyond Tradition</p>
            <h1>Learn English with clarity & confidence</h1>
            <p>Professional English classes for Grades 6–11, plus certificate pathways for post-Scholarship and post-A/L students.</p>
            <div className="hero-actions">
              <NavLink className="btn btn-primary" to="/classes">Explore Classes →</NavLink>
              <NavLink className="btn btn-outline" to="/contact">Enrol Now</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-controls">
        <button className="hero-arrow" type="button" onClick={() => setActiveIndex((activeIndex - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide">‹</button>
        <div className="dots" aria-label="Slide navigation">
          {heroSlides.map((slide, index) => (
            <button key={slide.alt} type="button" className={`dot ${index === activeIndex ? 'active' : ''}`} onClick={() => setActiveIndex(index)} aria-label={`Slide ${index + 1}`} />
          ))}
        </div>
        <button className="hero-arrow" type="button" onClick={() => setActiveIndex((activeIndex + 1) % heroSlides.length)} aria-label="Next slide">›</button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <NavLink to="/" className="footer-brand" aria-label="Go to homepage">
              <span className="brand-logo-frame"><img src={brandLogo} alt="English for Life — Nilanka Ramanayake, Beyond the Tradition" /></span>
            </NavLink>
            <p>Beyond Tradition — a fresh, thoughtful approach to English learning. Professional teaching for students ready to communicate with confidence.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="YouTube">▶</a>
              <a href="https://wa.me/94000000000" aria-label="WhatsApp">✆</a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <div className="footer-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/classes">Classes</NavLink>
              <NavLink to="/events">Events</NavLink>
              <NavLink to="/materials">Materials</NavLink>
              <NavLink to="/about">About Me</NavLink>
            </div>
          </div>
          <div>
            <h3>Programmes</h3>
            <div className="footer-links">
              <NavLink to="/classes">Grades 6–8</NavLink>
              <NavLink to="/classes">Grades 9–11</NavLink>
              <NavLink to="/certificate-courses">Post-Scholarship</NavLink>
              <NavLink to="/certificate-courses">Post-A/L</NavLink>
              <NavLink to="/events">Workshops</NavLink>
            </div>
          </div>
          <div>
            <h3>Contact</h3>
            <div className="footer-links">
              <span>📍 [Class / Office Address]</span>
              <span>📞 +94 00 000 0000</span>
              <span>✉ hello@example.com</span>
              <span>🕐 Mon–Sat: 8.00am – 7.00pm</span>
            </div>
          </div>
        </div>
        <div className="copyright">© <span>{new Date().getFullYear()}</span> Nilanka Ramayake – Beyond Tradition. All rights reserved.</div>
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

function HomePage() {
  return (
    <>
      <HeroSlider />

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
                <p>Post-Scholarship & post-A/L learning pathways.</p>
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
                    <span>📍 [Venue]</span>
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
                <div className="stat-number" data-counter={stat.value} data-suffix={stat.suffix}>0</div>
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

function ClassesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> › Classes</p>
          <span className="eyebrow">Classes</span>
          <h1>English classes for Grades 6–11</h1>
          <p className="lead">Clear schedules, practical learning and a supportive path from school English to confident communication.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head left reveal">
            <span className="eyebrow">Class Schedule</span>
            <h2>Weekly timetable</h2>
            <p className="lead">Contact us for the latest venue and availability before enrolment.</p>
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

function EventsPage() {
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

function MaterialsPage() {
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

function AboutPage() {
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
              <p>[Replace this paragraph with Nilanka's professional biography, teaching experience and personal story.]</p>
              <p>[Add qualifications, certifications, institutions, years of experience and any achievements here.]</p>
              <div className="quote">“[Replace this with a short teaching philosophy or personal statement.]”</div>
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

function ContactPage() {
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
              <div className="contact-item"><strong>Phone</strong><br /><a href="tel:+94000000000">+94 00 000 0000</a></div>
              <div className="contact-item"><strong>WhatsApp</strong><br /><a href="https://wa.me/94000000000">+94 00 000 0000</a></div>
              <div className="contact-item"><strong>Email</strong><br /><a href="mailto:hello@example.com">hello@example.com</a></div>
              <div className="contact-item"><strong>Address</strong><br />[Class / Office Address]</div>
              <div className="contact-item"><strong>Social</strong><br /><a href="#">Facebook</a> · <a href="#">Instagram</a> · <a href="#">YouTube</a></div>
              <div className="contact-item"><strong>Class / Office Hours</strong><br />[Days and times]</div>
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

function CertificateCoursesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><NavLink to="/">Home</NavLink> › Certificate Courses</p>
          <span className="eyebrow">Certificate Courses</span>
          <h1>Build your next English milestone.</h1>
          <p className="lead">Two focused pathways designed for students moving beyond school-level learning.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
            <article className="course-tile reveal" style={{ borderTop: '4px solid var(--orange)' }}>
              <div className="course-body">
                <span className="course-tag">Session A</span>
                <h2 style={{ fontSize: '1.6rem' }}>Post-Scholarship</h2>
                <p>[Course overview: explain the skills, outcomes and learning approach for students after the scholarship stage.]</p>
                <div className="course-details">
                  <div className="detail"><strong>Duration</strong>[e.g. 12 weeks]</div>
                  <div className="detail"><strong>Schedule</strong>[Day / Time]</div>
                  <div className="detail"><strong>Venue</strong>[Venue]</div>
                  <div className="detail"><strong>Fee</strong>[Fee]</div>
                  <div className="detail"><strong>Who it&apos;s for</strong>[Target students / entry level]</div>
                </div>
                <NavLink className="btn btn-primary" to="/contact?course=post-scholarship">Register Interest</NavLink>
              </div>
            </article>
            <article className="course-tile reveal" style={{ borderTop: '4px solid var(--blue)' }}>
              <div className="course-body">
                <span className="course-tag" style={{ background: 'var(--orange)', color: 'white' }}>Session B</span>
                <h2 style={{ fontSize: '1.6rem' }}>Post-A/L</h2>
                <p>[Course overview: explain the skills, outcomes and learning approach for students after A/L.]</p>
                <div className="course-details">
                  <div className="detail"><strong>Duration</strong>[e.g. 16 weeks]</div>
                  <div className="detail"><strong>Schedule</strong>[Day / Time]</div>
                  <div className="detail"><strong>Venue</strong>[Venue]</div>
                  <div className="detail"><strong>Fee</strong>[Fee]</div>
                  <div className="detail"><strong>Who it&apos;s for</strong>[Target students / entry level]</div>
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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <RevealOnScroll />
      <main id="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/certificate-courses" element={<CertificateCoursesPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
