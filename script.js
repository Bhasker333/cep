// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            let scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        }
    });
    
    // 3D card hover effects
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Image gallery lightbox
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryImages.length > 0 && lightbox && lightboxImg && lightboxClose) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
function getWeatherData() {
    // Replace with your actual API key
    const apiKey = '3fade62dc5230fad5b1507164daac77c';
    
    // Array of locations to fetch weather for
    const locations = ['Kathmandu', 'Pokhara', 'Lukla'];
    
    locations.forEach(location => {
        const weatherContainer = document.querySelector(`#${location.toLowerCase()}-weather .weather-info`);
        
        if (!weatherContainer) return;
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},np&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Weather data not available for ${location}`);
                }
                return response.json();
            })
            .then(data => {
                const html = `
                    <div class="weather-card">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                        <p class="temp">${Math.round(data.main.temp)}°C</p>
                        <p class="weather-desc">${data.weather[0].description}</p>
                        <div class="weather-details">
                            <p>Humidity: ${data.main.humidity}%</p>
                            <p>Wind: ${data.wind.speed} m/s</p>
                        </div>
                    </div>
                `;
                weatherContainer.innerHTML = html;
            })
            .catch(error => {
                weatherContainer.innerHTML = `<p class="error">Weather data currently unavailable</p>`;
                console.error(`Weather API error for ${location}:`, error);
            });
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    getWeatherData();
});



// Map initialization for destinations
function initMap() {
    const mapContainer = document.getElementById('nepal-map');
    if (!mapContainer) return;
    
    // Replace with your actual Map API key
    
    // Example for Google Maps
    const map = new google.maps.Map(mapContainer, {
        center: { lat: 28.3949, lng: 84.1240 }, // Center of Nepal
        zoom: 7,
        mapTypeId: 'terrain'
    });
    
    // Add markers for popular destinations
    const destinations = [
        { name: 'Kathmandu', lat: 27.7172, lng: 85.3240, type: 'city' },
        { name: 'Pokhara', lat: 28.2096, lng: 83.9856, type: 'city' },
        { name: 'Mount Everest', lat: 27.9881, lng: 86.9250, type: 'mountain' },
        { name: 'Annapurna Base Camp', lat: 28.5308, lng: 83.8791, type: 'trekking' },
        { name: 'Chitwan National Park', lat: 27.5291, lng: 84.3542, type: 'park' },
        { name: 'Lumbini', lat: 27.4833, lng: 83.2767, type: 'heritage' }
    ];
    
    destinations.forEach(dest => {
        const marker = new google.maps.Marker({
            position: { lat: dest.lat, lng: dest.lng },
            map: map,
            title: dest.name,
            icon: `icons/${dest.type}.png` // You'll need to create these icons
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info">
                    <h3>${dest.name}</h3>
                    <p>Type: ${dest.type}</p>
                    <a href="${dest.type}s.html#${dest.name.toLowerCase().replace(/\s+/g, '-')}">View Details</a>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Email newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            if (!email || !validateEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Replace with your actual backend API endpoint
            fetch('api/newsletter-subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Subscription failed');
                }
                return response.json();
            })
            .then(data => {
                showMessage('Thank you for subscribing to our newsletter!', 'success');
                newsletterForm.reset();
            })
            .catch(error => {
                showMessage('Subscription failed. Please try again later.', 'error');
                console.error('Newsletter subscription error:', error);
            });
        });
    }
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Feedback message display
function showMessage(message, type = 'info') {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message ${type}`;
    messageContainer.textContent = message;
    
    document.body.appendChild(messageContainer);
    
    setTimeout(() => {
        messageContainer.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        messageContainer.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(messageContainer);
        }, 300);
    }, 3000);
}

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Trip planner functionality
document.addEventListener('DOMContentLoaded', function() {
    const plannerForm = document.getElementById('trip-planner-form');
    
    if (plannerForm) {
        plannerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(plannerForm);
            const tripData = {
                startDate: formData.get('start-date'),
                endDate: formData.get('end-date'),
                travelers: formData.get('travelers'),
                interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el => el.value),
                budget: formData.get('budget')
            };
            
            // Generate itinerary based on form data
            generateItinerary(tripData);
        });
    }
});

