// Beyond Everest - Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initScrollEffects();
    initGalleryLightbox();
    initWeatherWidget();
    initMapsIntegration();
    initAnimations();
    initFestivalCalendar();
    initNewsletterForm();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects (animations, parallax)
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            let scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
    
    // Intersection Observer for animation triggers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img, .culture-card-img img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            
            const closeButton = document.createElement('span');
            closeButton.classList.add('lightbox-close');
            closeButton.innerHTML = '&times;';
            
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(closeButton);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Handle closing the lightbox
            closeButton.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Weather Widget functionality
function initWeatherWidget() {
    const weatherWidget = document.querySelector('.weather-widget');
    if (!weatherWidget) return;
    
    // Sample locations in Nepal for weather data
    const locations = [
        { name: 'Kathmandu', lat: 27.7172, lon: 85.3240 },
        { name: 'Pokhara', lat: 28.2096, lon: 83.9856 },
        { name: 'Chitwan', lat: 27.5291, lon: 84.3542 },
        { name: 'Lumbini', lat: 27.4833, lon: 83.2761 },
        { name: 'Nagarkot', lat: 27.7289, lon: 85.5233 }
    ];
    
    // Location selector
    const locationSelect = document.getElementById('weather-location');
    if (locationSelect) {
        locations.forEach(loc => {
            const option = document.createElement('option');
            option.value = `${loc.lat},${loc.lon}`;
            option.textContent = loc.name;
            locationSelect.appendChild(option);
        });
        
        locationSelect.addEventListener('change', function() {
            const [lat, lon] = this.value.split(',');
            fetchWeatherData(lat, lon);
        });
        
        // Initial weather fetch
        const [defaultLat, defaultLon] = locationSelect.value.split(',');
        fetchWeatherData(defaultLat, defaultLon);
    }
    
    // Function to fetch weather data
    function fetchWeatherData(lat, lon) {
        // In a real implementation, you would use a weather API
        // Since this is a template, we'll simulate weather data
        
        const weatherIcons = {
            clear: 'sunny.svg',
            clouds: 'cloudy.svg',
            rain: 'rainy.svg',
            snow: 'snowy.svg'
        };
        
        // Simulated weather data
        const simulatedWeather = {
            temp: Math.floor(Math.random() * 15) + 15, // 15-30°C
            feels_like: Math.floor(Math.random() * 15) + 15,
            humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
            wind_speed: Math.floor(Math.random() * 10) + 2, // 2-12 km/h
            description: ['Sunny', 'Partly cloudy', 'Scattered clouds', 'Light rain', 'Clear sky'][Math.floor(Math.random() * 5)],
            icon: ['clear', 'clouds', 'clouds', 'rain', 'clear'][Math.floor(Math.random() * 5)]
        };
        
        // Update UI with weather data
        document.querySelector('.weather-date').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        document.querySelector('.weather-icon').src = `images/weather/${weatherIcons[simulatedWeather.icon]}`;
        document.querySelector('.weather-temp').textContent = `${simulatedWeather.temp}°C`;
        document.querySelector('.weather-desc').textContent = simulatedWeather.description;
        
        document.querySelector('.detail-value[data-type="feels-like"]').textContent = `${simulatedWeather.feels_like}°C`;
        document.querySelector('.detail-value[data-type="humidity"]').textContent = `${simulatedWeather.humidity}%`;
        document.querySelector('.detail-value[data-type="wind"]').textContent = `${simulatedWeather.wind_speed} km/h`;
        
        // In a real application, you would use:
        /*
        const API_KEY = 'your_api_key';
        const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        
        fetch(WEATHER_API_URL)
            .then(response => response.json())
            .then(data => {
                // Process data and update UI
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
        */
    }
}

