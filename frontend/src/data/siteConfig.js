/**
 * Site-wide settings. Edit this file to personalise the portfolio.
 *
 * PLACEHOLDER BEHAVIOUR (contact details)
 * ---------------------------------------
 * The email, GitHub and LinkedIn values below are placeholders. While a value
 * still contains a placeholder marker ("your-username", "your.email",
 * "example.com") or is empty / not a valid URL or address:
 *   - it is shown as a clearly labelled, dashed "not set yet" item,
 *   - it is NOT turned into a link, so there are no dead or fake links.
 * Replace the values with your real ones and the links switch on automatically.
 */
export const siteConfig = {
  name: 'Md. Najmul Hasan',
  profileImage: '/najmul%20picture.jpeg',
  role: 'Frontend Developer',
  roles: 'Frontend Developer | Aspiring Full-Stack Developer | AI/ML Enthusiast',
  headline: 'Frontend development with a foundation in data science and machine learning.',
  description:
    'Computer Science and Engineering graduate from Green University of Bangladesh (2024), with a background in Python, Django, machine learning, data science and Power BI. I am especially interested in frontend development and building responsive, user-friendly applications.',

  /**
   * Optional status badge in the hero. Hidden by default.
   * Only set `show: true` while the label is accurate.
   */
  availability: {
    show: false,
    label: 'Open to Junior Frontend Developer roles',
  },

  /** Update these details as you add your contact and social links. */
  contact: {
    email: 'info.najmul1234@gmail.com',
    mobile: '01826101550',
    github: 'https://github.com/NajmulHasan-CSE',
    linkedin: 'https://www.linkedin.com/in/md-najmul-hasan-72515a325',
  },

  /**
   * CV / resume. Put your PDF at frontend/public/Md_Najmul_Hasan_Resume.pdf (or change `url`).
   * The Download CV buttons only download when that file really exists;
   * otherwise they open a short "how to add your CV" dialog.
   */
  resume: {
    url: '/Md_Najmul_Hasan_Resume.pdf',
    fileName: 'Md_Najmul_Hasan_Resume.pdf',
  },

  /**
   * Contact form delivery. Values come from the project-root najmul.env file.
   * With nothing configured, the form validates input but tells the visitor
   * honestly that it is not connected yet.
   */
  form: {
    // The backend saves messages; Web3Forms sends email directly from the browser.
    apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
    web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '',
  },
};