// Generate travel itinerary based on user preferences
function generateItinerary(tripData) {
    const resultsContainer = document.getElementById('itinerary-results');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '<p>Generating your personalized itinerary...</p>';
    
    // Calculate trip duration
    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);
    const tripDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (tripDuration <= 0) {
        resultsContainer.innerHTML = '<p class="error">Please select valid dates</p>';
        return;
    }
    
    // This would typically be an API call to a backend service
    // For demonstration, we'll generate a simple itinerary based on interests
    setTimeout(() => {
        let itineraryHTML = `
            <div class="itinerary-container">
                <h2>Your ${tripDuration}-Day Nepal Adventure</h2>
                <p>Customized for ${tripData.travelers} traveler(s) with interests in ${tripData.interests.join(', ')}</p>
                <div class="itinerary-days">
        `;
        
        // Simple logic to distribute activities based on interests
        for (let day = 1; day <= tripDuration; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + day - 1);
            
            itineraryHTML += `
                <div class="itinerary-day">
                    <h3>Day ${day} - ${currentDate.toLocaleDateString()}</h3>
                    <div class="itinerary-activities">
            `;
            
            // Add activities based on interests
            if (tripData.interests.includes('culture') && day % 3 === 1) {
                itineraryHTML += `
                    <div class="activity">
                        <span class="time">09:00 - 12:00</span>
                        <div class="activity-details">
                            <h4>Cultural Tour</h4>
                            <p>Visit historical sites in Kathmandu Valley</p>
                        </div>
                    </div>
                `;
            }
            
            if (tripData.interests.includes('trekking') && day % 3 === 2) {
                itineraryHTML += `
                    <div class="activity">
                        <span class="time">08:00 - 16:00</span>
                        <div class="activity-details">
                            <h4>Day Hike</h4>
                            <p>Scenic trek through hills with mountain views</p>
                        </div>
                    </div>
                `;
            }
            
            if (tripData.interests.includes('adventure') && day % 3 === 0) {
                itineraryHTML += `
                    <div class="activity">
                        <span class="time">10:00 - 14:00</span>
                        <div class="activity-details">
                            <h4>Adventure Activity</h4>
                            <p>Paragliding, white water rafting, or zip-lining</p>
                        </div>
                    </div>
                `;
            }
            
            if (tripData.interests.includes('nature')) {
                itineraryHTML += `
                    <div class="activity">
                        <span class="time">15:00 - 17:00</span>
                        <div class="activity-details">
                            <h4>Nature Walk</h4>
                            <p>Explore local flora and fauna</p>
                        </div>
                    </div>
                `;
            }
            
            itineraryHTML += `
                    </div>
                </div>
            `;
        }
        
        itineraryHTML += `
                </div>
                <div class="itinerary-summary">
                    <h3>Estimated Budget</h3>
                    <p>Based on your preferences, the estimated cost for this trip is: $${calculateEstimatedBudget(tripData)}</p>
                    <div class="itinerary-actions">
                        <button class="btn primary">Save Itinerary</button>
                        <button class="btn secondary">Request Modifications</button>
                    </div>
                </div>
            </div>
        `;
        
        resultsContainer.innerHTML = itineraryHTML;
    }, 1500);
}

// Calculate estimated budget based on trip parameters
function calculateEstimatedBudget(tripData) {
    const baseCostPerDay = 50; // Base cost per person per day in USD
    
    // Multipliers based on interests
    const interestMultipliers = {
        'culture': 1.2,
        'trekking': 1.8,
        'adventure': 1.8,
        'nature': 1.1,
        'food': 1.0,
        'heritage': 1.2
    };
    
    // Calculate trip duration
    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);
    const tripDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Start with base cost
    let totalCost = baseCostPerDay * tripDuration * tripData.travelers;
    
    // Apply interest multipliers
    let interestMultiplier = 1;
    tripData.interests.forEach(interest => {
        if (interestMultipliers[interest]) {
            interestMultiplier += (interestMultipliers[interest] - 1) / tripData.interests.length;
        }
    });
    
    totalCost *= interestMultiplier;
    
    // Budget level adjustment
    switch (tripData.budget) {
        case 'budget':
            totalCost *= 0.6;
            break;
        case 'comfort':
            totalCost *= 1;
            break;
        case 'luxury':
            totalCost *= 1.4;
            break;
        default:
            break;
    }
    
    return Math.round(totalCost);
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(img => {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        img.classList.remove('lazy');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});

// Currency converter widget
function initCurrencyConverter() {
    const converterWidget = document.getElementById('currency-converter');
    if (!converterWidget) return;
    
    const baseInput = document.getElementById('base-amount');
    const baseSelect = document.getElementById('base-currency');
    const targetSelect = document.getElementById('target-currency');
    const resultElement = document.getElementById('conversion-result');
    const convertBtn = document.getElementById('convert-btn');
    
    if (convertBtn) {
        convertBtn.addEventListener('click', () => {
            const amount = parseFloat(baseInput.value);
            if (isNaN(amount)) {
                resultElement.textContent = 'Please enter a valid amount';
                return;
            }
            
            const baseCurrency = baseSelect.value;
            const targetCurrency = targetSelect.value;
            
            // Replace with your actual API key
            const apiKey = 'YOUR_CURRENCY_API_KEY';
            
            fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Currency conversion failed');
                    }
                    return response.json();
                })
                .then(data => {
                    const rate = data.rates[targetCurrency];
                    const convertedAmount = (amount * rate).toFixed(2);
                    resultElement.textContent = `${amount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}`;
                })
                .catch(error => {
                    resultElement.textContent = 'Conversion failed. Please try again.';
                    console.error('Currency conversion error:', error);
                });
        });
    }
}

