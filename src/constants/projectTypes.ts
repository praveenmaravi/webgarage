// src/constants/projectTypes.ts

export const projectTemplates = [
    {
      name: "SaaS App",
      id: "saas",
      description: "A scalable Software as a Service platform with multi-user support, authentication, and subscription plans.",
      folderStructure: {
        frontend: {
          components: ["Dashboard", "Billing", "Authentication", "User Profile", "Settings"],
          services: ["api", "auth", "billing"],
        },
        backend: {
          services: ["authService", "paymentGateway", "userManagement"],
          database: ["users", "subscriptions", "payments"],
        },
      },
      features: ["User Authentication", "Subscription Management", "Role-Based Access", "API Integration", "Admin Dashboard"],
      techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "GraphQL"],
      defaultLayout: "dashboard",
    },
    {
      name: "eCommerce Store",
      id: "ecommerce",
      description: "An online store with product listings, user cart, checkout, and payment integrations.",
      folderStructure: {
        frontend: {
          components: ["ProductList", "ProductDetail", "Cart", "Checkout", "OrderSummary"],
          services: ["api", "cart", "checkout"],
        },
        backend: {
          services: ["productService", "orderService", "paymentGateway"],
          database: ["products", "orders", "users"],
        },
      },
      features: ["Product Listings", "Shopping Cart", "Checkout Process", "Payment Gateway", "Order Tracking"],
      techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Redux"],
      defaultLayout: "product-grid",
    },
    {
      name: "Portfolio Site",
      id: "portfolio",
      description: "A personal website to showcase projects, skills, and achievements, with a sleek design.",
      folderStructure: {
        frontend: {
          components: ["HeroSection", "AboutMe", "Skills", "Projects", "ContactForm"],
          services: ["api", "contact"],
        },
        backend: {
          services: ["contactService"],
          database: ["contactMessages"],
        },
      },
      features: ["Portfolio Showcase", "Project Gallery", "Contact Form", "About Me", "Skills List"],
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      defaultLayout: "one-page-scroll",
    },
    {
      name: "Blog",
      id: "blog",
      description: "A simple blog website with the ability to post articles, categorize them, and allow users to comment.",
      folderStructure: {
        frontend: {
          components: ["ArticleList", "ArticleDetail", "CommentSection", "Categories", "Search"],
          services: ["api", "comments", "search"],
        },
        backend: {
          services: ["blogService", "commentService"],
          database: ["posts", "comments", "categories"],
        },
      },
      features: ["Article Posting", "Commenting", "Category Sorting", "Search Functionality", "User Authentication"],
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      defaultLayout: "list-view",
    },
    {
      name: "Landing Page",
      id: "landing",
      description: "A simple yet captivating one-page site designed to present a product, service, or event.",
      folderStructure: {
        frontend: {
          components: ["HeroSection", "Features", "Testimonials", "CallToAction", "Footer"],
          services: ["api"],
        },
        backend: {
          services: ["landingService"],
          database: ["leads"],
        },
      },
      features: ["Hero Section", "Product Features", "Call to Action", "Customer Testimonials", "Lead Collection Form"],
      techStack: ["React", "Node.js", "Express"],
      defaultLayout: "single-page",
    },
    {
      name: "Corporate Website",
      id: "corporate",
      description: "A professional website for a company or organization, including multiple pages, contact forms, and team sections.",
      folderStructure: {
        frontend: {
          components: ["HomePage", "AboutUs", "Services", "Team", "ContactUs"],
          services: ["api", "contact"],
        },
        backend: {
          services: ["teamService", "contactService"],
          database: ["teams", "contactMessages"],
        },
      },
      features: ["About Us", "Team Members", "Services Overview", "Contact Form", "News Section"],
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      defaultLayout: "multi-page",
    },
  ];
  
  // Default to "SaaS App" if no template is selected
  export const defaultProjectTemplate = projectTemplates[0];
  