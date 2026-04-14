<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->






ADTL AFRICA WEBSITE BUILD PROMPT

Domain: adtlafrica.org
Purpose: A professional, minimal, credibility-driven digital platform for a Pan-African AI and digital transformation organization.

1. OVERALL PRODUCT DIRECTION

This website must communicate authority, clarity, and trust. It is not a marketing-heavy or visually decorative product. It is a functional institutional platform.

Design philosophy:

White background as the dominant base
Very limited use of brand color (only for buttons, links, and subtle highlights)
No gradients, no animations beyond basic hover states
No heavy illustrations or decorative elements
Typography should carry the visual weight (clean, modern, readable)
Layout should feel structured, almost editorial or institutional

The final experience should feel closer to:

A policy institution
A research lab
A global development organization

Not:

A startup landing page
A flashy agency website
2. TECH STACK REQUIREMENTS

The system must be built with production-grade architecture.

Frontend:

Next.js (App Router)
Server-side rendering for SEO-critical pages
Component-based architecture

Backend:

API routes handled via Next.js server functions

Database:

Neon (PostgreSQL)
Proper schema design with normalization
Strict constraints and indexing

Authentication:

Clerk
Role-based access control:
Admin
Editor
Public user

Hosting:

Vercel (preferred)
3. CORE SYSTEM ARCHITECTURE

The platform is not just a static website. It includes:

CMS-like functionality for:
Blog
Resources
Careers
Secure form handling system
Admin dashboard (protected via Clerk)
Structured database for all submissions
4. SECURITY & DATA VALIDATION (CRITICAL)

Every form must be treated as a potential attack surface.

Required protections:
Server-side validation (never rely only on frontend)
Input sanitization:
Strip scripts
Prevent SQL injection
Prevent XSS
Use strict schemas (e.g., Zod-like validation logic conceptually)
Validation rules:
Emails: RFC-compliant format
Phone numbers: international format validation
Text fields:
Min and max length enforced
No HTML allowed
File uploads:
Restrict type (PDF only for CVs)
File size limit
Virus-safe handling approach
Anti-spam:
Rate limiting per IP
Honeypot field
Optional CAPTCHA
Database safety:
Prepared statements only
No raw queries
Role-based access to sensitive data
5. GLOBAL UI STRUCTURE
Header:
Logo (left)
Navigation (center or right)
No clutter

Menu items:

Home
About
Services
Resources
Our People
Blog
Partnership
Career
Contact
Footer:
Minimal
Contact info
Quick links
Copyright
6. PAGE-BY-PAGE SPECIFICATION
HOME PAGE

Purpose: Immediate clarity of what ADTL Africa does.

Sections:

Hero
Clear statement:
“Driving AI & Digital Transformation Across Africa”
One short paragraph
CTA buttons:
“Explore Services”
“Partner With Us”
Who We Are (brief)
Not-for-profit
Pan-African
Innovation-led
Core Focus Areas
SME Digital Transformation
Education & Capacity Building
AI Integration & Automation
Problem Statement
Africa’s digital skills gap
Lack of practical training
Theory vs real-world gap
Solution
Hands-on training
Real tools
Mentorship
Impact
Workforce development
SME transformation
Ecosystem growth
CTA Section
Partnership call
ABOUT PAGE

Content must reflect:

Who ADTL Africa is
Vision
Mission
Philosophy

Structure:

Introduction
Vision (efficiency, equity, innovation)
Mission (scalable AI systems)
Why this matters for Africa
SERVICES PAGE

Clearly structured service categories:

Software Development
AI Automation
Data & BI
Digital Infrastructure
Educational AI Solutions
Capacity Building

Each section:

What it is
Who it is for
Outcome
RESOURCES PAGE

Acts like a knowledge hub.

Content types:

PDFs
Guides
Training materials

Features:

Categorization
Search functionality
Download tracking
OUR PEOPLE (TEAM)

Structured profiles:

Each member:

Name
Role
Short bio
Optional LinkedIn

Admin must be able to add/edit/remove members.

BLOG PAGE

Full CMS behavior:

Features:

Create/edit/delete posts (admin only)
Rich text editor
Slug-based URLs
SEO metadata
Publish/unpublish control
PARTNERSHIP PAGE

Content:

Partnership categories:
Institutions
Government
Private sector

Form:

Organization name
Contact person
Email
Phone
Partnership type
Message
CONTACT PAGE

Simple and clear:

Fields:

Name
Email
Subject
Message

Must:

Store submissions in database
Send notification email to admin
CAREER PAGE

Job listings system:

Features:

Admin can create job posts
Each job has:
Title
Description
Requirements
Deadline

Application form:

Name
Email
CV upload (PDF only)
Cover letter

All applications stored securely.

7. ADMIN DASHBOARD

Protected via Clerk.

Capabilities:

Manage blog posts
Manage resources
Manage team members
View submissions:
Contact
Partnership
Applications