// Initialize all widgets and functionalities
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    getWeatherData();
    initCurrencyConverter();
    
    // Load map when map API is available
    if (typeof google !== 'undefined' && google.maps) {
        initMap();
    } else {
        // Add Google Maps API script if needed
        const mapApiKey = 'AIzaSyDiE5JzRnO5WCeChnjrNSDWo68ZBtV8gMo';
        const mapScript = document.createElement('script');
        mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap`;
        mapScript.async = true;
        mapScript.defer = true;
        document.head.appendChild(mapScript);
    }
    
    // Initialize custom sliders
    const sliders = document.querySelectorAll('.custom-slider');
    sliders.forEach(slider => {
        let isDragging = false;
        const track = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('.slide');
        
        if (!track || slides.length === 0) return;
        
        let startX, scrollLeft;
        
        track.addEventListener('mousedown', e => {
            isDragging = true;
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            track.style.cursor = 'grabbing';
        });
        
        track.addEventListener('mouseleave', () => {
            isDragging = false;
            track.style.cursor = 'grab';
        });
        
        track.addEventListener('mouseup', () => {
            isDragging = false;
            track.style.cursor = 'grab';
        });
        
        track.addEventListener('mousemove', e => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        track.addEventListener('touchstart', e => {
            isDragging = true;
            startX = e.touches[0].pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        
        track.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        track.addEventListener('touchmove', e => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
    });
});






















// Trip planner functionality
document.addEventListener('DOMContentLoaded', function() {
    const plannerForm = document.getElementById('trip-planner-form');
    initializeModals();
    
    if (plannerForm) {
        plannerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(plannerForm);
            const tripData = {
                startDate: formData.get('start-date'),
                endDate: formData.get('end-date'),
                travelers: formData.get('travelers'),
                interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(el => el.value),
                budget: formData.get('budget')
            };
            
            // Generate itinerary based on form data
            generateItinerary(tripData);
        });
    }
    
    // Initialize flight search button
    const flightSearchBtn = document.getElementById('flight-search-btn');
    if (flightSearchBtn) {
        flightSearchBtn.addEventListener('click', function() {
            openFlightSearchModal();
        });
    }
    
    // Initialize hotel search button
    const hotelSearchBtn = document.getElementById('hotel-search-btn');
    if (hotelSearchBtn) {
        hotelSearchBtn.addEventListener('click', function() {
            openHotelSearchModal();
        });
    }
});

// Initialize modal functionality
function initializeModals() {
    // Create flight search modal
    const flightModal = document.createElement('div');
    flightModal.id = 'flight-search-modal';
    flightModal.className = 'modal';
    flightModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Search Flights to Nepal</h2>
            <form id="flight-search-form">
                <div class="form-group">
                    <label for="departure-city">Departure City</label>
                    <input type="text" id="departure-city" name="departure-city" placeholder="e.g., New York" required>
                </div>
                
                <div class="form-group">
                    <label for="departure-date">Departure Date</label>
                    <input type="date" id="departure-date" name="departure-date" required>
                </div>
                
                <div class="form-group">
                    <label for="return-date">Return Date</label>
                    <input type="date" id="return-date" name="return-date" required>
                </div>
                
                <div class="form-group">
                    <label for="flight-passengers">Passengers</label>
                    <input type="number" id="flight-passengers" name="flight-passengers" min="1" value="1" required>
                </div>
                
                <button type="submit" class="btn primary">Search Available Flights</button>
            </form>
            <div id="flight-search-results"></div>
        </div>
    `;
    document.body.appendChild(flightModal);
    
    // Create hotel search modal
    const hotelModal = document.createElement('div');
    hotelModal.id = 'hotel-search-modal';
    hotelModal.className = 'modal';
    hotelModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Find Accommodations in Nepal</h2>
            <form id="hotel-search-form">
                <div class="form-group">
                    <label for="destination">Destination</label>
                    <select id="destination" name="destination" required>
                        <option value="">Select a destination</option>
                        <option value="kathmandu">Kathmandu</option>
                        <option value="pokhara">Pokhara</option>
                        <option value="chitwan">Chitwan</option>
                        <option value="nagarkot">Nagarkot</option>
                        <option value="lumbini">Lumbini</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="check-in">Check-in Date</label>
                    <input type="date" id="check-in" name="check-in" required>
                </div>
                
                <div class="form-group">
                    <label for="check-out">Check-out Date</label>
                    <input type="date" id="check-out" name="check-out" required>
                </div>
                
                <div class="form-group">
                    <label for="rooms">Rooms</label>
                    <input type="number" id="rooms" name="rooms" min="1" value="1" required>
                </div>
                
                <div class="form-group">
                    <label for="accommodation-type">Accommodation Type</label>
                    <select id="accommodation-type" name="accommodation-type">
                        <option value="any">Any</option>
                        <option value="hotel">Hotel</option>
                        <option value="hostel">Hostel</option>
                        <option value="guesthouse">Guesthouse</option>
                        <option value="resort">Resort</option>
                        <option value="homestay">Homestay</option>
                    </select>
                </div>
                
                <button type="submit" class="btn primary">Find Accommodations</button>
            </form>
            <div id="hotel-search-results"></div>
        </div>
    `;
    document.body.appendChild(hotelModal);
    
    // Add event listeners to close modal buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Add event listeners to modal forms
    const flightSearchForm = document.getElementById('flight-search-form');
    if (flightSearchForm) {
        flightSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchFlights(new FormData(flightSearchForm));
        });
    }
    
    const hotelSearchForm = document.getElementById('hotel-search-form');
    if (hotelSearchForm) {
        hotelSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchAccommodations(new FormData(hotelSearchForm));
        });
    }
}

// Generate travel itinerary based on user preferences
function generateItinerary(tripData) {
    const resultsContainer = document.getElementById('itinerary-results');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '<p>Generating your personalized itinerary...</p>';
    
    // In a real application, this would be an API call
    // For this implementation, we'll simulate an API call with a delay
    setTimeout(() => {
        // API simulation
        fetch('https://api.example.com/generate-itinerary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripData)
            // In an actual implementation, this would send the data to a backend
        })
        .then(response => {
            // Since we're simulating, create a mock response
            // In a real application, this would be response.json()
            return createMockItinerary(tripData);
        })
        .then(itineraryData => {
            displayItinerary(itineraryData, resultsContainer);
        })
        .catch(error => {
            console.error('Error generating itinerary:', error);
            resultsContainer.innerHTML = '<p class="error">There was an error generating your itinerary. Please try again.</p>';
        });
    }, 1500); // Simulate API delay
}

// Simulate API response for itinerary generation
function createMockItinerary(tripData) {
    // Calculate trip duration
    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);
    const tripDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (tripDuration <= 0) {
        throw new Error('Invalid date range');
    }
    
    // Create mock data for database items
    const attractions = {
        'culture': [
            { name: 'Pashupatinath Temple', description: 'Sacred Hindu temple complex', duration: '3 hours', cost: 15 },
            { name: 'Swayambhunath Stupa', description: 'Ancient religious architecture with panoramic views', duration: '2 hours', cost: 10 },
            { name: 'Kathmandu Durbar Square', description: 'UNESCO World Heritage site with palaces and temples', duration: '4 hours', cost: 20 },
            { name: 'Bhaktapur', description: 'Ancient Newar city with rich culture and architecture', duration: '5 hours', cost: 25 },
            { name: 'Patan Museum', description: 'Showcase of Nepali art and architecture', duration: '2 hours', cost: 12 }
        ],
        'trekking': [
            { name: 'Nagarkot Day Hike', description: 'Scenic trek with views of the Himalayas', duration: '6 hours', cost: 35 },
            { name: 'Shivapuri National Park Trek', description: 'Trek through diverse landscapes and forest', duration: '8 hours', cost: 45 },
            { name: 'Phulchowki Hike', description: 'Highest hill around Kathmandu Valley with bird watching', duration: '7 hours', cost: 40 },
            { name: 'Champadevi Hill Trek', description: 'Popular day hike with stunning views', duration: '5 hours', cost: 30 },
            { name: 'Chisapani Trek', description: 'Overnight trek with beautiful sunrise views', duration: '2 days', cost: 80 }
        ],
        'adventure': [
            { name: 'Paragliding in Pokhara', description: 'Soar above Phewa Lake with mountain views', duration: '3 hours', cost: 90 },
            { name: 'White Water Rafting', description: 'Thrilling river adventure on Trishuli River', duration: '4 hours', cost: 65 },
            { name: 'Zip Flying', description: 'One of the world\'s steepest and longest ziplines', duration: '2 hours', cost: 80 },
            { name: 'Bungee Jumping', description: 'Leap from Nepal\'s first bungee jumping site', duration: '3 hours', cost: 95 },
            { name: 'Mountain Biking', description: 'Off-road cycling adventure through varied terrain', duration: '5 hours', cost: 55 }
        ],
        'nature': [
            { name: 'Botanical Gardens', description: 'Explore local flora and fauna', duration: '2 hours', cost: 8 },
            { name: 'Phewa Lake Boating', description: 'Peaceful boat ride with mountain reflections', duration: '2 hours', cost: 15 },
            { name: 'Chitwan National Park Safari', description: 'Wildlife spotting in Nepal\'s famous reserve', duration: '4 hours', cost: 45 },
            { name: 'Himalayan Viewpoint Visit', description: 'Spectacular mountain panoramas', duration: '3 hours', cost: 20 },
            { name: 'Bird Watching Tour', description: 'Guided tour to spot Nepal\'s diverse birdlife', duration: '3 hours', cost: 25 }
        ],
        'food': [
            { name: 'Cooking Class', description: 'Learn to make traditional Nepali dishes', duration: '3 hours', cost: 35 },
            { name: 'Street Food Tour', description: 'Guided tasting of local street delicacies', duration: '2 hours', cost: 25 },
            { name: 'Thakali Cuisine Experience', description: 'Traditional meal from Thak Khola region', duration: '2 hours', cost: 20 },
            { name: 'Newari Food Tour', description: 'Authentic tastes of indigenous Kathmandu cuisine', duration: '3 hours', cost: 30 },
            { name: 'Tea Plantation Visit', description: 'Tour and tasting at a Himalayan tea garden', duration: '4 hours', cost: 40 }
        ],
        'heritage': [
            { name: 'Boudhanath Stupa', description: 'One of the largest stupas in the world', duration: '2 hours', cost: 10 },
            { name: 'Living Goddess Tour', description: 'Learn about the Kumari tradition', duration: '2 hours', cost: 15 },
            { name: 'Medieval Village Walk', description: 'Tour of preserved ancient settlements', duration: '3 hours', cost: 20 },
            { name: 'Changu Narayan Temple', description: 'Oldest Hindu temple in the Kathmandu Valley', duration: '2 hours', cost: 12 },
            { name: 'Lumbini Tour', description: 'Visit the birthplace of Buddha', duration: '6 hours', cost: 50 }
        ]
    };
    
    // Create itinerary data structure
    const itinerary = {
        tripDuration: tripDuration,
        travelers: parseInt(tripData.travelers),
        startDate: startDate,
        endDate: endDate,
        interests: tripData.interests,
        budget: tripData.budget,
        days: [],
        totalCost: 0
    };
    
    // Generate activities for each day
    for (let day = 1; day <= tripDuration; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day - 1);
        
        const dayPlan = {
            day: day,
            date: new Date(currentDate),
            activities: []
        };
        
        // Morning activity
        if (tripData.interests.length > 0) {
            // Pick an interest based on rotation
            const interestIndex = (day - 1) % tripData.interests.length;
            const morningInterest = tripData.interests[interestIndex];
            
            if (attractions[morningInterest] && attractions[morningInterest].length > 0) {
                // Random selection from the category
                const activityIndex = Math.floor(Math.random() * attractions[morningInterest].length);
                const activity = attractions[morningInterest][activityIndex];
                
                dayPlan.activities.push({
                    time: '09:00 - 12:00',
                    name: activity.name,
                    description: activity.description,
                    category: morningInterest,
                    cost: activity.cost * itinerary.travelers
                });
                
                itinerary.totalCost += activity.cost * itinerary.travelers;
            }
        }
        
        // Afternoon activity
        if (tripData.interests.length > 1) {
            // Pick a different interest
            const interestIndex = (day % tripData.interests.length);
            const afternoonInterest = tripData.interests[interestIndex];
            
            if (attractions[afternoonInterest] && attractions[afternoonInterest].length > 0) {
                // Random selection from the category
                const activityIndex = Math.floor(Math.random() * attractions[afternoonInterest].length);
                const activity = attractions[afternoonInterest][activityIndex];
                
                dayPlan.activities.push({
                    time: '14:00 - 17:00',
                    name: activity.name,
                    description: activity.description,
                    category: afternoonInterest,
                    cost: activity.cost * itinerary.travelers
                });
                
                itinerary.totalCost += activity.cost * itinerary.travelers;
            }
        }
        
        itinerary.days.push(dayPlan);
    }
    
    // Apply budget adjustment
    switch (tripData.budget) {
        case 'budget':
            itinerary.totalCost *= 0.7;
            break;
        case 'comfort':
            // Default price, no change
            break;
        case 'luxury':
            itinerary.totalCost *= 2;
            break;
    }
    
    // Add accommodation and food costs
    const dailyAccommodationCost = getBudgetBasedCost(tripData.budget, 'accommodation');
    const dailyFoodCost = getBudgetBasedCost(tripData.budget, 'food');
    
    const accommodationTotal = dailyAccommodationCost * tripDuration * itinerary.travelers;
    const foodTotal = dailyFoodCost * tripDuration * itinerary.travelers;
    
    itinerary.accommodationCost = accommodationTotal;
    itinerary.foodCost = foodTotal;
    itinerary.totalCost += accommodationTotal + foodTotal;
    
    return itinerary;
}

// Get costs based on budget level
function getBudgetBasedCost(budget, category) {
    const costs = {
        'accommodation': {
            'budget': 15,
            'comfort': 40,
            'luxury': 120
        },
        'food': {
            'budget': 10,
            'comfort': 25,
            'luxury': 60
        }
    };
    
    return costs[category][budget] || costs[category]['comfort'];
}

// Display itinerary in the results container
function displayItinerary(itineraryData, container) {
    let itineraryHTML = `
        <div class="itinerary-container">
            <h2>Your ${itineraryData.tripDuration}-Day Nepal Adventure</h2>
            <p>Customized for ${itineraryData.travelers} traveler(s) with interests in ${itineraryData.interests.join(', ')}</p>
            <div class="itinerary-days">
    `;
    
    // Add each day to the itinerary
    itineraryData.days.forEach(day => {
        const formattedDate = day.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        itineraryHTML += `
            <div class="itinerary-day">
                <h3>Day ${day.day} - ${formattedDate}</h3>
                <div class="itinerary-activities">
        `;
        
        if (day.activities.length === 0) {
            itineraryHTML += `
                <div class="activity">
                    <span class="time">All Day</span>
                    <div class="activity-details">
                        <h4>Free Time</h4>
                        <p>Explore on your own or relax</p>
                    </div>
                </div>
            `;
        } else {
            day.activities.forEach(activity => {
                itineraryHTML += `
                    <div class="activity">
                        <span class="time">${activity.time}</span>
                        <div class="activity-details">
                            <h4>${activity.name}</h4>
                            <p>${activity.description}</p>
                        </div>
                    </div>
                `;
            });
        }
        
        itineraryHTML += `
                </div>
            </div>
        `;
    });
    
    // Add budget summary
    itineraryHTML += `
            </div>
            <div class="itinerary-summary">
                <h3>Estimated Budget</h3>
                <p>Activities: $${Math.round(itineraryData.totalCost - itineraryData.accommodationCost - itineraryData.foodCost)}</p>
                <p>Accommodation (${capitalizeFirst(itineraryData.budget)} level): $${Math.round(itineraryData.accommodationCost)}</p>
                <p>Food & Drinks: $${Math.round(itineraryData.foodCost)}</p>
                <p><strong>Total estimated cost: $${Math.round(itineraryData.totalCost)}</strong></p>
                <div class="itinerary-actions">
                    <button class="btn primary" onclick="saveItinerary()">Save Itinerary</button>
                    <button class="btn secondary" onclick="requestModifications()">Request Modifications</button>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = itineraryHTML;
}