// Google Maps Integration
function initMapsIntegration() {
    const mapElement = document.getElementById('nepal-map');
    if (!mapElement) return;
    
    // Cultural points in Nepal
    const culturalPoints = [
        { name: 'Kathmandu Durbar Square', lat: 27.7049, lng: 85.3072, type: 'UNESCO Site' },
        { name: 'Pashupatinath Temple', lat: 27.7109, lng: 85.3485, type: 'Religious Site' },
        { name: 'Swayambhunath Stupa', lat: 27.7149, lng: 85.2903, type: 'Religious Site' },
        { name: 'Boudhanath Stupa', lat: 27.7215, lng: 85.3620, type: 'UNESCO Site' },
        { name: 'Bhaktapur Durbar Square', lat: 27.6719, lng: 85.4298, type: 'UNESCO Site' },
        { name: 'Patan Durbar Square', lat: 27.6739, lng: 85.3257, type: 'UNESCO Site' },
        { name: 'Lumbini', lat: 27.4833, lng: 83.2761, type: 'UNESCO Site' },
        { name: 'Janaki Mandir', lat: 26.7271, lng: 85.9255, type: 'Religious Site' },
        { name: 'Gorkha Durbar', lat: 28.0023, lng: 84.6259, type: 'Historical Site' },
        { name: 'Lo Manthang', lat: 29.1895, lng: 83.9628, type: 'Cultural Heritage' },
        { name: 'Namche Bazaar', lat: 27.8069, lng: 86.7140, type: 'Sherpa Culture' }
    ];
    
    // In a real implementation, you would use Google Maps API
    // Since this is a template, we'll create a placeholder map message
    
    mapElement.innerHTML = `
        <div class="map-placeholder">
            <h3>Interactive Map of Nepal's Cultural Sites</h3>
            <p>This would display a Google Map with ${culturalPoints.length} cultural points marked.</p>
            <p>In the actual implementation, this will be an interactive map where users can explore UNESCO sites, religious places, historical landmarks, and other cultural attractions.</p>
            <button class="btn btn-primary map-init-btn">Initialize Map</button>
        </div>
    `;
    
    // Button event to simulate map loading
    document.querySelector('.map-init-btn').addEventListener('click', function() {
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            mapElement.innerHTML = `
                <div class="map-loaded">
                    <div class="map-header">
                        <h3>Cultural Heritage Sites of Nepal</h3>
                        <div class="map-filters">
                            <label><input type="checkbox" checked> UNESCO Sites</label>
                            <label><input type="checkbox" checked> Religious Sites</label>
                            <label><input type="checkbox" checked> Historical Sites</label>
                            <label><input type="checkbox" checked> Cultural Centers</label>
                        </div>
                    </div>
                    <div class="map-content">
                        <div class="map-canvas"></div>
                        <div class="map-sidebar">
                            <h4>Selected Cultural Sites</h4>
                            <ul class="cultural-sites-list">
                                ${culturalPoints.map(point => `
                                    <li>
                                        <strong>${point.name}</strong>
                                        <span class="site-type">${point.type}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            
            // For a real implementation, you would initialize Google Maps here:
            /*
            const map = new google.maps.Map(document.querySelector('.map-canvas'), {
                center: { lat: 28.3949, lng: 84.1240 }, // Center of Nepal
                zoom: 7
            });
            
            // Add markers for cultural points
            culturalPoints.forEach(point => {
                const marker = new google.maps.Marker({
                    position: { lat: point.lat, lng: point.lng },
                    map: map,
                    title: point.name
                });
                
                // Add info windows
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div><h3>${point.name}</h3><p>${point.type}</p></div>`
                });
                
                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
            */
        }, 1500);
    });
}

// Animation initialization
function initAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in');
    });
    
    document.querySelectorAll('.card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.culture-card').forEach((el, index) => {
        el.classList.add('slide-in');
        el.style.animationDelay = `${index * 0.15}s`;
    });
    
    document.querySelectorAll('.gallery-item').forEach((el, index) => {
        el.classList.add('zoom-in');
        el.style.animationDelay = `${index * 0.05}s`;
    });
    
    document.querySelectorAll('.feature-image').forEach(el => {
        el.classList.add('slide-in');
    });
    
    document.querySelectorAll('.feature-content').forEach(el => {
        el.classList.add('fade-in');
    });
}

