export default function PolicyPage() {
  const bannerText = "Privacy Policy";

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-gray-800">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1d140f] via-[#3b2a20] to-[#1d140f] py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-8">
            <a href="/" className="hover:text-white transition duration-300">
              Home
            </a>
            <span>/</span>
            <span className="text-white font-semibold">Privacy Policy</span>
          </div>

          {/* Animated Title */}
          <h1 className="flex flex-wrap text-4xl md:text-6xl font-bold text-white leading-tight">
            {bannerText.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-slideLeft opacity-0"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          <p className="mt-6 text-gray-300 max-w-2xl text-lg leading-relaxed">
            Your privacy matters to us. Read how ActEast collects,
            manages, and protects your personal information.
          </p>
        </div>
      </section>

      {/* POLICY CONTENT */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-14 space-y-12 border border-gray-100">
          {/* Intro */}
          <div>
            <h2 className="text-3xl font-bold text-[#3b2a20] mb-5">
              Privacy Policy
            </h2>

             <p className="text-justify">
                This Privacy Policy explains how ActEast collects, uses,
                manages, and protects your personal information when you
                access or use our services. It also outlines your privacy
                rights and the measures we take to safeguard your data.
                </p>
                <p className="mt-4 text-justify">
                By accessing or using our platform, you agree to the
                practices described in this policy regarding the collection
                and use of your information.
                </p>
          </div>
         <div>
    <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
      Definitions & Interpretation
    </h3>

    <p className="text-justify">
      Certain words used in this policy may have specific meanings
      depending on the context. These definitions apply equally
      whether used in singular or plural form.
    </p>

    <ul className="list-disc pl-6 mt-5 space-y-2">
      <li>
        <span className="font-semibold">Account:</span> A unique
        profile created to access specific services or features.
      </li>

      <li>
        <span className="font-semibold">Company:</span> Refers to
        ActEast, including its owners, representatives, and
        affiliates.
      </li>

      <li>
        <span className="font-semibold">Cookies:</span> Small data
        files stored on your device to improve browsing experience.
      </li>

      <li>
        <span className="font-semibold">Device:</span> Any digital
        device such as a mobile phone, computer, or tablet used to
        access the service.
      </li>

      <li>
        <span className="font-semibold">Personal Data:</span>{" "}
        Information that can identify an individual directly or
        indirectly.
      </li>

      <li>
        <span className="font-semibold">Service:</span> Refers to
        the ActEast website and related services.
      </li>

      <li>
        <span className="font-semibold">Usage Data:</span>{" "}
        Information automatically collected while using the
        platform.
      </li>
    </ul>
  </div>

          {/* Information Collection */}
          <div>
            <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
            Information We Collect
            </h3>

            <p className="text-justify mb-4">
            To provide a better experience, we may collect certain
            personal and technical information including:
            </p>

            <ul className="list-disc pl-6 space-y-2">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Address and location details</li>
            <li>Device and browser information</li>
            <li>Usage and activity data</li>
            </ul>
        </div>
         {/* USAGE DATA */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Usage Information
                </h3>

                <p className="text-justify">
                We automatically gather certain technical information such as
                IP address, browser type, visited pages, session duration,
                device identifiers, and operating system details to improve
                website performance and user experience.
                </p>
            </div>
            
             {/* SOCIAL LOGIN */}

            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Third-Party Login Services
                </h3>

                <p className="text-justify">
                Users may choose to access our services using third-party
                login providers such as Google, Facebook, LinkedIn, or other
                supported platforms. In such cases, we may receive limited
                profile information associated with those accounts.
                </p>
            </div>

            {/* COOKIES */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Cookies & Tracking Technologies
                </h3>

                <p className="text-justify mb-4">
                We use cookies and similar technologies to analyze traffic,
                remember preferences, improve functionality, and enhance user
                experience.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                <li>Essential Cookies for website functionality</li>
                <li>Preference Cookies for personalized settings</li>
                <li>Analytics Cookies for performance monitoring</li>
                <li>Security Cookies for fraud prevention</li>
                </ul>
            </div>
            {/* DATA USAGE */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                How We Use Your Information
                </h3>

                <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process orders and customer requests</li>
                <li>To improve website functionality and performance</li>
                <li>To communicate important updates and offers</li>
                <li>To maintain platform security and prevent misuse</li>
                <li>To analyze trends and user engagement</li>
                </ul>
            </div>

            {/* SHARING */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Sharing of Information
                </h3>

                <p className="text-justify mb-4">
                We may share limited information with trusted partners and
                service providers only when necessary for delivering services
                or complying with legal obligations.
                </p>

                <ul className="list-disc pl-6 space-y-2">
                <li>Service providers and technical partners</li>
                <li>Business affiliates and collaborators</li>
                <li>Legal authorities when required by law</li>
                <li>Third-party integrations approved by users</li>
                </ul>
            </div>

          {/* RETENTION */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Data Retention
                </h3>

                <p className="text-justify">
                Personal information is retained only for as long as
                necessary to fulfill the purposes outlined in this policy,
                comply with legal requirements, resolve disputes, and enforce
                agreements.
                </p>
            </div>

            {/* DATA TRANSFER */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Data Transfer & Processing
                </h3>

                <p className="text-justify">
                Your information may be processed or stored on systems
                located outside your region. We ensure that appropriate
                security measures are followed to protect your data during
                such transfers.
                </p>
            </div>

            {/* DELETE DATA */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Your Rights & Data Removal
                </h3>

                <p className="text-justify">
                Users may request access, correction, or deletion of their
                personal information at any time. Certain data may still be
                retained where legally required or necessary for legitimate
                business purposes.
                </p>
            </div>

            {/* LEGAL */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Legal Disclosure
                </h3>

                <p className="text-justify">
                We may disclose personal information when required by law,
                legal proceedings, government authorities, or to protect the
                rights, security, and integrity of our services and users.
                </p>
            </div>

            {/* SECURITY */}
            <div>
                <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
                Security of Your Information
                </h3>

                <p className="text-justify">
                We implement commercially reasonable security practices to
                protect your personal information from unauthorized access,
                misuse, or disclosure. However, no digital platform can
                guarantee complete security.
                </p>
            </div>
          {/* Children's Privacy */}
          <div>
            <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
              Children’s Privacy
            </h3>

            <p className="text-gray-600 leading-8 text-justify">
           Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children below this age limit.

            </p>
             <p className="text-gray-600 leading-8 text-justify">
              If a parent or guardian believes that a child has provided us with personal information, they are encouraged to contact us immediately. Upon verification, we will take appropriate steps to remove such information from our records and servers.
            </p>
             <p className="text-gray-600 leading-8 text-justify">
            In situations where parental consent is legally required for data processing, we may request confirmation or authorization from a parent or guardian before collecting or using the information.
            </p>
          </div>

            <div>
            <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
             Links to External Websites
            </h3>

            <p className="text-gray-600 leading-8 text-justify">
          
            Our website or services may contain links to third-party websites for additional information or convenience. Please note that these external websites are not operated or controlled by us.

            </p>
             <p className="text-gray-600 leading-8 text-justify">
              We recommend reviewing the privacy policies and terms of any third-party websites you visit, as we are not responsible for their content, practices, or policies regarding user privacy and data handling.
            </p>
           
          </div>

          {/* Changes */}
          <div>
            <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
              Changes to This Policy
            </h3>

            <p className="text-gray-600 leading-8 text-justify">
              We may revise or update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or business practices.
            </p>
            <p className="text-gray-600 leading-8 text-justify">
              Any updates will be posted on this page along with the revised “Last Updated” date. Where necessary, we may also notify users through email or other appropriate communication methods before the changes become effective.
            </p>
            <p className="text-gray-600 leading-8 text-justify">
              We encourage users to review this Privacy Policy periodically to stay informed about how we protect and manage personal information. Continued use of our services after any updates means you accept the revised policy.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-[#f8f5f0] rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-semibold text-[#3b2a20] mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-700 leading-7">
                <p>
                    If you have any questions regarding this Privacy Policy,
                    feel free to contact us.
                </p>

                <p>
                    <span className="font-semibold">
                    By visiting this page on our website :
                    </span>{" "}
                    <a
                    href="https://acteast.co.in/contact/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3b2a20] hover:text-orange-700  break-all"
                    >
                    https://acteast.co.in/contact/
                    </a>
                </p>

                <p>
                    <span className="font-semibold">By Email :</span>{" "}
                    <a
                    href="mailto:mail@acteast.co.in"
                    className="text-[#3b2a20] hover:text-orange-700 "
                    >
                    mail@acteast.co.in
                    </a>
                </p>

                <p>
                    <span className="font-semibold">By phone number :</span>{" "}
                    <a
                    href="tel:+913614526386"
                    className="text-[#3b2a20] hover:text-orange-700 "
                    >
                    +91 361-4526386
                    </a>
                </p>
                </div>
          </div>
        </div>
      </section>

      {/* ANIMATION STYLE */}
      <style>
        {`
          @keyframes slideLeft {
            0% {
              opacity: 0;
              transform: translateX(-40px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-slideLeft {
            animation: slideLeft 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
}