// Flight search functionality
function openFlightSearchModal() {
    const modal = document.getElementById('flight-search-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Hotel search functionality
function openHotelSearchModal() {
    const modal = document.getElementById('hotel-search-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close all modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Search flights functionality
function searchFlights(formData) {
    const resultsContainer = document.getElementById('flight-search-results');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '<p>Searching for flights...</p>';
    
    // In a real implementation, this would be an API call
    // For this implementation, we'll simulate API results
    setTimeout(() => {
        const departureCity = formData.get('departure-city');
        const departureDate = new Date(formData.get('departure-date'));
        const returnDate = new Date(formData.get('return-date'));
        const passengers = formData.get('flight-passengers');
        
        // Create mock flight results
        const flights = createMockFlights(departureCity, departureDate, returnDate);
        
        let resultsHTML = `
            <h3>Flight Results</h3>
            <p>Showing flights from ${departureCity} to Kathmandu for ${passengers} passenger(s)</p>
            <div class="flight-results">
        `;
        
        if (flights.length === 0) {
            resultsHTML += '<p>No flights found for the selected dates. Please try different dates.</p>';
        } else {
            flights.forEach(flight => {
                resultsHTML += `
                    <div class="flight-card">
                    // Continued from previous code
                        <div class="flight-info">
                            <h4>${flight.airline}</h4>
                            <div class="flight-route">
                                <div class="departure">
                                    <p class="time">${formatTime(flight.departureTime)}</p>
                                    <p class="airport">${flight.departureAirport}</p>
                                </div>
                                <div class="duration">
                                    <p>${flight.duration}</p>
                                    <div class="flight-line">
                                        <span class="plane-icon">✈</span>
                                    </div>
                                    <p>${flight.stops > 0 ? flight.stops + ' stop' + (flight.stops > 1 ? 's' : '') : 'Direct'}</p>
                                </div>
                                <div class="arrival">
                                    <p class="time">${formatTime(flight.arrivalTime)}</p>
                                    <p class="airport">${flight.arrivalAirport}</p>
                                </div>
                            </div>
                        </div>
                        <div class="flight-price">
                            <h4>$${flight.price}</h4>
                            <button class="btn primary flight-select-btn">Select</button>
                        </div>
                    </div>
                `;
            });
        }
        
        resultsHTML += `
            </div>
            <div class="modal-actions">
                <button class="btn secondary" onclick="closeAllModals()">Close</button>
            </div>
        `;
        
        resultsContainer.innerHTML = resultsHTML;
        
        // Add event listeners to select buttons
        document.querySelectorAll('.flight-select-btn').forEach((button, index) => {
            button.addEventListener('click', function() {
                selectFlight(flights[index]);
            });
        });
    }, 1500);
}

// Search accommodations functionality
function searchAccommodations(formData) {
    const resultsContainer = document.getElementById('hotel-search-results');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '<p>Searching for accommodations...</p>';
    
    // In a real implementation, this would be an API call
    // For this implementation, we'll simulate API results
    setTimeout(() => {
        const destination = formData.get('destination');
        const checkIn = new Date(formData.get('check-in'));
        const checkOut = new Date(formData.get('check-out'));
        const rooms = formData.get('rooms');
        const accommodationType = formData.get('accommodation-type');
        
        // Create mock accommodation results
        const accommodations = createMockAccommodations(destination, accommodationType);
        
        let resultsHTML = `
            <h3>Accommodation Results</h3>
            <p>Showing places to stay in ${capitalizeFirst(destination)} for ${rooms} room(s)</p>
            <div class="accommodation-results">
        `;
        
        if (accommodations.length === 0) {
            resultsHTML += '<p>No accommodations found for the selected criteria. Please try different options.</p>';
        } else {
            accommodations.forEach(place => {
                resultsHTML += `
                    <div class="accommodation-card">
                        <div class="accommodation-image">
                            <div class="placeholder-image" style="background-color: #f0f0f0; height: 120px; display: flex; align-items: center; justify-content: center;">
                                <span>${place.name}</span>
                            </div>
                        </div>
                        <div class="accommodation-info">
                            <h4>${place.name}</h4>
                            <p class="accommodation-type">${place.type}</p>
                            <p class="accommodation-location">${place.location}</p>
                            <div class="accommodation-rating">
                                ${generateStars(place.rating)}
                                <span>(${place.reviews} reviews)</span>
                            </div>
                            <p class="accommodation-amenities">${place.amenities.join(' · ')}</p>
                        </div>
                        <div class="accommodation-price">
                            <h4>$${place.price}</h4>
                            <p>per night</p>
                            <button class="btn primary accommodation-select-btn">Select</button>
                        </div>
                    </div>
                `;
            });
        }
        
        resultsHTML += `
            </div>
            <div class="modal-actions">
                <button class="btn secondary" onclick="closeAllModals()">Close</button>
            </div>
        `;
        
        resultsContainer.innerHTML = resultsHTML;
        
        // Add event listeners to select buttons
        document.querySelectorAll('.accommodation-select-btn').forEach((button, index) => {
            button.addEventListener('click', function() {
                selectAccommodation(accommodations[index]);
            });
        });
    }, 1500);
}

// Create mock flights
function createMockFlights(departureCity, departureDate, returnDate) {
    const airlines = ['Nepal Airlines', 'Qatar Airways', 'Turkish Airlines', 'Emirates', 'Air India'];
    const flights = [];
    
    // Generate random departures
    for (let i = 0; i < 5; i++) {
        const departureHour = 6 + Math.floor(Math.random() * 12); // Departures between 6 AM and 6 PM
        const departureMinute = Math.floor(Math.random() * 60);
        
        const departureTime = new Date(departureDate);
        departureTime.setHours(departureHour, departureMinute);
        
        const durationHours = 8 + Math.floor(Math.random() * 6); // 8-14 hour flights
        const durationMinutes = Math.floor(Math.random() * 60);
        
        const arrivalTime = new Date(departureTime);
        arrivalTime.setHours(arrivalTime.getHours() + durationHours);
        arrivalTime.setMinutes(arrivalTime.getMinutes() + durationMinutes);
        
        const stops = Math.floor(Math.random() * 3); // 0-2 stops
        
        flights.push({
            airline: airlines[i % airlines.length],
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            departureAirport: getDepartureAirportCode(departureCity),
            arrivalAirport: 'KTM',
            duration: `${durationHours}h ${durationMinutes}m`,
            stops: stops,
            price: 800 + Math.floor(Math.random() * 700)
        });
    }
    
    // Sort by price
    flights.sort((a, b) => a.price - b.price);
    
    return flights;
}

// Create mock accommodations
function createMockAccommodations(destination, type) {
    const accommodations = [];
    
    // Accommodation types and names based on destination
    const destinationInfo = {
        'kathmandu': {
            location: 'Thamel, Kathmandu',
            hotels: ['Kathmandu Grand Hotel', 'Himalayan Heights', 'Thamel Boutique Inn', 'Durbar Square Lodge', 'Mountain View Resort']
        },
        'pokhara': {
            location: 'Lakeside, Pokhara',
            hotels: ['Phewa Lake Resort', 'Pokhara Grand', 'Annapurna View Hotel', 'Lakeside Retreat', 'Mountain Oasis']
        },
        'chitwan': {
            location: 'Sauraha, Chitwan',
            hotels: ['Jungle Safari Lodge', 'Elephant Crossing Hotel', 'Chitwan Wildlife Resort', 'Green Park Jungle', 'River View Inn']
        },
        'nagarkot': {
            location: 'Nagarkot Hills',
            hotels: ['Himalayan Viewpoint Hotel', 'Sunrise Lodge', 'Mountain Breeze Resort', 'Nagarkot Retreat', 'Peak View Inn']
        },
        'lumbini': {
            location: 'Sacred Garden Area, Lumbini',
            hotels: ['Buddha's Birthplace Hotel', 'Lumbini Peace Resort', 'Nirvana Hotel', 'Sacred Garden Lodge', 'Lotus View Inn']
        }
    };
    
    // Accommodation types
    const types = ['Hotel', 'Guesthouse', 'Hostel', 'Resort', 'Homestay'];
    
    // Generate random accommodations
    for (let i = 0; i < 5; i++) {
        const destinationData = destinationInfo[destination] || destinationInfo['kathmandu'];
        const accommodationType = type === 'any' ? types[i % types.length] : capitalizeFirst(type);
        
        // Skip if filtering by type and not matching
        if (type !== 'any' && accommodationType.toLowerCase() !== type) {
            continue;
        }
        
        accommodations.push({
            name: destinationData.hotels[i],
            type: accommodationType,
            location: destinationData.location,
            rating: 3 + Math.random() * 2, // 3-5 stars
            reviews: 50 + Math.floor(Math.random() * 200),
            amenities: getRandomAmenities(),
            price: getPriceByType(accommodationType)
        });
    }
    
    return accommodations;
}

// Select a flight
function selectFlight(flight) {
    alert(`You selected a flight with ${flight.airline} for $${flight.price}`);
    closeAllModals();
    
    // In a real application, this would add the flight to a booking process
    // For demo purposes, we'll just close the modal
}

// Select an accommodation
function selectAccommodation(accommodation) {
    alert(`You selected ${accommodation.name} for $${accommodation.price} per night`);
    closeAllModals();
    
    // In a real application, this would add the accommodation to a booking process
    // For demo purposes, we'll just close the modal
}

// Save the generated itinerary
function saveItinerary() {
    alert('Itinerary saved successfully! In a real application, this would save to your account or allow you to download/email the itinerary.');
    
    // In a real application, this would save to a database or generate a PDF
}

// Request modifications to the itinerary
function requestModifications() {
    alert('In a real application, this would open a form to specify what changes you would like to make to the itinerary.');
    
    // In a real application, this would open a modification form or connect to customer service
}

// Helper function to generate star ratings
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star full">★</span>';
    }
    
    // Half star
    if (halfStar) {
        starsHTML += '<span class="star half">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star empty">☆</span>';
    }
    
    return starsHTML;
}

// Helper function to format time
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Helper function to get random amenities
function getRandomAmenities() {
    const allAmenities = ['Free Wi-Fi', 'Breakfast included', 'Airport shuttle', 'Swimming pool', 'Restaurant', 'Bar', 'Spa', 'Fitness center', 'Mountain view', 'Garden'];
    const numAmenities = 3 + Math.floor(Math.random() * 3); // 3-5 amenities
    const amenities = [];
    
    for (let i = 0; i < numAmenities; i++) {
        const index = Math.floor(Math.random() * allAmenities.length);
        if (!amenities.includes(allAmenities[index])) {
            amenities.push(allAmenities[index]);
        }
    }
    
    return amenities;
}

// Helper function to get price by accommodation type
function getPriceByType(type) {
    const basePrices = {
        'Hotel': 80,
        'Guesthouse': 50,
        'Hostel': 20,
        'Resort': 120,
        'Homestay': 40
    };
    
    const basePrice = basePrices[type] || 60;
    return basePrice + Math.floor(Math.random() * 30); // Add some variation
}

// Helper function to get departure airport code
function getDepartureAirportCode(city) {
    const airportCodes = {
        'New York': 'JFK',
        'London': 'LHR',
        'Tokyo': 'HND',
        'Sydney': 'SYD',
        'Dubai': 'DXB',
        'Paris': 'CDG',
        'Berlin': 'BER',
        'Beijing': 'PEK',
        'Toronto': 'YYZ',
        'Mumbai': 'BOM'
    };
    
    return airportCodes[city] || 'INT';
}

// Helper function to capitalize first letter
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}









document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const scrollProgress = Math.min(scrollPosition / heroHeight, 1);
        
        // Parallax effect - background moves slower than content
        heroBackground.style.transform = `scale(${1.1 - scrollProgress * 0.1}) translateY(${scrollProgress * 50}px)`;
        
        // Fade out and move up content as user scrolls
        heroContent.style.opacity = 1 - scrollProgress * 1.5;
        heroContent.style.transform = `translateY(${scrollProgress * -100}px)`;
    });
    
    // Optional: Add image slideshow functionality
    const imageUrls = [
        'https://images.unsplash.com/photo-1544461772-722f499fa2a9', // Prayer flags with mountains
        'https://images.unsplash.com/photo-1539652048370-9cf5d8e789c0', // Annapurna Base Camp
        'https://images.unsplash.com/photo-1519055548599-6d4d129508c4', // Mount Everest
        'https://images.unsplash.com/photo-1526772662000-3f88f10405ff'  // Nepal landscape
    ];
    
    let currentImageIndex = 0;
    
    function changeBackgroundImage() {
        // Fade out
        heroBackground.style.opacity = 0;
        heroBackground.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            // Change image
            currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
            heroBackground.style.backgroundImage = `url('${imageUrls[currentImageIndex]}')`;
            
            // Fade in
            heroBackground.style.opacity = 1;
        }, 1000);
    }
    
    // Change image every 8 seconds
    setInterval(changeBackgroundImage, 8000);
});