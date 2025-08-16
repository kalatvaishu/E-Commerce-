
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faPinterestP } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <Link to="/" className="text-yellow-500 text-2xl font-bold">Jalvix</Link>
          <p className="mt-2">Powering Your World with the Best in Electronics.</p>
          <p className="mt-2">123 Electronics St, Style City, NY 10001</p>
          <p>Email: support@zaptro.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
          <ul className="space-y-1">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faPinterestP} />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Stay in the Loop</h3>
          <p>Subscribe for offers & updates</p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 p-2 rounded-l bg-gray-800 border border-gray-700 text-white"
            />
            <button className="bg-yellow-600 px-4 rounded-r text-white hover:bg-red-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} <span className="text-yellow-500">Jalvix</span>. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
