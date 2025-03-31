# Professional Profile Site

A modern, responsive personal profile/portfolio website built with HTML, CSS, and JavaScript. This site is designed to showcase your professional experience, skills, projects, and education to potential employers or clients.

## Features

- Fully responsive design that works on all devices
- Modern UI with smooth animations and transitions
- Interactive navigation with smooth scrolling
- Mobile-friendly navigation with hamburger menu
- Contact form with client-side validation
- Project showcase section
- Skills, experience, and education sections
- Social media integration

## Live Demo

The site is hosted on GitHub Pages and can be viewed at: [https://AMAN-BARBARIA.github.io](https://AMAN-BARBARIA.github.io)

## Customization Guide

### Basic Information

To customize this template for your own use:

1. **Personal Information**: Update the following in `index.html`:
   - Your name in the header section
   - Professional title/role
   - About me section content
   - Contact information
   - Social media links

2. **Experience**: Modify the experience timeline in the experience section with your work history.

3. **Skills**: Update the skills section with your own skills categorized appropriately.

4. **Education**: Change the education section with your educational background.

5. **Projects**: Replace the project cards with your own projects, including:
   - Project titles and descriptions
   - Technologies used
   - Project links (GitHub, live demos)

### Styling

The site uses CSS variables for easy customization:

1. **Color Scheme**: Edit the root variables in `css/styles.css` to change the color scheme:
   ```css
   :root {
     --primary-color: #4a6cf7;
     --primary-dark: #3a56c4;
     --secondary-color: #f0f4ff;
     /* Other color variables */
   }
   ```

2. **Fonts**: The site uses Google Fonts (Poppins). To change the font:
   - Update the Google Fonts link in the `<head>` section of `index.html`
   - Change the font-family in the body selector in `css/styles.css`

### Profile Picture

To add your profile picture:

1. Replace the profile placeholder with your image:
   ```html
   <div class="about-image">
     <img src="images/your-profile-picture.jpg" alt="Your Name">
   </div>
   ```

2. Create an `images` directory and add your profile picture.

### Resume Download

To enable the resume download functionality:

1. Add your resume PDF to the repository
2. Update the resume button link in `index.html`:
   ```html
   <a href="path/to/your-resume.pdf" class="btn secondary-btn" id="resume-btn" download>Download Resume</a>
   ```
3. Remove the event listener for the resume button in `js/script.js`

### Contact Form

The contact form is set up for static sites. To make it functional:

1. Use a form submission service like Formspree, Netlify Forms, or EmailJS
2. Update the form action and method attributes in the HTML
3. Modify the form submission handler in `js/script.js` accordingly

## Development

To run the project locally:

1. Clone the repository:
   ```
   git clone https://github.com/AMAN-BARBARIA/AMAN-BARBARIA.github.io.git
   ```

2. Navigate to the project directory:
   ```
   cd AMAN-BARBARIA.github.io
   ```

3. Open `index.html` in your browser or use a local server:
   ```
   python -m http.server
   ```

## Deployment

This site is designed to be deployed on GitHub Pages:

1. Push your changes to the GitHub repository
2. GitHub will automatically build and deploy the site

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Font Awesome for icons
- Google Fonts for typography
- GitHub Pages for hosting 