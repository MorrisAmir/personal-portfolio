/**
 * Firestore Seed Script
 * One-time data population for portfolio projects, skills, and about section
 * Checks if data exists before seeding to prevent duplicates
 */

import { db } from './firebase';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';

// Project data
const projectsData = [
  {
    title: 'Skyfield Mkulima',
    description: 'Cross-platform agricultural mobile app built for Skyfield Technologies. Led end-to-end development including UI/UX design, state management, and REST API integration.',
    tech: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    year: 'Dec 2024 – Present',
    role: 'Lead Developer',
  },
  {
    title: 'Community Marketplace App',
    description: 'Fully functional marketplace app built as a capstone project at Modcom Institute. Covers UI design, Firebase integration, and user authentication end-to-end.',
    tech: ['Flutter', 'Firebase', 'Auth'],
    year: 'Jan – Jun 2023',
    role: 'Modcom Institute of Technology',
  },
  {
    title: 'Client Websites',
    description: 'Developed multiple responsive client websites with a strong focus on performance, accessibility, and clean UI — delivered in React.js and vanilla HTML/CSS/JS.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js'],
    year: '2023',
    role: 'Freelance',
  },
  {
    title: 'Personal Portfolio',
    description: 'Single page portfolio using semantic HTML5 and Tailwind CSS. Built during S-001 at Skyfalke internship. Mobile-first, dark theme, zero frameworks.',
    tech: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    year: '2025',
    role: 'Skyfalke Internship',
  },
];

// Skills data by category
const skillsData = [
  // Web & Mobile
  { name: 'HTML5', category: 'Web & Mobile' },
  { name: 'CSS3', category: 'Web & Mobile' },
  { name: 'JavaScript', category: 'Web & Mobile' },
  { name: 'React.js', category: 'Web & Mobile' },
  { name: 'Flutter', category: 'Web & Mobile' },
  { name: 'Dart', category: 'Web & Mobile' },
  { name: 'Tailwind CSS', category: 'Web & Mobile' },
  // Back-End & Data
  { name: 'Node.js', category: 'Back-End & Data' },
  { name: 'Express', category: 'Back-End & Data' },
  { name: 'REST APIs', category: 'Back-End & Data' },
  { name: 'Firebase', category: 'Back-End & Data' },
  { name: 'SQL', category: 'Back-End & Data' },
  { name: 'NoSQL', category: 'Back-End & Data' },
  // Tools & Methods
  { name: 'Git', category: 'Tools & Methods' },
  { name: 'GitHub', category: 'Tools & Methods' },
  { name: 'Agile', category: 'Tools & Methods' },
  { name: 'CI/CD', category: 'Tools & Methods' },
  { name: 'Figma', category: 'Tools & Methods' },
  { name: 'UI/UX', category: 'Tools & Methods' },
];

// About data
const aboutData = {
  bio: 'I\'m Morris — a Computer Science student and self-driven developer with a strong foundation in front-end web development and cross-platform mobile apps using Flutter. I\'ve built everything from agricultural mobile apps used in production to responsive client websites. I care deeply about clean code, intuitive UX, and shipping work that actually reaches users.',
  tagline: 'Front-End & Mobile Developer · Nairobi, Kenya',
  available: true,
};

/**
 * Seed projects collection
 */
async function seedProjects() {
  try {
    const projectsCol = collection(db, 'projects');
    const snapshot = await getDocs(projectsCol);

    if (snapshot.empty) {
      console.log('Seeding projects...');
      for (const project of projectsData) {
        await addDoc(projectsCol, project);
      }
      console.log(`✓ Seeded ${projectsData.length} projects`);
      return true;
    } else {
      console.log('Projects already exist, skipping seed');
      return false;
    }
  } catch (err) {
    console.error('Error seeding projects:', err);
    throw err;
  }
}

/**
 * Seed skills collection
 */
async function seedSkills() {
  try {
    const skillsCol = collection(db, 'skills');
    const snapshot = await getDocs(skillsCol);

    if (snapshot.empty) {
      console.log('Seeding skills...');
      for (const skill of skillsData) {
        await addDoc(skillsCol, skill);
      }
      console.log(`✓ Seeded ${skillsData.length} skills`);
      return true;
    } else {
      console.log('Skills already exist, skipping seed');
      return false;
    }
  } catch (err) {
    console.error('Error seeding skills:', err);
    throw err;
  }
}

/**
 * Seed about document
 */
async function seedAbout() {
  try {
    const aboutRef = doc(db, 'about', 'main');
    const aboutCol = collection(db, 'about');
    const snapshot = await getDocs(aboutCol);

    if (snapshot.empty) {
      console.log('Seeding about section...');
      await setDoc(aboutRef, aboutData);
      console.log('✓ Seeded about section');
      return true;
    } else {
      console.log('About section already exists, skipping seed');
      return false;
    }
  } catch (err) {
    console.error('Error seeding about section:', err);
    throw err;
  }
}

/**
 * Main seed function — runs all seed operations
 */
export async function seedPortfolioData() {
  try {
    console.log('Starting portfolio data seed...');
    
    const projectsSeeded = await seedProjects();
    const skillsSeeded = await seedSkills();
    const aboutSeeded = await seedAbout();

    if (projectsSeeded || skillsSeeded || aboutSeeded) {
      console.log('✓ Portfolio seed completed successfully');
      return true;
    } else {
      console.log('No new data to seed (collections already populated)');
      return false;
    }
  } catch (err) {
    console.error('Portfolio seed failed:', err);
    return false;
  }
}

/**
 * One-time seed wrapper with localStorage flag
 */
export async function seedPortfolioDataOnce() {
  const SEED_FLAG = 'portfolio_seeded';
  
  if (localStorage.getItem(SEED_FLAG)) {
    console.log('Portfolio already seeded, skipping');
    return;
  }

  try {
    const success = await seedPortfolioData();
    if (success) {
      localStorage.setItem(SEED_FLAG, 'true');
      console.log('Seed flag saved to localStorage');
    }
  } catch (err) {
    console.error('Error in seedPortfolioDataOnce:', err);
  }
}