// Festival Calendar
function initFestivalCalendar() {
    const festivalSection = document.querySelector('.festivals-section');
    if (!festivalSection) return;
    
    // Nepal follows a different calendar (Bikram Sambat)
    // This function converts Gregorian months to approx. Nepali months
    function getBikramMonth(gregorianMonth) {
        // Rough mapping, not accurate for all years
        const months = [
            'Magh', 'Falgun', 'Chaitra', 'Baisakh', 
            'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 
            'Ashwin', 'Kartik', 'Mangsir', 'Poush'
        ];
        // Shift by approximately 4 months (Baisakh starts ~mid-April)
        return months[(gregorianMonth + 3) % 12];
    }
    
    // Major festivals in Nepal
    // Note: Many festivals follow lunar calendar, so dates change yearly
    const festivals = [
        { name: 'Dashain', month: 'Ashwin', description: 'The most important festival in Nepal celebrating the victory of good over evil. It lasts for 15 days with various rituals and family gatherings.' },
        { name: 'Tihar (Diwali)', month: 'Kartik', description: 'Five-day festival of lights honoring different animals and deities, ending with Bhai Tika which celebrates the brother-sister relationship.' },
        { name: 'Holi', month: 'Falgun', description: 'Festival of colors celebrating the arrival of spring and victory of good over evil. People throw colored powder and water at each other.' },
        { name: 'Buddha Jayanti', month: 'Baisakh', description: 'Celebrating Buddha\'s birth, enlightenment, and death. Major celebrations at Lumbini, Buddha\'s birthplace.' },
        { name: 'Bisket Jatra', month: 'Baisakh', description: 'New Year festival in Bhaktapur featuring chariot processions and the tug-of-war ritual.' },
        { name: 'Indra Jatra', month: 'Bhadra', description: 'Eight-day festival in Kathmandu honoring Indra, the god of rain, featuring the display of Kumari, the living goddess.' },
        { name: 'Teej', month: 'Bhadra', description: 'Hindu women fast and pray for the well-being of their husbands. Unmarried women pray for a good future husband.' },
        { name: 'Losar', month: 'Magh', description: 'Tibetan New Year celebrated by Sherpa, Tamang, and Gurung communities with prayers, feasts, and dance.' },
        { name: 'Gai Jatra', month: 'Bhadra', description: 'Festival honoring those who died in the past year. Families with recent deaths lead a cow in procession, or a child dressed as a cow.' },
        { name: 'Mani Rimdu', month: 'Kartik', description: 'Buddhist festival in the Everest region featuring masked dances and religious ceremonies at Tengboche Monastery.' },
        { name: 'Chhath Puja', month: 'Kartik', description: 'Festival dedicated to the Sun God. Devotees fast and offer prayers at river banks at sunrise and sunset.' },
        { name: 'Janai Purnima', month: 'Shrawan', description: 'Sacred thread festival where Hindu men change their janai (holy thread) and everyone ties rakhi thread on their wrists for protection.' }
    ];
    
    // Generate festival calendar
    const calendarContainer = document.querySelector('.festivals-timeline');
    if (calendarContainer) {
        festivals.forEach((festival, index) => {
            const position = index % 2 === 0 ? 'left' : 'right';
            const festivalElement = document.createElement('div');
            festivalElement.classList.add('timeline-item', position);
            
            festivalElement.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-month">${festival.month}</div>
                    <h3 class="timeline-title">${festival.name}</h3>
                    <p>${festival.description}</p>
                </div>
            `;
            
            calendarContainer.appendChild(festivalElement);
        });
    }
}

// Newsletter Form Handling
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            showFormMessage('Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button');
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showFormMessage('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
            submitButton.textContent = 'Subscribe';
            submitButton.disabled = false;
        }, 1500);
        
        // In a real implementation, you would send data to server:
        /*
        fetch('api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            showFormMessage(data.message, data.success ? 'success' : 'error');
            if (data.success) emailInput.value = '';
        })
        .catch(error => {
            showFormMessage('An error occurred. Please try again later.', 'error');
        })
        .finally(() => {
            submitButton.textContent = 'Subscribe';
            submitButton.disabled = false;
        });
        */
    });
    
    function showFormMessage(message, type) {
        let messageDiv = document.querySelector('.newsletter-message');
        
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.classList.add('newsletter-message');
            newsletterForm.insertAdjacentElement('afterend', messageDiv);
        }
        
        messageDiv.textContent = message;
        messageDiv.className = 'newsletter-message';
        messageDiv.classList.add(`message-${type}`);
        
        setTimeout(() => {
            messageDiv.classList.add('fade-out');
            setTimeout(() => {
                messageDiv.remove();
            }, 500);
        }, 3000);
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
}

// Additional functionality for Cultural Section
document.addEventListener('DOMContentLoaded', function() {
    // Cultural theme filter
    const themeFilters = document.querySelectorAll('.culture-filter');
    const cultureCards = document.querySelectorAll('.culture-card');
    
    if (themeFilters.length && cultureCards.length) {
        themeFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                
                // Update active filter
                themeFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                if (theme === 'all') {
                    cultureCards.forEach(card => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('fade-out');
                        }, 50);
                    });
                } else {
                    cultureCards.forEach(card => {
                        const cardTheme = card.getAttribute('data-theme');
                        
                        if (cardTheme === theme) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.classList.remove('fade-out');
                            }, 50);
                        } else {
                            card.classList.add('fade-out');
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 500);
                        }
                    });
                }
            });
        });
    }
    
    // Cultural attire viewer
    const traditionalAttires = document.querySelectorAll('.traditional-attire');
    
    if (traditionalAttires.length) {
        traditionalAttires.forEach(attire => {
            attire.addEventListener('click', function() {
                const attireName = this.getAttribute('data-name');
                const attireDesc = this.getAttribute('data-description');
                const attireEthnic = this.getAttribute('data-ethnic');
                const attireImage = this.querySelector('img').src;
                
                // Create modal for attire details
                const attireModal = document.createElement('div');
                attireModal.classList.add('attire-modal');
                
                attireModal.innerHTML = `
                    <div class="attire-modal-content">
                        <span class="attire-modal-close">&times;</span>
                        <div class="attire-modal-image">
                            <img src="${attireImage}" alt="${attireName}">
                        </div>
                        <div class="attire-modal-info">
                            <h3>${attireName}</h3>
                            <span class="attire-ethnic-group">${attireEthnic}</span>
                            <p>${attireDesc}</p>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(attireModal);
                document.body.style.overflow = 'hidden';
                
                // Close modal functionality
                const closeBtn = attireModal.querySelector('.attire-modal-close');
                closeBtn.addEventListener('click', closeAttireModal);
                attireModal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeAttireModal();
                    }
                });
                
                function closeAttireModal() {
                    document.body.removeChild(attireModal);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    
    // Language phrases audio player
    const phrasePlayers = document.querySelectorAll('.phrase-player');
    
    if (phrasePlayers.length) {
        phrasePlayers.forEach(player => {
            const playButton = player.querySelector('.play-phrase');
            const phrase = player.getAttribute('data-phrase');
            
            playButton.addEventListener('click', function() {
                // In a real implementation, you would play an audio file
                // This is a placeholder to show UI functionality
                this.classList.add('playing');
                this.textContent = 'Playing...';
                
                setTimeout(() => {
                    this.classList.remove('playing');
                    this.textContent = 'Play';
                }, 2000);
                
                // Actual audio implementation would be:
                /*
                const audio = new Audio(`audio/phrases/${phrase}.mp3`);
                audio.play();
                
                audio.onplay = () => {
                    this.classList.add('playing');
                    this.textContent = 'Playing...';
                };
                
                audio.onended = () => {
                    this.classList.remove('playing');
                    this.textContent = 'Play';
                };
                */
            });
        });
    }
});