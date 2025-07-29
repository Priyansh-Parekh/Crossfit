// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-us-form');
    const successMessage = document.getElementById('contact-us-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to your server
            // For now, we'll just show the success message
            
            // Hide the form
            this.style.display = 'none';
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
});