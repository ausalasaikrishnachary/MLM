import React, { useState } from 'react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('buy');
  
  const properties = [
    {
      id: 1,
      title: "Skyline Towers",
      type: "3,4 BHK Apartment",
      location: "Bandra West, Mumbai",
      price: "₹ 1.85 - 3.20 Cr",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Green Valley Residency",
      type: "2,3 BHK Apartment",
      location: "Koramangala, Bangalore",
      price: "₹ 95 Lacs - 1.75 Cr",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Royal Paradise",
      type: "4,5 BHK Villa",
      location: "Whitefield, Bangalore",
      price: "₹ 2.50 - 4.80 Cr",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Metro Heights",
      type: "2,3 BHK Apartment",
      location: "Andheri East, Mumbai",
      price: "₹ 1.20 - 2.10 Cr",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Sunshine Villas",
      type: "3,4 BHK Villa",
      location: "Gachibowli, Hyderabad",
      price: "₹ 1.80 - 3.50 Cr",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "Urban Oasis",
      type: "1,2 BHK Apartment",
      location: "Powai, Mumbai",
      price: "₹ 75 Lacs - 1.45 Cr",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop",
      featured: false
    }
  ];

  const upcomingProjects = [
    {
      id: 1,
      title: "Golden Gate Residency",
      type: "2,3,4 BHK Apartment",
      location: "Sector 62, Noida",
      price: "₹ 1.25 - 2.80 Cr",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
      launchDate: "Q4 2025"
    },
    {
      id: 2,
      title: "Prestige Lakefront",
      type: "3,4 BHK Apartment",
      location: "Electronic City, Bangalore",
      price: "₹ 1.60 - 3.20 Cr",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop",
      launchDate: "Q1 2026"
    }
  ];

  const cities = [
    { name: "Mumbai", properties: "185,000+ Properties", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=150&h=100&fit=crop" },
    { name: "Delhi/NCR", properties: "220,000+ Properties", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=150&h=100&fit=crop" },
    { name: "Bangalore", properties: "165,000+ Properties", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=100&fit=crop" },
    { name: "Pune", properties: "95,000+ Properties", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=150&h=100&fit=crop" },
    // { name: "Hyderabad", properties: "78,000+ Properties", image: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=150&h=100&fit=crop" },
    // { name: "Chennai", properties: "92,000+ Properties", image: "https://images.unsplash.com/photo-1553478750-4d6af82b5d1e?w=150&h=100&fit=crop" }
  ];

  const insights = [
    { title: "Market Trends", description: "Analyze current property market trends and pricing", icon: "📈" },
    { title: "Location Insights", description: "Detailed insights about different localities", icon: "📍" },
    { title: "Price Calculator", description: "Calculate property prices and EMI options", icon: "💰" },
    { title: "Investment Guide", description: "Expert guidance for property investments", icon: "🎯" }
  ];

  const handleNavClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    navbar: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '1rem 0'
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb',
      background: 'none',
      border: 'none',
      cursor: 'pointer'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    },
    navLink: {
      color: '#374151',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'color 0.2s'
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: 'none'
    },
    primaryButton: {
      backgroundColor: '#2563eb',
      color: '#ffffff'
    },
    outlineButton: {
      backgroundColor: 'transparent',
      color: '#2563eb',
      border: '1px solid #2563eb'
    },
    hero: {
      backgroundImage: 'url(https://img.freepik.com/premium-photo/low-angle-view-palm-tree-buildings-against-clear-sky_1048944-28569623.jpg?uid=R126269978&ga=GA1.1.718196285.1710491388&semt=ais_items_boosted&w=740)',
      padding: '5rem 0',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center'
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'center'
    },
    heroText: {
      color: '#ffffff'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      lineHeight: '1.1'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      marginBottom: '2rem',
      color: '#bfdbfe'
    },
    searchCard: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      
    },
    tabContainer: {
      display: 'flex',
      backgroundColor: '#f3f4f6',
      borderRadius: '0.5rem',
      padding: '0.25rem',
      marginBottom: '1.5rem'
    },
    tab: {
      flex: 1,
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    activeTab: {
      backgroundColor: '#ffffff',
      color: '#2563eb',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    inactiveTab: {
      backgroundColor: 'transparent',
      color: '#6b7280'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      marginBottom: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    inputt: {
      width: '93%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      marginBottom: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    section: {
      padding: '5rem 0'
    },
    sectionContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 2rem'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#111827'
    },
    sectionSubtitle: {
      fontSize: '1.25rem',
      textAlign: 'center',
      color: '#6b7280',
      marginBottom: '4rem'
    },
    grid: {
      display: 'grid',
      gap: '2rem'
    },
    grid3: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    },
    grid2: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
    },
    grid4: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    },
    grid6: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s'
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    },
    cardContent: {
      padding: '1.5rem'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#111827'
    },
    cardPrice: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: '1rem'
    },
    badge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#dc2626',
      color: '#ffffff',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    bgGray: {
      backgroundColor: '#f3f4f6'
    },
    bgBlue: {
      backgroundColor: '#2563eb',
      color: '#ffffff'
    },
    footer: {
      backgroundColor: '#111827',
      color: '#ffffff',
      padding: '4rem 0'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem'
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <button 
            style={styles.logo}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            PropertyHub
          </button>
          
          <div style={styles.navLinks}>
            <button 
              style={styles.navLink}
              onClick={() => handleNavClick('properties')}
            >
              Properties
            </button>
            <button 
              style={styles.navLink}
              onClick={() => handleNavClick('insights')}
            >
              Insights
            </button>
            <button 
              style={styles.navLink}
              onClick={() => handleNavClick('about')}
            >
              About
            </button>
            <button style={{...styles.button, ...styles.outlineButton}}>
              Subscribe
            </button>
            <button style={{...styles.button, ...styles.outlineButton}}>
              Login
            </button>
            <button style={{...styles.button, ...styles.primaryButton}}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              Find Your Dream Home
            </h1>
            <p style={styles.heroSubtitle}>
              Discover the perfect property with our comprehensive listings across India's top cities
            </p>
          </div>
          
          <div style={styles.searchCard}>
            <div style={styles.tabContainer}>
              {['buy', 'rent', 'commercial'].map((tab) => (
                <button
                  key={tab}
                  style={{
                    ...styles.tab,
                    ...(activeTab === tab ? styles.activeTab : styles.inactiveTab)
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div>
              <select style={styles.input}>
                <option>All Residential</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
              </select>
              
              <input 
                type="text" 
                style={styles.inputt }
                placeholder="Search for locality, landmark, project..."
              />
              
              <button style={{...styles.button, ...styles.primaryButton, width: '100%', padding: '0.75rem'}}>
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section id="properties" style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Featured Properties</h2>
          <p style={styles.sectionSubtitle}>Handpicked properties for you</p>
          
          <div style={{...styles.grid, ...styles.grid3}}>
            {properties.map(property => (
              <div key={property.id} style={styles.card}>
                <div style={{position: 'relative'}}>
                  <img 
                    src={property.image} 
                    alt={property.title}
                    style={styles.cardImage}
                  />
                  {property.featured && (
                    <span style={styles.badge}>
                      Featured
                    </span>
                  )}
                </div>
                
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{property.title}</h3>
                  <p style={{color: '#6b7280', marginBottom: '0.25rem'}}>{property.type}</p>
                  <p style={{color: '#6b7280', marginBottom: '1rem'}}>{property.location}</p>
                  <p style={styles.cardPrice}>{property.price}</p>
                  <button style={{...styles.button, ...styles.primaryButton, width: '100%'}}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section style={{...styles.section, ...styles.bgGray}}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Upcoming Projects</h2>
          <p style={styles.sectionSubtitle}>Get early bird benefits on these upcoming developments</p>
          
          <div style={{...styles.grid, ...styles.grid2}}>
            {upcomingProjects.map(project => (
              <div key={project.id} style={styles.card}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div style={{width: '40%'}}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      style={{width: '100%', height: '200px', objectFit: 'cover'}}
                    />
                  </div>
                  <div style={{width: '60%', padding: '1.5rem'}}>
                    <h3 style={styles.cardTitle}>{project.title}</h3>
                    <p style={{color: '#6b7280', marginBottom: '0.25rem'}}>{project.type}</p>
                    <p style={{color: '#6b7280', marginBottom: '0.5rem'}}>{project.location}</p>
                    <p style={{...styles.cardPrice, fontSize: '1.25rem', marginBottom: '0.5rem'}}>{project.price}</p>
                    <p style={{color: '#10b981', fontWeight: '500', marginBottom: '1rem'}}>Launching {project.launchDate}</p>
                    <button style={{...styles.button, ...styles.primaryButton}}>
                      Register Interest
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights & Tools */}
      <section id="insights" style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Insights & Tools</h2>
          <p style={styles.sectionSubtitle}>Make informed decisions with our expert insights</p>
          
          <div style={{...styles.grid, ...styles.grid4}}>
            {insights.map((insight, index) => (
              <div key={index} style={{...styles.card, textAlign: 'center'}}>
                <div style={styles.cardContent}>
                  <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{insight.icon}</div>
                  <h3 style={styles.cardTitle}>{insight.title}</h3>
                  <p style={{color: '#6b7280', marginBottom: '1.5rem'}}>{insight.description}</p>
                  <button style={{...styles.button, ...styles.primaryButton}}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section style={{...styles.section, ...styles.bgGray}}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Explore Properties by City</h2>
          <p style={styles.sectionSubtitle}>Discover opportunities across India's major cities</p>
          
          <div style={{...styles.grid, ...styles.grid6}}>
            {cities.map((city, index) => (
              <div key={index} style={{...styles.card, cursor: 'pointer'}}>
                <img 
                  src={city.image} 
                  alt={city.name}
                  style={{width: '100%', height: '100px', objectFit: 'cover'}}
                />
                <div style={{padding: '1rem', textAlign: 'center'}}>
                  <h3 style={{fontWeight: 'bold', marginBottom: '0.25rem', color: '#111827'}}>{city.name}</h3>
                  <p style={{fontSize: '0.875rem', color: '#6b7280'}}>{city.properties}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{...styles.section, ...styles.bgBlue}}>
        <div style={styles.sectionContainer}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center'}}>
            <div>
              <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>Ready to Find Your Dream Home?</h2>
              <p style={{fontSize: '1.25rem', color: '#bfdbfe'}}>Join thousands of satisfied customers who found their perfect property with us.</p>
            </div>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
              <button style={{...styles.button, backgroundColor: '#ffffff', color: '#2563eb', padding: '0.75rem 2rem'}}>
                Start Searching
              </button>
              <button style={{...styles.button, backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #ffffff', padding: '0.75rem 2rem'}}>
                List Your Property
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.sectionContainer}>
          <div style={styles.footerGrid}>
            <div>
              <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#60a5fa', marginBottom: '1rem'}}>PropertyHub</h3>
              <p style={{color: '#d1d5db', marginBottom: '1.5rem'}}>Your trusted partner in finding the perfect property across India.</p>
              <div style={{display: 'flex', gap: '1rem'}}>
                <button style={{color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer'}}>📘</button>
                <button style={{color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer'}}>🐦</button>
                <button style={{color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer'}}>📷</button>
              </div>
            </div>
            
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>Quick Links</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                {['Buy Property', 'Rent Property', 'Sell Property', 'Commercial', 'Plots/Land'].map((link) => (
                  <button key={link} style={{color: '#d1d5db', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'}}>
                    {link}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>Services</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                {['Property Valuation', 'Home Loans', 'Legal Services', 'Property Management', 'Investment Advisory'].map((service) => (
                  <button key={service} style={{color: '#d1d5db', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left'}}>
                    {service}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>Contact Info</h4>
              <div style={{color: '#d1d5db', marginBottom: '1.5rem'}}>
                <p style={{marginBottom: '0.5rem'}}>📞 +91 9876543210</p>
                <p style={{marginBottom: '0.5rem'}}>✉️ contact@propertyhub.com</p>
                <p style={{marginBottom: '0.5rem'}}>📍 Mumbai, Maharashtra, India</p>
              </div>
              
              <div>
                <h5 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem'}}>Newsletter</h5>
                <div style={{display: 'flex'}}>
                  <input 
                    type="email" 
                    style={{
                      flex: 1,
                      padding: '0.5rem 1rem',
                      backgroundColor: '#374151',
                      border: '1px solid #4b5563',
                      borderRadius: '0.375rem 0 0 0.375rem',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                    placeholder="Your email" 
                  />
                  <button style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    borderRadius: '0 0.375rem 0.375rem 0',
                    padding: '0.5rem 1.5rem'
                  }}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{borderTop: '1px solid #374151', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
            <p style={{color: '#9ca3af'}}>© 2025 PropertyHub. All rights reserved.</p>
            <div style={{display: 'flex', gap: '1.5rem'}}>
              {['Privacy Policy', 'Terms of Service', 'Support'].map((link) => (
                <button key={link} style={{color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer'}}>
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;