Dashboard must be simple, functional, and fast.

8. DATABASE STRUCTURE (NEON)

Tables required:

users (handled by Clerk mapping)
blog_posts
resources
team_members
job_listings
applications
contact_messages
partnership_requests

Each table:

Must include timestamps
Must enforce constraints
Must prevent null where necessary
9. SEO & PERFORMANCE
Server-side rendering for all main pages
Clean URLs
Meta tags per page
Fast load time (no heavy assets)
Accessibility compliance
10. FINAL QUALITY REQUIREMENTS

The platform must:

Feel institutional, not promotional
Be extremely clear in communication
Avoid unnecessary UI complexity
Be secure at every level
Be scalable for future features
Be easy for non-technical admins to manage


More ADTL Africa:

"AI AND DIGITAL
TRANSFORMATIVE 
LAB
ADT L AF RI C A
Driving AI & Digital Transformation Across Africa
02
W H O W E A R E
A Mission-Driven Platform for Transformation
Not-for-Profit
Social impact over profit —
inclusive growth and services for all 
segments of society
Pan-African Focus
Bridging Africa's digital skills gap 
across communities, youth, and 
institutions
Innovation-Led
Practical, scalable AI and digital 
solutions grounded in real-world 
need
"We exist to ensure Africa is not left behind in the global digital revolution."
O U R V I S I O N
To transform African enterprises
and educational institutions through
intelligent digital systems that drive
efficiency, equity, and innovation.
Efficiency Equity Innovation
04
O U R M I S S I O N
To accelerate digital transformation across Africa 
by building scalable AI solutions, business 
intelligence systems, and smart educational 
technologies that enhance productivity, learning 
outcomes, and service delivery.
✓ Scalable Solutions
✓ Real-World Impact
✓ Inclusive Access
Accelerate · Transform · Empower
05
C O R E F O C U S A R E A S
Where We Direct Our Energy & Expertise
SME Digital Transformation
▸ Web design & development
▸ AI automation & workflow tools
▸ Dashboard & data visualization
▸ Digital infrastructure setup
Education & Capacity 
Building
▸ AI skills training for youth
▸ Teacher AI integration 
programmes
▸ Cohort-based practical learning
▸ Curriculum & certification
AI Integration & Automation
▸ AI coworker systems
▸ Business process automation
▸ Smart productivity tools
▸ Data-driven decision systems
06
O U R S P E C I A L T I E S
What We Build & Deliver
Software 
Development
Custom web & app 
solutions
AI-Driven Automation
Intelligent workflow 
systems
Data Visualization & 
BI
Dashboards & actionable 
insights
Digital Infrastructure
SME-ready digital systems
Educational AI 
Solutions
Smart learning 
technologies
Capacity Building
Training & skills 
development
07
T H E P R O B L E M W E A D D R E S S
Africa's Digital Skills Crisis
Widening Skills Gap
Rapid AI adoption is far outpacing 
the practical digital skills of Africa's 
youth and workforce
Limited Access to Training
Practical, hands-on AI training 
remains inaccessible for most 
learners and institutions
Theory–Practice Disconnect
Existing programmes teach 
concepts without equipping learners 
to apply them in real contexts
08
O U R S O L U T I O N
Practical · Hands-On · Impact-Driven
How We Solve It
✓ Real AI tools in every session
✓ Cohort-based peer learning model
✓ Mentor-guided live projects
✓ Continuous M&E and feedback loops
AI Tools & Real-World Application
Hands-on with live AI platforms
Support for Youth & SMEs
Tailored programmes per audience
Certification & Internships
Credentials + career pathways
F L A G S H I P P R O G R A M M E
AI & Digital
Skills Training
Programme
7-Day Intensive Hybrid Format
100 Participants Per Cohort
Practical Hands-On Learning Only
What Participants Gain
Hands-on AI tool training across all 7 sessions
Real-world projects built from scratch
Top performers selected for internship roles
Certificate of Completion awarded on graduation
Mentor-guided learning and support throughout
O U R I M P A C T
Transforming Lives, Systems & Economies
Skilled
Workforce
Increased
Employability
SME
Transformation
Stronger
Ecosystem
P A R T N E R S H I P O P P O R T U N I T I E S
Build With Us — Mutual Value, Lasting Impact
Institutions & Schools
▸ Teacher AI integration training
▸ Programme co-design & 
delivery
▸ Institutional capacity building
Government & 
Directorates
▸ Free website development
▸ 20% revenue share model
▸ Digital policy support
Private Sector & NGOs
▸ SME digital transformation
▸ Custom AI tool deployment
▸ Sponsorship & co-funding
C O N T A C T & C A L L T O A C T I O N
Ready to Partner
With Us?
Join us in transforming Africa's digital future —
one learner, one institution, one system at a time.
Barfour Frimpong — Operations & Relations
0592413228
info@adtlafrica.com
www.adtlafrica.org
Transform Africa With Us — Reach Out Today"